using Newtonsoft.Json.Serialization;
using System;
using System.Web.Http;
using IT4.Web.Common;
using IT4.Common.Dictionary;
namespace AngularJSApp
{
	public class AngularJSAppApplication:CommonGlobal
	{
		#region SubClasses
		#endregion
		public AngularJSAppApplication ():base()
		{
		}
		protected  void Session_Start (Object sender, EventArgs e)
		{
			Session["init"] = 0;
		}
		protected  override void Application_Start ()
		{
			base.Application_Start();
			GlobalConfiguration.Configuration.Formatters.JsonFormatter.SerializerSettings.ContractResolver = new DefaultContractResolver();
			DictionaryType = DictionaryType.DB;
		}
		protected  override string PrivateKey
		{
		    get
		    {
		        return "cfe403b6-afbe-46fd-bc16-a2021dbea50e";
		    }
		}
	}
}
