using IT4.Common.Classes;
using IT4.Web.Common;
using IT4.Web.UI;
using IT4.Common.Security;
using IT4.Web.RuntimeObjects;
using IT4.Web.UI.Grid;
using System.Net.Http;
using IdeaPortal2.Common.Data;
using IdeaPortal2.Common.Classes;
using IT4.Common.DB;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using IT4.Web.UI.Page;
using IT4.Common.Data;
using Newtonsoft.Json.Linq;
namespace AngularJSApp.Pages
{
	public class LinguePage:BasePage
	{
		#region SubClasses
		#endregion
		public LinguePage ():base()
		{
		}
		public static  ModulesArray CursorGLingueDESCRIPTIONRTIModules
		{
		    get
		    {
		        return null;
		    }
		}
		public static  ModulesArray CursorGLingueICONRTIModules
		{
		    get
		    {
		        return null;
		    }
		}
		public static  ModulesArray CursorGLingueLANGUAGESHORTNAMESPACERTIModules
		{
		    get
		    {
		        return null;
		    }
		}
		public   RTCell CursorGLingueDESCRIPTIONRTCell
		{
		    get
		    {
		        return GridHelperCursorGLingue.GetCurrentRowRT().GetRTCell("DESCRIPTION", CursorGLingueDESCRIPTIONRTI.SecurityLevel);
		    }
		}
		public static  ModulesArray CursorGLingueIDLANGUAGERTIModules
		{
		    get
		    {
		        return null;
		    }
		}
		public   CursorGLingue CursorGLingue
		{
		    get
		    {
		        return cursorGLingue;
		    }
		    set
		    {
		        cursorGLingue=value;
		    }
		}
		public static  LinguePersistenceVar PersistentVarStatic
		{
		    get
		    {
		        if (SessionHelper.GetValue<LinguePersistenceVar>("Lingue.PersistenceVar") != null) return SessionHelper.GetValue<LinguePersistenceVar>("Lingue.PersistenceVar");
		        else return new LinguePersistenceVar();
		    }
		}
		public   LinguePersistenceVar PersistentVar
		{
		    get
		    {
		        LinguePersistenceVar result =LinguePage.PersistentVarStatic;
		        return result;
		    }
		}
		public static  SecurityLevel PageSecurityLevel
		{
		    get
		    {
		        return SecurityLevels.@Restricted("Lingue");
		    }
		}
		public static  ModulesArray PageModules
		{
		    get
		    {
		        return null;
		    }
		}
		public static  ModulesArray GLingueRTIModules
		{
		    get
		    {
		        return null;
		    }
		}
		public   PageInvokeParams ShowPageParamsGLingue
		{
		    get
		    {
		        if(ApplicationPrivateSession.Current.PageInvokeParams == null ||
		          !showPageParamsAllowedTypesList.Contains(ApplicationPrivateSession.Current.PageInvokeParams.GetType()))
		        {
		            ApplicationPrivateSession.Current.PageInvokeParams = new ShowPageParamsForBrowseGLingue();
		        }
		        return ApplicationPrivateSession.Current.PageInvokeParams;
		    }
		}
		public   RTCell CursorGLingueIDLANGUAGERTCell
		{
		    get
		    {
		        return GridHelperCursorGLingue.GetCurrentRowRT().GetRTCell("IDLANGUAGE", CursorGLingueIDLANGUAGERTI.SecurityLevel);
		    }
		}
		public   RTCell CursorGLingueICONRTCell
		{
		    get
		    {
		        return GridHelperCursorGLingue.GetCurrentRowRT().GetRTCell("ICON", CursorGLingueICONRTI.SecurityLevel);
		    }
		}
		public   RTCell CursorGLingueLANGUAGESHORTNAMESPACERTCell
		{
		    get
		    {
		        return GridHelperCursorGLingue.GetCurrentRowRT().GetRTCell("LANGUAGESHORTNAMESPACE", CursorGLingueLANGUAGESHORTNAMESPACERTI.SecurityLevel);
		    }
		}
		public RunTimeComponent PageRTI;
		public RTColumn CursorGLingueICONRTI;
		public RTColumn CursorGLingueIDLANGUAGERTI;
		public RTColumn CursorGLingueLANGUAGESHORTNAMESPACERTI;
		public RTColumn CursorGLingueDESCRIPTIONRTI;
		public RTGrid GLingueRTI;
		public  void GLingue_ManageFieldOnClick (string commandName, string columnName, ref NavigationResult result)
		{
			if(commandName == "DeleteRow")
			{
			    CursorGLingueDeleteCurrentItem(ref result);
			    return;
			}
		}
		public  void CursorGLingueFieldChanged (string fieldName)
		{
			CursorGLingueItem currentItem = this.CursorGLingueGetCurrentItem();
			BusinessPage.FieldChanged(this.CursorGLingue, fieldName);
			GridHelperCursorGLingue.RegisterCursorChanges();
			CursorGLingueItem currentItemForBSNChanges = this.CursorGLingueGetCurrentItem();
			if (currentItem.IsChangedIDLANGUAGE(currentItemForBSNChanges))
			{
			this.CursorGLingueIDLANGUAGEResetFieldIfNoLongerValid(false);
			}
			if (currentItem.IsChangedLANGUAGESHORTNAMESPACE(currentItemForBSNChanges))
			{
			this.CursorGLingueLANGUAGESHORTNAMESPACEResetFieldIfNoLongerValid(false);
			}
			if (currentItem.IsChangedDESCRIPTION(currentItemForBSNChanges))
			{
			this.CursorGLingueDESCRIPTIONResetFieldIfNoLongerValid(false);
			}
			if (currentItem.IsChangedICON(currentItemForBSNChanges))
			{
			this.CursorGLingueICONResetFieldIfNoLongerValid(false);
			}
		}
		private  object GetColumnsTooltipEntriesCursorGLingue (Dictionary<string, string> tooltipsEntries)
		{
			return new
			{
			IDLANGUAGETooltipsEntry = tooltipsEntries["IDLANGUAGETooltipsEntry"],
			LANGUAGESHORTNAMESPACETooltipsEntry = tooltipsEntries["LANGUAGESHORTNAMESPACETooltipsEntry"],
			DESCRIPTIONTooltipsEntry = tooltipsEntries["DESCRIPTIONTooltipsEntry"],
			ICONTooltipsEntry = tooltipsEntries["ICONTooltipsEntry"],
			};
		}
		public  void GLingueUpdateDataSet (GridDataRequestParamsObj<CursorGLingueItem> gridDataRequestParamsObj)
		{
			BusinessPage.BeforeGridUpdateDataSet(this.CursorGLingue, gridDataRequestParamsObj.Sort, gridDataRequestParamsObj.Filters);
			GridHelperCursorGLingue.UpdateDataSet(gridDataRequestParamsObj.ComponentShowModeEnumValue, gridDataRequestParamsObj.PageIndex, gridDataRequestParamsObj.PageSize, gridDataRequestParamsObj.GetSortClause(CursorGLingue, "IDLANGUAGE DESC"), gridDataRequestParamsObj.GetWhereClause(CursorGLingue, GridHelperCursorGLingue), gridDataRequestParamsObj.GetFromClauseForFilters(CursorGLingue, GridHelperCursorGLingue), BusinessPage.AfterDatasetUpdate, true);
		}
		public  object GetComponentRTIsGLingue ()
		{
			return new
			{
			    ComponentRTI = GLingueRTI,
			    CurrentRowsRTI = GridHelperCursorGLingue.GetCurrentRTRowsList(),
			    GridColumnsRTI = new
			    {
			    CursorGLingueIDLANGUAGERTI
			,
			CursorGLingueLANGUAGESHORTNAMESPACERTI
			,
			CursorGLingueDESCRIPTIONRTI
			,
			CursorGLingueICONRTI
			    }
			};
		}
		public  bool CursorGLingueIDLANGUAGEIsFieldStillValid ()
		{
			return true;
		}
		public  CursorGLingueItem CursorGLingueGetCurrentItem ()
		{
			return (CursorGLingueItem)GridHelperCursorGLingue.GetCurrentItem();
		}
		public  void CursorGLingueSelectRow (int rowIndex)
		{
			GridHelperCursorGLingue.SelectRow(rowIndex);
		}
		public  bool CursorGLingueICONIsFieldStillValid ()
		{
			return true;
		}
		public  void CursorGLingueDESCRIPTIONResetFieldIfNoLongerValid (bool skipCheckCurrentField)
		{
			bool checkDependentFields = true;
			if(!skipCheckCurrentField)
			{
			    if (!CursorGLingueDESCRIPTIONIsFieldStillValid())
			    {
			        CursorGLingueItem currentItem = this.CursorGLingueGetCurrentItem();
			        currentItem.SetDESCRIPTION(null);
			        this.CursorGLingueRegisterCurrentItemClientChanges(currentItem);
			    }
			    else
			    {
			        checkDependentFields = false;
			    }
			}
			if (checkDependentFields)
			{
			}
		}
		private  object GetButtonsPanelEntriesCursorGLingue (Dictionary<string, string> buttonsPanelEntries)
		{
			return new
			{
			ButtonNewEntry = buttonsPanelEntries["ButtonNewEntry"],
			ButtonNewTooltipEntry = buttonsPanelEntries["ButtonNewTooltipEntry"],
			ButtonEditEntry = buttonsPanelEntries["ButtonEditEntry"],
			ButtonEditTooltipEntry = buttonsPanelEntries["ButtonEditTooltipEntry"],
			ButtonSaveEntry = buttonsPanelEntries["ButtonSaveEntry"],
			ButtonSaveTooltipEntry = buttonsPanelEntries["ButtonSaveTooltipEntry"],
			ButtonDeleteEntry = buttonsPanelEntries["ButtonDeleteEntry"],
			ButtonDeleteTooltipEntry = buttonsPanelEntries["ButtonDeleteTooltipEntry"],
			ButtonDeleteConfirmTitle = buttonsPanelEntries["ButtonDeleteConfirmTitle"],
			ButtonDeleteConfirmMessage = buttonsPanelEntries["ButtonDeleteConfirmMessage"],
			ButtonCancelEntry = buttonsPanelEntries["ButtonCancelEntry"],
			ButtonCancelTooltipEntry = buttonsPanelEntries["ButtonCancelTooltipEntry"],
			ButtonDiaryEntry = buttonsPanelEntries["ButtonDiaryEntry"],
			ButtonDiaryTooltipEntry = buttonsPanelEntries["ButtonDiaryTooltipEntry"],
			ButtonSaveAndNewEntry = buttonsPanelEntries["ButtonSaveAndNewEntry"],
			ButtonSaveAndNewTooltipEntry = buttonsPanelEntries["ButtonSaveAndNewTooltipEntry"]
			};
		}
		public  void InitComponentRTIsGLingue ()
		{
			CursorGLingueIDLANGUAGERTI = new RTColumn("IDLANGUAGE", "IDLANGUAGE");
			CursorGLingueIDLANGUAGERTI.GlobalVisible = false;
			CursorGLingueIDLANGUAGERTI.GlobalExportXLS = false;
			CursorGLingueIDLANGUAGERTI.SecurityLevel = SecurityLevels.Restricted("LinguePage");
			CursorGLingueIDLANGUAGERTI.ModulesArray = CursorGLingueIDLANGUAGERTIModules;
			CursorGLingueIDLANGUAGERTI.GlobalReadOnly = false;
			CursorGLingueIDLANGUAGERTI.ImmediateFieldUpdate = false;
			GLingueRTI.AddRTColumn(CursorGLingueIDLANGUAGERTI);
			CursorGLingueIDLANGUAGERTI.ResetFieldIfNoLongerValid = this.CursorGLingueIDLANGUAGEResetFieldIfNoLongerValid;
			CursorGLingueLANGUAGESHORTNAMESPACERTI = new RTColumn("LANGUAGESHORTNAMESPACE", "LANGUAGESHORTNAMESPACE");
			CursorGLingueLANGUAGESHORTNAMESPACERTI.GlobalVisible = true;
			CursorGLingueLANGUAGESHORTNAMESPACERTI.GlobalExportXLS = true;
			CursorGLingueLANGUAGESHORTNAMESPACERTI.SecurityLevel = SecurityLevels.Restricted("LinguePage");
			CursorGLingueLANGUAGESHORTNAMESPACERTI.ModulesArray = CursorGLingueLANGUAGESHORTNAMESPACERTIModules;
			CursorGLingueLANGUAGESHORTNAMESPACERTI.GlobalReadOnly = false;
			CursorGLingueLANGUAGESHORTNAMESPACERTI.ImmediateFieldUpdate = false;
			GLingueRTI.AddRTColumn(CursorGLingueLANGUAGESHORTNAMESPACERTI);
			CursorGLingueLANGUAGESHORTNAMESPACERTI.ResetFieldIfNoLongerValid = this.CursorGLingueLANGUAGESHORTNAMESPACEResetFieldIfNoLongerValid;
			CursorGLingueDESCRIPTIONRTI = new RTColumn("DESCRIPTION", "DESCRIPTION");
			CursorGLingueDESCRIPTIONRTI.GlobalVisible = true;
			CursorGLingueDESCRIPTIONRTI.GlobalExportXLS = true;
			CursorGLingueDESCRIPTIONRTI.SecurityLevel = SecurityLevels.Restricted("LinguePage");
			CursorGLingueDESCRIPTIONRTI.ModulesArray = CursorGLingueDESCRIPTIONRTIModules;
			CursorGLingueDESCRIPTIONRTI.GlobalReadOnly = false;
			CursorGLingueDESCRIPTIONRTI.ImmediateFieldUpdate = false;
			GLingueRTI.AddRTColumn(CursorGLingueDESCRIPTIONRTI);
			CursorGLingueDESCRIPTIONRTI.ResetFieldIfNoLongerValid = this.CursorGLingueDESCRIPTIONResetFieldIfNoLongerValid;
			CursorGLingueICONRTI = new RTColumn("ICON", "ICON");
			CursorGLingueICONRTI.GlobalVisible = true;
			CursorGLingueICONRTI.GlobalExportXLS = true;
			CursorGLingueICONRTI.SecurityLevel = SecurityLevels.Restricted("LinguePage");
			CursorGLingueICONRTI.ModulesArray = CursorGLingueICONRTIModules;
			CursorGLingueICONRTI.GlobalReadOnly = false;
			CursorGLingueICONRTI.ImmediateFieldUpdate = false;
			GLingueRTI.AddRTColumn(CursorGLingueICONRTI);
			CursorGLingueICONRTI.ResetFieldIfNoLongerValid = this.CursorGLingueICONResetFieldIfNoLongerValid;
		}
		public  void CursorGLingueIDLANGUAGEResetFieldIfNoLongerValid (bool skipCheckCurrentField)
		{
			bool checkDependentFields = true;
			if(!skipCheckCurrentField)
			{
			    if (!CursorGLingueIDLANGUAGEIsFieldStillValid())
			    {
			        CursorGLingueItem currentItem = this.CursorGLingueGetCurrentItem();
			        currentItem.SetIDLANGUAGE(null);
			        this.CursorGLingueRegisterCurrentItemClientChanges(currentItem);
			    }
			    else
			    {
			        checkDependentFields = false;
			    }
			}
			if (checkDependentFields)
			{
			}
		}
		public  object CursorGLingueManageRestoreGridDataSourceRequest (GridDataRequestParamsObj<CursorGLingueItem> gridDataRequestParamsObj)
		{
			gridDataRequestParamsObj.PageIndex = 0;
			gridDataRequestParamsObj.PageSize = 20;
			gridDataRequestParamsObj.Sort = null;
			gridDataRequestParamsObj.Filters = CursorGLingueGetDefaultFilters();
			this.GLingueUpdateDataSet(gridDataRequestParamsObj);
			this.CursorGLingueInitCurrentItemsForClient();
			object responseObj = new
			{
			    CurrentRowsRTI = GridHelperCursorGLingue.GetCurrentRTRowsList(),
			    GridSourceData = new
			    {
			        CurrentItemsList = this.CursorGLingue.CurrentItemsList,
			        TotalRowsCount = this.CursorGLingue.TotalRowsCount,
			        AreRowsLimited = this.CursorGLingue.AreRowsLimited
			      },
			      GridDataRequestParamsObj = gridDataRequestParamsObj,
			    FiltersDataSources = this.GetComponentFiltersDataSourcesCursorGLingue(gridDataRequestParamsObj)
			};
			return responseObj;
		}
		public  NavigationResult GLingueCancel ()
		{
			NavigationResult result = new KamNavigationResult();
			result = ShowPageForBrowseGLingue(CursorGLingue.idlanguage);
			BusinessPage.AfterRowCancel(CursorGLingue, ref result);
			PersistentVar.ClearSaveAndNewVar();
			return result;
		}
		public  void CursorGLinguePerformDelete (ref NavigationResult result)
		{
			result = ShowPageForBrowseGLingue(CursorGLingue.idlanguage);
			GridHelperCursorGLingue.DeleteCurrentRow(BusinessPage.AfterRowDelete, ref result);
		}
		private  string GetCursorGLingueLANGUAGESHORTNAMESPACEFilter01Suggestion ()
		{
			string suggestion = "";
			return suggestion;
		}
		public  KamNavigationResult GLingue_ItemCommand (int rowIndex, string columnName, string commandName)
		{
			NavigationResult result = new KamNavigationResult()
			{
			    ActionResult = NavigationActionResults.UpdateComponent,
			    CursorName = "CursorGLingue"
			};
			bool commandContinue = true;
			BusinessPage.BeforeCommand("GLingue", commandName, rowIndex, columnName, ref commandContinue, ref result);
			if (commandContinue)
			{
			    this.CursorGLingueSelectRow(rowIndex);
			this.GLingue_ManageFieldOnClick(commandName, columnName, ref result);
			BusinessPage.AfterCommand("GLingue", commandName, columnName, ref result);
			}
			return (KamNavigationResult)result;
		}
		private  string GetCursorGLingueIDLANGUAGEFilter01Suggestion ()
		{
			string suggestion = "";
			return suggestion;
		}
		public  void RegisterClientChangesCursorGLingue (List<CursorGLingueItem> clientItemList)
		{
			GridHelperCursorGLingue.RegisterClientChanges(clientItemList.Cast<AbstractItem>().ToList());
		}
		public  void CursorGLingueRegisterComponentRTIsClientChanges (JObject componentRTIs)
		{
			RTGrid clientRTComponent = componentRTIs.GetValue("ComponentRTI").ToObject<RTGrid>();
			this.GLingueRTI.GlobalCanDelete = clientRTComponent.GlobalCanDelete;
			this.GLingueRTI.GlobalCanEdit = clientRTComponent.GlobalCanEdit;
			this.GLingueRTI.GlobalCanInsert = clientRTComponent.GlobalCanInsert;
			this.GLingueRTI.GlobalCanRead = clientRTComponent.GlobalCanRead;
			this.GLingueRTI.GlobalReadOnly = clientRTComponent.GlobalReadOnly;
			this.GLingueRTI.GlobalVisible = clientRTComponent.GlobalVisible;
			this.GLingueRTI.AllowSaveAndNew = clientRTComponent.AllowSaveAndNew;
			RTColumn clientRTColumn = null;
			JObject clientGridColumnsRTI = componentRTIs.GetValue("GridColumnsRTI").ToObject<JObject>();
			clientRTColumn = clientGridColumnsRTI.GetValue("CursorGLingueIDLANGUAGERTI").ToObject<RTColumn>();
			this.CursorGLingueIDLANGUAGERTI.GlobalCanDelete = clientRTColumn.GlobalCanDelete;
			this.CursorGLingueIDLANGUAGERTI.GlobalCanEdit = clientRTColumn.GlobalCanEdit;
			this.CursorGLingueIDLANGUAGERTI.GlobalCanInsert = clientRTColumn.GlobalCanInsert;
			this.CursorGLingueIDLANGUAGERTI.GlobalCanRead = clientRTColumn.GlobalCanRead;
			this.CursorGLingueIDLANGUAGERTI.GlobalReadOnly = clientRTColumn.GlobalReadOnly;
			this.CursorGLingueIDLANGUAGERTI.GlobalVisible = clientRTColumn.GlobalVisible;
			clientRTColumn = clientGridColumnsRTI.GetValue("CursorGLingueLANGUAGESHORTNAMESPACERTI").ToObject<RTColumn>();
			this.CursorGLingueLANGUAGESHORTNAMESPACERTI.GlobalCanDelete = clientRTColumn.GlobalCanDelete;
			this.CursorGLingueLANGUAGESHORTNAMESPACERTI.GlobalCanEdit = clientRTColumn.GlobalCanEdit;
			this.CursorGLingueLANGUAGESHORTNAMESPACERTI.GlobalCanInsert = clientRTColumn.GlobalCanInsert;
			this.CursorGLingueLANGUAGESHORTNAMESPACERTI.GlobalCanRead = clientRTColumn.GlobalCanRead;
			this.CursorGLingueLANGUAGESHORTNAMESPACERTI.GlobalReadOnly = clientRTColumn.GlobalReadOnly;
			this.CursorGLingueLANGUAGESHORTNAMESPACERTI.GlobalVisible = clientRTColumn.GlobalVisible;
			clientRTColumn = clientGridColumnsRTI.GetValue("CursorGLingueDESCRIPTIONRTI").ToObject<RTColumn>();
			this.CursorGLingueDESCRIPTIONRTI.GlobalCanDelete = clientRTColumn.GlobalCanDelete;
			this.CursorGLingueDESCRIPTIONRTI.GlobalCanEdit = clientRTColumn.GlobalCanEdit;
			this.CursorGLingueDESCRIPTIONRTI.GlobalCanInsert = clientRTColumn.GlobalCanInsert;
			this.CursorGLingueDESCRIPTIONRTI.GlobalCanRead = clientRTColumn.GlobalCanRead;
			this.CursorGLingueDESCRIPTIONRTI.GlobalReadOnly = clientRTColumn.GlobalReadOnly;
			this.CursorGLingueDESCRIPTIONRTI.GlobalVisible = clientRTColumn.GlobalVisible;
			clientRTColumn = clientGridColumnsRTI.GetValue("CursorGLingueICONRTI").ToObject<RTColumn>();
			this.CursorGLingueICONRTI.GlobalCanDelete = clientRTColumn.GlobalCanDelete;
			this.CursorGLingueICONRTI.GlobalCanEdit = clientRTColumn.GlobalCanEdit;
			this.CursorGLingueICONRTI.GlobalCanInsert = clientRTColumn.GlobalCanInsert;
			this.CursorGLingueICONRTI.GlobalCanRead = clientRTColumn.GlobalCanRead;
			this.CursorGLingueICONRTI.GlobalReadOnly = clientRTColumn.GlobalReadOnly;
			this.CursorGLingueICONRTI.GlobalVisible = clientRTColumn.GlobalVisible;
		}
		public  static KamNavigationResult ShowPageForBrowseGLingue (Int32? idlanguage)
		{
			ShowPageParamsForBrowseGLingue.InitShowPageParams(idlanguage);
			return new KamNavigationResult() { ActionResult = NavigationActionResults.GoToPageForBrowse, PageUrl = "#Lingue", CursorName = "CursorGLingue" };
		}
		protected  override BusinessPage CreateNewBusinessPage ()
		{
			return new BSNLinguePage(this);
		}
		public  object CursorGLingueManageGetRequest (GridDataRequestParamsObj<CursorGLingueItem> gridDataRequestParamsObj, PersistentGridDataResponseParamsObj persistentGridDataResponseParamsObj)
		{
			gridDataRequestParamsObj.Filters = this.CursorGLingueGetDefaultFilters();
			bool hasDefaultFilters = gridDataRequestParamsObj.Filters != null && gridDataRequestParamsObj.Filters.Length != 0;
			if(persistentGridDataResponseParamsObj != null)
			{
			    gridDataRequestParamsObj.SetPersistentData(persistentGridDataResponseParamsObj.GridDataResponseParamsObj);
			}
			this.GLingueUpdateDataSet(gridDataRequestParamsObj);
			if (gridDataRequestParamsObj.ComponentShowModeEnumValue == ComponentShowMode.insert)
			{
			    this.GLingueInsertNew();
			}
			BusinessPage.ComponentPreRender(CursorGLingue);
			this.GridRowsPreRenderCursorGLingue();
			this.CursorGLingueInitCurrentItemsForClient();
			object responseObj = new
			{
			    ComponentRTIs = this.GetComponentRTIsGLingue(),
			    ComponentEntries = this.GetComponentEntriesCursorGLingue(),
			    HasDefaultFilters = hasDefaultFilters,
			    GridSourceData = new
			    {
			        CurrentItemsList = this.CursorGLingue.CurrentItemsList,
			        TotalRowsCount = this.CursorGLingue.TotalRowsCount,
			        AreRowsLimited = this.CursorGLingue.AreRowsLimited
			    },
			    FiltersDataSources = this.GetComponentFiltersDataSourcesCursorGLingue(gridDataRequestParamsObj),
			    FieldsData = new
			    {
			    },
			    GridDataRequestParamsObj = gridDataRequestParamsObj
			};
			return responseObj;
		}
		protected  override void InitializeComponent20 ()
		{
			PageRTI = new RunTimeComponent(null);
			PageRTI.SecurityLevel = PageSecurityLevel;
			PageRTI.ModulesArray = PageModules;
			GLingueRTI = new RTGrid(PageRTI);
			GLingueRTI.SecurityLevel = SecurityLevels.Restricted("LinguePage");
			GLingueRTI.ModulesArray = GLingueRTIModules;
			GLingueRTI.AllowSaveAndNew = false;
			InitComponentRTIsGLingue();
		}
		public  object CursorGLingueManageGetGridDataSourceRequest (GridDataRequestParamsObj<CursorGLingueItem> gridDataRequestParamsObj, PersistentGridDataResponseParamsObj persistentGridDataResponseParamsObj)
		{
			if(gridDataRequestParamsObj.ComponentShowModeEnumValue == ComponentShowMode.edit ||
			gridDataRequestParamsObj.ComponentShowModeEnumValue == ComponentShowMode.insert)
			{
			this.RegisterClientChangesCursorGLingue(gridDataRequestParamsObj.CurrentItemsList);
			}
			if (persistentGridDataResponseParamsObj != null && gridDataRequestParamsObj.AreFiltersDifferent(persistentGridDataResponseParamsObj.GridDataResponseParamsObj.Filters, GridHelperCursorGLingue))
			{
			gridDataRequestParamsObj.PageIndex = 0;
			}
			this.GLingueUpdateDataSet(gridDataRequestParamsObj);
			this.GridRowsPreRenderCursorGLingue();
			this.CursorGLingueInitCurrentItemsForClient();
			object responseObj = new
			{
			CurrentRowsRTI = GridHelperCursorGLingue.GetCurrentRTRowsList(),
			PageIndex = gridDataRequestParamsObj.PageIndex,
			GridSourceData = new
			{
			   CurrentItemsList = CursorGLingue.CurrentItemsList,
			   TotalRowsCount = CursorGLingue.TotalRowsCount,
			   AreRowsLimited = CursorGLingue.AreRowsLimited
			}
			};
			return responseObj;
		}
		private  string GetCursorGLingueDESCRIPTIONFilter01Suggestion ()
		{
			string suggestion = "";
			return suggestion;
		}
		public  bool CursorGLingueDESCRIPTIONIsFieldStillValid ()
		{
			return true;
		}
		private  string GetCursorGLingueICONFilter01Suggestion ()
		{
			string suggestion = "";
			return suggestion;
		}
		public  void CursorGLinguePerformAfterInsert (ref NavigationResult result)
		{
			result = ShowPageForBrowseGLingue(CursorGLingue.idlanguage);
			GridHelperCursorGLingue.PerformAfterAction(BusinessPage.AfterRowInsert, ref result);
		}
		public  static KamNavigationResult ShowPageForInsertGLingue ()
		{
			ShowPageParamsForInsertGLingue.InitShowPageParams();
			return new KamNavigationResult() { ActionResult = NavigationActionResults.GoToPageForInsert, PageUrl = "#Lingue", CursorName = "CursorGLingue" };
		}
		public  void CursorGLingueDeleteCurrentItem (ref NavigationResult result)
		{
			bool cancel = false;
			BusinessPage.BeforeRowDelete(CursorGLingue, ref cancel, ref result);
			if (!cancel)
			{
			    this.CursorGLinguePerformDelete(ref result);
			}
		}
		public  void CursorGLingueSetUpdateCommand (IDbCommandEx Command)
		{
			Command.CommandText = "UPDATE V_LANGUAGES SET IDLANGUAGE = @IDLANGUAGE,LANGUAGESHORTNAMESPACE = @LANGUAGESHORTNAMESPACE,DESCRIPTION = @DESCRIPTION,ICON = @ICON WHERE idlanguage = @idlanguage";
			Command.Parameters.Add(DBUtils.NewParameter("@IDLANGUAGE", typeof(Int32)));
			Command.Parameters.Add(DBUtils.NewParameter("@LANGUAGESHORTNAMESPACE", typeof(String)));
			Command.Parameters.Add(DBUtils.NewParameter("@DESCRIPTION", typeof(String)));
			Command.Parameters.Add(DBUtils.NewParameter("@ICON", typeof(String)));
		}
		public  void CursorGLinguePerformAfterEdit (ref NavigationResult result)
		{
			result = ShowPageForBrowseGLingue(CursorGLingue.idlanguage);
			GridHelperCursorGLingue.PerformAfterAction(BusinessPage.AfterRowUpdate, ref result);
		}
		public  void GridRowsPreRenderCursorGLingue ()
		{
			int currentRowIndex = CursorGLingue.CurrentRowIndex;
			for(int i = 0; i < CursorGLingue.CurrentItemsList.Count; i++)
			{
			    AbstractItem abstractItem = CursorGLingue.CurrentItemsList[i];
			    CursorGLingueSelectRow(abstractItem.ItemSort);
			    BusinessPage.RowPreRender(CursorGLingue);
			}
			CursorGLingueSelectRow(currentRowIndex);
		}
		public  object GetComponentEntriesCursorGLingue ()
		{
			Dictionary<string, string> columnsEntries = new Dictionary<string, string>();
			columnsEntries.Add("CursorGLingueIDLANGUAGEColumnsEntry", ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry("idlanguage"));
			columnsEntries.Add("CursorGLingueLANGUAGESHORTNAMESPACEColumnsEntry", ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry("languageshortnamespace"));
			columnsEntries.Add("CursorGLingueDESCRIPTIONColumnsEntry", ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry("description"));
			columnsEntries.Add("CursorGLingueICONColumnsEntry", ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry("icon"));
			Dictionary<string, string> tooltipsEntries = new Dictionary<string, string>();
			tooltipsEntries.Add("IDLANGUAGETooltipsEntry", ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry(""));
			tooltipsEntries.Add("LANGUAGESHORTNAMESPACETooltipsEntry", ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry(""));
			tooltipsEntries.Add("DESCRIPTIONTooltipsEntry", ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry(""));
			tooltipsEntries.Add("ICONTooltipsEntry", ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry(""));
			Dictionary<string, string> buttonsPanelEntries = new Dictionary<string, string>();
			buttonsPanelEntries.Add("ButtonNewEntry", ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry("Nuovo"));
			buttonsPanelEntries.Add("ButtonNewTooltipEntry", ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry(""));
			buttonsPanelEntries.Add("ButtonEditEntry", ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry("Modifica"));
			buttonsPanelEntries.Add("ButtonEditTooltipEntry", ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry(""));
			buttonsPanelEntries.Add("ButtonSaveEntry", ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry("Salva"));
			buttonsPanelEntries.Add("ButtonSaveTooltipEntry", ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry(""));
			buttonsPanelEntries.Add("ButtonDeleteEntry", ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry("Elimina"));
			buttonsPanelEntries.Add("ButtonDeleteTooltipEntry", ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry(""));
			buttonsPanelEntries.Add("ButtonDeleteConfirmTitle", ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry("Attenzione"));
			buttonsPanelEntries.Add("ButtonDeleteConfirmMessage", ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry("Eliminare il record corrente?"));
			buttonsPanelEntries.Add("ButtonCancelEntry", ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry("Annulla"));
			buttonsPanelEntries.Add("ButtonCancelTooltipEntry", ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry(""));
			buttonsPanelEntries.Add("ButtonDiaryEntry", ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry("Diario"));
			buttonsPanelEntries.Add("ButtonDiaryTooltipEntry", ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry(""));
			buttonsPanelEntries.Add("ButtonSaveAndNewEntry", ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry("Salva e Nuovo"));
			buttonsPanelEntries.Add("ButtonSaveAndNewTooltipEntry", ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry(""));
			return new
			{
			    ComponentTitleEntry = ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry(""),
			    ColumnsHeaderEntries = GetColumnsHeaderEntriesCursorGLingue(columnsEntries),
			    ColumnsGroupsEntries = GetColumnsGroupsEntriesCursorGLingue(),
			    GridColumnsValidatorsEntries = GetGridColumnsValidatorsEntriesCursorGLingue(columnsEntries),
			    FiltersEntries = GetFiltersEntriesMethodNameCursorGLingue(),
			    FiltersSuggestions =  GetFiltersSuggestionsCursorGLingue(),
			    ColumnsTooltipsEntries = GetColumnsTooltipEntriesCursorGLingue(tooltipsEntries),
			    ButtonsPanelEntries = GetButtonsPanelEntriesCursorGLingue(buttonsPanelEntries)
			};
		}
		public  void CursorGLingueResetFieldIfNoLongerValid (string fieldName)
		{
			GLingueRTI.GetRTColumn(fieldName).ResetFieldIfNoLongerValid(true);
		}
		private  object GetGridColumnsValidatorsEntriesCursorGLingue (Dictionary<string, string> columnsEntries)
		{
			return new
			{
			IDLANGUAGETextSizeWebGridDataColumnValidatorEntry = ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry("Il testo digitato supera la dimensione massima del campo:", new { FieldName = columnsEntries["CursorGLingueIDLANGUAGEColumnsEntry"].Trim() }) + " 10"
			,
			LANGUAGESHORTNAMESPACETextSizeWebGridDataColumnValidatorEntry = ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry("Il testo digitato supera la dimensione massima del campo:", new { FieldName = columnsEntries["CursorGLingueLANGUAGESHORTNAMESPACEColumnsEntry"].Trim() }) + " 15"
			,
			DESCRIPTIONTextSizeWebGridDataColumnValidatorEntry = ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry("Il testo digitato supera la dimensione massima del campo:", new { FieldName = columnsEntries["CursorGLingueDESCRIPTIONColumnsEntry"].Trim() }) + " 100"
			,
			ICONTextSizeWebGridDataColumnValidatorEntry = ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry("Il testo digitato supera la dimensione massima del campo:", new { FieldName = columnsEntries["CursorGLingueICONColumnsEntry"].Trim() }) + " 100"
			};
		}
		private  object GetColumnsHeaderEntriesCursorGLingue (Dictionary<string, string> columnsEntries)
		{
			return new
			{
			IDLANGUAGEColumnEntry = columnsEntries["CursorGLingueIDLANGUAGEColumnsEntry"]
			,
			LANGUAGESHORTNAMESPACEColumnEntry = columnsEntries["CursorGLingueLANGUAGESHORTNAMESPACEColumnsEntry"]
			,
			DESCRIPTIONColumnEntry = columnsEntries["CursorGLingueDESCRIPTIONColumnsEntry"]
			,
			ICONColumnEntry = columnsEntries["CursorGLingueICONColumnsEntry"]
			};
		}
		public  FiltersInformation[] CursorGLingueGetDefaultFilters ()
		{
			List<FiltersInformation> gridDataResponseParamsFilterObjList = new List<FiltersInformation>();
			return gridDataResponseParamsFilterObjList.ToArray();
		}
		public  void InitXlsHttpResponseMessageCursorGLingue (HttpResponseMessage httpResponseMessage)
		{
			ExportColumns Columns=new ExportColumns();
			if (CursorGLingueIDLANGUAGERTI.CanRead && CursorGLingueIDLANGUAGERTI.GlobalExportXLS) Columns.Add("IDLANGUAGE",new ExportColumn("IDLANGUAGE", ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry("idlanguage"), string.Empty));
			if (CursorGLingueLANGUAGESHORTNAMESPACERTI.CanRead && CursorGLingueLANGUAGESHORTNAMESPACERTI.GlobalExportXLS) Columns.Add("LANGUAGESHORTNAMESPACE",new ExportColumn("LANGUAGESHORTNAMESPACE", ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry("languageshortnamespace"), string.Empty));
			if (CursorGLingueDESCRIPTIONRTI.CanRead && CursorGLingueDESCRIPTIONRTI.GlobalExportXLS) Columns.Add("DESCRIPTION",new ExportColumn("DESCRIPTION", ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry("description"), string.Empty));
			if (CursorGLingueICONRTI.CanRead && CursorGLingueICONRTI.GlobalExportXLS) Columns.Add("ICON",new ExportColumn("ICON", ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry("icon"), string.Empty));
			CursorGLingue.InitExcelHttpResponseMessage(httpResponseMessage, Columns);
		}
		public  void CursorGLingueRegisterCurrentItemClientChanges (CursorGLingueItem item)
		{
			GridHelperCursorGLingue.RegisterClientChanges(item);
			CursorGLingueSelectRowByItem(item);
		}
		public  object CursorGLingueGetFieldChangedResponseObj ()
		{
			CursorGLingueItem currentItem = this.CursorGLingueGetCurrentItem();
			CursorGLingueInitItemForClient(currentItem);
			return new
			{
			    ComponentRTIs = this.GetComponentRTIsGLingue(),
			    CurrentItem = currentItem
			};
		}
		public  void CursorGLingueSelectRowByItem (AbstractItem item)
		{
			GridHelperCursorGLingue.SelectRow(item);
		}
		public  bool CursorGLingueLANGUAGESHORTNAMESPACEIsFieldStillValid ()
		{
			return true;
		}
		public  void GLingueInitFilterFieldMapping ()
		{
			GridHelperCursorGLingue.RegisterFilterFieldMapping("CursorGLingueIDLANGUAGEFilter01", "idlanguage", "text", "FilterGLingueIDLANGUAGE");
			GridHelperCursorGLingue.RegisterFilterFieldMapping("CursorGLingueLANGUAGESHORTNAMESPACEFilter01", "languageshortnamespace", "text", "FilterGLingueLANGUAGESHORTNAMESPACE");
			GridHelperCursorGLingue.RegisterFilterFieldMapping("CursorGLingueDESCRIPTIONFilter01", "description", "text", "FilterGLingueDESCRIPTION");
			GridHelperCursorGLingue.RegisterFilterFieldMapping("CursorGLingueICONFilter01", "icon", "text", "FilterGLingueICON");
		}
		public  void CursorGLingueInitItemForClient (CursorGLingueItem currentItem)
		{
			currentItem.FieldsData = new
			{
			};
		}
		public  void CursorGLingueSetSelectCommand (IDbCommandEx Command)
		{
			object fTSFilterFromClause = new
			{
			};
			Command.CommandText=IT4.Common.Classes.IdeaString.ParseTemplate("SELECT IDLANGUAGE," +
			"                                LANGUAGESHORTNAMESPACE," +
			"                                DESCRIPTION," +
			"                                ICON" +
			"                            FROM V_LANGUAGES", "GlobalPublic;GlobalPrivate;UserProperties;CursorGLingue;ShowPageParams;FTSFilterFromClause;PersistentVar", new object [] {ApplicationPublicSession.Current, ApplicationPrivateSession.Current, ApplicationPrivateSession.Current.UserInfo, CursorGLingue, ShowPageParamsGLingue, fTSFilterFromClause, PersistentVar});
		}
		public  static KamNavigationResult ShowPageForEditGLingue (Int32? idlanguage)
		{
			ShowPageParamsForEditGLingue.InitShowPageParams(idlanguage);
			return new KamNavigationResult() { ActionResult = NavigationActionResults.GoToPageForEdit, PageUrl = "#Lingue", CursorName = "CursorGLingue" };
		}
		public  void CursorGLingueInitCurrentItemsForClient ()
		{
			int currentRowIndex = CursorGLingue.CurrentRowIndex;
			for (int i = 0; i < CursorGLingue.CurrentItemsList.Count; i++)
			{
			    AbstractItem abstractItem = CursorGLingue.CurrentItemsList[i];
			    CursorGLingueSelectRow(abstractItem.ItemSort);
			    CursorGLingueInitItemForClient((CursorGLingueItem)abstractItem);
			}
			CursorGLingueSelectRow(currentRowIndex);
		}
		private  object GetFiltersSuggestionsCursorGLingue ()
		{
			return new
			{
			CursorGLingueIDLANGUAGEFilter01 = this.GetCursorGLingueIDLANGUAGEFilter01Suggestion()
			,
			CursorGLingueLANGUAGESHORTNAMESPACEFilter01 = this.GetCursorGLingueLANGUAGESHORTNAMESPACEFilter01Suggestion()
			,
			CursorGLingueDESCRIPTIONFilter01 = this.GetCursorGLingueDESCRIPTIONFilter01Suggestion()
			,
			CursorGLingueICONFilter01 = this.GetCursorGLingueICONFilter01Suggestion()
			};
		}
		protected  override void InitializeComponent10 ()
		{
			showPageParamsAllowedTypesList.Add(typeof(ShowPageParamsForBrowseGLingue));
			showPageParamsAllowedTypesList.Add(typeof(ShowPageParamsForEditGLingue));
			showPageParamsAllowedTypesList.Add(typeof(ShowPageParamsForInsertGLingue));
			IDbDataAdapter DataAdapterGLingue = DBUtils.NewDataAdapter();
			IDbCommandEx CommandGLingueSelect = DBUtils.NewCommand(string.Empty);
			DataAdapterGLingue.SelectCommand = CommandGLingueSelect;
			CursorGLingueSetSelectCommand(CommandGLingueSelect);
			IDbCommandEx CommandGLingueUpdate = DBUtils.NewCommand(string.Empty);
			DataAdapterGLingue.UpdateCommand = CommandGLingueUpdate;
			CursorGLingueSetUpdateCommand(CommandGLingueUpdate);
			IDbCommandEx CommandGLingueInsert = DBUtils.NewCommand(string.Empty);
			DataAdapterGLingue.InsertCommand = CommandGLingueInsert;
			CursorGLingueSetInsertCommand(CommandGLingueInsert);
			CursorGLingue = new CursorGLingue(null, new DataSet(), "GLingue");
			CursorGLingue.DataAdapter = (DbDataAdapter)DataAdapterGLingue;
		}
		public  NavigationResult PostEditedItemsCursorGLingue (bool isSaveAndNewAction = false)
		{
			NavigationResult result = new KamNavigationResult();
			CursorGLingue.IsSaveAndNewAction = isSaveAndNewAction;
			bool cancel = false;
			switch(GridHelperCursorGLingue.ComponentShowMode)
			{
			    case ComponentShowMode.edit:
			        GridHelperCursorGLingue.UpdateEditedItems(BusinessPage.BeforeRowUpdate, ref cancel, ref result);
			        break;
			    case ComponentShowMode.insert:
			        GridHelperCursorGLingue.UpdateEditedItems(BusinessPage.BeforeRowInsert, ref cancel, ref result);
			        break;
			    default:
			        throw new NotImplementedException();
			}
			if (!cancel)
			{
			    GridHelperCursorGLingue.PostChanges();
			    if (isSaveAndNewAction)
			    {
			        PersistentVar.IsSaveAndNewAction = isSaveAndNewAction;
			        PersistentVar.OldCurrentRowSaveAndNew = CursorGLingue.CurrentRow;
			    }
			    switch (GridHelperCursorGLingue.ComponentShowMode)
			    {
			        case ComponentShowMode.edit:
			            this.CursorGLinguePerformAfterEdit(ref result);
			            break;
			           case ComponentShowMode.insert:
			            this.CursorGLinguePerformAfterInsert(ref result);
			            break;
			        default:
			            throw new NotImplementedException();
			    }
			}
			return result;
		}
		public  void CursorGLingueSetInsertCommand (IDbCommandEx Command)
		{
			Command.CommandText = "INSERT INTO V_LANGUAGES (idlanguage, LANGUAGESHORTNAMESPACE,DESCRIPTION,ICON) VALUES (@idlanguage, @LANGUAGESHORTNAMESPACE,@DESCRIPTION,@ICON)";
			Command.Parameters.Add(DBUtils.NewParameter("@IDLANGUAGE", typeof(Int32)));
			Command.Parameters.Add(DBUtils.NewParameter("@LANGUAGESHORTNAMESPACE", typeof(String)));
			Command.Parameters.Add(DBUtils.NewParameter("@DESCRIPTION", typeof(String)));
			Command.Parameters.Add(DBUtils.NewParameter("@ICON", typeof(String)));
		}
		protected  override void InitializeComponent30 ()
		{
			PageRTI.SetLevel(ApplicationPrivateSession.Current.UserInfo);
			CursorGLingue.InitKamColumnsList(GetKamGLingueColumnsList());
			GridHelperCursorGLingue = new GridHelper(CursorGLingue, this, GLingueRTI);
			GridHelperCursorGLingue.GetNewRuntimeParsingValueCollectionMethod = CursorGLingueFromClauseRuntimeParsingValueCollection.GetNewRuntimeParsingValueCollection;
			GLingueInitFilterFieldMapping();
		}
		public  void GLingueInsertNew ()
		{
			GridHelperCursorGLingue.InsertNewRow(this.CursorGLingueSetDefaultValues);
		}
		public  object CursorGLingueGetItemDependentFieldsUpdatedResponseObj ()
		{
			CursorGLingueItem currentItem = this.CursorGLingueGetCurrentItem();
			CursorGLingueInitItemForClient(currentItem);
			return currentItem;
		}
		private  object GetColumnsGroupsEntriesCursorGLingue ()
		{
			return new
			{
			};
		}
		public  void CursorGLingueSetDefaultValues ()
		{
			CursorGLingue.CurrentRow["idlanguage"] = DBUtils.Gen_id("GEN_CORE$LANGUAGES_ID");
			BusinessPage.SetDefaultValues(CursorGLingue);
			PersistentVar.ClearSaveAndNewVar();
		}
		private  List<KamColumn> GetKamGLingueColumnsList ()
		{
			List<KamColumn> kamColumnsList = new List<KamColumn>();
			kamColumnsList.Add(new KamColumn() { FieldName = "IDLANGUAGE", DBColumnName = @"idlanguage", FieldTypeName = "Text" });
			kamColumnsList.Add(new KamColumn() { FieldName = "LANGUAGESHORTNAMESPACE", DBColumnName = @"languageshortnamespace", FieldTypeName = "Text" });
			kamColumnsList.Add(new KamColumn() { FieldName = "DESCRIPTION", DBColumnName = @"description", FieldTypeName = "Text" });
			kamColumnsList.Add(new KamColumn() { FieldName = "ICON", DBColumnName = @"icon", FieldTypeName = "Text" });
			return kamColumnsList;
		}
		public  void CursorGLingueLANGUAGESHORTNAMESPACEResetFieldIfNoLongerValid (bool skipCheckCurrentField)
		{
			bool checkDependentFields = true;
			if(!skipCheckCurrentField)
			{
			    if (!CursorGLingueLANGUAGESHORTNAMESPACEIsFieldStillValid())
			    {
			        CursorGLingueItem currentItem = this.CursorGLingueGetCurrentItem();
			        currentItem.SetLANGUAGESHORTNAMESPACE(null);
			        this.CursorGLingueRegisterCurrentItemClientChanges(currentItem);
			    }
			    else
			    {
			        checkDependentFields = false;
			    }
			}
			if (checkDependentFields)
			{
			}
		}
		private  object GetFiltersEntriesMethodNameCursorGLingue ()
		{
			return new
			{
			CursorGLingueIDLANGUAGEFilter01 = ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry("idlanguage")
			,
			CursorGLingueLANGUAGESHORTNAMESPACEFilter01 = ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry("languageshortnamespace")
			,
			CursorGLingueDESCRIPTIONFilter01 = ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry("description")
			,
			CursorGLingueICONFilter01 = ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry("icon")
			};
		}
		public  object CursorGLingueManageResetGridDataSourceRequest (GridDataRequestParamsObj<CursorGLingueItem> gridDataRequestParamsObj)
		{
			gridDataRequestParamsObj.PageIndex = 0;
			gridDataRequestParamsObj.PageSize = 20;
			gridDataRequestParamsObj.Sort = null;
			gridDataRequestParamsObj.Filters = null;
			this.GLingueUpdateDataSet(gridDataRequestParamsObj);
			this.CursorGLingueInitCurrentItemsForClient();
			object responseObj = new
			{
			    CurrentRowsRTI = GridHelperCursorGLingue.GetCurrentRTRowsList(),
			    GridSourceData = new
			    {
			        CurrentItemsList = this.CursorGLingue.CurrentItemsList,
			        TotalRowsCount = this.CursorGLingue.TotalRowsCount,
			        AreRowsLimited = this.CursorGLingue.AreRowsLimited
			      },
			      GridDataRequestParamsObj = gridDataRequestParamsObj
			};
			return responseObj;
		}
		public  object GetComponentFiltersDataSourcesCursorGLingue (GridDataRequestParamsObj<CursorGLingueItem> gridDataRequestParamsObj)
		{
			return new
			{
			};
		}
		public  void CursorGLingueICONResetFieldIfNoLongerValid (bool skipCheckCurrentField)
		{
			bool checkDependentFields = true;
			if(!skipCheckCurrentField)
			{
			    if (!CursorGLingueICONIsFieldStillValid())
			    {
			        CursorGLingueItem currentItem = this.CursorGLingueGetCurrentItem();
			        currentItem.SetICON(null);
			        this.CursorGLingueRegisterCurrentItemClientChanges(currentItem);
			    }
			    else
			    {
			        checkDependentFields = false;
			    }
			}
			if (checkDependentFields)
			{
			}
		}
		private CursorGLingue cursorGLingue;
		private List<Type> showPageParamsAllowedTypesList=new List<Type>();
		private GridHelper GridHelperCursorGLingue;
	}
	[Serializable]
	public class LinguePersistenceVar
	{
		#region SubClasses
		#endregion
		public LinguePersistenceVar ()
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
			SessionHelper.PushValue("Lingue.PersistenceVar", this);
		}
		private DataRow _oldCurrentRowSaveAndNew;
		private bool _isSaveAndNewAction;
	}
	public class CursorGLingue:IT4.Common.Data.DataCursor
	{
		#region SubClasses
		#endregion
		public CursorGLingue (DbDataAdapter vDataAdapter, DataSet vDataSet, string vName):base(vDataAdapter, vDataSet, vName)
		{
			PrimaryKey = "idlanguage";
			UpdateTable = "V_LANGUAGES";
		}
		public   Int32 idlanguage
		{
		    get
		    {
		        if (CurrentRow != null)
		        {
		            if (CurrentRow["idlanguage"] == DBNull.Value) return 0;
		            else return Convert.ToInt32(CurrentRow["idlanguage"]);
		        }
		        else return 0;
		    }
		    set
		    {
		        if (CurrentRow != null) CurrentRow["idlanguage"] = value;
		        else throw new Exception("Nessuna riga corrente");
		    }
		}
		public   String Olddescription
		{
		    get
		    {
		        if (CurrentRowOldValues != null)
		        {
		            if (CurrentRowOldValues["description"] == DBNull.Value) return "";
		            else return Convert.ToString(CurrentRowOldValues["description"]);
		        }
		        else return "";
		    }
		    set
		    {
		        if (CurrentRowOldValues != null) CurrentRowOldValues["description"] = value;
		        else throw new Exception("Nessuna riga corrente");
		    }
		}
		public   String icon
		{
		    get
		    {
		        if (CurrentRow != null)
		        {
		            if (CurrentRow["icon"] == DBNull.Value) return "";
		            else return Convert.ToString(CurrentRow["icon"]);
		        }
		        else return "";
		    }
		    set
		    {
		        if (CurrentRow != null) CurrentRow["icon"] = value;
		        else throw new Exception("Nessuna riga corrente");
		    }
		}
		public   String languageshortnamespace
		{
		    get
		    {
		        if (CurrentRow != null)
		        {
		            if (CurrentRow["languageshortnamespace"] == DBNull.Value) return "";
		            else return Convert.ToString(CurrentRow["languageshortnamespace"]);
		        }
		        else return "";
		    }
		    set
		    {
		        if (CurrentRow != null) CurrentRow["languageshortnamespace"] = value;
		        else throw new Exception("Nessuna riga corrente");
		    }
		}
		public   String description
		{
		    get
		    {
		        if (CurrentRow != null)
		        {
		            if (CurrentRow["description"] == DBNull.Value) return "";
		            else return Convert.ToString(CurrentRow["description"]);
		        }
		        else return "";
		    }
		    set
		    {
		        if (CurrentRow != null) CurrentRow["description"] = value;
		        else throw new Exception("Nessuna riga corrente");
		    }
		}
		public   Int32 Oldidlanguage
		{
		    get
		    {
		        if (CurrentRowOldValues != null)
		        {
		            if (CurrentRowOldValues["idlanguage"] == DBNull.Value) return 0;
		            else return Convert.ToInt32(CurrentRowOldValues["idlanguage"]);
		        }
		        else return 0;
		    }
		    set
		    {
		        if (CurrentRowOldValues != null) CurrentRowOldValues["idlanguage"] = value;
		        else throw new Exception("Nessuna riga corrente");
		    }
		}
		public   String Oldicon
		{
		    get
		    {
		        if (CurrentRowOldValues != null)
		        {
		            if (CurrentRowOldValues["icon"] == DBNull.Value) return "";
		            else return Convert.ToString(CurrentRowOldValues["icon"]);
		        }
		        else return "";
		    }
		    set
		    {
		        if (CurrentRowOldValues != null) CurrentRowOldValues["icon"] = value;
		        else throw new Exception("Nessuna riga corrente");
		    }
		}
		public   String Oldlanguageshortnamespace
		{
		    get
		    {
		        if (CurrentRowOldValues != null)
		        {
		            if (CurrentRowOldValues["languageshortnamespace"] == DBNull.Value) return "";
		            else return Convert.ToString(CurrentRowOldValues["languageshortnamespace"]);
		        }
		        else return "";
		    }
		    set
		    {
		        if (CurrentRowOldValues != null) CurrentRowOldValues["languageshortnamespace"] = value;
		        else throw new Exception("Nessuna riga corrente");
		    }
		}
		public  bool OldiconIsNull ()
		{
			if (CurrentRowOldValues != null)
			{
			    return CurrentRowOldValues["icon"] == DBNull.Value;
			}
			else return true;
		}
		public  void languageshortnamespaceSetNull ()
		{
			if (CurrentRow != null)
			{
			    CurrentRow["languageshortnamespace"] = DBNull.Value;
			}
		}
		public  override AbstractItem GetItem (int index, RunTimeComponent runTimeComponent)
		{
			CursorGLingueItem CursorGLingueItem = new CursorGLingueItem(index);
			RTGrid typedRTIComponent = (RTGrid)runTimeComponent;
			CursorGLingueItem.SetPrimaryKeyValue(this.GetFieldValue(index, "idlanguage", typedRTIComponent));
			CursorGLingueItem.SetIDLANGUAGE(this.GetFieldValue(index, "IDLANGUAGE", typedRTIComponent.GetRTColumn("IDLANGUAGE")));
			CursorGLingueItem.SetLANGUAGESHORTNAMESPACE(this.GetFieldValue(index, "LANGUAGESHORTNAMESPACE", typedRTIComponent.GetRTColumn("LANGUAGESHORTNAMESPACE")));
			CursorGLingueItem.SetDESCRIPTION(this.GetFieldValue(index, "DESCRIPTION", typedRTIComponent.GetRTColumn("DESCRIPTION")));
			CursorGLingueItem.SetICON(this.GetFieldValue(index, "ICON", typedRTIComponent.GetRTColumn("ICON")));
			return CursorGLingueItem;
		}
		public  bool OlddescriptionIsNull ()
		{
			if (CurrentRowOldValues != null)
			{
			    return CurrentRowOldValues["description"] == DBNull.Value;
			}
			else return true;
		}
		public  bool iconIsChanged ()
		{
			return (OldiconIsNull() && !iconIsNull()) || (iconIsNull() && !OldiconIsNull()) || (!iconIsNull() && !OldiconIsNull() && (icon != Oldicon));
		}
		public  bool descriptionIsNull ()
		{
			if (CurrentRow != null)
			{
			    return CurrentRow["description"] == DBNull.Value;
			}
			else return true;
		}
		public  override void SetItem (int index, AbstractItem item, RunTimeComponent runTimeComponent)
		{
			CursorGLingueItem CursorGLingueItem = (CursorGLingueItem)item;
			RTGrid typedRTIComponent = (RTGrid)runTimeComponent;
			this.SetFieldValue(index, "IDLANGUAGE", CursorGLingueItem.GetIDLANGUAGE(), typedRTIComponent.GetRTColumn("IDLANGUAGE"));
			this.SetFieldValue(index, "LANGUAGESHORTNAMESPACE", CursorGLingueItem.GetLANGUAGESHORTNAMESPACE(), typedRTIComponent.GetRTColumn("LANGUAGESHORTNAMESPACE"));
			this.SetFieldValue(index, "DESCRIPTION", CursorGLingueItem.GetDESCRIPTION(), typedRTIComponent.GetRTColumn("DESCRIPTION"));
			this.SetFieldValue(index, "ICON", CursorGLingueItem.GetICON(), typedRTIComponent.GetRTColumn("ICON"));
		}
		public  bool OldidlanguageIsNull ()
		{
			if (CurrentRowOldValues != null)
			{
			    return CurrentRowOldValues["idlanguage"] == DBNull.Value;
			}
			else return true;
		}
		public  bool languageshortnamespaceIsChanged ()
		{
			return (OldlanguageshortnamespaceIsNull() && !languageshortnamespaceIsNull()) || (languageshortnamespaceIsNull() && !OldlanguageshortnamespaceIsNull()) || (!languageshortnamespaceIsNull() && !OldlanguageshortnamespaceIsNull() && (languageshortnamespace != Oldlanguageshortnamespace));
		}
		public  void descriptionSetNull ()
		{
			if (CurrentRow != null)
			{
			    CurrentRow["description"] = DBNull.Value;
			}
		}
		public  bool OldlanguageshortnamespaceIsNull ()
		{
			if (CurrentRowOldValues != null)
			{
			    return CurrentRowOldValues["languageshortnamespace"] == DBNull.Value;
			}
			else return true;
		}
		public  bool idlanguageIsNull ()
		{
			if (CurrentRow != null)
			{
			    return CurrentRow["idlanguage"] == DBNull.Value;
			}
			else return true;
		}
		public  bool descriptionIsChanged ()
		{
			return (OlddescriptionIsNull() && !descriptionIsNull()) || (descriptionIsNull() && !OlddescriptionIsNull()) || (!descriptionIsNull() && !OlddescriptionIsNull() && (description != Olddescription));
		}
		public  bool languageshortnamespaceIsNull ()
		{
			if (CurrentRow != null)
			{
			    return CurrentRow["languageshortnamespace"] == DBNull.Value;
			}
			else return true;
		}
		public  void iconSetNull ()
		{
			if (CurrentRow != null)
			{
			    CurrentRow["icon"] = DBNull.Value;
			}
		}
		public  bool iconIsNull ()
		{
			if (CurrentRow != null)
			{
			    return CurrentRow["icon"] == DBNull.Value;
			}
			else return true;
		}
		public  bool idlanguageIsChanged ()
		{
			return (OldidlanguageIsNull() && !idlanguageIsNull()) || (idlanguageIsNull() && !OldidlanguageIsNull()) || (!idlanguageIsNull() && !OldidlanguageIsNull() && (idlanguage != Oldidlanguage));
		}
		public  void idlanguageSetNull ()
		{
			if (CurrentRow != null)
			{
			    CurrentRow["idlanguage"] = DBNull.Value;
			}
		}
	}
	[Serializable]
	public abstract class AbstractShowPageParamsGLingue:PageInvokeParams
	{
		#region SubClasses
		#endregion
		public AbstractShowPageParamsGLingue ()
		{
		}
		public   object idlanguage
		{
		    get
		    {
		        if(pkValue == null)
		        {
		            return default(System.Int32);
		        }
		        return pkValue;
		    }
		}
		protected object pkValue;
	}
	[Serializable]
	public class ShowPageParamsForBrowseGLingue:AbstractShowPageParamsGLingue
	{
		#region SubClasses
		#endregion
		public ShowPageParamsForBrowseGLingue ()
		{
		}
		public  override PageShowModes PageShowMode
		{
		    get
		    {
		        return IT4.Web.Common.PageShowModes.Browse;
		    }
		}
		public  static void InitShowPageParams (object pkValue)
		{
			ShowPageParamsForBrowseGLingue showParams = new ShowPageParamsForBrowseGLingue();
			showParams.pkValue = pkValue;
			ApplicationPrivateSession.Current.PageInvokeParams = showParams;
		}
	}
	[Serializable]
	public class ShowPageParamsForEditGLingue:AbstractShowPageParamsGLingue
	{
		#region SubClasses
		#endregion
		public ShowPageParamsForEditGLingue ()
		{
		}
		public  override PageShowModes PageShowMode
		{
		    get
		    {
		        return IT4.Web.Common.PageShowModes.Edit;
		    }
		}
		public  static void InitShowPageParams (object pkValue)
		{
			ShowPageParamsForEditGLingue showParams = new ShowPageParamsForEditGLingue();
			showParams.pkValue = pkValue;
			ApplicationPrivateSession.Current.PageInvokeParams = showParams;
		}
	}
	[Serializable]
	public class ShowPageParamsForInsertGLingue:AbstractShowPageParamsGLingue
	{
		#region SubClasses
		#endregion
		public ShowPageParamsForInsertGLingue ()
		{
		}
		public  override PageShowModes PageShowMode
		{
		    get
		    {
		        return IT4.Web.Common.PageShowModes.Insert;
		    }
		}
		public  static void InitShowPageParams ()
		{
			ShowPageParamsForInsertGLingue showParams = new ShowPageParamsForInsertGLingue();
			ApplicationPrivateSession.Current.PageInvokeParams = showParams;
		}
	}
	public abstract class GLingueLookups
	{
		#region SubClasses
		#endregion
		public GLingueLookups ()
		{
		}
	}
	public class CursorGLingueItem:AbstractItem
	{
		#region SubClasses
		#endregion
		public CursorGLingueItem (int index):base(index)
		{
			this.CursorGLingueItemSort = index;
		}
		public  override int ItemSort
		{
		    get
		    {
		        return CursorGLingueItemSort;
		    }
		    set
		    {
		        CursorGLingueItemSort = value;
		    }
		}
		public string ICON;
		public Int32? IDLANGUAGE;
		public string LANGUAGESHORTNAMESPACE;
		public Int32? ItemPrimaryKeyValue;
		public int CursorGLingueItemSort;
		public string DESCRIPTION;
		public  object GetDESCRIPTION ()
		{
			return this.DESCRIPTION == null ? (object)DBNull.Value : (object)this.DESCRIPTION;
		}
		public  bool IsChangedLANGUAGESHORTNAMESPACE (CursorGLingueItem newItem)
		{
			return (this.GetLANGUAGESHORTNAMESPACE() == null && newItem.GetLANGUAGESHORTNAMESPACE() != null) || (this.GetLANGUAGESHORTNAMESPACE() != null && !this.GetLANGUAGESHORTNAMESPACE().Equals(newItem.GetLANGUAGESHORTNAMESPACE()));
		}
		public  void SetIDLANGUAGE (object value)
		{
			IDLANGUAGE = value == null || value == DBNull.Value ? (Int32?)null : Convert.ToInt32(value);
		}
		public  bool IsChangedDESCRIPTION (CursorGLingueItem newItem)
		{
			return (this.GetDESCRIPTION() == null && newItem.GetDESCRIPTION() != null) || (this.GetDESCRIPTION() != null && !this.GetDESCRIPTION().Equals(newItem.GetDESCRIPTION()));
		}
		public  bool IsChangedIDLANGUAGE (CursorGLingueItem newItem)
		{
			return (this.GetIDLANGUAGE() == null && newItem.GetIDLANGUAGE() != null) || (this.GetIDLANGUAGE() != null && !this.GetIDLANGUAGE().Equals(newItem.GetIDLANGUAGE()));
		}
		public  override void SetPrimaryKeyValue (object value)
		{
			this.ItemPrimaryKeyValue = value == null || value == DBNull.Value ? (Int32?)null : Convert.ToInt32(value);
		}
		public  void SetLANGUAGESHORTNAMESPACE (object value)
		{
			LANGUAGESHORTNAMESPACE = value == null || value == DBNull.Value ? (string)null : Convert.ToString(value);
		}
		public  object GetLANGUAGESHORTNAMESPACE ()
		{
			return this.LANGUAGESHORTNAMESPACE == null ? (object)DBNull.Value : (object)this.LANGUAGESHORTNAMESPACE;
		}
		public  override object GetPrimaryKeyValue ()
		{
			return this.ItemPrimaryKeyValue == null ? (object)DBNull.Value : (object)this.ItemPrimaryKeyValue;
		}
		public  object GetICON ()
		{
			return this.ICON == null ? (object)DBNull.Value : (object)this.ICON;
		}
		public  void SetDESCRIPTION (object value)
		{
			DESCRIPTION = value == null || value == DBNull.Value ? (string)null : Convert.ToString(value);
		}
		public  bool IsChangedICON (CursorGLingueItem newItem)
		{
			return (this.GetICON() == null && newItem.GetICON() != null) || (this.GetICON() != null && !this.GetICON().Equals(newItem.GetICON()));
		}
		public  void SetICON (object value)
		{
			ICON = value == null || value == DBNull.Value ? (string)null : Convert.ToString(value);
		}
		public  override bool CheckIfIsItemDataRow (DataRow dataRow)
		{
			object dataRowPrimaryKeyValue = dataRow["idlanguage"];
			return this.GetPrimaryKeyValue().Equals(dataRowPrimaryKeyValue == null || dataRowPrimaryKeyValue == DBNull.Value ? (Int32?)null : Convert.ToInt32(dataRowPrimaryKeyValue));
		}
		public  override bool IsChanged (AbstractItem newItem)
		{
			CursorGLingueItem newTypedItem = (CursorGLingueItem)newItem;
			bool isChanged = false;
			isChanged |= IsChangedIDLANGUAGE(newTypedItem);
			isChanged |= IsChangedLANGUAGESHORTNAMESPACE(newTypedItem);
			isChanged |= IsChangedDESCRIPTION(newTypedItem);
			isChanged |= IsChangedICON(newTypedItem);
			return isChanged;
		}
		public  object GetIDLANGUAGE ()
		{
			return this.IDLANGUAGE == null ? (object)DBNull.Value : (object)this.IDLANGUAGE;
		}
	}
	public class CursorGLingueFromClauseRuntimeParsingValueCollection:RuntimeParsingValueCollection
	{
		#region SubClasses
		#endregion
		public CursorGLingueFromClauseRuntimeParsingValueCollection ():base()
		{
		}
		public  static RuntimeParsingValueCollection GetNewRuntimeParsingValueCollection ()
		{
			return new CursorGLingueFromClauseRuntimeParsingValueCollection();
		}
	}
}
