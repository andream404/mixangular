#region Header

/*
 * Creato da SharpDevelop.
 * Utente: marco
 * Data: 29/11/2007
 * Ora: 15.32
 *
 * To change this template use Tools | Options | Coding | Edit Standard Headers.
 */

#endregion Header

namespace AngularJSApp.Console.Common
{
	using System;
	using System.Collections.Generic;
	using System.IO;

	using IdeaPortal2.Common.DataProcessing2;
	using IdeaPortal2.Common.DB;
	using IdeaPortal2.Common.DB.SQL;

	using RJH.CommandLineHelper;

	using Westwind.Tools;

	/// <summary>
	/// Comando di base
	/// </summary>
	public abstract class BaseCommand
	{


		#region Fields

		public CommandConfiguration Configuration;

		//  private int idConcessione=-1;
		//        [CommandLineSwitch("IDConcessione","IDConcessione dei dati di riferimento (ove necessario).")]
		//        [CommandLineAlias("f")]
		//
		//public int IDConcessione {
		//  get { return idConcessione; }
		//  set { idConcessione = value; }
		//}
		//
		private string configFileName = "";
		private string connectionString = "";
		private string dbPlatform = "";
		private DBUtils dbUtils = null;
		private bool debug = false;
		private Parser parser;
		private bool showStack = false;

		#endregion Fields


		#region Constructors

		public BaseCommand()
		{
		}

		#endregion Constructors


		#region Properties

		[CommandLineSwitch("ConfigFileName","Nome del file di configurazione da usarsi. Valore predefinito � Command.Config")]
		public string ConfigFileName
		{
			get { return configFileName; }
			set { configFileName = value; }
		}

		[CommandLineSwitch("ConnectionString","ConnectionString da usarsi. Se non specificata viene utilizzata la connectionString presa dal file di configurazione.")]
		public string ConnectionString
		{
			get { return connectionString; }
			set { connectionString = value; }
		}

		public string CurrentPath
		{
			get
			{
				return Environment.CurrentDirectory+"\\";
			}
		}

		[CommandLineSwitch("DBPlatform","DBPlatform da usarsi per l'accesso al DB.")]
		public string DBPlatform
		{
			get { return dbPlatform; }
			set { dbPlatform = value; }
		}

		public DBUtils DBUtils
		{
			get
			{

				if (dbUtils==null)
				{
					if (Configuration.ConnectionString=="") OutputError("ConnectionString non valorizzata o valorizzata vuota. L'errore pu� essere dovuto a file di configurazione non trovato.");
					if (Configuration.DBPlatform=="") OutputError("DBPlatform non valorizzata o valorizzata vuota. L'errore pu� essere dovuto a file di configurazione non trovato.");
					dbUtils=IdeaPortal2.Common.DB.DBUtilsFactory.CreateDBUtils(Configuration.DBPlatform,Configuration.ConnectionString);

				}
				return dbUtils;

			}
		}

		[CommandLineSwitch("Debug","Se presente (� uno switch) attiva il debugger automaticamente.")]
		public bool Debug
		{
			get { return debug; }
			set { debug = value; }
		}

		public string ExePath
		{
			get
			{
				string result="";
				string ApplicationName=parser.ApplicationName.Replace("\"","");

				if (ApplicationName!="") result=Path.GetDirectoryName(ApplicationName);
				if (result!="" && result!=null) return result+"\\";
				else return Environment.CurrentDirectory+"\\";
			}
		}

		public Parser Parser
		{
			get
			{
				return parser;
			}
		}

		[CommandLineSwitch("ShowStack","Se presente (� uno switch) in caso di errore mostra lo stack delle chiamate.")]
		public bool ShowStack
		{
			get { return showStack; }
			set { showStack = value; }
		}

		#endregion Properties


		#region Methods

		public abstract int DoCoreJob(string[] parms);

		public void Output()
		{
			Output("");
		}

		public void Output(string msg)
		{
			System.Console.WriteLine(msg);
		}

		public void Output(string msg,params object[] parm)
		{
			System.Console.WriteLine(msg,parm);
		}

		public void OutputError(string msg)
		{
			Output(msg);
			throw new OutputErrorException();
		}

		public void OutputError(string msg,params object[] parm)
		{
			Output(msg,parm);
			throw new OutputErrorException();
		}

