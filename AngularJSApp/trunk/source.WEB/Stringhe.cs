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
	public class StringhePage:BasePage
	{
		#region SubClasses
		#endregion
		public StringhePage ():base()
		{
		}
		public   RTCell CursorGStringheREFERENCERTCell
		{
		    get
		    {
		        return GridHelperCursorGStringhe.GetCurrentRowRT().GetRTCell("REFERENCE", CursorGStringheREFERENCERTI.SecurityLevel);
		    }
		}
		public   RTCell CursorGStringheLABELRTCell
		{
		    get
		    {
		        return GridHelperCursorGStringhe.GetCurrentRowRT().GetRTCell("LABEL", CursorGStringheLABELRTI.SecurityLevel);
		    }
		}
		public   RTCell CursorGStringheIDSTRINGRTCell
		{
		    get
		    {
		        return GridHelperCursorGStringhe.GetCurrentRowRT().GetRTCell("IDSTRING", CursorGStringheIDSTRINGRTI.SecurityLevel);
		    }
		}
		public   CursorGStringhe CursorGStringhe
		{
		    get
		    {
		        return cursorGStringhe;
		    }
		    set
		    {
		        cursorGStringhe=value;
		    }
		}
		public static  ModulesArray CursorGStringheREFERENCERTIModules
		{
		    get
		    {
		        return null;
		    }
		}
		public static  StringhePersistenceVar PersistentVarStatic
		{
		    get
		    {
		        if (SessionHelper.GetValue<StringhePersistenceVar>("Stringhe.PersistenceVar") != null) return SessionHelper.GetValue<StringhePersistenceVar>("Stringhe.PersistenceVar");
		        else return new StringhePersistenceVar();
		    }
		}
		public   StringhePersistenceVar PersistentVar
		{
		    get
		    {
		        StringhePersistenceVar result =StringhePage.PersistentVarStatic;
		        return result;
		    }
		}
		public static  SecurityLevel PageSecurityLevel
		{
		    get
		    {
		        return SecurityLevels.@Restricted("Stringhe");
		    }
		}
		public   PageInvokeParams ShowPageParamsGStringhe
		{
		    get
		    {
		        if(ApplicationPrivateSession.Current.PageInvokeParams == null ||
		          !showPageParamsAllowedTypesList.Contains(ApplicationPrivateSession.Current.PageInvokeParams.GetType()))
		        {
		            ApplicationPrivateSession.Current.PageInvokeParams = new ShowPageParamsForBrowseGStringhe();
		        }
		        return ApplicationPrivateSession.Current.PageInvokeParams;
		    }
		}
		public static  ModulesArray CursorGStringheLABELRTIModules
		{
		    get
		    {
		        return null;
		    }
		}
		public static  ModulesArray CursorGStringheIDSTRINGRTIModules
		{
		    get
		    {
		        return null;
		    }
		}
		public static  ModulesArray PageModules
		{
		    get
		    {
		        return null;
		    }
		}
		public static  ModulesArray GStringheRTIModules
		{
		    get
		    {
		        return null;
		    }
		}
		public RTGrid GStringheRTI;
		public RTColumn CursorGStringheREFERENCERTI;
		public RunTimeComponent PageRTI;
		public RTColumn CursorGStringheLABELRTI;
		public RTColumn CursorGStringheIDSTRINGRTI;
		public  static KamNavigationResult ShowPageForEditGStringhe (Int32? idstring)
		{
			ShowPageParamsForEditGStringhe.InitShowPageParams(idstring);
			return new KamNavigationResult() { ActionResult = NavigationActionResults.GoToPageForEdit, PageUrl = "#Stringhe", CursorName = "CursorGStringhe" };
		}
		private  object GetGridColumnsValidatorsEntriesCursorGStringhe (Dictionary<string, string> columnsEntries)
		{
			return new
			{
			IDSTRINGTextSizeWebGridDataColumnValidatorEntry = ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry("Il testo digitato supera la dimensione massima del campo:", new { FieldName = columnsEntries["CursorGStringheIDSTRINGColumnsEntry"].Trim() }) + " 10"
			,
			LABELTextSizeWebGridDataColumnValidatorEntry = ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry("Il testo digitato supera la dimensione massima del campo:", new { FieldName = columnsEntries["CursorGStringheLABELColumnsEntry"].Trim() }) + " 100"
			,
			REFERENCETextSizeWebGridDataColumnValidatorEntry = ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry("Il testo digitato supera la dimensione massima del campo:", new { FieldName = columnsEntries["CursorGStringheREFERENCEColumnsEntry"].Trim() }) + " 250"
			};
		}
		public  void GStringheUpdateDataSet (GridDataRequestParamsObj<CursorGStringheItem> gridDataRequestParamsObj)
		{
			BusinessPage.BeforeGridUpdateDataSet(this.CursorGStringhe, gridDataRequestParamsObj.Sort, gridDataRequestParamsObj.Filters);
			GridHelperCursorGStringhe.UpdateDataSet(gridDataRequestParamsObj.ComponentShowModeEnumValue, gridDataRequestParamsObj.PageIndex, gridDataRequestParamsObj.PageSize, gridDataRequestParamsObj.GetSortClause(CursorGStringhe, "IDSTRING DESC"), gridDataRequestParamsObj.GetWhereClause(CursorGStringhe, GridHelperCursorGStringhe), gridDataRequestParamsObj.GetFromClauseForFilters(CursorGStringhe, GridHelperCursorGStringhe), BusinessPage.AfterDatasetUpdate, true);
		}
		private  string GetCursorGStringheLABELFilter01Suggestion ()
		{
			string suggestion = "";
			return suggestion;
		}
		public  bool CursorGStringheIDSTRINGIsFieldStillValid ()
		{
			return true;
		}
		public  void CursorGStringheSelectRow (int rowIndex)
		{
			GridHelperCursorGStringhe.SelectRow(rowIndex);
		}
		private  string GetCursorGStringheREFERENCEFilter01Suggestion ()
		{
			string suggestion = "";
			return suggestion;
		}
		public  object CursorGStringheManageRestoreGridDataSourceRequest (GridDataRequestParamsObj<CursorGStringheItem> gridDataRequestParamsObj)
		{
			gridDataRequestParamsObj.PageIndex = 0;
			gridDataRequestParamsObj.PageSize = 20;
			gridDataRequestParamsObj.Sort = null;
			gridDataRequestParamsObj.Filters = CursorGStringheGetDefaultFilters();
			this.GStringheUpdateDataSet(gridDataRequestParamsObj);
			this.CursorGStringheInitCurrentItemsForClient();
			object responseObj = new
			{
			    CurrentRowsRTI = GridHelperCursorGStringhe.GetCurrentRTRowsList(),
			    GridSourceData = new
			    {
			        CurrentItemsList = this.CursorGStringhe.CurrentItemsList,
			        TotalRowsCount = this.CursorGStringhe.TotalRowsCount,
			        AreRowsLimited = this.CursorGStringhe.AreRowsLimited
			      },
			      GridDataRequestParamsObj = gridDataRequestParamsObj,
			    FiltersDataSources = this.GetComponentFiltersDataSourcesCursorGStringhe(gridDataRequestParamsObj)
			};
			return responseObj;
		}
		protected  override void InitializeComponent20 ()
		{
			PageRTI = new RunTimeComponent(null);
			PageRTI.SecurityLevel = PageSecurityLevel;
			PageRTI.ModulesArray = PageModules;
			GStringheRTI = new RTGrid(PageRTI);
			GStringheRTI.SecurityLevel = SecurityLevels.Restricted("StringhePage");
			GStringheRTI.ModulesArray = GStringheRTIModules;
			GStringheRTI.AllowSaveAndNew = false;
			InitComponentRTIsGStringhe();
		}
		public  void GStringheInitFilterFieldMapping ()
		{
			GridHelperCursorGStringhe.RegisterFilterFieldMapping("CursorGStringheIDSTRINGFilter01", "idstring", "text", "FilterGStringheIDSTRING");
			GridHelperCursorGStringhe.RegisterFilterFieldMapping("CursorGStringheLABELFilter01", "label", "text", "FilterGStringheLABEL");
			GridHelperCursorGStringhe.RegisterFilterFieldMapping("CursorGStringheREFERENCEFilter01", "reference", "text", "FilterGStringheREFERENCE");
		}
		private  object GetColumnsHeaderEntriesCursorGStringhe (Dictionary<string, string> columnsEntries)
		{
			return new
			{
			IDSTRINGColumnEntry = columnsEntries["CursorGStringheIDSTRINGColumnsEntry"]
			,
			LABELColumnEntry = columnsEntries["CursorGStringheLABELColumnsEntry"]
			,
			REFERENCEColumnEntry = columnsEntries["CursorGStringheREFERENCEColumnsEntry"]
			};
		}
		public  void CursorGStringheInitCurrentItemsForClient ()
		{
			int currentRowIndex = CursorGStringhe.CurrentRowIndex;
			for (int i = 0; i < CursorGStringhe.CurrentItemsList.Count; i++)
			{
			    AbstractItem abstractItem = CursorGStringhe.CurrentItemsList[i];
			    CursorGStringheSelectRow(abstractItem.ItemSort);
			    CursorGStringheInitItemForClient((CursorGStringheItem)abstractItem);
			}
			CursorGStringheSelectRow(currentRowIndex);
		}
		public  KamNavigationResult GStringhe_ItemCommand (int rowIndex, string columnName, string commandName)
		{
			NavigationResult result = new KamNavigationResult()
			{
			    ActionResult = NavigationActionResults.UpdateComponent,
			    CursorName = "CursorGStringhe"
			};
			bool commandContinue = true;
			BusinessPage.BeforeCommand("GStringhe", commandName, rowIndex, columnName, ref commandContinue, ref result);
			if (commandContinue)
			{
			    this.CursorGStringheSelectRow(rowIndex);
			this.GStringhe_ManageFieldOnClick(commandName, columnName, ref result);
			BusinessPage.AfterCommand("GStringhe", commandName, columnName, ref result);
			}
			return (KamNavigationResult)result;
		}
		public  void CursorGStringheSetUpdateCommand (IDbCommandEx Command)
		{
			Command.CommandText = "UPDATE V_IDSTRINGS SET IDSTRING = @IDSTRING,LABEL = @LABEL,REFERENCE = @REFERENCE WHERE idstring = @idstring";
			Command.Parameters.Add(DBUtils.NewParameter("@IDSTRING", typeof(Int32)));
			Command.Parameters.Add(DBUtils.NewParameter("@LABEL", typeof(String)));
			Command.Parameters.Add(DBUtils.NewParameter("@REFERENCE", typeof(String)));
		}
		protected  override void InitializeComponent10 ()
		{
			showPageParamsAllowedTypesList.Add(typeof(ShowPageParamsForBrowseGStringhe));
			showPageParamsAllowedTypesList.Add(typeof(ShowPageParamsForEditGStringhe));
			showPageParamsAllowedTypesList.Add(typeof(ShowPageParamsForInsertGStringhe));
			IDbDataAdapter DataAdapterGStringhe = DBUtils.NewDataAdapter();
			IDbCommandEx CommandGStringheSelect = DBUtils.NewCommand(string.Empty);
			DataAdapterGStringhe.SelectCommand = CommandGStringheSelect;
			CursorGStringheSetSelectCommand(CommandGStringheSelect);
			IDbCommandEx CommandGStringheUpdate = DBUtils.NewCommand(string.Empty);
			DataAdapterGStringhe.UpdateCommand = CommandGStringheUpdate;
			CursorGStringheSetUpdateCommand(CommandGStringheUpdate);
			IDbCommandEx CommandGStringheInsert = DBUtils.NewCommand(string.Empty);
			DataAdapterGStringhe.InsertCommand = CommandGStringheInsert;
			CursorGStringheSetInsertCommand(CommandGStringheInsert);
			CursorGStringhe = new CursorGStringhe(null, new DataSet(), "GStringhe");
			CursorGStringhe.DataAdapter = (DbDataAdapter)DataAdapterGStringhe;
		}
		public  void CursorGStringheDeleteCurrentItem (ref NavigationResult result)
		{
			bool cancel = false;
			BusinessPage.BeforeRowDelete(CursorGStringhe, ref cancel, ref result);
			if (!cancel)
			{
			    this.CursorGStringhePerformDelete(ref result);
			}
		}
		public  void CursorGStringhePerformAfterInsert (ref NavigationResult result)
		{
			result = ShowPageForBrowseGStringhe(CursorGStringhe.idstring);
			GridHelperCursorGStringhe.PerformAfterAction(BusinessPage.AfterRowInsert, ref result);
		}
		public  object GetComponentEntriesCursorGStringhe ()
		{
			Dictionary<string, string> columnsEntries = new Dictionary<string, string>();
			columnsEntries.Add("CursorGStringheIDSTRINGColumnsEntry", ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry("idstring"));
			columnsEntries.Add("CursorGStringheLABELColumnsEntry", ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry("label"));
			columnsEntries.Add("CursorGStringheREFERENCEColumnsEntry", ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry("reference"));
			Dictionary<string, string> tooltipsEntries = new Dictionary<string, string>();
			tooltipsEntries.Add("IDSTRINGTooltipsEntry", ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry(""));
			tooltipsEntries.Add("LABELTooltipsEntry", ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry(""));
			tooltipsEntries.Add("REFERENCETooltipsEntry", ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry(""));
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
			    ColumnsHeaderEntries = GetColumnsHeaderEntriesCursorGStringhe(columnsEntries),
			    ColumnsGroupsEntries = GetColumnsGroupsEntriesCursorGStringhe(),
			    GridColumnsValidatorsEntries = GetGridColumnsValidatorsEntriesCursorGStringhe(columnsEntries),
			    FiltersEntries = GetFiltersEntriesMethodNameCursorGStringhe(),
			    FiltersSuggestions =  GetFiltersSuggestionsCursorGStringhe(),
			    ColumnsTooltipsEntries = GetColumnsTooltipEntriesCursorGStringhe(tooltipsEntries),
			    ButtonsPanelEntries = GetButtonsPanelEntriesCursorGStringhe(buttonsPanelEntries)
			};
		}
		private  object GetFiltersEntriesMethodNameCursorGStringhe ()
		{
			return new
			{
			CursorGStringheIDSTRINGFilter01 = ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry("idstring")
			,
			CursorGStringheLABELFilter01 = ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry("label")
			,
			CursorGStringheREFERENCEFilter01 = ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry("reference")
			};
		}
		public  object GetComponentRTIsGStringhe ()
		{
			return new
			{
			    ComponentRTI = GStringheRTI,
			    CurrentRowsRTI = GridHelperCursorGStringhe.GetCurrentRTRowsList(),
			    GridColumnsRTI = new
			    {
			    CursorGStringheIDSTRINGRTI
			,
			CursorGStringheLABELRTI
			,
			CursorGStringheREFERENCERTI
			    }
			};
		}
		public  void GStringheInsertNew ()
		{
			GridHelperCursorGStringhe.InsertNewRow(this.CursorGStringheSetDefaultValues);
		}
		public  void CursorGStringheInitItemForClient (CursorGStringheItem currentItem)
		{
			currentItem.FieldsData = new
			{
			};
		}
		public  static KamNavigationResult ShowPageForBrowseGStringhe (Int32? idstring)
		{
			ShowPageParamsForBrowseGStringhe.InitShowPageParams(idstring);
			return new KamNavigationResult() { ActionResult = NavigationActionResults.GoToPageForBrowse, PageUrl = "#Stringhe", CursorName = "CursorGStringhe" };
		}
		private  List<KamColumn> GetKamGStringheColumnsList ()
		{
			List<KamColumn> kamColumnsList = new List<KamColumn>();
			kamColumnsList.Add(new KamColumn() { FieldName = "IDSTRING", DBColumnName = @"idstring", FieldTypeName = "Text" });
			kamColumnsList.Add(new KamColumn() { FieldName = "LABEL", DBColumnName = @"label", FieldTypeName = "Text" });
			kamColumnsList.Add(new KamColumn() { FieldName = "REFERENCE", DBColumnName = @"reference", FieldTypeName = "Text" });
			return kamColumnsList;
		}
		public  object CursorGStringheGetItemDependentFieldsUpdatedResponseObj ()
		{
			CursorGStringheItem currentItem = this.CursorGStringheGetCurrentItem();
			CursorGStringheInitItemForClient(currentItem);
			return currentItem;
		}
		public  void CursorGStringheSetInsertCommand (IDbCommandEx Command)
		{
			Command.CommandText = "INSERT INTO V_IDSTRINGS (idstring, LABEL,REFERENCE) VALUES (@idstring, @LABEL,@REFERENCE)";
			Command.Parameters.Add(DBUtils.NewParameter("@IDSTRING", typeof(Int32)));
			Command.Parameters.Add(DBUtils.NewParameter("@LABEL", typeof(String)));
			Command.Parameters.Add(DBUtils.NewParameter("@REFERENCE", typeof(String)));
		}
		public  NavigationResult GStringheCancel ()
		{
			NavigationResult result = new KamNavigationResult();
			result = ShowPageForBrowseGStringhe(CursorGStringhe.idstring);
			BusinessPage.AfterRowCancel(CursorGStringhe, ref result);
			PersistentVar.ClearSaveAndNewVar();
			return result;
		}
		private  object GetFiltersSuggestionsCursorGStringhe ()
		{
			return new
			{
			CursorGStringheIDSTRINGFilter01 = this.GetCursorGStringheIDSTRINGFilter01Suggestion()
			,
			CursorGStringheLABELFilter01 = this.GetCursorGStringheLABELFilter01Suggestion()
			,
			CursorGStringheREFERENCEFilter01 = this.GetCursorGStringheREFERENCEFilter01Suggestion()
			};
		}
		public  void CursorGStringheRegisterComponentRTIsClientChanges (JObject componentRTIs)
		{
			RTGrid clientRTComponent = componentRTIs.GetValue("ComponentRTI").ToObject<RTGrid>();
			this.GStringheRTI.GlobalCanDelete = clientRTComponent.GlobalCanDelete;
			this.GStringheRTI.GlobalCanEdit = clientRTComponent.GlobalCanEdit;
			this.GStringheRTI.GlobalCanInsert = clientRTComponent.GlobalCanInsert;
			this.GStringheRTI.GlobalCanRead = clientRTComponent.GlobalCanRead;
			this.GStringheRTI.GlobalReadOnly = clientRTComponent.GlobalReadOnly;
			this.GStringheRTI.GlobalVisible = clientRTComponent.GlobalVisible;
			this.GStringheRTI.AllowSaveAndNew = clientRTComponent.AllowSaveAndNew;
			RTColumn clientRTColumn = null;
			JObject clientGridColumnsRTI = componentRTIs.GetValue("GridColumnsRTI").ToObject<JObject>();
			clientRTColumn = clientGridColumnsRTI.GetValue("CursorGStringheIDSTRINGRTI").ToObject<RTColumn>();
			this.CursorGStringheIDSTRINGRTI.GlobalCanDelete = clientRTColumn.GlobalCanDelete;
			this.CursorGStringheIDSTRINGRTI.GlobalCanEdit = clientRTColumn.GlobalCanEdit;
			this.CursorGStringheIDSTRINGRTI.GlobalCanInsert = clientRTColumn.GlobalCanInsert;
			this.CursorGStringheIDSTRINGRTI.GlobalCanRead = clientRTColumn.GlobalCanRead;
			this.CursorGStringheIDSTRINGRTI.GlobalReadOnly = clientRTColumn.GlobalReadOnly;
			this.CursorGStringheIDSTRINGRTI.GlobalVisible = clientRTColumn.GlobalVisible;
			clientRTColumn = clientGridColumnsRTI.GetValue("CursorGStringheLABELRTI").ToObject<RTColumn>();
			this.CursorGStringheLABELRTI.GlobalCanDelete = clientRTColumn.GlobalCanDelete;
			this.CursorGStringheLABELRTI.GlobalCanEdit = clientRTColumn.GlobalCanEdit;
			this.CursorGStringheLABELRTI.GlobalCanInsert = clientRTColumn.GlobalCanInsert;
			this.CursorGStringheLABELRTI.GlobalCanRead = clientRTColumn.GlobalCanRead;
			this.CursorGStringheLABELRTI.GlobalReadOnly = clientRTColumn.GlobalReadOnly;
			this.CursorGStringheLABELRTI.GlobalVisible = clientRTColumn.GlobalVisible;
			clientRTColumn = clientGridColumnsRTI.GetValue("CursorGStringheREFERENCERTI").ToObject<RTColumn>();
			this.CursorGStringheREFERENCERTI.GlobalCanDelete = clientRTColumn.GlobalCanDelete;
			this.CursorGStringheREFERENCERTI.GlobalCanEdit = clientRTColumn.GlobalCanEdit;
			this.CursorGStringheREFERENCERTI.GlobalCanInsert = clientRTColumn.GlobalCanInsert;
			this.CursorGStringheREFERENCERTI.GlobalCanRead = clientRTColumn.GlobalCanRead;
			this.CursorGStringheREFERENCERTI.GlobalReadOnly = clientRTColumn.GlobalReadOnly;
			this.CursorGStringheREFERENCERTI.GlobalVisible = clientRTColumn.GlobalVisible;
		}
		public  NavigationResult PostEditedItemsCursorGStringhe (bool isSaveAndNewAction = false)
		{
			NavigationResult result = new KamNavigationResult();
			CursorGStringhe.IsSaveAndNewAction = isSaveAndNewAction;
			bool cancel = false;
			switch(GridHelperCursorGStringhe.ComponentShowMode)
			{
			    case ComponentShowMode.edit:
			        GridHelperCursorGStringhe.UpdateEditedItems(BusinessPage.BeforeRowUpdate, ref cancel, ref result);
			        break;
			    case ComponentShowMode.insert:
			        GridHelperCursorGStringhe.UpdateEditedItems(BusinessPage.BeforeRowInsert, ref cancel, ref result);
			        break;
			    default:
			        throw new NotImplementedException();
			}
			if (!cancel)
			{
			    GridHelperCursorGStringhe.PostChanges();
			    if (isSaveAndNewAction)
			    {
			        PersistentVar.IsSaveAndNewAction = isSaveAndNewAction;
			        PersistentVar.OldCurrentRowSaveAndNew = CursorGStringhe.CurrentRow;
			    }
			    switch (GridHelperCursorGStringhe.ComponentShowMode)
			    {
			        case ComponentShowMode.edit:
			            this.CursorGStringhePerformAfterEdit(ref result);
			            break;
			           case ComponentShowMode.insert:
			            this.CursorGStringhePerformAfterInsert(ref result);
			            break;
			        default:
			            throw new NotImplementedException();
			    }
			}
			return result;
		}
		public  void CursorGStringheSelectRowByItem (AbstractItem item)
		{
			GridHelperCursorGStringhe.SelectRow(item);
		}
		protected  override BusinessPage CreateNewBusinessPage ()
		{
			return new BSNStringhePage(this);
		}
		public  void CursorGStringheREFERENCEResetFieldIfNoLongerValid (bool skipCheckCurrentField)
		{
			bool checkDependentFields = true;
			if(!skipCheckCurrentField)
			{
			    if (!CursorGStringheREFERENCEIsFieldStillValid())
			    {
			        CursorGStringheItem currentItem = this.CursorGStringheGetCurrentItem();
			        currentItem.SetREFERENCE(null);
			        this.CursorGStringheRegisterCurrentItemClientChanges(currentItem);
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
		public  static KamNavigationResult ShowPageForInsertGStringhe ()
		{
			ShowPageParamsForInsertGStringhe.InitShowPageParams();
			return new KamNavigationResult() { ActionResult = NavigationActionResults.GoToPageForInsert, PageUrl = "#Stringhe", CursorName = "CursorGStringhe" };
		}
		public  void CursorGStringheRegisterCurrentItemClientChanges (CursorGStringheItem item)
		{
			GridHelperCursorGStringhe.RegisterClientChanges(item);
			CursorGStringheSelectRowByItem(item);
		}
		private  object GetColumnsGroupsEntriesCursorGStringhe ()
		{
			return new
			{
			};
		}
		public  object CursorGStringheManageResetGridDataSourceRequest (GridDataRequestParamsObj<CursorGStringheItem> gridDataRequestParamsObj)
		{
			gridDataRequestParamsObj.PageIndex = 0;
			gridDataRequestParamsObj.PageSize = 20;
			gridDataRequestParamsObj.Sort = null;
			gridDataRequestParamsObj.Filters = null;
			this.GStringheUpdateDataSet(gridDataRequestParamsObj);
			this.CursorGStringheInitCurrentItemsForClient();
			object responseObj = new
			{
			    CurrentRowsRTI = GridHelperCursorGStringhe.GetCurrentRTRowsList(),
			    GridSourceData = new
			    {
			        CurrentItemsList = this.CursorGStringhe.CurrentItemsList,
			        TotalRowsCount = this.CursorGStringhe.TotalRowsCount,
			        AreRowsLimited = this.CursorGStringhe.AreRowsLimited
			      },
			      GridDataRequestParamsObj = gridDataRequestParamsObj
			};
			return responseObj;
		}
		private  object GetColumnsTooltipEntriesCursorGStringhe (Dictionary<string, string> tooltipsEntries)
		{
			return new
			{
			IDSTRINGTooltipsEntry = tooltipsEntries["IDSTRINGTooltipsEntry"],
			LABELTooltipsEntry = tooltipsEntries["LABELTooltipsEntry"],
			REFERENCETooltipsEntry = tooltipsEntries["REFERENCETooltipsEntry"],
			};
		}
		private  object GetButtonsPanelEntriesCursorGStringhe (Dictionary<string, string> buttonsPanelEntries)
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
		public  object CursorGStringheManageGetGridDataSourceRequest (GridDataRequestParamsObj<CursorGStringheItem> gridDataRequestParamsObj, PersistentGridDataResponseParamsObj persistentGridDataResponseParamsObj)
		{
			if(gridDataRequestParamsObj.ComponentShowModeEnumValue == ComponentShowMode.edit ||
			gridDataRequestParamsObj.ComponentShowModeEnumValue == ComponentShowMode.insert)
			{
			this.RegisterClientChangesCursorGStringhe(gridDataRequestParamsObj.CurrentItemsList);
			}
			if (persistentGridDataResponseParamsObj != null && gridDataRequestParamsObj.AreFiltersDifferent(persistentGridDataResponseParamsObj.GridDataResponseParamsObj.Filters, GridHelperCursorGStringhe))
			{
			gridDataRequestParamsObj.PageIndex = 0;
			}
			this.GStringheUpdateDataSet(gridDataRequestParamsObj);
			this.GridRowsPreRenderCursorGStringhe();
			this.CursorGStringheInitCurrentItemsForClient();
			object responseObj = new
			{
			CurrentRowsRTI = GridHelperCursorGStringhe.GetCurrentRTRowsList(),
			PageIndex = gridDataRequestParamsObj.PageIndex,
			GridSourceData = new
			{
			   CurrentItemsList = CursorGStringhe.CurrentItemsList,
			   TotalRowsCount = CursorGStringhe.TotalRowsCount,
			   AreRowsLimited = CursorGStringhe.AreRowsLimited
			}
			};
			return responseObj;
		}
		public  FiltersInformation[] CursorGStringheGetDefaultFilters ()
		{
			List<FiltersInformation> gridDataResponseParamsFilterObjList = new List<FiltersInformation>();
			return gridDataResponseParamsFilterObjList.ToArray();
		}
		public  void InitXlsHttpResponseMessageCursorGStringhe (HttpResponseMessage httpResponseMessage)
		{
			ExportColumns Columns=new ExportColumns();
			if (CursorGStringheIDSTRINGRTI.CanRead && CursorGStringheIDSTRINGRTI.GlobalExportXLS) Columns.Add("IDSTRING",new ExportColumn("IDSTRING", ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry("idstring"), string.Empty));
			if (CursorGStringheLABELRTI.CanRead && CursorGStringheLABELRTI.GlobalExportXLS) Columns.Add("LABEL",new ExportColumn("LABEL", ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry("label"), string.Empty));
			if (CursorGStringheREFERENCERTI.CanRead && CursorGStringheREFERENCERTI.GlobalExportXLS) Columns.Add("REFERENCE",new ExportColumn("REFERENCE", ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry("reference"), string.Empty));
			CursorGStringhe.InitExcelHttpResponseMessage(httpResponseMessage, Columns);
		}
		public  void RegisterClientChangesCursorGStringhe (List<CursorGStringheItem> clientItemList)
		{
			GridHelperCursorGStringhe.RegisterClientChanges(clientItemList.Cast<AbstractItem>().ToList());
		}
		public  void CursorGStringheIDSTRINGResetFieldIfNoLongerValid (bool skipCheckCurrentField)
		{
			bool checkDependentFields = true;
			if(!skipCheckCurrentField)
			{
			    if (!CursorGStringheIDSTRINGIsFieldStillValid())
			    {
			        CursorGStringheItem currentItem = this.CursorGStringheGetCurrentItem();
			        currentItem.SetIDSTRING(null);
			        this.CursorGStringheRegisterCurrentItemClientChanges(currentItem);
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
		public  object GetComponentFiltersDataSourcesCursorGStringhe (GridDataRequestParamsObj<CursorGStringheItem> gridDataRequestParamsObj)
		{
			return new
			{
			};
		}
		public  void InitComponentRTIsGStringhe ()
		{
			CursorGStringheIDSTRINGRTI = new RTColumn("IDSTRING", "IDSTRING");
			CursorGStringheIDSTRINGRTI.GlobalVisible = false;
			CursorGStringheIDSTRINGRTI.GlobalExportXLS = false;
			CursorGStringheIDSTRINGRTI.SecurityLevel = SecurityLevels.Restricted("StringhePage");
			CursorGStringheIDSTRINGRTI.ModulesArray = CursorGStringheIDSTRINGRTIModules;
			CursorGStringheIDSTRINGRTI.GlobalReadOnly = false;
			CursorGStringheIDSTRINGRTI.ImmediateFieldUpdate = false;
			GStringheRTI.AddRTColumn(CursorGStringheIDSTRINGRTI);
			CursorGStringheIDSTRINGRTI.ResetFieldIfNoLongerValid = this.CursorGStringheIDSTRINGResetFieldIfNoLongerValid;
			CursorGStringheLABELRTI = new RTColumn("LABEL", "LABEL");
			CursorGStringheLABELRTI.GlobalVisible = true;
			CursorGStringheLABELRTI.GlobalExportXLS = true;
			CursorGStringheLABELRTI.SecurityLevel = SecurityLevels.Restricted("StringhePage");
			CursorGStringheLABELRTI.ModulesArray = CursorGStringheLABELRTIModules;
			CursorGStringheLABELRTI.GlobalReadOnly = false;
			CursorGStringheLABELRTI.ImmediateFieldUpdate = false;
			GStringheRTI.AddRTColumn(CursorGStringheLABELRTI);
			CursorGStringheLABELRTI.ResetFieldIfNoLongerValid = this.CursorGStringheLABELResetFieldIfNoLongerValid;
			CursorGStringheREFERENCERTI = new RTColumn("REFERENCE", "REFERENCE");
			CursorGStringheREFERENCERTI.GlobalVisible = true;
			CursorGStringheREFERENCERTI.GlobalExportXLS = true;
			CursorGStringheREFERENCERTI.SecurityLevel = SecurityLevels.Restricted("StringhePage");
			CursorGStringheREFERENCERTI.ModulesArray = CursorGStringheREFERENCERTIModules;
			CursorGStringheREFERENCERTI.GlobalReadOnly = false;
			CursorGStringheREFERENCERTI.ImmediateFieldUpdate = false;
			GStringheRTI.AddRTColumn(CursorGStringheREFERENCERTI);
			CursorGStringheREFERENCERTI.ResetFieldIfNoLongerValid = this.CursorGStringheREFERENCEResetFieldIfNoLongerValid;
		}
		public  void CursorGStringheFieldChanged (string fieldName)
		{
			CursorGStringheItem currentItem = this.CursorGStringheGetCurrentItem();
			BusinessPage.FieldChanged(this.CursorGStringhe, fieldName);
			GridHelperCursorGStringhe.RegisterCursorChanges();
			CursorGStringheItem currentItemForBSNChanges = this.CursorGStringheGetCurrentItem();
			if (currentItem.IsChangedIDSTRING(currentItemForBSNChanges))
			{
			this.CursorGStringheIDSTRINGResetFieldIfNoLongerValid(false);
			}
			if (currentItem.IsChangedLABEL(currentItemForBSNChanges))
			{
			this.CursorGStringheLABELResetFieldIfNoLongerValid(false);
			}
			if (currentItem.IsChangedREFERENCE(currentItemForBSNChanges))
			{
			this.CursorGStringheREFERENCEResetFieldIfNoLongerValid(false);
			}
		}
		public  bool CursorGStringheREFERENCEIsFieldStillValid ()
		{
			return true;
		}
		public  CursorGStringheItem CursorGStringheGetCurrentItem ()
		{
			return (CursorGStringheItem)GridHelperCursorGStringhe.GetCurrentItem();
		}
		public  bool CursorGStringheLABELIsFieldStillValid ()
		{
			return true;
		}
		public  void CursorGStringheLABELResetFieldIfNoLongerValid (bool skipCheckCurrentField)
		{
			bool checkDependentFields = true;
			if(!skipCheckCurrentField)
			{
			    if (!CursorGStringheLABELIsFieldStillValid())
			    {
			        CursorGStringheItem currentItem = this.CursorGStringheGetCurrentItem();
			        currentItem.SetLABEL(null);
			        this.CursorGStringheRegisterCurrentItemClientChanges(currentItem);
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
		public  void CursorGStringheSetSelectCommand (IDbCommandEx Command)
		{
			object fTSFilterFromClause = new
			{
			};
			Command.CommandText=IT4.Common.Classes.IdeaString.ParseTemplate("SELECT " +
			"						IDSTRING, " +
			"						LABEL, " +
			"						REFERENCE" +
			"					FROM V_IDSTRINGS", "GlobalPublic;GlobalPrivate;UserProperties;CursorGStringhe;ShowPageParams;FTSFilterFromClause;PersistentVar", new object [] {ApplicationPublicSession.Current, ApplicationPrivateSession.Current, ApplicationPrivateSession.Current.UserInfo, CursorGStringhe, ShowPageParamsGStringhe, fTSFilterFromClause, PersistentVar});
		}
		public  void GStringhe_ManageFieldOnClick (string commandName, string columnName, ref NavigationResult result)
		{
			if(commandName == "DeleteRow")
			{
			    CursorGStringheDeleteCurrentItem(ref result);
			    return;
			}
		}
		public  object CursorGStringheGetFieldChangedResponseObj ()
		{
			CursorGStringheItem currentItem = this.CursorGStringheGetCurrentItem();
			CursorGStringheInitItemForClient(currentItem);
			return new
			{
			    ComponentRTIs = this.GetComponentRTIsGStringhe(),
			    CurrentItem = currentItem
			};
		}
		protected  override void InitializeComponent30 ()
		{
			PageRTI.SetLevel(ApplicationPrivateSession.Current.UserInfo);
			CursorGStringhe.InitKamColumnsList(GetKamGStringheColumnsList());
			GridHelperCursorGStringhe = new GridHelper(CursorGStringhe, this, GStringheRTI);
			GridHelperCursorGStringhe.GetNewRuntimeParsingValueCollectionMethod = CursorGStringheFromClauseRuntimeParsingValueCollection.GetNewRuntimeParsingValueCollection;
			GStringheInitFilterFieldMapping();
		}
		public  void GridRowsPreRenderCursorGStringhe ()
		{
			int currentRowIndex = CursorGStringhe.CurrentRowIndex;
			for(int i = 0; i < CursorGStringhe.CurrentItemsList.Count; i++)
			{
			    AbstractItem abstractItem = CursorGStringhe.CurrentItemsList[i];
			    CursorGStringheSelectRow(abstractItem.ItemSort);
			    BusinessPage.RowPreRender(CursorGStringhe);
			}
			CursorGStringheSelectRow(currentRowIndex);
		}
		public  void CursorGStringhePerformDelete (ref NavigationResult result)
		{
			result = ShowPageForBrowseGStringhe(CursorGStringhe.idstring);
			GridHelperCursorGStringhe.DeleteCurrentRow(BusinessPage.AfterRowDelete, ref result);
		}
		public  void CursorGStringheResetFieldIfNoLongerValid (string fieldName)
		{
			GStringheRTI.GetRTColumn(fieldName).ResetFieldIfNoLongerValid(true);
		}
		public  void CursorGStringhePerformAfterEdit (ref NavigationResult result)
		{
			result = ShowPageForBrowseGStringhe(CursorGStringhe.idstring);
			GridHelperCursorGStringhe.PerformAfterAction(BusinessPage.AfterRowUpdate, ref result);
		}
		public  object CursorGStringheManageGetRequest (GridDataRequestParamsObj<CursorGStringheItem> gridDataRequestParamsObj, PersistentGridDataResponseParamsObj persistentGridDataResponseParamsObj)
		{
			gridDataRequestParamsObj.Filters = this.CursorGStringheGetDefaultFilters();
			bool hasDefaultFilters = gridDataRequestParamsObj.Filters != null && gridDataRequestParamsObj.Filters.Length != 0;
			if(persistentGridDataResponseParamsObj != null)
			{
			    gridDataRequestParamsObj.SetPersistentData(persistentGridDataResponseParamsObj.GridDataResponseParamsObj);
			}
			this.GStringheUpdateDataSet(gridDataRequestParamsObj);
			if (gridDataRequestParamsObj.ComponentShowModeEnumValue == ComponentShowMode.insert)
			{
			    this.GStringheInsertNew();
			}
			BusinessPage.ComponentPreRender(CursorGStringhe);
			this.GridRowsPreRenderCursorGStringhe();
			this.CursorGStringheInitCurrentItemsForClient();
			object responseObj = new
			{
			    ComponentRTIs = this.GetComponentRTIsGStringhe(),
			    ComponentEntries = this.GetComponentEntriesCursorGStringhe(),
			    HasDefaultFilters = hasDefaultFilters,
			    GridSourceData = new
			    {
			        CurrentItemsList = this.CursorGStringhe.CurrentItemsList,
			        TotalRowsCount = this.CursorGStringhe.TotalRowsCount,
			        AreRowsLimited = this.CursorGStringhe.AreRowsLimited
			    },
			    FiltersDataSources = this.GetComponentFiltersDataSourcesCursorGStringhe(gridDataRequestParamsObj),
			    FieldsData = new
			    {
			    },
			    GridDataRequestParamsObj = gridDataRequestParamsObj
			};
			return responseObj;
		}
		private  string GetCursorGStringheIDSTRINGFilter01Suggestion ()
		{
			string suggestion = "";
			return suggestion;
		}
		public  void CursorGStringheSetDefaultValues ()
		{
			CursorGStringhe.CurrentRow["idstring"] = DBUtils.Gen_id("GEN_CORE$IDSTRINGS_ID");
			BusinessPage.SetDefaultValues(CursorGStringhe);
			PersistentVar.ClearSaveAndNewVar();
		}
		private List<Type> showPageParamsAllowedTypesList=new List<Type>();
		private GridHelper GridHelperCursorGStringhe;
		private CursorGStringhe cursorGStringhe;
	}
	[Serializable]
	public class StringhePersistenceVar
	{
		#region SubClasses
		#endregion
		public StringhePersistenceVar ()
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
			SessionHelper.PushValue("Stringhe.PersistenceVar", this);
		}
		private DataRow _oldCurrentRowSaveAndNew;
		private bool _isSaveAndNewAction;
	}
	public class CursorGStringhe:IT4.Common.Data.DataCursor
	{
		#region SubClasses
		#endregion
		public CursorGStringhe (DbDataAdapter vDataAdapter, DataSet vDataSet, string vName):base(vDataAdapter, vDataSet, vName)
		{
			PrimaryKey = "idstring";
			UpdateTable = "V_IDSTRINGS";
		}
		public   String Oldlabel
		{
		    get
		    {
		        if (CurrentRowOldValues != null)
		        {
		            if (CurrentRowOldValues["label"] == DBNull.Value) return "";
		            else return Convert.ToString(CurrentRowOldValues["label"]);
		        }
		        else return "";
		    }
		    set
		    {
		        if (CurrentRowOldValues != null) CurrentRowOldValues["label"] = value;
		        else throw new Exception("Nessuna riga corrente");
		    }
		}
		public   String reference
		{
		    get
		    {
		        if (CurrentRow != null)
		        {
		            if (CurrentRow["reference"] == DBNull.Value) return "";
		            else return Convert.ToString(CurrentRow["reference"]);
		        }
		        else return "";
		    }
		    set
		    {
		        if (CurrentRow != null) CurrentRow["reference"] = value;
		        else throw new Exception("Nessuna riga corrente");
		    }
		}
		public   String Oldreference
		{
		    get
		    {
		        if (CurrentRowOldValues != null)
		        {
		            if (CurrentRowOldValues["reference"] == DBNull.Value) return "";
		            else return Convert.ToString(CurrentRowOldValues["reference"]);
		        }
		        else return "";
		    }
		    set
		    {
		        if (CurrentRowOldValues != null) CurrentRowOldValues["reference"] = value;
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
		public   String label
		{
		    get
		    {
		        if (CurrentRow != null)
		        {
		            if (CurrentRow["label"] == DBNull.Value) return "";
		            else return Convert.ToString(CurrentRow["label"]);
		        }
		        else return "";
		    }
		    set
		    {
		        if (CurrentRow != null) CurrentRow["label"] = value;
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
		public  override AbstractItem GetItem (int index, RunTimeComponent runTimeComponent)
		{
			CursorGStringheItem CursorGStringheItem = new CursorGStringheItem(index);
			RTGrid typedRTIComponent = (RTGrid)runTimeComponent;
			CursorGStringheItem.SetPrimaryKeyValue(this.GetFieldValue(index, "idstring", typedRTIComponent));
			CursorGStringheItem.SetIDSTRING(this.GetFieldValue(index, "IDSTRING", typedRTIComponent.GetRTColumn("IDSTRING")));
			CursorGStringheItem.SetLABEL(this.GetFieldValue(index, "LABEL", typedRTIComponent.GetRTColumn("LABEL")));
			CursorGStringheItem.SetREFERENCE(this.GetFieldValue(index, "REFERENCE", typedRTIComponent.GetRTColumn("REFERENCE")));
			return CursorGStringheItem;
		}
		public  void labelSetNull ()
		{
			if (CurrentRow != null)
			{
			    CurrentRow["label"] = DBNull.Value;
			}
		}
		public  bool referenceIsChanged ()
		{
			return (OldreferenceIsNull() && !referenceIsNull()) || (referenceIsNull() && !OldreferenceIsNull()) || (!referenceIsNull() && !OldreferenceIsNull() && (reference != Oldreference));
		}
		public  bool labelIsChanged ()
		{
			return (OldlabelIsNull() && !labelIsNull()) || (labelIsNull() && !OldlabelIsNull()) || (!labelIsNull() && !OldlabelIsNull() && (label != Oldlabel));
		}
		public  void referenceSetNull ()
		{
			if (CurrentRow != null)
			{
			    CurrentRow["reference"] = DBNull.Value;
			}
		}
		public  bool referenceIsNull ()
		{
			if (CurrentRow != null)
			{
			    return CurrentRow["reference"] == DBNull.Value;
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
		public  bool OldidstringIsNull ()
		{
			if (CurrentRowOldValues != null)
			{
			    return CurrentRowOldValues["idstring"] == DBNull.Value;
			}
			else return true;
		}
		public  bool OldlabelIsNull ()
		{
			if (CurrentRowOldValues != null)
			{
			    return CurrentRowOldValues["label"] == DBNull.Value;
			}
			else return true;
		}
		public  bool OldreferenceIsNull ()
		{
			if (CurrentRowOldValues != null)
			{
			    return CurrentRowOldValues["reference"] == DBNull.Value;
			}
			else return true;
		}
		public  override void SetItem (int index, AbstractItem item, RunTimeComponent runTimeComponent)
		{
			CursorGStringheItem CursorGStringheItem = (CursorGStringheItem)item;
			RTGrid typedRTIComponent = (RTGrid)runTimeComponent;
			this.SetFieldValue(index, "IDSTRING", CursorGStringheItem.GetIDSTRING(), typedRTIComponent.GetRTColumn("IDSTRING"));
			this.SetFieldValue(index, "LABEL", CursorGStringheItem.GetLABEL(), typedRTIComponent.GetRTColumn("LABEL"));
			this.SetFieldValue(index, "REFERENCE", CursorGStringheItem.GetREFERENCE(), typedRTIComponent.GetRTColumn("REFERENCE"));
		}
		public  bool idstringIsChanged ()
		{
			return (OldidstringIsNull() && !idstringIsNull()) || (idstringIsNull() && !OldidstringIsNull()) || (!idstringIsNull() && !OldidstringIsNull() && (idstring != Oldidstring));
		}
		public  bool labelIsNull ()
		{
			if (CurrentRow != null)
			{
			    return CurrentRow["label"] == DBNull.Value;
			}
			else return true;
		}
	}
	[Serializable]
	public abstract class AbstractShowPageParamsGStringhe:PageInvokeParams
	{
		#region SubClasses
		#endregion
		public AbstractShowPageParamsGStringhe ()
		{
		}
		public   object idstring
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
	public class ShowPageParamsForBrowseGStringhe:AbstractShowPageParamsGStringhe
	{
		#region SubClasses
		#endregion
		public ShowPageParamsForBrowseGStringhe ()
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
			ShowPageParamsForBrowseGStringhe showParams = new ShowPageParamsForBrowseGStringhe();
			showParams.pkValue = pkValue;
			ApplicationPrivateSession.Current.PageInvokeParams = showParams;
		}
	}
	[Serializable]
	public class ShowPageParamsForEditGStringhe:AbstractShowPageParamsGStringhe
	{
		#region SubClasses
		#endregion
		public ShowPageParamsForEditGStringhe ()
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
			ShowPageParamsForEditGStringhe showParams = new ShowPageParamsForEditGStringhe();
			showParams.pkValue = pkValue;
			ApplicationPrivateSession.Current.PageInvokeParams = showParams;
		}
	}
	[Serializable]
	public class ShowPageParamsForInsertGStringhe:AbstractShowPageParamsGStringhe
	{
		#region SubClasses
		#endregion
		public ShowPageParamsForInsertGStringhe ()
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
			ShowPageParamsForInsertGStringhe showParams = new ShowPageParamsForInsertGStringhe();
			ApplicationPrivateSession.Current.PageInvokeParams = showParams;
		}
	}
	public abstract class GStringheLookups
	{
		#region SubClasses
		#endregion
		public GStringheLookups ()
		{
		}
	}
	public class CursorGStringheItem:AbstractItem
	{
		#region SubClasses
		#endregion
		public CursorGStringheItem (int index):base(index)
		{
			this.CursorGStringheItemSort = index;
		}
		public  override int ItemSort
		{
		    get
		    {
		        return CursorGStringheItemSort;
		    }
		    set
		    {
		        CursorGStringheItemSort = value;
		    }
		}
		public Int32? ItemPrimaryKeyValue;
		public int CursorGStringheItemSort;
		public string LABEL;
		public string REFERENCE;
		public Int32? IDSTRING;
		public  bool IsChangedREFERENCE (CursorGStringheItem newItem)
		{
			return (this.GetREFERENCE() == null && newItem.GetREFERENCE() != null) || (this.GetREFERENCE() != null && !this.GetREFERENCE().Equals(newItem.GetREFERENCE()));
		}
		public  void SetLABEL (object value)
		{
			LABEL = value == null || value == DBNull.Value ? (string)null : Convert.ToString(value);
		}
		public  override void SetPrimaryKeyValue (object value)
		{
			this.ItemPrimaryKeyValue = value == null || value == DBNull.Value ? (Int32?)null : Convert.ToInt32(value);
		}
		public  override bool IsChanged (AbstractItem newItem)
		{
			CursorGStringheItem newTypedItem = (CursorGStringheItem)newItem;
			bool isChanged = false;
			isChanged |= IsChangedIDSTRING(newTypedItem);
			isChanged |= IsChangedLABEL(newTypedItem);
			isChanged |= IsChangedREFERENCE(newTypedItem);
			return isChanged;
		}
		public  object GetREFERENCE ()
		{
			return this.REFERENCE == null ? (object)DBNull.Value : (object)this.REFERENCE;
		}
		public  bool IsChangedIDSTRING (CursorGStringheItem newItem)
		{
			return (this.GetIDSTRING() == null && newItem.GetIDSTRING() != null) || (this.GetIDSTRING() != null && !this.GetIDSTRING().Equals(newItem.GetIDSTRING()));
		}
		public  override bool CheckIfIsItemDataRow (DataRow dataRow)
		{
			object dataRowPrimaryKeyValue = dataRow["idstring"];
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
		public  void SetREFERENCE (object value)
		{
			REFERENCE = value == null || value == DBNull.Value ? (string)null : Convert.ToString(value);
		}
		public  bool IsChangedLABEL (CursorGStringheItem newItem)
		{
			return (this.GetLABEL() == null && newItem.GetLABEL() != null) || (this.GetLABEL() != null && !this.GetLABEL().Equals(newItem.GetLABEL()));
		}
		public  void SetIDSTRING (object value)
		{
			IDSTRING = value == null || value == DBNull.Value ? (Int32?)null : Convert.ToInt32(value);
		}
		public  object GetLABEL ()
		{
			return this.LABEL == null ? (object)DBNull.Value : (object)this.LABEL;
		}
	}
	public class CursorGStringheFromClauseRuntimeParsingValueCollection:RuntimeParsingValueCollection
	{
		#region SubClasses
		#endregion
		public CursorGStringheFromClauseRuntimeParsingValueCollection ():base()
		{
		}
		public  static RuntimeParsingValueCollection GetNewRuntimeParsingValueCollection ()
		{
			return new CursorGStringheFromClauseRuntimeParsingValueCollection();
		}
	}
}
