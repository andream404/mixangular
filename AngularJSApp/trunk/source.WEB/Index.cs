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
	public class IndexPage:BasePage
	{
		#region SubClasses
		#endregion
		public IndexPage ():base()
		{
		}
		public   IndexPersistenceVar PersistentVar
		{
		    get
		    {
		        IndexPersistenceVar result =IndexPage.PersistentVarStatic;
		        return result;
		    }
		}
		public static  IndexPersistenceVar PersistentVarStatic
		{
		    get
		    {
		        if (SessionHelper.GetValue<IndexPersistenceVar>("Index.PersistenceVar") != null) return SessionHelper.GetValue<IndexPersistenceVar>("Index.PersistenceVar");
		        else return new IndexPersistenceVar();
		    }
		}
		public static  SecurityLevel PageSecurityLevel
		{
		    get
		    {
		        return SecurityLevels.@Restricted("Index");
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
			return new BSNIndexPage(this);
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
	public class IndexPersistenceVar
	{
		#region SubClasses
		#endregion
		public IndexPersistenceVar ()
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
			SessionHelper.PushValue("Index.PersistenceVar", this);
		}
		private DataRow _oldCurrentRowSaveAndNew;
		private bool _isSaveAndNewAction;
	}
}