		public int Run(string[] parms)
		{
			ConsoleColor PrevColor=System.Console.ForegroundColor;
			parser = new Parser( System.Environment.CommandLine, this );
			// Add a switches with lots of aliases for the first name, "help" and "a".
			parser.AddSwitch(new string[] { "help", @"\?" }, "show help");

			// Parse the command line.
			parser.Parse();

			//Se l'utente non specifica il file di configurazione usa quello presente nella cartella dell'eseguibile
			if (ConfigFileName=="") configFileName=ExePath+"Command.Config";
			//Se l'utente specifica il file di configurazione, ma lo specifica senza path, usa quello nella cartella corrente
			if (Path.GetDirectoryName(ConfigFileName)=="") configFileName=CurrentPath+configFileName;

			Configuration = new CommandConfiguration(configFileName);
			AppDomain.CurrentDomain.SetData("APP_CONFIG_FILE", configFileName);
			ShowHeader();
			Output(DateTime.Now.ToString("ddMMyyyy HHmmss - ")+"Comando avviato");			

			if ( parser["help"] != null && Convert.ToBoolean(parser["help"]))
			{
				ShowHelp();
			}
			try
			{
				System.Console.ForegroundColor=ConsoleColor.Yellow;
				if (debug) System.Diagnostics.Debugger.Launch();
							
				int result=DoCoreJob(parms);
				if (dbUtils!=null) dbUtils.Close();
				System.Console.ForegroundColor=PrevColor;
				Output(DateTime.Now.ToString("ddMMyyyy HHmmss - ")+"Comando terminato");
				
				return result;

			}
			catch(Exception e)
			{
				if (!(e is OutputErrorException))
				{
					Output("Error:"+e.Message);
					if (showStack)
					{
						ShowException(e);
					}
				}
				if (dbUtils!=null) 
				{
					if (dbUtils.InTransaction())
						dbUtils.Rollback();
						
					dbUtils.Close();
				}
				System.Console.ForegroundColor=ConsoleColor.Red;
				Output(DateTime.Now.ToString("ddMMyyyy HHmmss - ")+"Comando con errori");
				
				System.Console.ForegroundColor=PrevColor;
				return -1;

			}
		}

		public void ShowHeader()
		{
			Output(GetIntroHeader());
			Output("---------------");
		}

		public void ShowHelp()
		{
			Output("Command Line      : {0}", System.Environment.CommandLine);
			Output("Program Name      : {0}", parser.ApplicationName);
			Output("Config FileName   : {0}", configFileName);
			Output("Non-switch Params : {0}", parser.Parameters.Length);
			for ( int j=0; j<parser.Parameters.Length; j++ )
				Output("                {0} : {1}",j,parser.Parameters[j]);
			Output("----");

			Parser.SwitchInfo[] si = parser.Switches;
			if ( si != null )
			{
				Output("There are {0} registered switches:", si.Length);
				foreach ( Parser.SwitchInfo s in si )
				{
					string cmd="-"+s.Name;

					if ( s.Aliases != null )
					{
						foreach ( string alias in s.Aliases )
							cmd=cmd+String.Format(" ,{0}", alias);
					}
					Output("{0} : [{1}]", cmd, s.Description);
					//					Output("Type    : {0} ", s.Type );

					if ( s.IsEnum )
					{
						string str="\t\t- Enums allowed (";
						foreach( string e in s.Enumerations )
							str=str+String.Format("{0} ", e);
						str=str+(")");
						Output(str);
					}

				}
			}
		}

		protected abstract string GetIntroHeader();

		protected void OnLog(IProcess Sender,decimal Current,decimal Max)
		{
			TrackingProbe Probe=Sender as TrackingProbe;
			if (Probe!=null)
			{
				string NewLog=Probe.Log.GetTextLogDelta();
				if (NewLog!="")  System.Console.WriteLine(NewLog);

				//System.Console.WriteLine(Probe.GetTrackingStack());

				System.Console.Title=String.Format("{0:##0.##}% - {1}",Probe.GetOverallPercent(),Probe.GetStack(StackStyle.Short).Replace(Environment.NewLine,"\\"));
			}
		}

		protected void ShowException(Exception e)
		{
			if (e.InnerException!=null) ShowException(e.InnerException);
			Output("Error message:"+e.Message);
			string Stack="";
			Exception e2=e;
			while (e2!=null)
			{
				Stack=e2.StackTrace+Stack;
				e2=e2.InnerException;
				
			}
			Output("Stack: "+Stack);
		}

		#endregion Methods
	}

	public class CommandConfiguration : wwAppConfiguration
	{


		#region Fields

		
		public string ConnectionString = "";
		public string DBPlatform = "";
		public string EB_API_Credentials = "";
		public string EB_API_URL = "";
		#endregion Fields


		#region Constructors

		public CommandConfiguration(string FileName)
			: base(true)
		{
			ReadKeysFromConfig(FileName);
		}

		#endregion Constructors
	}

	public class OutputErrorException : Exception
	{

	}
}
