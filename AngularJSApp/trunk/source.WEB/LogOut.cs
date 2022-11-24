using IdeaPortal2.Common.Classes;
using IT4.Common.DB;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using IT4.Web.UI.Page;
using IT4.Common.Data;
using IT4.Common.Security;
using Newtonsoft.Json.Linq;
using IT4.Web.Common;
namespace AngularJSApp.Pages
{
	public class LogOutPage:BasePage
	{
		#region SubClasses
		#endregion
		public LogOutPage ():base()
		{
		}
		public   LogOutPersistenceVar PersistentVar
		{
		    get
		    {
		        LogOutPersistenceVar result =LogOutPage.PersistentVarStatic;
		        return result;
		    }
		}
		public static  LogOutPersistenceVar PersistentVarStatic
		{
		    get
		    {
		        if (SessionHelper.GetValue<LogOutPersistenceVar>("LogOut.PersistenceVar") != null) return SessionHelper.GetValue<LogOutPersistenceVar>("LogOut.PersistenceVar");
		        else return new LogOutPersistenceVar();
		    }
		}
		public static  SecurityLevel PageSecurityLevel
		{
		    get
		    {
		        return SecurityLevels.@Restricted("LogOut");
		    }
		}
		public static  ModulesArray PageModules
		{
		    get
		    {
		        return null;
		    }
		}
		public RunTimeComponent PageRTI;
		protected  override void InitializeComponent30 ()
		{
			PageRTI.SetLevel(ApplicationPrivateSession.Current.UserInfo);
		}
		protected  override void InitializeComponent10 ()
		{
		}
		protected  override BusinessPage CreateNewBusinessPage ()
		{
			return new BSNLogOutPage(this);
		}
		protected  override void InitializeComponent20 ()
		{
			PageRTI = new RunTimeComponent(null);
			PageRTI.SecurityLevel = PageSecurityLevel;
			PageRTI.ModulesArray = PageModules;
		}
		private List<Type> showPageParamsAllowedTypesList=new List<Type>();
	}
	[Serializable]
	public class LogOutPersistenceVar
	{
		#region SubClasses
		#endregion
		public LogOutPersistenceVar ()
		{
			_isSaveAndNewAction = false;
			_oldCurrentRowSaveAndNew = null;
		}
		public   bool IsSaveAndNewAction
		{
		    get
		    {
		        return _isSaveAndNewAction;
		    }
		    set
		    {
		        _isSaveAndNewAction = value;
		        SaveToSession();
		    }
		}
		public   DataRow OldCurrentRowSaveAndNew
		{
		    get
		    {
		        return _oldCurrentRowSaveAndNew;
		    }
		    set
		    {
		        _oldCurrentRowSaveAndNew = value;
		        SaveToSession();
		    }
		}
		public  void ClearSaveAndNewVar ()
		{
			_isSaveAndNewAction = false;
			_oldCurrentRowSaveAndNew = null;
		}
		protected  void SaveToSession ()
		{
			SessionHelper.PushValue("LogOut.PersistenceVar", this);
		}
		private DataRow _oldCurrentRowSaveAndNew;
		private bool _isSaveAndNewAction;
	}
}
