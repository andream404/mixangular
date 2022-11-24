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
using IT4.Web.UI.Form;
namespace AngularJSApp.Pages
{
	public class TraduzioniPage:BasePage
	{
		#region SubClasses
		#endregion
		public TraduzioniPage ():base()
		{
		}
		public static  ModulesArray CursorGTraduzioniIDLANGUAGERTIModules
		{
		    get
		    {
		        return null;
		    }
		}
		public   CursorGTraduzioni CursorGTraduzioni
		{
		    get
		    {
		        return cursorGTraduzioni;
		    }
		    set
		    {
		        cursorGTraduzioni=value;
		    }
		}
		public   RTCell CursorGTraduzioniIDLANGUAGERTCell
		{
		    get
		    {
		        return GridHelperCursorGTraduzioni.GetCurrentRowRT().GetRTCell("IDLANGUAGE", CursorGTraduzioniIDLANGUAGERTI.SecurityLevel);
		    }
		}
		public   TraduzioniPersistenceVar PersistentVar
		{
		    get
		    {
		        TraduzioniPersistenceVar result =TraduzioniPage.PersistentVarStatic;
		        return result;
		    }
		}
		public static  ModulesArray CursorGTraduzioniCursorGTraduzioniComponentManagementDeleteColumRTIModules
		{
		    get
		    {
		        return null;
		    }
		}
		public static  ModulesArray GTraduzioniRTIModules
		{
		    get
		    {
		        return null;
		    }
		}
		public   PageInvokeParams ShowPageParamsGTraduzioni
		{
		    get
		    {
		        if(ApplicationPrivateSession.Current.PageInvokeParams == null ||
		          !showPageParamsAllowedTypesList.Contains(ApplicationPrivateSession.Current.PageInvokeParams.GetType()))
		        {
		            ApplicationPrivateSession.Current.PageInvokeParams = new ShowPageParamsForBrowseGTraduzioni();
		        }
		        return ApplicationPrivateSession.Current.PageInvokeParams;
		    }
		}
		public   RTCell CursorGTraduzioniCursorGTraduzioniComponentManagementDeleteColumRTCell
		{
		    get
		    {
		        return GridHelperCursorGTraduzioni.GetCurrentRowRT().GetRTCell("CursorGTraduzioniComponentManagementDeleteColum", CursorGTraduzioniCursorGTraduzioniComponentManagementDeleteColumRTI.SecurityLevel);
		    }
		}
		public static  ModulesArray CursorGTraduzioniIDTRANSLATIONRTIModules
		{
		    get
		    {
		        return null;
		    }
		}
		public   RTCell CursorGTraduzioniIDTRANSLATIONRTCell
		{
		    get
		    {
		        return GridHelperCursorGTraduzioni.GetCurrentRowRT().GetRTCell("IDTRANSLATION", CursorGTraduzioniIDTRANSLATIONRTI.SecurityLevel);
		    }
		}
		public static  ModulesArray CursorGTraduzioniIDSTRINGRTIModules
		{
		    get
		    {
		        return null;
		    }
		}
		public static  SecurityLevel PageSecurityLevel
		{
		    get
		    {
		        return SecurityLevels.@Restricted("Traduzioni");
		    }
		}
		public static  ModulesArray CursorGTraduzioniSTRINGVALUERTIModules
		{
		    get
		    {
		        return null;
		    }
		}
		public static  TraduzioniPersistenceVar PersistentVarStatic
		{
		    get
		    {
		        if (SessionHelper.GetValue<TraduzioniPersistenceVar>("Traduzioni.PersistenceVar") != null) return SessionHelper.GetValue<TraduzioniPersistenceVar>("Traduzioni.PersistenceVar");
		        else return new TraduzioniPersistenceVar();
		    }
		}
		public   RTCell CursorGTraduzioniIDSTRINGRTCell
		{
		    get
		    {
		        return GridHelperCursorGTraduzioni.GetCurrentRowRT().GetRTCell("IDSTRING", CursorGTraduzioniIDSTRINGRTI.SecurityLevel);
		    }
		}
		public static  ModulesArray PageModules
		{
		    get
		    {
		        return null;
		    }
		}
		public   RTCell CursorGTraduzioniSTRINGVALUERTCell
		{
		    get
		    {
		        return GridHelperCursorGTraduzioni.GetCurrentRowRT().GetRTCell("STRINGVALUE", CursorGTraduzioniSTRINGVALUERTI.SecurityLevel);
		    }
		}
		public RunTimeComponent PageRTI;
		public RTColumn CursorGTraduzioniIDTRANSLATIONRTI;
		public RTColumn CursorGTraduzioniIDLANGUAGERTI;
		public RTColumn CursorGTraduzioniCursorGTraduzioniComponentManagementDeleteColumRTI;
		public RTColumn CursorGTraduzioniIDSTRINGRTI;
		public RTColumn CursorGTraduzioniSTRINGVALUERTI;
		public RTGrid GTraduzioniRTI;
		public  KamNavigationResult GTraduzioni_ItemCommand (int rowIndex, string columnName, string commandName)
		{
			NavigationResult result = new KamNavigationResult()
			{
			    ActionResult = NavigationActionResults.UpdateComponent,
			    CursorName = "CursorGTraduzioni"
			};
			bool commandContinue = true;
			BusinessPage.BeforeCommand("GTraduzioni", commandName, rowIndex, columnName, ref commandContinue, ref result);
			if (commandContinue)
			{
			    this.CursorGTraduzioniSelectRow(rowIndex);
			this.GTraduzioni_ManageFieldOnClick(commandName, columnName, ref result);
			BusinessPage.AfterCommand("GTraduzioni", commandName, columnName, ref result);
			}
			return (KamNavigationResult)result;
		}
		private  object GetColumnsGroupsEntriesCursorGTraduzioni ()
		{
			return new
			{
			};
		}
		public  bool CursorGTraduzioniIDSTRINGIsFieldStillValid ()
		{
			CursorGTraduzioniItem currentItem = this.CursorGTraduzioniGetCurrentItem();
			if (!CursorGTraduzioniIDSTRINGRTI.GlobalReadOnly && GridHelperCursorGTraduzioni.ComponentShowMode == ComponentShowMode.edit)
			{
			    return GTraduzioniLookups.LookupLookupData1.CheckFieldIsStillValid(this.CursorGTraduzioni, currentItem == null ? null : currentItem.IDSTRING, this.DBUtils);
			}
			if (!CursorGTraduzioniIDSTRINGRTI.GlobalReadOnly && GridHelperCursorGTraduzioni.ComponentShowMode == ComponentShowMode.insert)
			{
			    return GTraduzioniLookups.LookupLookupData1.CheckFieldIsStillValid(this.CursorGTraduzioni, currentItem == null ? null : currentItem.IDSTRING, this.DBUtils);
			}
			return GTraduzioniLookups.LookupLookupData1.CheckFieldIsStillValid(this.CursorGTraduzioni, currentItem == null ? null : currentItem.IDSTRING, this.DBUtils);
		}
		public  List<object> GetCursorGTraduzioniIDLANGUAGEItemByFieldValue (CursorGTraduzioniItem currentItem)
		{
			if(currentItem == null ||
			GridHelperCursorGTraduzioni.ComponentShowMode == ComponentShowMode.undefined ||
			!CursorGTraduzioniIDLANGUAGERTI.CanRead ||
			(GridHelperCursorGTraduzioni.ComponentShowMode == ComponentShowMode.insert && !CursorGTraduzioniIDLANGUAGERTI.CanInsert) ||
			(GridHelperCursorGTraduzioni.ComponentShowMode == ComponentShowMode.edit && !CursorGTraduzioniIDLANGUAGERTI.CanEdit))
			{
			 return new List<object>();
			}
			return GTraduzioniLookups.LookupLookupData3.GetItemByKey(this.CursorGTraduzioni, currentItem == null ? null : currentItem.IDLANGUAGE, this.DBUtils);
		}
		private  string GetCursorGTraduzioniIDTRANSLATIONFilter01Suggestion ()
		{
			string suggestion = "";
			return suggestion;
		}
		private  object GetColumnsHeaderEntriesCursorGTraduzioni (Dictionary<string, string> columnsEntries)
		{
			return new
			{
			IDTRANSLATIONColumnEntry = columnsEntries["CursorGTraduzioniIDTRANSLATIONColumnsEntry"]
			,
			IDSTRINGColumnEntry = columnsEntries["CursorGTraduzioniIDSTRINGColumnsEntry"]
			,
			STRINGVALUEColumnEntry = columnsEntries["CursorGTraduzioniSTRINGVALUEColumnsEntry"]
			,
			IDLANGUAGEColumnEntry = columnsEntries["CursorGTraduzioniIDLANGUAGEColumnsEntry"]
			,
			CursorGTraduzioniComponentManagementDeleteColumColumnEntry = columnsEntries["CursorGTraduzioniCursorGTraduzioniComponentManagementDeleteColumColumnsEntry"]
			};
		}
		private  string GetCursorGTraduzioniSTRINGVALUEFilter01Suggestion ()
		{
			string suggestion = "";
			return suggestion;
		}
		public  List<object> GetCursorGTraduzioniIDSTRINGFilter01FilterItemsBySearchText (string searchText)
		{
			return GTraduzioniLookups.LookupLookupData.GetItemsBySearchText(searchText, this.DBUtils);
		}
		private  object GetColumnsTooltipEntriesCursorGTraduzioni (Dictionary<string, string> tooltipsEntries)
		{
			return new
			{
			IDTRANSLATIONTooltipsEntry = tooltipsEntries["IDTRANSLATIONTooltipsEntry"],
			IDSTRINGTooltipsEntry = tooltipsEntries["IDSTRINGTooltipsEntry"],
			STRINGVALUETooltipsEntry = tooltipsEntries["STRINGVALUETooltipsEntry"],
			IDLANGUAGETooltipsEntry = tooltipsEntries["IDLANGUAGETooltipsEntry"],
			CursorGTraduzioniComponentManagementDeleteColumTooltipsEntry = tooltipsEntries["CursorGTraduzioniComponentManagementDeleteColumTooltipsEntry"],
			};
		}
		public  NavigationResult GTraduzioniCancel ()
		{
			NavigationResult result = new KamNavigationResult();
			result = ShowPageForBrowseGTraduzioni(CursorGTraduzioni.idtranslation);
			BusinessPage.AfterRowCancel(CursorGTraduzioni, ref result);
			PersistentVar.ClearSaveAndNewVar();
			return result;
		}
		public  void CursorGTraduzioniFieldChanged (string fieldName)
		{
			CursorGTraduzioniItem currentItem = this.CursorGTraduzioniGetCurrentItem();
			BusinessPage.FieldChanged(this.CursorGTraduzioni, fieldName);
			GridHelperCursorGTraduzioni.RegisterCursorChanges();
			CursorGTraduzioniItem currentItemForBSNChanges = this.CursorGTraduzioniGetCurrentItem();
			if (currentItem.IsChangedIDTRANSLATION(currentItemForBSNChanges))
			{
			this.CursorGTraduzioniIDTRANSLATIONResetFieldIfNoLongerValid(false);
			}
			if (currentItem.IsChangedIDSTRING(currentItemForBSNChanges))
			{
			this.CursorGTraduzioniIDSTRINGResetFieldIfNoLongerValid(false);
			}
			if (currentItem.IsChangedSTRINGVALUE(currentItemForBSNChanges))
			{
			this.CursorGTraduzioniSTRINGVALUEResetFieldIfNoLongerValid(false);
			}
			if (currentItem.IsChangedIDLANGUAGE(currentItemForBSNChanges))
			{
			this.CursorGTraduzioniIDLANGUAGEResetFieldIfNoLongerValid(false);
			}
			if (currentItem.IsChanged(currentItemForBSNChanges))
			{
			this.CursorGTraduzioniCursorGTraduzioniComponentManagementDeleteColumResetFieldIfNoLongerValid(false);
			}
		}
		public  void CursorGTraduzioniPerformAfterEdit (ref NavigationResult result)
		{
			result = ShowPageForBrowseGTraduzioni(CursorGTraduzioni.idtranslation);
			GridHelperCursorGTraduzioni.PerformAfterAction(BusinessPage.AfterRowUpdate, ref result);
		}
		public  object CursorGTraduzioniManageGetGridDataSourceRequest (GridDataRequestParamsObj<CursorGTraduzioniItem> gridDataRequestParamsObj, PersistentGridDataResponseParamsObj persistentGridDataResponseParamsObj)
		{
			if(gridDataRequestParamsObj.ComponentShowModeEnumValue == ComponentShowMode.edit ||
			gridDataRequestParamsObj.ComponentShowModeEnumValue == ComponentShowMode.insert)
			{
			this.RegisterClientChangesCursorGTraduzioni(gridDataRequestParamsObj.CurrentItemsList);
			}
			if (persistentGridDataResponseParamsObj != null && gridDataRequestParamsObj.AreFiltersDifferent(persistentGridDataResponseParamsObj.GridDataResponseParamsObj.Filters, GridHelperCursorGTraduzioni))
			{
			gridDataRequestParamsObj.PageIndex = 0;
			}
			this.GTraduzioniUpdateDataSet(gridDataRequestParamsObj);
			this.GridRowsPreRenderCursorGTraduzioni();
			this.CursorGTraduzioniInitCurrentItemsForClient();
			object responseObj = new
			{
			CurrentRowsRTI = GridHelperCursorGTraduzioni.GetCurrentRTRowsList(),
			PageIndex = gridDataRequestParamsObj.PageIndex,
			GridSourceData = new
			{
			   CurrentItemsList = CursorGTraduzioni.CurrentItemsList,
			   TotalRowsCount = CursorGTraduzioni.TotalRowsCount,
			   AreRowsLimited = CursorGTraduzioni.AreRowsLimited
			}
			};
			return responseObj;
		}
		public  List<object> GetCursorGTraduzioniIDLANGUAGEFilter01FilterItemsBySearchText (string searchText)
		{
			return GTraduzioniLookups.LookupLookupData2.GetItemsBySearchText(searchText, this.DBUtils);
		}
		public  object CursorGTraduzioniManageResetGridDataSourceRequest (GridDataRequestParamsObj<CursorGTraduzioniItem> gridDataRequestParamsObj)
		{
			gridDataRequestParamsObj.PageIndex = 0;
			gridDataRequestParamsObj.PageSize = 20;
			gridDataRequestParamsObj.Sort = null;
			gridDataRequestParamsObj.Filters = null;
			this.GTraduzioniUpdateDataSet(gridDataRequestParamsObj);
			this.CursorGTraduzioniInitCurrentItemsForClient();
			object responseObj = new
			{
			    CurrentRowsRTI = GridHelperCursorGTraduzioni.GetCurrentRTRowsList(),
			    GridSourceData = new
			    {
			        CurrentItemsList = this.CursorGTraduzioni.CurrentItemsList,
			        TotalRowsCount = this.CursorGTraduzioni.TotalRowsCount,
			        AreRowsLimited = this.CursorGTraduzioni.AreRowsLimited
			      },
			      GridDataRequestParamsObj = gridDataRequestParamsObj
			};
			return responseObj;
		}
		public  void CursorGTraduzioniInitCurrentItemsForClient ()
		{
			int currentRowIndex = CursorGTraduzioni.CurrentRowIndex;
			for (int i = 0; i < CursorGTraduzioni.CurrentItemsList.Count; i++)
			{
			    AbstractItem abstractItem = CursorGTraduzioni.CurrentItemsList[i];
			    CursorGTraduzioniSelectRow(abstractItem.ItemSort);
			    CursorGTraduzioniInitItemForClient((CursorGTraduzioniItem)abstractItem);
			}
			CursorGTraduzioniSelectRow(currentRowIndex);
		}
		public  void CursorGTraduzioniPerformAfterInsert (ref NavigationResult result)
		{
			result = ShowPageForBrowseGTraduzioni(CursorGTraduzioni.idtranslation);
			GridHelperCursorGTraduzioni.PerformAfterAction(BusinessPage.AfterRowInsert, ref result);
		}
		public  object CursorGTraduzioniManageGetRequest (GridDataRequestParamsObj<CursorGTraduzioniItem> gridDataRequestParamsObj, PersistentGridDataResponseParamsObj persistentGridDataResponseParamsObj)
		{
			gridDataRequestParamsObj.Filters = this.CursorGTraduzioniGetDefaultFilters();
			bool hasDefaultFilters = gridDataRequestParamsObj.Filters != null && gridDataRequestParamsObj.Filters.Length != 0;
			if(persistentGridDataResponseParamsObj != null)
			{
			    gridDataRequestParamsObj.SetPersistentData(persistentGridDataResponseParamsObj.GridDataResponseParamsObj);
			}
			this.GTraduzioniUpdateDataSet(gridDataRequestParamsObj);
			if (gridDataRequestParamsObj.ComponentShowModeEnumValue == ComponentShowMode.insert)
			{
			    this.GTraduzioniInsertNew();
			}
			BusinessPage.ComponentPreRender(CursorGTraduzioni);
			this.GridRowsPreRenderCursorGTraduzioni();
			this.CursorGTraduzioniInitCurrentItemsForClient();
			object responseObj = new
			{
			    ComponentRTIs = this.GetComponentRTIsGTraduzioni(),
			    ComponentEntries = this.GetComponentEntriesCursorGTraduzioni(),
			    HasDefaultFilters = hasDefaultFilters,
			    GridSourceData = new
			    {
			        CurrentItemsList = this.CursorGTraduzioni.CurrentItemsList,
			        TotalRowsCount = this.CursorGTraduzioni.TotalRowsCount,
			        AreRowsLimited = this.CursorGTraduzioni.AreRowsLimited
			    },
			    FiltersDataSources = this.GetComponentFiltersDataSourcesCursorGTraduzioni(gridDataRequestParamsObj),
			    FieldsData = new
			    {
			    },
			    GridDataRequestParamsObj = gridDataRequestParamsObj
			};
			return responseObj;
		}
		private  string GetCursorGTraduzioniIDLANGUAGEFilter01Suggestion ()
		{
			string suggestion = "";
			return suggestion;
		}
		public  void CursorGTraduzioniIDLANGUAGEResetFieldIfNoLongerValid (bool skipCheckCurrentField)
		{
			bool checkDependentFields = true;
			if(!skipCheckCurrentField)
			{
			    if (!CursorGTraduzioniIDLANGUAGEIsFieldStillValid())
			    {
			        CursorGTraduzioniItem currentItem = this.CursorGTraduzioniGetCurrentItem();
			        currentItem.SetIDLANGUAGE(null);
			        this.CursorGTraduzioniRegisterCurrentItemClientChanges(currentItem);
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
		public  NavigationResult PostEditedItemsCursorGTraduzioni (bool isSaveAndNewAction = false)
		{
			NavigationResult result = new KamNavigationResult();
			CursorGTraduzioni.IsSaveAndNewAction = isSaveAndNewAction;
			bool cancel = false;
			switch(GridHelperCursorGTraduzioni.ComponentShowMode)
			{
			    case ComponentShowMode.edit:
			        GridHelperCursorGTraduzioni.UpdateEditedItems(BusinessPage.BeforeRowUpdate, ref cancel, ref result);
			        break;
			    case ComponentShowMode.insert:
			        GridHelperCursorGTraduzioni.UpdateEditedItems(BusinessPage.BeforeRowInsert, ref cancel, ref result);
			        break;
			    default:
			        throw new NotImplementedException();
			}
			if (!cancel)
			{
			    GridHelperCursorGTraduzioni.PostChanges();
			    if (isSaveAndNewAction)
			    {
			        PersistentVar.IsSaveAndNewAction = isSaveAndNewAction;
			        PersistentVar.OldCurrentRowSaveAndNew = CursorGTraduzioni.CurrentRow;
			    }
			    switch (GridHelperCursorGTraduzioni.ComponentShowMode)
			    {
			        case ComponentShowMode.edit:
			            this.CursorGTraduzioniPerformAfterEdit(ref result);
			            break;
			           case ComponentShowMode.insert:
			            this.CursorGTraduzioniPerformAfterInsert(ref result);
			            break;
			        default:
			            throw new NotImplementedException();
			    }
			}
			return result;
		}
		public  bool CursorGTraduzioniSTRINGVALUEIsFieldStillValid ()
		{
			return true;
		}
		private  List<KamColumn> GetKamGTraduzioniColumnsList ()
		{
			List<KamColumn> kamColumnsList = new List<KamColumn>();
			kamColumnsList.Add(new KamColumn() { FieldName = "IDTRANSLATION", DBColumnName = @"idtranslation", FieldTypeName = "Text" });
			kamColumnsList.Add(new KamColumn() { FieldName = "IDSTRING", DBColumnName = @"idstring", FieldTypeName = "Lookup" });
			kamColumnsList.Add(new KamColumn() { FieldName = "STRINGVALUE", DBColumnName = @"stringvalue", FieldTypeName = "Text" });
			kamColumnsList.Add(new KamColumn() { FieldName = "IDLANGUAGE", DBColumnName = @"idlanguage", FieldTypeName = "Lookup" });
			return kamColumnsList;
		}
		public  void CursorGTraduzioniResetFieldIfNoLongerValid (string fieldName)
		{
			GTraduzioniRTI.GetRTColumn(fieldName).ResetFieldIfNoLongerValid(true);
		}
		public  List<object> GetCursorGTraduzioniIDLANGUAGEItemsBySearchText (string searchText)
		{
			if(GridHelperCursorGTraduzioni.ComponentShowMode == ComponentShowMode.undefined ||
			!CursorGTraduzioniIDLANGUAGERTI.CanRead ||
			(GridHelperCursorGTraduzioni.ComponentShowMode == ComponentShowMode.insert && !CursorGTraduzioniIDLANGUAGERTI.CanInsert) ||
			(GridHelperCursorGTraduzioni.ComponentShowMode == ComponentShowMode.edit && !CursorGTraduzioniIDLANGUAGERTI.CanEdit))
			{
			 return new List<object>();
			}
			if (!CursorGTraduzioniIDLANGUAGERTI.GlobalReadOnly && GridHelperCursorGTraduzioni.ComponentShowMode == ComponentShowMode.edit)
			{
			 return GTraduzioniLookups.LookupLookupData3.GetItemsBySearchText(this.CursorGTraduzioni, searchText, this.DBUtils);
			}
			if (!CursorGTraduzioniIDLANGUAGERTI.GlobalReadOnly && GridHelperCursorGTraduzioni.ComponentShowMode == ComponentShowMode.insert)
			{
			 return GTraduzioniLookups.LookupLookupData3.GetItemsBySearchText(this.CursorGTraduzioni, searchText, this.DBUtils);
			}
			return GTraduzioniLookups.LookupLookupData3.GetItemsBySearchText(this.CursorGTraduzioni, searchText, this.DBUtils);
		}
		public  void GTraduzioniInitFilterFieldMapping ()
		{
			GridHelperCursorGTraduzioni.RegisterFilterFieldMapping("CursorGTraduzioniIDTRANSLATIONFilter01", "idtranslation", "text", "FilterGTraduzioniIDTRANSLATION");
			GridHelperCursorGTraduzioni.RegisterFilterFieldMapping("CursorGTraduzioniIDSTRINGFilter01", "IDSTRING", "dropdown", "FilterGTraduzioniIDSTRING");
			GridHelperCursorGTraduzioni.RegisterFilterFieldMapping("CursorGTraduzioniSTRINGVALUEFilter01", "stringvalue", "text", "FilterGTraduzioniSTRINGVALUE");
			GridHelperCursorGTraduzioni.RegisterFilterFieldMapping("CursorGTraduzioniIDLANGUAGEFilter01", "idlanguage", "dropdown", "FilterGTraduzioniIDLANGUAGE");
		}
		public  static KamNavigationResult ShowPageForInsertGTraduzioni ()
		{
			ShowPageParamsForInsertGTraduzioni.InitShowPageParams();
			return new KamNavigationResult() { ActionResult = NavigationActionResults.GoToPageForInsert, PageUrl = "#Traduzioni", CursorName = "CursorGTraduzioni" };
		}
		public  void CursorGTraduzioniSelectRowByItem (AbstractItem item)
		{
			GridHelperCursorGTraduzioni.SelectRow(item);
		}
		public  CursorGTraduzioniItem CursorGTraduzioniGetCurrentItem ()
		{
			return (CursorGTraduzioniItem)GridHelperCursorGTraduzioni.GetCurrentItem();
		}
		public  static KamNavigationResult ShowPageForBrowseGTraduzioni (Int32? idtranslation)
		{
			ShowPageParamsForBrowseGTraduzioni.InitShowPageParams(idtranslation);
			return new KamNavigationResult() { ActionResult = NavigationActionResults.GoToPageForBrowse, PageUrl = "#Traduzioni", CursorName = "CursorGTraduzioni" };
		}
		public  void GTraduzioni_ManageFieldOnClick (string commandName, string columnName, ref NavigationResult result)
		{
			if(commandName == "DeleteRow")
			{
			    CursorGTraduzioniDeleteCurrentItem(ref result);
			    return;
			}
		}
		public  void CursorGTraduzioniRegisterCurrentItemClientChanges (CursorGTraduzioniItem item)
		{
			GridHelperCursorGTraduzioni.RegisterClientChanges(item);
			CursorGTraduzioniSelectRowByItem(item);
		}
		public  void CursorGTraduzioniSTRINGVALUEResetFieldIfNoLongerValid (bool skipCheckCurrentField)
		{
			bool checkDependentFields = true;
			if(!skipCheckCurrentField)
			{
			    if (!CursorGTraduzioniSTRINGVALUEIsFieldStillValid())
			    {
			        CursorGTraduzioniItem currentItem = this.CursorGTraduzioniGetCurrentItem();
			        currentItem.SetSTRINGVALUE(null);
			        this.CursorGTraduzioniRegisterCurrentItemClientChanges(currentItem);
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
		public  List<object> GetCursorGTraduzioniIDSTRINGItemsBySearchText (string searchText)
		{
			if(GridHelperCursorGTraduzioni.ComponentShowMode == ComponentShowMode.undefined ||
			!CursorGTraduzioniIDSTRINGRTI.CanRead ||
			(GridHelperCursorGTraduzioni.ComponentShowMode == ComponentShowMode.insert && !CursorGTraduzioniIDSTRINGRTI.CanInsert) ||
			(GridHelperCursorGTraduzioni.ComponentShowMode == ComponentShowMode.edit && !CursorGTraduzioniIDSTRINGRTI.CanEdit))
			{
			 return new List<object>();
			}
			if (!CursorGTraduzioniIDSTRINGRTI.GlobalReadOnly && GridHelperCursorGTraduzioni.ComponentShowMode == ComponentShowMode.edit)
			{
			 return GTraduzioniLookups.LookupLookupData1.GetItemsBySearchText(this.CursorGTraduzioni, searchText, this.DBUtils);
			}
			if (!CursorGTraduzioniIDSTRINGRTI.GlobalReadOnly && GridHelperCursorGTraduzioni.ComponentShowMode == ComponentShowMode.insert)
			{
			 return GTraduzioniLookups.LookupLookupData1.GetItemsBySearchText(this.CursorGTraduzioni, searchText, this.DBUtils);
			}
			return GTraduzioniLookups.LookupLookupData1.GetItemsBySearchText(this.CursorGTraduzioni, searchText, this.DBUtils);
		}
		public  void GTraduzioniUpdateDataSet (GridDataRequestParamsObj<CursorGTraduzioniItem> gridDataRequestParamsObj)
		{
			BusinessPage.BeforeGridUpdateDataSet(this.CursorGTraduzioni, gridDataRequestParamsObj.Sort, gridDataRequestParamsObj.Filters);
			GridHelperCursorGTraduzioni.UpdateDataSet(gridDataRequestParamsObj.ComponentShowModeEnumValue, gridDataRequestParamsObj.PageIndex, gridDataRequestParamsObj.PageSize, gridDataRequestParamsObj.GetSortClause(CursorGTraduzioni, "IDLANGUAGE DESC, STRINGVALUE DESC"), gridDataRequestParamsObj.GetWhereClause(CursorGTraduzioni, GridHelperCursorGTraduzioni), gridDataRequestParamsObj.GetFromClauseForFilters(CursorGTraduzioni, GridHelperCursorGTraduzioni), BusinessPage.AfterDatasetUpdate, true);
		}
		public  void CursorGTraduzioniPerformDelete (ref NavigationResult result)
		{
			result = ShowPageForBrowseGTraduzioni(CursorGTraduzioni.idtranslation);
			GridHelperCursorGTraduzioni.DeleteCurrentRow(BusinessPage.AfterRowDelete, ref result);
		}
		public  void CursorGTraduzioniSetDefaultValues ()
		{
			CursorGTraduzioni.CurrentRow["idtranslation"] = DBUtils.Gen_id("GEN_CORE$TRANSLATIONS_ID");
			BusinessPage.SetDefaultValues(CursorGTraduzioni);
			PersistentVar.ClearSaveAndNewVar();
		}
		public  bool CursorGTraduzioniIDLANGUAGEIsFieldStillValid ()
		{
			CursorGTraduzioniItem currentItem = this.CursorGTraduzioniGetCurrentItem();
			if (!CursorGTraduzioniIDLANGUAGERTI.GlobalReadOnly && GridHelperCursorGTraduzioni.ComponentShowMode == ComponentShowMode.edit)
			{
			    return GTraduzioniLookups.LookupLookupData3.CheckFieldIsStillValid(this.CursorGTraduzioni, currentItem == null ? null : currentItem.IDLANGUAGE, this.DBUtils);
			}
			if (!CursorGTraduzioniIDLANGUAGERTI.GlobalReadOnly && GridHelperCursorGTraduzioni.ComponentShowMode == ComponentShowMode.insert)
			{
			    return GTraduzioniLookups.LookupLookupData3.CheckFieldIsStillValid(this.CursorGTraduzioni, currentItem == null ? null : currentItem.IDLANGUAGE, this.DBUtils);
			}
			return GTraduzioniLookups.LookupLookupData3.CheckFieldIsStillValid(this.CursorGTraduzioni, currentItem == null ? null : currentItem.IDLANGUAGE, this.DBUtils);
		}
		public  void InitComponentRTIsGTraduzioni ()
		{
			CursorGTraduzioniIDTRANSLATIONRTI = new RTColumn("IDTRANSLATION", "IDTRANSLATION");
			CursorGTraduzioniIDTRANSLATIONRTI.GlobalVisible = false;
			CursorGTraduzioniIDTRANSLATIONRTI.GlobalExportXLS = false;
			CursorGTraduzioniIDTRANSLATIONRTI.SecurityLevel = SecurityLevels.Restricted("TraduzioniPage");
			CursorGTraduzioniIDTRANSLATIONRTI.ModulesArray = CursorGTraduzioniIDTRANSLATIONRTIModules;
			CursorGTraduzioniIDTRANSLATIONRTI.GlobalReadOnly = false;
			CursorGTraduzioniIDTRANSLATIONRTI.ImmediateFieldUpdate = false;
			GTraduzioniRTI.AddRTColumn(CursorGTraduzioniIDTRANSLATIONRTI);
			CursorGTraduzioniIDTRANSLATIONRTI.ResetFieldIfNoLongerValid = this.CursorGTraduzioniIDTRANSLATIONResetFieldIfNoLongerValid;
			CursorGTraduzioniIDSTRINGRTI = new RTColumn("IDSTRING", "IDSTRING");
			CursorGTraduzioniIDSTRINGRTI.GlobalVisible = true;
			CursorGTraduzioniIDSTRINGRTI.GlobalExportXLS = true;
			CursorGTraduzioniIDSTRINGRTI.SecurityLevel = SecurityLevels.Restricted("TraduzioniPage");
			CursorGTraduzioniIDSTRINGRTI.ModulesArray = CursorGTraduzioniIDSTRINGRTIModules;
			CursorGTraduzioniIDSTRINGRTI.GlobalReadOnly = false;
			CursorGTraduzioniIDSTRINGRTI.ImmediateFieldUpdate = false;
			GTraduzioniRTI.AddRTColumn(CursorGTraduzioniIDSTRINGRTI);
			CursorGTraduzioniIDSTRINGRTI.ResetFieldIfNoLongerValid = this.CursorGTraduzioniIDSTRINGResetFieldIfNoLongerValid;
			CursorGTraduzioniSTRINGVALUERTI = new RTColumn("STRINGVALUE", "STRINGVALUE");
			CursorGTraduzioniSTRINGVALUERTI.GlobalVisible = true;
			CursorGTraduzioniSTRINGVALUERTI.GlobalExportXLS = true;
			CursorGTraduzioniSTRINGVALUERTI.SecurityLevel = SecurityLevels.Restricted("TraduzioniPage");
			CursorGTraduzioniSTRINGVALUERTI.ModulesArray = CursorGTraduzioniSTRINGVALUERTIModules;
			CursorGTraduzioniSTRINGVALUERTI.GlobalReadOnly = false;
			CursorGTraduzioniSTRINGVALUERTI.ImmediateFieldUpdate = false;
			GTraduzioniRTI.AddRTColumn(CursorGTraduzioniSTRINGVALUERTI);
			CursorGTraduzioniSTRINGVALUERTI.ResetFieldIfNoLongerValid = this.CursorGTraduzioniSTRINGVALUEResetFieldIfNoLongerValid;
			CursorGTraduzioniIDLANGUAGERTI = new RTColumn("IDLANGUAGE", "IDLANGUAGE");
			CursorGTraduzioniIDLANGUAGERTI.GlobalVisible = true;
			CursorGTraduzioniIDLANGUAGERTI.GlobalExportXLS = true;
			CursorGTraduzioniIDLANGUAGERTI.SecurityLevel = SecurityLevels.Restricted("TraduzioniPage");
			CursorGTraduzioniIDLANGUAGERTI.ModulesArray = CursorGTraduzioniIDLANGUAGERTIModules;
			CursorGTraduzioniIDLANGUAGERTI.GlobalReadOnly = false;
			CursorGTraduzioniIDLANGUAGERTI.ImmediateFieldUpdate = false;
			GTraduzioniRTI.AddRTColumn(CursorGTraduzioniIDLANGUAGERTI);
			CursorGTraduzioniIDLANGUAGERTI.ResetFieldIfNoLongerValid = this.CursorGTraduzioniIDLANGUAGEResetFieldIfNoLongerValid;
			CursorGTraduzioniCursorGTraduzioniComponentManagementDeleteColumRTI = new RTColumn("CursorGTraduzioniComponentManagementDeleteColum", "");
			CursorGTraduzioniCursorGTraduzioniComponentManagementDeleteColumRTI.GlobalVisible = true;
			CursorGTraduzioniCursorGTraduzioniComponentManagementDeleteColumRTI.GlobalExportXLS = true;
			CursorGTraduzioniCursorGTraduzioniComponentManagementDeleteColumRTI.SecurityLevel = SecurityLevels.Restricted("TraduzioniPage");
			CursorGTraduzioniCursorGTraduzioniComponentManagementDeleteColumRTI.ModulesArray = CursorGTraduzioniCursorGTraduzioniComponentManagementDeleteColumRTIModules;
			CursorGTraduzioniCursorGTraduzioniComponentManagementDeleteColumRTI.GlobalReadOnly = false;
			CursorGTraduzioniCursorGTraduzioniComponentManagementDeleteColumRTI.ImmediateFieldUpdate = false;
			GTraduzioniRTI.AddRTColumn(CursorGTraduzioniCursorGTraduzioniComponentManagementDeleteColumRTI);
			CursorGTraduzioniCursorGTraduzioniComponentManagementDeleteColumRTI.ResetFieldIfNoLongerValid = this.CursorGTraduzioniCursorGTraduzioniComponentManagementDeleteColumResetFieldIfNoLongerValid;
		}
		private  object GetGridColumnsValidatorsEntriesCursorGTraduzioni (Dictionary<string, string> columnsEntries)
		{
			return new
			{
			IDTRANSLATIONTextSizeWebGridDataColumnValidatorEntry = ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry("Il testo digitato supera la dimensione massima del campo:", new { FieldName = columnsEntries["CursorGTraduzioniIDTRANSLATIONColumnsEntry"].Trim() }) + " 10"
			,
			IDSTRINGTextSizeWebGridDataColumnValidatorEntry = ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry("Il testo digitato supera la dimensione massima del campo:", new { FieldName = columnsEntries["CursorGTraduzioniIDSTRINGColumnsEntry"].Trim() }) + " 10"
			,
			STRINGVALUETextSizeWebGridDataColumnValidatorEntry = ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry("Il testo digitato supera la dimensione massima del campo:", new { FieldName = columnsEntries["CursorGTraduzioniSTRINGVALUEColumnsEntry"].Trim() }) + " 500"
			,
			IDLANGUAGETextSizeWebGridDataColumnValidatorEntry = ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry("Il testo digitato supera la dimensione massima del campo:", new { FieldName = columnsEntries["CursorGTraduzioniIDLANGUAGEColumnsEntry"].Trim() }) + " 10"
			};
		}
		protected  override BusinessPage CreateNewBusinessPage ()
		{
			return new BSNTraduzioniPage(this);
		}
		public  void CursorGTraduzioniCursorGTraduzioniComponentManagementDeleteColumResetFieldIfNoLongerValid (bool skipCheckCurrentField)
		{
		}
		private  object GetFiltersEntriesMethodNameCursorGTraduzioni ()
		{
			return new
			{
			CursorGTraduzioniIDTRANSLATIONFilter01 = ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry("idtranslation")
			,
			CursorGTraduzioniIDSTRINGFilter01 = ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry("idstring")
			,
			CursorGTraduzioniSTRINGVALUEFilter01 = ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry("stringvalue")
			,
			CursorGTraduzioniIDLANGUAGEFilter01 = ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry("idlanguage")
			};
		}
		public  void GridRowsPreRenderCursorGTraduzioni ()
		{
			int currentRowIndex = CursorGTraduzioni.CurrentRowIndex;
			for(int i = 0; i < CursorGTraduzioni.CurrentItemsList.Count; i++)
			{
			    AbstractItem abstractItem = CursorGTraduzioni.CurrentItemsList[i];
			    CursorGTraduzioniSelectRow(abstractItem.ItemSort);
			    BusinessPage.RowPreRender(CursorGTraduzioni);
			}
			CursorGTraduzioniSelectRow(currentRowIndex);
		}
		public  object CursorGTraduzioniGetFieldChangedResponseObj ()
		{
			CursorGTraduzioniItem currentItem = this.CursorGTraduzioniGetCurrentItem();
			CursorGTraduzioniInitItemForClient(currentItem);
			return new
			{
			    ComponentRTIs = this.GetComponentRTIsGTraduzioni(),
			    CurrentItem = currentItem
			};
		}
		public  void CursorGTraduzioniSetUpdateCommand (IDbCommandEx Command)
		{
			Command.CommandText = "UPDATE V_TRANSLATIONS SET IDTRANSLATION = @IDTRANSLATION,IDSTRING = @IDSTRING,IDLANGUAGE = @IDLANGUAGE,STRINGVALUE = @STRINGVALUE WHERE idtranslation = @idtranslation";
			Command.Parameters.Add(DBUtils.NewParameter("@IDTRANSLATION", typeof(Int32)));
			Command.Parameters.Add(DBUtils.NewParameter("@IDSTRING", typeof(Int32)));
			Command.Parameters.Add(DBUtils.NewParameter("@IDLANGUAGE", typeof(Int32)));
			Command.Parameters.Add(DBUtils.NewParameter("@STRINGVALUE", typeof(String)));
		}
		public  object GetComponentFiltersDataSourcesCursorGTraduzioni (GridDataRequestParamsObj<CursorGTraduzioniItem> gridDataRequestParamsObj)
		{
			return new
			{
			    CursorGTraduzioniIDSTRINGFilter01Items = GTraduzioniLookups.LookupLookupData.GetItemByKey(gridDataRequestParamsObj.GetFilterValue("CursorGTraduzioniIDSTRINGFilter01"), DBUtils)
			,
			CursorGTraduzioniIDLANGUAGEFilter01Items = GTraduzioniLookups.LookupLookupData2.GetItemByKey(gridDataRequestParamsObj.GetFilterValue("CursorGTraduzioniIDLANGUAGEFilter01"), DBUtils)
			};
		}
		public  static KamNavigationResult ShowPageForEditGTraduzioni (Int32? idtranslation)
		{
			ShowPageParamsForEditGTraduzioni.InitShowPageParams(idtranslation);
			return new KamNavigationResult() { ActionResult = NavigationActionResults.GoToPageForEdit, PageUrl = "#Traduzioni", CursorName = "CursorGTraduzioni" };
		}
		public  object CursorGTraduzioniManageRestoreGridDataSourceRequest (GridDataRequestParamsObj<CursorGTraduzioniItem> gridDataRequestParamsObj)
		{
			gridDataRequestParamsObj.PageIndex = 0;
			gridDataRequestParamsObj.PageSize = 20;
			gridDataRequestParamsObj.Sort = null;
			gridDataRequestParamsObj.Filters = CursorGTraduzioniGetDefaultFilters();
			this.GTraduzioniUpdateDataSet(gridDataRequestParamsObj);
			this.CursorGTraduzioniInitCurrentItemsForClient();
			object responseObj = new
			{
			    CurrentRowsRTI = GridHelperCursorGTraduzioni.GetCurrentRTRowsList(),
			    GridSourceData = new
			    {
			        CurrentItemsList = this.CursorGTraduzioni.CurrentItemsList,
			        TotalRowsCount = this.CursorGTraduzioni.TotalRowsCount,
			        AreRowsLimited = this.CursorGTraduzioni.AreRowsLimited
			      },
			      GridDataRequestParamsObj = gridDataRequestParamsObj,
			    FiltersDataSources = this.GetComponentFiltersDataSourcesCursorGTraduzioni(gridDataRequestParamsObj)
			};
			return responseObj;
		}
		public  void InitXlsHttpResponseMessageCursorGTraduzioni (HttpResponseMessage httpResponseMessage)
		{
			ExportColumns Columns=new ExportColumns();
			if (CursorGTraduzioniIDTRANSLATIONRTI.CanRead && CursorGTraduzioniIDTRANSLATIONRTI.GlobalExportXLS) Columns.Add("IDTRANSLATION",new ExportColumn("IDTRANSLATION", ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry("idtranslation"), string.Empty));
			if (CursorGTraduzioniIDSTRINGRTI.CanRead && CursorGTraduzioniIDSTRINGRTI.GlobalExportXLS) Columns.Add("IDSTRING",new ExportColumn("IDSTRING", ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry("idstring"), string.Empty));
			if (CursorGTraduzioniSTRINGVALUERTI.CanRead && CursorGTraduzioniSTRINGVALUERTI.GlobalExportXLS) Columns.Add("STRINGVALUE",new ExportColumn("STRINGVALUE", ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry("stringvalue"), string.Empty));
			if (CursorGTraduzioniIDLANGUAGERTI.CanRead && CursorGTraduzioniIDLANGUAGERTI.GlobalExportXLS) Columns.Add("IDLANGUAGE",new ExportColumn("IDLANGUAGE", ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry("idlanguage"), string.Empty));
			CursorGTraduzioni.InitExcelHttpResponseMessage(httpResponseMessage, Columns);
		}
		public  object CursorGTraduzioniGetItemDependentFieldsUpdatedResponseObj ()
		{
			CursorGTraduzioniItem currentItem = this.CursorGTraduzioniGetCurrentItem();
			CursorGTraduzioniInitItemForClient(currentItem);
			return currentItem;
		}
		public  void CursorGTraduzioniInitItemForClient (CursorGTraduzioniItem currentItem)
		{
			currentItem.FieldsData = new
			{
			IDSTRINGItems = this.GetCursorGTraduzioniIDSTRINGItemByFieldValue(currentItem)
			,
			IDLANGUAGEItems = this.GetCursorGTraduzioniIDLANGUAGEItemByFieldValue(currentItem)
			};
		}
		public  bool CursorGTraduzioniIDTRANSLATIONIsFieldStillValid ()
		{
			return true;
		}
		public  void CursorGTraduzioniDeleteCurrentItem (ref NavigationResult result)
		{
			bool cancel = false;
			BusinessPage.BeforeRowDelete(CursorGTraduzioni, ref cancel, ref result);
			if (!cancel)
			{
			    this.CursorGTraduzioniPerformDelete(ref result);
			}
		}
		public  void CursorGTraduzioniSetDeleteCommand (IDbCommandEx Command)
		{
			Command.CommandText = "DELETE FROM V_TRANSLATIONS WHERE idtranslation = @idtranslation";
			Command.Parameters.Add(DBUtils.NewParameter("@IDTRANSLATION", typeof(Int32)));
		}
		public  bool CursorGTraduzioniCursorGTraduzioniComponentManagementDeleteColumIsFieldStillValid ()
		{
			return true;
		}
		public  object GetComponentEntriesCursorGTraduzioni ()
		{
			Dictionary<string, string> columnsEntries = new Dictionary<string, string>();
			columnsEntries.Add("CursorGTraduzioniIDTRANSLATIONColumnsEntry", ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry("idtranslation"));
			columnsEntries.Add("CursorGTraduzioniIDSTRINGColumnsEntry", ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry("idstring"));
			columnsEntries.Add("CursorGTraduzioniSTRINGVALUEColumnsEntry", ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry("stringvalue"));
			columnsEntries.Add("CursorGTraduzioniIDLANGUAGEColumnsEntry", ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry("idlanguage"));
			columnsEntries.Add("CursorGTraduzioniCursorGTraduzioniComponentManagementDeleteColumColumnsEntry", ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry(""));
			Dictionary<string, string> tooltipsEntries = new Dictionary<string, string>();
			tooltipsEntries.Add("IDTRANSLATIONTooltipsEntry", ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry(""));
			tooltipsEntries.Add("IDSTRINGTooltipsEntry", ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry(""));
			tooltipsEntries.Add("STRINGVALUETooltipsEntry", ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry(""));
			tooltipsEntries.Add("IDLANGUAGETooltipsEntry", ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry(""));
			tooltipsEntries.Add("CursorGTraduzioniComponentManagementDeleteColumTooltipsEntry", ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry(""));
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
			    ColumnsHeaderEntries = GetColumnsHeaderEntriesCursorGTraduzioni(columnsEntries),
			    ColumnsGroupsEntries = GetColumnsGroupsEntriesCursorGTraduzioni(),
			    GridColumnsValidatorsEntries = GetGridColumnsValidatorsEntriesCursorGTraduzioni(columnsEntries),
			    FiltersEntries = GetFiltersEntriesMethodNameCursorGTraduzioni(),
			    FiltersSuggestions =  GetFiltersSuggestionsCursorGTraduzioni(),
			    ColumnsTooltipsEntries = GetColumnsTooltipEntriesCursorGTraduzioni(tooltipsEntries),
			    ButtonsPanelEntries = GetButtonsPanelEntriesCursorGTraduzioni(buttonsPanelEntries)
			};
		}
		protected  override void InitializeComponent10 ()
		{
			showPageParamsAllowedTypesList.Add(typeof(ShowPageParamsForBrowseGTraduzioni));
			showPageParamsAllowedTypesList.Add(typeof(ShowPageParamsForEditGTraduzioni));
			showPageParamsAllowedTypesList.Add(typeof(ShowPageParamsForInsertGTraduzioni));
			IDbDataAdapter DataAdapterGTraduzioni = DBUtils.NewDataAdapter();
			IDbCommandEx CommandGTraduzioniSelect = DBUtils.NewCommand(string.Empty);
			DataAdapterGTraduzioni.SelectCommand = CommandGTraduzioniSelect;
			CursorGTraduzioniSetSelectCommand(CommandGTraduzioniSelect);
			IDbCommandEx CommandGTraduzioniUpdate = DBUtils.NewCommand(string.Empty);
			DataAdapterGTraduzioni.UpdateCommand = CommandGTraduzioniUpdate;
			CursorGTraduzioniSetUpdateCommand(CommandGTraduzioniUpdate);
			IDbCommandEx CommandGTraduzioniInsert = DBUtils.NewCommand(string.Empty);
			DataAdapterGTraduzioni.InsertCommand = CommandGTraduzioniInsert;
			CursorGTraduzioniSetInsertCommand(CommandGTraduzioniInsert);
			IDbCommandEx CommandGTraduzioniDelete = DBUtils.NewCommand(string.Empty);
			DataAdapterGTraduzioni.DeleteCommand = CommandGTraduzioniDelete;
			CursorGTraduzioniSetDeleteCommand(CommandGTraduzioniDelete);
			CursorGTraduzioni = new CursorGTraduzioni(null, new DataSet(), "GTraduzioni");
			CursorGTraduzioni.DataAdapter = (DbDataAdapter)DataAdapterGTraduzioni;
		}
		private  object GetFiltersSuggestionsCursorGTraduzioni ()
		{
			return new
			{
			CursorGTraduzioniIDTRANSLATIONFilter01 = this.GetCursorGTraduzioniIDTRANSLATIONFilter01Suggestion()
			,
			CursorGTraduzioniIDSTRINGFilter01 = this.GetCursorGTraduzioniIDSTRINGFilter01Suggestion()
			,
			CursorGTraduzioniSTRINGVALUEFilter01 = this.GetCursorGTraduzioniSTRINGVALUEFilter01Suggestion()
			,
			CursorGTraduzioniIDLANGUAGEFilter01 = this.GetCursorGTraduzioniIDLANGUAGEFilter01Suggestion()
			};
		}
		public  void CursorGTraduzioniSelectRow (int rowIndex)
		{
			GridHelperCursorGTraduzioni.SelectRow(rowIndex);
		}
		public  void CursorGTraduzioniRegisterComponentRTIsClientChanges (JObject componentRTIs)
		{
			RTGrid clientRTComponent = componentRTIs.GetValue("ComponentRTI").ToObject<RTGrid>();
			this.GTraduzioniRTI.GlobalCanDelete = clientRTComponent.GlobalCanDelete;
			this.GTraduzioniRTI.GlobalCanEdit = clientRTComponent.GlobalCanEdit;
			this.GTraduzioniRTI.GlobalCanInsert = clientRTComponent.GlobalCanInsert;
			this.GTraduzioniRTI.GlobalCanRead = clientRTComponent.GlobalCanRead;
			this.GTraduzioniRTI.GlobalReadOnly = clientRTComponent.GlobalReadOnly;
			this.GTraduzioniRTI.GlobalVisible = clientRTComponent.GlobalVisible;
			this.GTraduzioniRTI.AllowSaveAndNew = clientRTComponent.AllowSaveAndNew;
			RTColumn clientRTColumn = null;
			JObject clientGridColumnsRTI = componentRTIs.GetValue("GridColumnsRTI").ToObject<JObject>();
			clientRTColumn = clientGridColumnsRTI.GetValue("CursorGTraduzioniIDTRANSLATIONRTI").ToObject<RTColumn>();
			this.CursorGTraduzioniIDTRANSLATIONRTI.GlobalCanDelete = clientRTColumn.GlobalCanDelete;
			this.CursorGTraduzioniIDTRANSLATIONRTI.GlobalCanEdit = clientRTColumn.GlobalCanEdit;
			this.CursorGTraduzioniIDTRANSLATIONRTI.GlobalCanInsert = clientRTColumn.GlobalCanInsert;
			this.CursorGTraduzioniIDTRANSLATIONRTI.GlobalCanRead = clientRTColumn.GlobalCanRead;
			this.CursorGTraduzioniIDTRANSLATIONRTI.GlobalReadOnly = clientRTColumn.GlobalReadOnly;
			this.CursorGTraduzioniIDTRANSLATIONRTI.GlobalVisible = clientRTColumn.GlobalVisible;
			clientRTColumn = clientGridColumnsRTI.GetValue("CursorGTraduzioniIDSTRINGRTI").ToObject<RTColumn>();
			this.CursorGTraduzioniIDSTRINGRTI.GlobalCanDelete = clientRTColumn.GlobalCanDelete;
			this.CursorGTraduzioniIDSTRINGRTI.GlobalCanEdit = clientRTColumn.GlobalCanEdit;
			this.CursorGTraduzioniIDSTRINGRTI.GlobalCanInsert = clientRTColumn.GlobalCanInsert;
			this.CursorGTraduzioniIDSTRINGRTI.GlobalCanRead = clientRTColumn.GlobalCanRead;
			this.CursorGTraduzioniIDSTRINGRTI.GlobalReadOnly = clientRTColumn.GlobalReadOnly;
			this.CursorGTraduzioniIDSTRINGRTI.GlobalVisible = clientRTColumn.GlobalVisible;
			clientRTColumn = clientGridColumnsRTI.GetValue("CursorGTraduzioniSTRINGVALUERTI").ToObject<RTColumn>();
			this.CursorGTraduzioniSTRINGVALUERTI.GlobalCanDelete = clientRTColumn.GlobalCanDelete;
			this.CursorGTraduzioniSTRINGVALUERTI.GlobalCanEdit = clientRTColumn.GlobalCanEdit;
			this.CursorGTraduzioniSTRINGVALUERTI.GlobalCanInsert = clientRTColumn.GlobalCanInsert;
			this.CursorGTraduzioniSTRINGVALUERTI.GlobalCanRead = clientRTColumn.GlobalCanRead;
			this.CursorGTraduzioniSTRINGVALUERTI.GlobalReadOnly = clientRTColumn.GlobalReadOnly;
			this.CursorGTraduzioniSTRINGVALUERTI.GlobalVisible = clientRTColumn.GlobalVisible;
			clientRTColumn = clientGridColumnsRTI.GetValue("CursorGTraduzioniIDLANGUAGERTI").ToObject<RTColumn>();
			this.CursorGTraduzioniIDLANGUAGERTI.GlobalCanDelete = clientRTColumn.GlobalCanDelete;
			this.CursorGTraduzioniIDLANGUAGERTI.GlobalCanEdit = clientRTColumn.GlobalCanEdit;
			this.CursorGTraduzioniIDLANGUAGERTI.GlobalCanInsert = clientRTColumn.GlobalCanInsert;
			this.CursorGTraduzioniIDLANGUAGERTI.GlobalCanRead = clientRTColumn.GlobalCanRead;
			this.CursorGTraduzioniIDLANGUAGERTI.GlobalReadOnly = clientRTColumn.GlobalReadOnly;
			this.CursorGTraduzioniIDLANGUAGERTI.GlobalVisible = clientRTColumn.GlobalVisible;
			clientRTColumn = clientGridColumnsRTI.GetValue("CursorGTraduzioniCursorGTraduzioniComponentManagementDeleteColumRTI").ToObject<RTColumn>();
			this.CursorGTraduzioniCursorGTraduzioniComponentManagementDeleteColumRTI.GlobalCanDelete = clientRTColumn.GlobalCanDelete;
			this.CursorGTraduzioniCursorGTraduzioniComponentManagementDeleteColumRTI.GlobalCanEdit = clientRTColumn.GlobalCanEdit;
			this.CursorGTraduzioniCursorGTraduzioniComponentManagementDeleteColumRTI.GlobalCanInsert = clientRTColumn.GlobalCanInsert;
			this.CursorGTraduzioniCursorGTraduzioniComponentManagementDeleteColumRTI.GlobalCanRead = clientRTColumn.GlobalCanRead;
			this.CursorGTraduzioniCursorGTraduzioniComponentManagementDeleteColumRTI.GlobalReadOnly = clientRTColumn.GlobalReadOnly;
			this.CursorGTraduzioniCursorGTraduzioniComponentManagementDeleteColumRTI.GlobalVisible = clientRTColumn.GlobalVisible;
		}
		private  object GetButtonsPanelEntriesCursorGTraduzioni (Dictionary<string, string> buttonsPanelEntries)
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
		private  string GetCursorGTraduzioniIDSTRINGFilter01Suggestion ()
		{
			string suggestion = "";
			return suggestion;
		}
		public  FiltersInformation[] CursorGTraduzioniGetDefaultFilters ()
		{
			List<FiltersInformation> gridDataResponseParamsFilterObjList = new List<FiltersInformation>();
			return gridDataResponseParamsFilterObjList.ToArray();
		}
		protected  override void InitializeComponent30 ()
		{
			PageRTI.SetLevel(ApplicationPrivateSession.Current.UserInfo);
			CursorGTraduzioni.InitKamColumnsList(GetKamGTraduzioniColumnsList());
			GridHelperCursorGTraduzioni = new GridHelper(CursorGTraduzioni, this, GTraduzioniRTI);
			GridHelperCursorGTraduzioni.GetNewRuntimeParsingValueCollectionMethod = CursorGTraduzioniFromClauseRuntimeParsingValueCollection.GetNewRuntimeParsingValueCollection;
			GTraduzioniInitFilterFieldMapping();
		}
		public  object GetComponentRTIsGTraduzioni ()
		{
			return new
			{
			    ComponentRTI = GTraduzioniRTI,
			    CurrentRowsRTI = GridHelperCursorGTraduzioni.GetCurrentRTRowsList(),
			    GridColumnsRTI = new
			    {
			    CursorGTraduzioniIDTRANSLATIONRTI
			,
			CursorGTraduzioniIDSTRINGRTI
			,
			CursorGTraduzioniSTRINGVALUERTI
			,
			CursorGTraduzioniIDLANGUAGERTI
			,
			CursorGTraduzioniCursorGTraduzioniComponentManagementDeleteColumRTI
			    }
			};
		}
		public  void CursorGTraduzioniSetInsertCommand (IDbCommandEx Command)
		{
			Command.CommandText = "INSERT INTO V_TRANSLATIONS (idtranslation, IDSTRING,IDLANGUAGE,STRINGVALUE) VALUES (@idtranslation, @IDSTRING,@IDLANGUAGE,@STRINGVALUE)";
			Command.Parameters.Add(DBUtils.NewParameter("@IDTRANSLATION", typeof(Int32)));
			Command.Parameters.Add(DBUtils.NewParameter("@IDSTRING", typeof(Int32)));
			Command.Parameters.Add(DBUtils.NewParameter("@IDLANGUAGE", typeof(Int32)));
			Command.Parameters.Add(DBUtils.NewParameter("@STRINGVALUE", typeof(String)));
		}
		public  void CursorGTraduzioniIDSTRINGResetFieldIfNoLongerValid (bool skipCheckCurrentField)
		{
			bool checkDependentFields = true;
			if(!skipCheckCurrentField)
			{
			    if (!CursorGTraduzioniIDSTRINGIsFieldStillValid())
			    {
			        CursorGTraduzioniItem currentItem = this.CursorGTraduzioniGetCurrentItem();
			        currentItem.SetIDSTRING(null);
			        this.CursorGTraduzioniRegisterCurrentItemClientChanges(currentItem);
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
		public  void RegisterClientChangesCursorGTraduzioni (List<CursorGTraduzioniItem> clientItemList)
		{
			GridHelperCursorGTraduzioni.RegisterClientChanges(clientItemList.Cast<AbstractItem>().ToList());
		}
		public  void GTraduzioniInsertNew ()
		{
			GridHelperCursorGTraduzioni.InsertNewRow(this.CursorGTraduzioniSetDefaultValues);
		}
		public  void CursorGTraduzioniSetSelectCommand (IDbCommandEx Command)
		{
			object fTSFilterFromClause = new
			{
			};
			Command.CommandText=IT4.Common.Classes.IdeaString.ParseTemplate("SELECT " +
			"                            IDTRANSLATION," +
			"                            IDSTRING," +
			"                            IDLANGUAGE," +
			"                            STRINGVALUE" +
			"                        FROM V_TRANSLATIONS", "GlobalPublic;GlobalPrivate;UserProperties;CursorGTraduzioni;ShowPageParams;FTSFilterFromClause;PersistentVar", new object [] {ApplicationPublicSession.Current, ApplicationPrivateSession.Current, ApplicationPrivateSession.Current.UserInfo, CursorGTraduzioni, ShowPageParamsGTraduzioni, fTSFilterFromClause, PersistentVar});
		}
		public  List<object> GetCursorGTraduzioniIDSTRINGItemByFieldValue (CursorGTraduzioniItem currentItem)
		{
			if(currentItem == null ||
			GridHelperCursorGTraduzioni.ComponentShowMode == ComponentShowMode.undefined ||
			!CursorGTraduzioniIDSTRINGRTI.CanRead ||
			(GridHelperCursorGTraduzioni.ComponentShowMode == ComponentShowMode.insert && !CursorGTraduzioniIDSTRINGRTI.CanInsert) ||
			(GridHelperCursorGTraduzioni.ComponentShowMode == ComponentShowMode.edit && !CursorGTraduzioniIDSTRINGRTI.CanEdit))
			{
			 return new List<object>();
			}
			return GTraduzioniLookups.LookupLookupData1.GetItemByKey(this.CursorGTraduzioni, currentItem == null ? null : currentItem.IDSTRING, this.DBUtils);
		}
		public  void CursorGTraduzioniIDTRANSLATIONResetFieldIfNoLongerValid (bool skipCheckCurrentField)
		{
			bool checkDependentFields = true;
			if(!skipCheckCurrentField)
			{
			    if (!CursorGTraduzioniIDTRANSLATIONIsFieldStillValid())
			    {
			        CursorGTraduzioniItem currentItem = this.CursorGTraduzioniGetCurrentItem();
			        currentItem.SetIDTRANSLATION(null);
			        this.CursorGTraduzioniRegisterCurrentItemClientChanges(currentItem);
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
		protected  override void InitializeComponent20 ()
		{
			PageRTI = new RunTimeComponent(null);
			PageRTI.SecurityLevel = PageSecurityLevel;
			PageRTI.ModulesArray = PageModules;
			GTraduzioniRTI = new RTGrid(PageRTI);
			GTraduzioniRTI.SecurityLevel = SecurityLevels.Restricted("TraduzioniPage");
			GTraduzioniRTI.ModulesArray = GTraduzioniRTIModules;
			GTraduzioniRTI.AllowSaveAndNew = false;
			InitComponentRTIsGTraduzioni();
		}
		private GridHelper GridHelperCursorGTraduzioni;
		private CursorGTraduzioni cursorGTraduzioni;
		private List<Type> showPageParamsAllowedTypesList=new List<Type>();
	}
	[Serializable]
	public class TraduzioniPersistenceVar
	{
		#region SubClasses
		#endregion
		public TraduzioniPersistenceVar ()
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
			SessionHelper.PushValue("Traduzioni.PersistenceVar", this);
		}
		private DataRow _oldCurrentRowSaveAndNew;
		private bool _isSaveAndNewAction;
	}
	public class CursorGTraduzioni:IT4.Common.Data.DataCursor
	{
		#region SubClasses
		#endregion
		public CursorGTraduzioni (DbDataAdapter vDataAdapter, DataSet vDataSet, string vName):base(vDataAdapter, vDataSet, vName)
		{
			PrimaryKey = "idtranslation";
			UpdateTable = "V_TRANSLATIONS";
		}
		public   Int32 idstring
		{
		    get
		    {
		        if (CurrentRow != null)
		        {
		            if (CurrentRow["idstring"] == DBNull.Value) return 0;
		            else return Convert.ToInt32(CurrentRow["idstring"]);
		        }
		        else return 0;
		    }
		    set
		    {
		        if (CurrentRow != null) CurrentRow["idstring"] = value;
		        else throw new Exception("Nessuna riga corrente");
		    }
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
		public   Int32 Oldidtranslation
		{
		    get
		    {
		        if (CurrentRowOldValues != null)
		        {
		            if (CurrentRowOldValues["idtranslation"] == DBNull.Value) return 0;
		            else return Convert.ToInt32(CurrentRowOldValues["idtranslation"]);
		        }
		        else return 0;
		    }
		    set
		    {
		        if (CurrentRowOldValues != null) CurrentRowOldValues["idtranslation"] = value;
		        else throw new Exception("Nessuna riga corrente");
		    }
		}
		public   String stringvalue
		{
		    get
		    {
		        if (CurrentRow != null)
		        {
		            if (CurrentRow["stringvalue"] == DBNull.Value) return "";
		            else return Convert.ToString(CurrentRow["stringvalue"]);
		        }
		        else return "";
		    }
		    set
		    {
		        if (CurrentRow != null) CurrentRow["stringvalue"] = value;
		        else throw new Exception("Nessuna riga corrente");
		    }
		}
		public   String Oldstringvalue
		{
		    get
		    {
		        if (CurrentRowOldValues != null)
		        {
		            if (CurrentRowOldValues["stringvalue"] == DBNull.Value) return "";
		            else return Convert.ToString(CurrentRowOldValues["stringvalue"]);
		        }
		        else return "";
		    }
		    set
		    {
		        if (CurrentRowOldValues != null) CurrentRowOldValues["stringvalue"] = value;
		        else throw new Exception("Nessuna riga corrente");
		    }
		}
		public   Int32 Oldidstring
		{
		    get
		    {
		        if (CurrentRowOldValues != null)
		        {
		            if (CurrentRowOldValues["idstring"] == DBNull.Value) return 0;
		            else return Convert.ToInt32(CurrentRowOldValues["idstring"]);
		        }
		        else return 0;
		    }
		    set
		    {
		        if (CurrentRowOldValues != null) CurrentRowOldValues["idstring"] = value;
		        else throw new Exception("Nessuna riga corrente");
		    }
		}
		public   Int32 idtranslation
		{
		    get
		    {
		        if (CurrentRow != null)
		        {
		            if (CurrentRow["idtranslation"] == DBNull.Value) return 0;
		            else return Convert.ToInt32(CurrentRow["idtranslation"]);
		        }
		        else return 0;
		    }
		    set
		    {
		        if (CurrentRow != null) CurrentRow["idtranslation"] = value;
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
		public  void idstringSetNull ()
		{
			if (CurrentRow != null)
			{
			    CurrentRow["idstring"] = DBNull.Value;
			}
		}
		public  bool idlanguageIsChanged ()
		{
			return (OldidlanguageIsNull() && !idlanguageIsNull()) || (idlanguageIsNull() && !OldidlanguageIsNull()) || (!idlanguageIsNull() && !OldidlanguageIsNull() && (idlanguage != Oldidlanguage));
		}
		public  bool stringvalueIsNull ()
		{
			if (CurrentRow != null)
			{
			    return CurrentRow["stringvalue"] == DBNull.Value;
			}
			else return true;
		}
		public  override AbstractItem GetItem (int index, RunTimeComponent runTimeComponent)
		{
			CursorGTraduzioniItem CursorGTraduzioniItem = new CursorGTraduzioniItem(index);
			RTGrid typedRTIComponent = (RTGrid)runTimeComponent;
			CursorGTraduzioniItem.SetPrimaryKeyValue(this.GetFieldValue(index, "idtranslation", typedRTIComponent));
			CursorGTraduzioniItem.SetIDTRANSLATION(this.GetFieldValue(index, "IDTRANSLATION", typedRTIComponent.GetRTColumn("IDTRANSLATION")));
			CursorGTraduzioniItem.SetIDSTRING(this.GetFieldValue(index, "IDSTRING", typedRTIComponent.GetRTColumn("IDSTRING")));
			CursorGTraduzioniItem.SetSTRINGVALUE(this.GetFieldValue(index, "STRINGVALUE", typedRTIComponent.GetRTColumn("STRINGVALUE")));
			CursorGTraduzioniItem.SetIDLANGUAGE(this.GetFieldValue(index, "IDLANGUAGE", typedRTIComponent.GetRTColumn("IDLANGUAGE")));
			return CursorGTraduzioniItem;
		}
		public  void idlanguageSetNull ()
		{
			if (CurrentRow != null)
			{
			    CurrentRow["idlanguage"] = DBNull.Value;
			}
		}
		public  bool OldidlanguageIsNull ()
		{
			if (CurrentRowOldValues != null)
			{
			    return CurrentRowOldValues["idlanguage"] == DBNull.Value;
			}
			else return true;
		}
		public  bool idtranslationIsNull ()
		{
			if (CurrentRow != null)
			{
			    return CurrentRow["idtranslation"] == DBNull.Value;
			}
			else return true;
		}
		public  bool idtranslationIsChanged ()
		{
			return (OldidtranslationIsNull() && !idtranslationIsNull()) || (idtranslationIsNull() && !OldidtranslationIsNull()) || (!idtranslationIsNull() && !OldidtranslationIsNull() && (idtranslation != Oldidtranslation));
		}
		public  bool OldstringvalueIsNull ()
		{
			if (CurrentRowOldValues != null)
			{
			    return CurrentRowOldValues["stringvalue"] == DBNull.Value;
			}
			else return true;
		}
		public  void stringvalueSetNull ()
		{
			if (CurrentRow != null)
			{
			    CurrentRow["stringvalue"] = DBNull.Value;
			}
		}
		public  bool idlanguageIsNull ()
		{
			if (CurrentRow != null)
			{
			    return CurrentRow["idlanguage"] == DBNull.Value;
			}
			else return true;
		}
		public  bool idstringIsNull ()
		{
			if (CurrentRow != null)
			{
			    return CurrentRow["idstring"] == DBNull.Value;
			}
			else return true;
		}
		public  void idtranslationSetNull ()
		{
			if (CurrentRow != null)
			{
			    CurrentRow["idtranslation"] = DBNull.Value;
			}
		}
		public  bool OldidstringIsNull ()
		{
			if (CurrentRowOldValues != null)
			{
			    return CurrentRowOldValues["idstring"] == DBNull.Value;
			}
			else return true;
		}
		public  bool stringvalueIsChanged ()
		{
			return (OldstringvalueIsNull() && !stringvalueIsNull()) || (stringvalueIsNull() && !OldstringvalueIsNull()) || (!stringvalueIsNull() && !OldstringvalueIsNull() && (stringvalue != Oldstringvalue));
		}
		public  bool OldidtranslationIsNull ()
		{
			if (CurrentRowOldValues != null)
			{
			    return CurrentRowOldValues["idtranslation"] == DBNull.Value;
			}
			else return true;
		}
		public  override void SetItem (int index, AbstractItem item, RunTimeComponent runTimeComponent)
		{
			CursorGTraduzioniItem CursorGTraduzioniItem = (CursorGTraduzioniItem)item;
			RTGrid typedRTIComponent = (RTGrid)runTimeComponent;
			this.SetFieldValue(index, "IDTRANSLATION", CursorGTraduzioniItem.GetIDTRANSLATION(), typedRTIComponent.GetRTColumn("IDTRANSLATION"));
			this.SetFieldValue(index, "IDSTRING", CursorGTraduzioniItem.GetIDSTRING(), typedRTIComponent.GetRTColumn("IDSTRING"));
			this.SetFieldValue(index, "STRINGVALUE", CursorGTraduzioniItem.GetSTRINGVALUE(), typedRTIComponent.GetRTColumn("STRINGVALUE"));
			this.SetFieldValue(index, "IDLANGUAGE", CursorGTraduzioniItem.GetIDLANGUAGE(), typedRTIComponent.GetRTColumn("IDLANGUAGE"));
		}
		public  bool idstringIsChanged ()
		{
			return (OldidstringIsNull() && !idstringIsNull()) || (idstringIsNull() && !OldidstringIsNull()) || (!idstringIsNull() && !OldidstringIsNull() && (idstring != Oldidstring));
		}
	}
	[Serializable]
	public abstract class AbstractShowPageParamsGTraduzioni:PageInvokeParams
	{
		#region SubClasses
		#endregion
		public AbstractShowPageParamsGTraduzioni ()
		{
		}
		public   object idtranslation
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
	public class ShowPageParamsForBrowseGTraduzioni:AbstractShowPageParamsGTraduzioni
	{
		#region SubClasses
		#endregion
		public ShowPageParamsForBrowseGTraduzioni ()
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
			ShowPageParamsForBrowseGTraduzioni showParams = new ShowPageParamsForBrowseGTraduzioni();
			showParams.pkValue = pkValue;
			ApplicationPrivateSession.Current.PageInvokeParams = showParams;
		}
	}
	[Serializable]
	public class ShowPageParamsForEditGTraduzioni:AbstractShowPageParamsGTraduzioni
	{
		#region SubClasses
		#endregion
		public ShowPageParamsForEditGTraduzioni ()
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
			ShowPageParamsForEditGTraduzioni showParams = new ShowPageParamsForEditGTraduzioni();
			showParams.pkValue = pkValue;
			ApplicationPrivateSession.Current.PageInvokeParams = showParams;
		}
	}
	[Serializable]
	public class ShowPageParamsForInsertGTraduzioni:AbstractShowPageParamsGTraduzioni
	{
		#region SubClasses
		#endregion
		public ShowPageParamsForInsertGTraduzioni ()
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
			ShowPageParamsForInsertGTraduzioni showParams = new ShowPageParamsForInsertGTraduzioni();
			ApplicationPrivateSession.Current.PageInvokeParams = showParams;
		}
	}
	public abstract class GTraduzioniLookups
	{
		#region SubClasses
		#region implementation on LookupLookupData
		public class LookupLookupData
		{
		    #region SubClasses
		    #endregion
		    public LookupLookupData ()
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
		#endregion
		#region implementation on LookupLookupData1
		public class LookupLookupData1
		{
		    #region SubClasses
		    #endregion
		    public LookupLookupData1 ()
		    {
		    }
		    public  static bool CheckFieldIsStillValid (CursorGTraduzioni dataCursor, object key, DBUtils DBUtils)
		    {
		        IT4.Common.DB.SQLSelectParser sqlSelectParser = new IT4.Common.DB.SQLSelectParser();
		        sqlSelectParser.Parse(GetQueryString(dataCursor), DBUtils.DBPlatform);
		        sqlSelectParser.AddWhereClause(string.Format("IDSTRING = {0}", DBUtils.ObjectToString(key, true)));
		        return DBUtils.Exists(sqlSelectParser.GetNewSelectSQL());
		    }
		    protected  static string GetQueryString (CursorGTraduzioni dataCursor)
		    {
		        return IT4.Common.Classes.IdeaString.ParseTemplate("" +
		        "				select IDSTRING, LABEL" +
		        "				from V_IDSTRINGS" +
		        "			", "GlobalPublic;GlobalPrivate;UserProperties;CursorGTraduzioni", new object[] { ApplicationPublicSession.Current, ApplicationPrivateSession.Current, ApplicationPrivateSession.Current.UserInfo, dataCursor});
		    }
		    public  static List<object> GetItemsAll (CursorGTraduzioni dataCursor, DBUtils DBUtils)
		    {
		        return GetItems(dataCursor, null, null, DBUtils);
		    }
		    public  static List<object> GetItemByKey (CursorGTraduzioni dataCursor, object key, DBUtils DBUtils)
		    {
		        if (key == null)
		        {
		            return new List<object>();
		        }
		        List<object> items = GetItems(dataCursor, string.Format("IDSTRING = {0}", DBUtils.ObjectToString(key, true)), null, DBUtils);
		        return items;
		    }
		    public  static List<object> GetItemsBySearchText (CursorGTraduzioni dataCursor, string searchText, DBUtils DBUtils)
		    {
		        string searchWhereClause = LookupFieldHelper.GetSearchWhereClause(DBUtils, "LABEL", searchText, "CONTAINS");
		        string searchFromClause = null;
		        return GetItems(dataCursor, searchWhereClause, searchFromClause, DBUtils);
		    }
		    private  static List<object> GetItems (CursorGTraduzioni dataCursor, string plusWhereText, string plusFromText, DBUtils DBUtils)
		    {
		        IT4.Common.DB.SQLSelectParser sqlSelectParser = new IT4.Common.DB.SQLSelectParser();
		        sqlSelectParser.Parse(GetQueryString(dataCursor), DBUtils.DBPlatform);
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
		                                      value = readerLookup.GetValue(readerLookup.GetOrdinal("LABEL")).ToString() });
		            }
		            readerLookup.Close();
		        }
		        return LookupItems;
		    }
		}
		#endregion
		#region implementation on LookupLookupData2
		public class LookupLookupData2
		{
		    #region SubClasses
		    #endregion
		    public LookupLookupData2 ()
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
		#endregion
		#region implementation on LookupLookupData3
		public class LookupLookupData3
		{
		    #region SubClasses
		    #endregion
		    public LookupLookupData3 ()
		    {
		    }
		    public  static bool CheckFieldIsStillValid (CursorGTraduzioni dataCursor, object key, DBUtils DBUtils)
		    {
		        IT4.Common.DB.SQLSelectParser sqlSelectParser = new IT4.Common.DB.SQLSelectParser();
		        sqlSelectParser.Parse(GetQueryString(dataCursor), DBUtils.DBPlatform);
		        sqlSelectParser.AddWhereClause(string.Format("IDLANGUAGE = {0}", DBUtils.ObjectToString(key, true)));
		        return DBUtils.Exists(sqlSelectParser.GetNewSelectSQL());
		    }
		    protected  static string GetQueryString (CursorGTraduzioni dataCursor)
		    {
		        return IT4.Common.Classes.IdeaString.ParseTemplate("" +
		        "				select IDLANGUAGE, DESCRIPTION" +
		        "				from V_LANGUAGES" +
		        "			", "GlobalPublic;GlobalPrivate;UserProperties;CursorGTraduzioni", new object[] { ApplicationPublicSession.Current, ApplicationPrivateSession.Current, ApplicationPrivateSession.Current.UserInfo, dataCursor});
		    }
		    public  static List<object> GetItemsAll (CursorGTraduzioni dataCursor, DBUtils DBUtils)
		    {
		        return GetItems(dataCursor, null, null, DBUtils);
		    }
		    public  static List<object> GetItemByKey (CursorGTraduzioni dataCursor, object key, DBUtils DBUtils)
		    {
		        if (key == null)
		        {
		            return new List<object>();
		        }
		        List<object> items = GetItems(dataCursor, string.Format("IDLANGUAGE = {0}", DBUtils.ObjectToString(key, true)), null, DBUtils);
		        return items;
		    }
		    public  static List<object> GetItemsBySearchText (CursorGTraduzioni dataCursor, string searchText, DBUtils DBUtils)
		    {
		        string searchWhereClause = LookupFieldHelper.GetSearchWhereClause(DBUtils, "DESCRIPTION", searchText, "CONTAINS");
		        string searchFromClause = null;
		        return GetItems(dataCursor, searchWhereClause, searchFromClause, DBUtils);
		    }
		    private  static List<object> GetItems (CursorGTraduzioni dataCursor, string plusWhereText, string plusFromText, DBUtils DBUtils)
		    {
		        IT4.Common.DB.SQLSelectParser sqlSelectParser = new IT4.Common.DB.SQLSelectParser();
		        sqlSelectParser.Parse(GetQueryString(dataCursor), DBUtils.DBPlatform);
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
		                                      value = readerLookup.GetValue(readerLookup.GetOrdinal("DESCRIPTION")).ToString() });
		            }
		            readerLookup.Close();
		        }
		        return LookupItems;
		    }
		}
		#endregion
		#endregion
		public GTraduzioniLookups ()
		{
		}
	}
	public class CursorGTraduzioniItem:AbstractItem
	{
		#region SubClasses
		#endregion
		public CursorGTraduzioniItem (int index):base(index)
		{
			this.CursorGTraduzioniItemSort = index;
		}
		public  override int ItemSort
		{
		    get
		    {
		        return CursorGTraduzioniItemSort;
		    }
		    set
		    {
		        CursorGTraduzioniItemSort = value;
		    }
		}
		public int CursorGTraduzioniItemSort;
		public string STRINGVALUE;
		public Int32? IDLANGUAGE;
		public Int32? IDSTRING;
		public Int32? ItemPrimaryKeyValue;
		public Int32? IDTRANSLATION;
		public  object GetSTRINGVALUE ()
		{
			return this.STRINGVALUE == null ? (object)DBNull.Value : (object)this.STRINGVALUE;
		}
		public  void SetSTRINGVALUE (object value)
		{
			STRINGVALUE = value == null || value == DBNull.Value ? (string)null : Convert.ToString(value);
		}
		public  bool IsChangedSTRINGVALUE (CursorGTraduzioniItem newItem)
		{
			return (this.GetSTRINGVALUE() == null && newItem.GetSTRINGVALUE() != null) || (this.GetSTRINGVALUE() != null && !this.GetSTRINGVALUE().Equals(newItem.GetSTRINGVALUE()));
		}
		public  bool IsChangedIDLANGUAGE (CursorGTraduzioniItem newItem)
		{
			return (this.GetIDLANGUAGE() == null && newItem.GetIDLANGUAGE() != null) || (this.GetIDLANGUAGE() != null && !this.GetIDLANGUAGE().Equals(newItem.GetIDLANGUAGE()));
		}
		public  void SetIDTRANSLATION (object value)
		{
			IDTRANSLATION = value == null || value == DBNull.Value ? (Int32?)null : Convert.ToInt32(value);
		}
		public  override void SetPrimaryKeyValue (object value)
		{
			this.ItemPrimaryKeyValue = value == null || value == DBNull.Value ? (Int32?)null : Convert.ToInt32(value);
		}
		public  object GetIDTRANSLATION ()
		{
			return this.IDTRANSLATION == null ? (object)DBNull.Value : (object)this.IDTRANSLATION;
		}
		public  bool IsChangedIDSTRING (CursorGTraduzioniItem newItem)
		{
			return (this.GetIDSTRING() == null && newItem.GetIDSTRING() != null) || (this.GetIDSTRING() != null && !this.GetIDSTRING().Equals(newItem.GetIDSTRING()));
		}
		public  override bool CheckIfIsItemDataRow (DataRow dataRow)
		{
			object dataRowPrimaryKeyValue = dataRow["idtranslation"];
			return this.GetPrimaryKeyValue().Equals(dataRowPrimaryKeyValue == null || dataRowPrimaryKeyValue == DBNull.Value ? (Int32?)null : Convert.ToInt32(dataRowPrimaryKeyValue));
		}
		public  object GetIDSTRING ()
		{
			return this.IDSTRING == null ? (object)DBNull.Value : (object)this.IDSTRING;
		}
		public  override object GetPrimaryKeyValue ()
		{
			return this.ItemPrimaryKeyValue == null ? (object)DBNull.Value : (object)this.ItemPrimaryKeyValue;
		}
		public  override bool IsChanged (AbstractItem newItem)
		{
			CursorGTraduzioniItem newTypedItem = (CursorGTraduzioniItem)newItem;
			bool isChanged = false;
			isChanged |= IsChangedIDTRANSLATION(newTypedItem);
			isChanged |= IsChangedIDSTRING(newTypedItem);
			isChanged |= IsChangedSTRINGVALUE(newTypedItem);
			isChanged |= IsChangedIDLANGUAGE(newTypedItem);
			return isChanged;
		}
		public  void SetIDLANGUAGE (object value)
		{
			IDLANGUAGE = value == null || value == DBNull.Value ? (Int32?)null : Convert.ToInt32(value);
		}
		public  object GetIDLANGUAGE ()
		{
			return this.IDLANGUAGE == null ? (object)DBNull.Value : (object)this.IDLANGUAGE;
		}
		public  bool IsChangedIDTRANSLATION (CursorGTraduzioniItem newItem)
		{
			return (this.GetIDTRANSLATION() == null && newItem.GetIDTRANSLATION() != null) || (this.GetIDTRANSLATION() != null && !this.GetIDTRANSLATION().Equals(newItem.GetIDTRANSLATION()));
		}
		public  void SetIDSTRING (object value)
		{
			IDSTRING = value == null || value == DBNull.Value ? (Int32?)null : Convert.ToInt32(value);
		}
	}
	public class CursorGTraduzioniFromClauseRuntimeParsingValueCollection:RuntimeParsingValueCollection
	{
		#region SubClasses
		#endregion
		public CursorGTraduzioniFromClauseRuntimeParsingValueCollection ():base()
		{
		}
		public  static RuntimeParsingValueCollection GetNewRuntimeParsingValueCollection ()
		{
			return new CursorGTraduzioniFromClauseRuntimeParsingValueCollection();
		}
	}
}
