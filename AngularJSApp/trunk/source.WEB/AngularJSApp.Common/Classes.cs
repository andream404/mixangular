using System.Collections.Generic;
using System;
using IT4.Web.Common;
using IT4.Web.Authentication;
using Newtonsoft.Json.Linq;
using IT4.Common.Security;
using IT4.Common.Classes;
using IT4.Common.Diario;
using IT4.Common.DB;
using System.Data;
using IdeaPortal2.Common.Classes;
using System.Linq;
namespace AngularJSApp
{
	[Serializable]
	public class ApplicationPublicSession
	{
		#region SubClasses
		#endregion
		public ApplicationPublicSession ()
		{
		}
		public static  ApplicationPublicSession Current
		{
		    get
		    {
		        if (SessionHelper.GetValue<ApplicationPublicSession>("ApplicationPublicSession")==null)
		        {
		            SessionHelper.PushValue<ApplicationPublicSession>("ApplicationPublicSession", new ApplicationPublicSession());
		        }
		        return SessionHelper.GetValue<ApplicationPublicSession>("ApplicationPublicSession");
		    }
		    set
		    {
		        SessionHelper.PushValue<ApplicationPublicSession>("ApplicationPublicSession", value);
		    }
		}
	}
	[Serializable]
	public class ApplicationPrivateSession
	{
		#region SubClasses
		#endregion
		public ApplicationPrivateSession ()
		{
			UserInfo = new UserInfo();
			QueryStringParams = new QueryStringParamsObj();
		}
		public static  ApplicationPrivateSession Current
		{
		    get
		    {
		        if (SessionHelper.GetValue<ApplicationPrivateSession>("ApplicationPrivateSession")==null)
		        {
		            SessionHelper.PushValue<ApplicationPrivateSession>("ApplicationPrivateSession", new ApplicationPrivateSession());
		        }
		        return SessionHelper.GetValue<ApplicationPrivateSession>("ApplicationPrivateSession");
		    }
		    set
		    {
		        SessionHelper.PushValue<ApplicationPrivateSession>("ApplicationPrivateSession", value);
		    }
		}
		public   LoginDataObj LoginData
		{
		    get
		    {
		        return _LoginData;
		    }
		    set
		    {
		        _LoginData = value;
		    }
		}
		public   UserInfo UserInfo
		{
		    get
		    {
		        return _UserInfo;
		    }
		    set
		    {
		        _UserInfo = value;
		    }
		}
		public   QueryStringParamsObj QueryStringParams
		{
		    get
		    {
		        return _QueryStringParams;
		    }
		    set
		    {
		        _QueryStringParams = value;
		    }
		}
		public   PageInvokeParams PageInvokeParams
		{
		    get
		    {
		        return _PageInvokeParams;
		    }
		    set
		    {
		        _PageInvokeParams = value;
		    }
		}
		private PageInvokeParams _PageInvokeParams;
		private QueryStringParamsObj _QueryStringParams;
		private LoginDataObj _LoginData;
		private UserInfo _UserInfo;
	}
	/* TODO */
	[Serializable]
	public class ApplicationUserInfo:AbstractUserInfo
	{
		#region SubClasses
		#endregion
		public ApplicationUserInfo ()
		{
		}
	}
	public class ApplicationDiaryHierachies:DiaryHierachies
	{
		#region SubClasses
		#endregion
		public ApplicationDiaryHierachies ()
		{
		}
		public static ApplicationDiaryHierachies Current=new ApplicationDiaryHierachies();
	}
	public class LookupLanguages
	{
		#region SubClasses
		#endregion
		public LookupLanguages ()
		{
		}
		public  static List<object> GetItemsBySearchText (string searchText, DBUtils DBUtils)
		{
			string searchWhereClause = LookupFieldHelper.GetSearchWhereClause(DBUtils, "DESCRIPTION", searchText, "CONTAINS");
			string searchFromClause = null;
			return GetItems(searchWhereClause, searchFromClause, DBUtils);
		}
		private  static List<object> GetItems (string plusWhereText, string plusFromText, DBUtils DBUtils)
		{
			IT4.Common.DB.SQLSelectParser sqlSelectParser = new IT4.Common.DB.SQLSelectParser();
			sqlSelectParser.Parse(GetQueryString(), DBUtils.DBPlatform);
			sqlSelectParser.AddWhereClause(plusWhereText);
			sqlSelectParser.AddFromClause(plusFromText);
			string sqlQuery = sqlSelectParser.GetNewSelectSQL();
			if (!DBUtils.HasLimitRowsSQL(sqlQuery)) {
			sqlQuery = DBUtils.CreateLimitRowSQL(sqlSelectParser.GetNewSelectSQL(), 50, 0);
			}
			List<object> LookupItems = new List<object>();
			using (IDataReader readerLookup = DBUtils.ExecQuery(sqlQuery))
			{
			    while (readerLookup.Read())
			    {
			        LookupItems.Add(new { key = readerLookup.GetValue(readerLookup.GetOrdinal("IDLANGUAGE")),
			                              value = readerLookup.GetValue(readerLookup.GetOrdinal("DESCRIPTION")) });
			    }
			    readerLookup.Close();
			}
			return LookupItems;
		}
		public  static List<object> GetItemsAll (DBUtils DBUtils)
		{
			return GetItems(null, null, DBUtils);
		}
		protected  static string GetQueryString ()
		{
			return IT4.Common.Classes.IdeaString.ParseTemplate("" + 
			"				select IDLANGUAGE, DESCRIPTION" +
			"				from V_LANGUAGES" +
			"			", "GlobalPublic;GlobalPrivate;UserProperties", new object[] { ApplicationPublicSession.Current, ApplicationPrivateSession.Current, ApplicationPrivateSession.Current.UserInfo });
		}
		public  static List<object> GetItemByKey (object key, DBUtils DBUtils)
		{
			if (key == null)
			{
			    return new List<object>();
			}
			return GetItems(string.Format("IDLANGUAGE = {0}", DBUtils.ObjectToString(key, true)), null, DBUtils);
		}
	}
	public class LookupIdstrings
	{
		#region SubClasses
		#endregion
		public LookupIdstrings ()
		{
		}
		public  static List<object> GetItemsBySearchText (string searchText, DBUtils DBUtils)
		{
			string searchWhereClause = LookupFieldHelper.GetSearchWhereClause(DBUtils, "LABEL", searchText, "CONTAINS");
			string searchFromClause = null;
			return GetItems(searchWhereClause, searchFromClause, DBUtils);
		}
		private  static List<object> GetItems (string plusWhereText, string plusFromText, DBUtils DBUtils)
		{
			IT4.Common.DB.SQLSelectParser sqlSelectParser = new IT4.Common.DB.SQLSelectParser();
			sqlSelectParser.Parse(GetQueryString(), DBUtils.DBPlatform);
			sqlSelectParser.AddWhereClause(plusWhereText);
			sqlSelectParser.AddFromClause(plusFromText);
			string sqlQuery = sqlSelectParser.GetNewSelectSQL();
			if (!DBUtils.HasLimitRowsSQL(sqlQuery)) {
			sqlQuery = DBUtils.CreateLimitRowSQL(sqlSelectParser.GetNewSelectSQL(), 50, 0);
			}
			List<object> LookupItems = new List<object>();
			using (IDataReader readerLookup = DBUtils.ExecQuery(sqlQuery))
			{
			    while (readerLookup.Read())
			    {
			        LookupItems.Add(new { key = readerLookup.GetValue(readerLookup.GetOrdinal("IDSTRING")),
			                              value = readerLookup.GetValue(readerLookup.GetOrdinal("LABEL")) });
			    }
			    readerLookup.Close();
			}
			return LookupItems;
		}
		public  static List<object> GetItemsAll (DBUtils DBUtils)
		{
			return GetItems(null, null, DBUtils);
		}
		protected  static string GetQueryString ()
		{
			return IT4.Common.Classes.IdeaString.ParseTemplate("" + 
			"				select IDSTRING, LABEL" +
			"				from V_IDSTRINGS" +
			"			", "GlobalPublic;GlobalPrivate;UserProperties", new object[] { ApplicationPublicSession.Current, ApplicationPrivateSession.Current, ApplicationPrivateSession.Current.UserInfo });
		}
		public  static List<object> GetItemByKey (object key, DBUtils DBUtils)
		{
			if (key == null)
			{
			    return new List<object>();
			}
			return GetItems(string.Format("IDSTRING = {0}", DBUtils.ObjectToString(key, true)), null, DBUtils);
		}
	}
	public class Roles:List<string>
	{
		#region SubClasses
		#endregion
		public Roles ()
		{
		}
		static readonly string[] RolesArray = new String[] {
		"IPBasePageRO",
		"IPBasePageRW"
		,
		"IndexRO",
		"IndexRW"
		,
		"LogOutRO",
		"LogOutRW"
		,
		"DiarioRO",
		"DiarioRW"
		,
		"LingueRO",
		"LingueRW"
		,
		"StringheRO",
		"StringheRW"
		,
		"TraduzioniRO",
		"TraduzioniRW"
		};
		public static Roles Current = new Roles(RolesArray);
		public new void Add(string Role)
		{
		    if (IndexOf(Role) < 0)
		    {
		        base.Add(Role);
		    }
		}
		public Roles(string[] RolesList)
		{
		    for (int i = 0; i < RolesList.Length; i++)
		    {
		        Add(RolesList[i]);
		    }
		}
	}
	public class SecurityLevels
	{
		#region SubClasses
		#endregion
		public SecurityLevels ()
		{
		}
		public  static SecurityLevel @Administration (string pageName)
		{
			SecurityLevel securityLevel = new SecurityLevel();
			securityLevel.Grant = new SecurityLevelGrant[1 + (!string.IsNullOrEmpty(pageName) ? 2 : 0)];
			securityLevel.Grant[0] = new SecurityLevelGrant();
			securityLevel.Grant[0].SetGrant("Administrator", true, true, true, true);
			Roles.Current.Add("Administrator");
			if (!string.IsNullOrEmpty(pageName))
			{
			    securityLevel.Grant[1] = new SecurityLevelGrant();
			    securityLevel.Grant[1].SetGrant(pageName + "RO", true, false, false, false);
			    Roles.Current.Add(pageName + "RO");
			    securityLevel.Grant[2] = new SecurityLevelGrant();
			    securityLevel.Grant[2].SetGrant(pageName + "RW", true, true, true, true);
			    Roles.Current.Add(pageName + "RW");
			}
			return securityLevel;
		}
		public  static SecurityLevel @Restricted (string pageName)
		{
			SecurityLevel securityLevel = new SecurityLevel();
			securityLevel.Grant = new SecurityLevelGrant[2 + (!string.IsNullOrEmpty(pageName) ? 2 : 0)];
			securityLevel.Grant[0] = new SecurityLevelGrant();
			securityLevel.Grant[0].SetGrant("Authorized", true, true, true, true);
			Roles.Current.Add("Authorized");
			securityLevel.Grant[1] = new SecurityLevelGrant();
			securityLevel.Grant[1].SetGrant("Administrator", true, true, true, true);
			Roles.Current.Add("Administrator");
			if (!string.IsNullOrEmpty(pageName))
			{
			    securityLevel.Grant[2] = new SecurityLevelGrant();
			    securityLevel.Grant[2].SetGrant(pageName + "RO", true, false, false, false);
			    Roles.Current.Add(pageName + "RO");
			    securityLevel.Grant[3] = new SecurityLevelGrant();
			    securityLevel.Grant[3].SetGrant(pageName + "RW", true, true, true, true);
			    Roles.Current.Add(pageName + "RW");
			}
			return securityLevel;
		}
		public  static SecurityLevel @Public (string pageName)
		{
			SecurityLevel securityLevel = new SecurityLevel();
			securityLevel.Grant = new SecurityLevelGrant[1 + (!string.IsNullOrEmpty(pageName) ? 2 : 0)];
			securityLevel.Grant[0] = new SecurityLevelGrant();
			securityLevel.Grant[0].SetGrant("*", true, true, true, true);
			Roles.Current.Add("*");
			if (!string.IsNullOrEmpty(pageName))
			{
			    securityLevel.Grant[1] = new SecurityLevelGrant();
			    securityLevel.Grant[1].SetGrant(pageName + "RO", true, false, false, false);
			    Roles.Current.Add(pageName + "RO");
			    securityLevel.Grant[2] = new SecurityLevelGrant();
			    securityLevel.Grant[2].SetGrant(pageName + "RW", true, true, true, true);
			    Roles.Current.Add(pageName + "RW");
			}
			return securityLevel;
		}
	}
	public class Modules
	{
		#region SubClasses
		#endregion
		public Modules ()
		{
		}
		public  static Module GetModule (string modulesNames)
		{
			if (!string.IsNullOrEmpty(modulesNames))
			{
			    Module fModule = new Module();
			    string[] ModulesNames = modulesNames.Split(',');
			    fModule.ModulesNames = new ModuleName[ModulesNames.Length];
			    for (int i = 0; i < ModulesNames.Length; i++)
			    {
			        fModule.ModulesNames[i] = GetModuleName(ModulesNames[i]);
			    }
			    return fModule;
			}
			else
			{
			    return null;
			}
		}
		public  static ModuleName GetModuleName (string moduleName)
		{
			switch (moduleName)
			{
			    default: return null;
			}
		}
		public  static ModulesArray GetModulesArray (string[] modules)
		{
			if (modules != null && modules.Length > 0)
			{
			    ModulesArray fModules = new ModulesArray();
			    fModules.Modules = new Module[modules.Length];
			    for (int i = 0; i < modules.Length; i++)
			    {
			        fModules.Modules[i] = GetModule(modules[i]);
			    }
			    return fModules;
			}
			else
			{
			    return null;
			}
		}
	}
}
