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
	public class DiarioPage:BasePage
	{
		#region SubClasses
		#endregion
		public DiarioPage ():base()
		{
		}
		public   RTCell CursorGDiarioDATARTCell
		{
		    get
		    {
		        return GridHelperCursorGDiario.GetCurrentRowRT().GetRTCell("DATA", CursorGDiarioDATARTI.SecurityLevel);
		    }
		}
		public   RTCell CursorGDiarioNOTEATTIVITARTCell
		{
		    get
		    {
		        return GridHelperCursorGDiario.GetCurrentRowRT().GetRTCell("NOTEATTIVITA", CursorGDiarioNOTEATTIVITARTI.SecurityLevel);
		    }
		}
		public static  ModulesArray CursorGDiarioNOTEATTIVITARTIModules
		{
		    get
		    {
		        return null;
		    }
		}
		public static  ModulesArray GDiarioRTIModules
		{
		    get
		    {
		        return null;
		    }
		}
		public   RTCell CursorGDiarioELEMENTORTCell
		{
		    get
		    {
		        return GridHelperCursorGDiario.GetCurrentRowRT().GetRTCell("ELEMENTO", CursorGDiarioELEMENTORTI.SecurityLevel);
		    }
		}
		public   CursorGDiario CursorGDiario
		{
		    get
		    {
		        return cursorGDiario;
		    }
		    set
		    {
		        cursorGDiario=value;
		    }
		}
		public static  ModulesArray CursorGDiarioATTIVITARTIModules
		{
		    get
		    {
		        return null;
		    }
		}
		public   DiarioPersistenceVar PersistentVar
		{
		    get
		    {
		        DiarioPersistenceVar result =DiarioPage.PersistentVarStatic;
		        return result;
		    }
		}
		public static  DiarioPersistenceVar PersistentVarStatic
		{
		    get
		    {
		        if (SessionHelper.GetValue<DiarioPersistenceVar>("Diario.PersistenceVar") != null) return SessionHelper.GetValue<DiarioPersistenceVar>("Diario.PersistenceVar");
		        else return new DiarioPersistenceVar();
		    }
		}
		public static  ModulesArray CursorGDiarioELEMENTORTIModules
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
		        return SecurityLevels.@Restricted("Diario");
		    }
		}
		public   PageInvokeParams ShowPageParamsGDiario
		{
		    get
		    {
		        if(ApplicationPrivateSession.Current.PageInvokeParams == null ||
		          !showPageParamsAllowedTypesList.Contains(ApplicationPrivateSession.Current.PageInvokeParams.GetType()))
		        {
		            ApplicationPrivateSession.Current.PageInvokeParams = new ShowPageParamsForBrowseGDiario();
		        }
		        return ApplicationPrivateSession.Current.PageInvokeParams;
		    }
		}
		public static  ModulesArray PageModules
		{
		    get
		    {
		        return null;
		    }
		}
		public   RTCell CursorGDiarioTIPOATTIVITARTCell
		{
		    get
		    {
		        return GridHelperCursorGDiario.GetCurrentRowRT().GetRTCell("TIPOATTIVITA", CursorGDiarioTIPOATTIVITARTI.SecurityLevel);
		    }
		}
		public static  ModulesArray CursorGDiarioTIPOATTIVITARTIModules
		{
		    get
		    {
		        return null;
		    }
		}
		public   RTCell CursorGDiarioATTIVITARTCell
		{
		    get
		    {
		        return GridHelperCursorGDiario.GetCurrentRowRT().GetRTCell("ATTIVITA", CursorGDiarioATTIVITARTI.SecurityLevel);
		    }
		}
		public static  ModulesArray CursorGDiarioDATARTIModules
		{
		    get
		    {
		        return null;
		    }
		}
		public static  ModulesArray CursorGDiarioUTENTERTIModules
		{
		    get
		    {
		        return null;
		    }
		}
		public   RTCell CursorGDiarioUTENTERTCell
		{
		    get
		    {
		        return GridHelperCursorGDiario.GetCurrentRowRT().GetRTCell("UTENTE", CursorGDiarioUTENTERTI.SecurityLevel);
		    }
		}
		public RunTimeComponent PageRTI;
		public RTColumn CursorGDiarioNOTEATTIVITARTI;
		public RTColumn CursorGDiarioUTENTERTI;
		public RTColumn CursorGDiarioTIPOATTIVITARTI;
		public RTGrid GDiarioRTI;
		public RTColumn CursorGDiarioDATARTI;
		public RTLinkColumn CursorGDiarioELEMENTORTI;
		public RTLinkColumn CursorGDiarioATTIVITARTI;
		public  void CursorGDiarioUTENTEResetFieldIfNoLongerValid (bool skipCheckCurrentField)
		{
			bool checkDependentFields = true;
			if(!skipCheckCurrentField)
			{
			    if (!CursorGDiarioUTENTEIsFieldStillValid())
			    {
			        CursorGDiarioItem currentItem = this.CursorGDiarioGetCurrentItem();
			        currentItem.SetUTENTE(null);
			        this.CursorGDiarioRegisterCurrentItemClientChanges(currentItem);
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
		private  object GetColumnsGroupsEntriesCursorGDiario ()
		{
			return new
			{
			};
		}
		public  void CursorGDiarioSelectRowByItem (AbstractItem item)
		{
			GridHelperCursorGDiario.SelectRow(item);
		}
		public  bool CursorGDiarioATTIVITAIsFieldStillValid ()
		{
			return true;
		}
		public  void CursorGDiarioNOTEATTIVITAResetFieldIfNoLongerValid (bool skipCheckCurrentField)
		{
			bool checkDependentFields = true;
			if(!skipCheckCurrentField)
			{
			    if (!CursorGDiarioNOTEATTIVITAIsFieldStillValid())
			    {
			        CursorGDiarioItem currentItem = this.CursorGDiarioGetCurrentItem();
			        currentItem.SetNOTEATTIVITA(null);
			        this.CursorGDiarioRegisterCurrentItemClientChanges(currentItem);
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
		public  void CursorGDiarioRegisterComponentRTIsClientChanges (JObject componentRTIs)
		{
			RTGrid clientRTComponent = componentRTIs.GetValue("ComponentRTI").ToObject<RTGrid>();
			this.GDiarioRTI.GlobalCanDelete = clientRTComponent.GlobalCanDelete;
			this.GDiarioRTI.GlobalCanEdit = clientRTComponent.GlobalCanEdit;
			this.GDiarioRTI.GlobalCanInsert = clientRTComponent.GlobalCanInsert;
			this.GDiarioRTI.GlobalCanRead = clientRTComponent.GlobalCanRead;
			this.GDiarioRTI.GlobalReadOnly = clientRTComponent.GlobalReadOnly;
			this.GDiarioRTI.GlobalVisible = clientRTComponent.GlobalVisible;
			this.GDiarioRTI.AllowSaveAndNew = clientRTComponent.AllowSaveAndNew;
			RTColumn clientRTColumn = null;
			JObject clientGridColumnsRTI = componentRTIs.GetValue("GridColumnsRTI").ToObject<JObject>();
			clientRTColumn = clientGridColumnsRTI.GetValue("CursorGDiarioELEMENTORTI").ToObject<RTColumn>();
			this.CursorGDiarioELEMENTORTI.GlobalCanDelete = clientRTColumn.GlobalCanDelete;
			this.CursorGDiarioELEMENTORTI.GlobalCanEdit = clientRTColumn.GlobalCanEdit;
			this.CursorGDiarioELEMENTORTI.GlobalCanInsert = clientRTColumn.GlobalCanInsert;
			this.CursorGDiarioELEMENTORTI.GlobalCanRead = clientRTColumn.GlobalCanRead;
			this.CursorGDiarioELEMENTORTI.GlobalReadOnly = clientRTColumn.GlobalReadOnly;
			this.CursorGDiarioELEMENTORTI.GlobalVisible = clientRTColumn.GlobalVisible;
			clientRTColumn = clientGridColumnsRTI.GetValue("CursorGDiarioTIPOATTIVITARTI").ToObject<RTColumn>();
			this.CursorGDiarioTIPOATTIVITARTI.GlobalCanDelete = clientRTColumn.GlobalCanDelete;
			this.CursorGDiarioTIPOATTIVITARTI.GlobalCanEdit = clientRTColumn.GlobalCanEdit;
			this.CursorGDiarioTIPOATTIVITARTI.GlobalCanInsert = clientRTColumn.GlobalCanInsert;
			this.CursorGDiarioTIPOATTIVITARTI.GlobalCanRead = clientRTColumn.GlobalCanRead;
			this.CursorGDiarioTIPOATTIVITARTI.GlobalReadOnly = clientRTColumn.GlobalReadOnly;
			this.CursorGDiarioTIPOATTIVITARTI.GlobalVisible = clientRTColumn.GlobalVisible;
			clientRTColumn = clientGridColumnsRTI.GetValue("CursorGDiarioATTIVITARTI").ToObject<RTColumn>();
			this.CursorGDiarioATTIVITARTI.GlobalCanDelete = clientRTColumn.GlobalCanDelete;
			this.CursorGDiarioATTIVITARTI.GlobalCanEdit = clientRTColumn.GlobalCanEdit;
			this.CursorGDiarioATTIVITARTI.GlobalCanInsert = clientRTColumn.GlobalCanInsert;
			this.CursorGDiarioATTIVITARTI.GlobalCanRead = clientRTColumn.GlobalCanRead;
			this.CursorGDiarioATTIVITARTI.GlobalReadOnly = clientRTColumn.GlobalReadOnly;
			this.CursorGDiarioATTIVITARTI.GlobalVisible = clientRTColumn.GlobalVisible;
			clientRTColumn = clientGridColumnsRTI.GetValue("CursorGDiarioDATARTI").ToObject<RTColumn>();
			this.CursorGDiarioDATARTI.GlobalCanDelete = clientRTColumn.GlobalCanDelete;
			this.CursorGDiarioDATARTI.GlobalCanEdit = clientRTColumn.GlobalCanEdit;
			this.CursorGDiarioDATARTI.GlobalCanInsert = clientRTColumn.GlobalCanInsert;
			this.CursorGDiarioDATARTI.GlobalCanRead = clientRTColumn.GlobalCanRead;
			this.CursorGDiarioDATARTI.GlobalReadOnly = clientRTColumn.GlobalReadOnly;
			this.CursorGDiarioDATARTI.GlobalVisible = clientRTColumn.GlobalVisible;
			clientRTColumn = clientGridColumnsRTI.GetValue("CursorGDiarioUTENTERTI").ToObject<RTColumn>();
			this.CursorGDiarioUTENTERTI.GlobalCanDelete = clientRTColumn.GlobalCanDelete;
			this.CursorGDiarioUTENTERTI.GlobalCanEdit = clientRTColumn.GlobalCanEdit;
			this.CursorGDiarioUTENTERTI.GlobalCanInsert = clientRTColumn.GlobalCanInsert;
			this.CursorGDiarioUTENTERTI.GlobalCanRead = clientRTColumn.GlobalCanRead;
			this.CursorGDiarioUTENTERTI.GlobalReadOnly = clientRTColumn.GlobalReadOnly;
			this.CursorGDiarioUTENTERTI.GlobalVisible = clientRTColumn.GlobalVisible;
			clientRTColumn = clientGridColumnsRTI.GetValue("CursorGDiarioNOTEATTIVITARTI").ToObject<RTColumn>();
			this.CursorGDiarioNOTEATTIVITARTI.GlobalCanDelete = clientRTColumn.GlobalCanDelete;
			this.CursorGDiarioNOTEATTIVITARTI.GlobalCanEdit = clientRTColumn.GlobalCanEdit;
			this.CursorGDiarioNOTEATTIVITARTI.GlobalCanInsert = clientRTColumn.GlobalCanInsert;
			this.CursorGDiarioNOTEATTIVITARTI.GlobalCanRead = clientRTColumn.GlobalCanRead;
			this.CursorGDiarioNOTEATTIVITARTI.GlobalReadOnly = clientRTColumn.GlobalReadOnly;
			this.CursorGDiarioNOTEATTIVITARTI.GlobalVisible = clientRTColumn.GlobalVisible;
		}
		private  string GetCursorGDiarioATTIVITAFilter01Suggestion ()
		{
			string suggestion = "";
			return suggestion;
		}
		public  void CursorGDiarioPerformDelete (ref NavigationResult result)
		{
			result = ShowPageForBrowseGDiario(CursorGDiario.identitadiario);
			GridHelperCursorGDiario.DeleteCurrentRow(BusinessPage.AfterRowDelete, ref result);
		}
		public  object GetComponentEntriesCursorGDiario ()
		{
			Dictionary<string, string> columnsEntries = new Dictionary<string, string>();
			columnsEntries.Add("CursorGDiarioELEMENTOColumnsEntry", ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry("elemento"));
			columnsEntries.Add("CursorGDiarioTIPOATTIVITAColumnsEntry", ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry("tipoattivita"));
			columnsEntries.Add("CursorGDiarioATTIVITAColumnsEntry", ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry("attivita"));
			columnsEntries.Add("CursorGDiarioDATAColumnsEntry", ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry("data"));
			columnsEntries.Add("CursorGDiarioUTENTEColumnsEntry", ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry("utente"));
			columnsEntries.Add("CursorGDiarioNOTEATTIVITAColumnsEntry", ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry("noteattivita"));
			Dictionary<string, string> tooltipsEntries = new Dictionary<string, string>();
			tooltipsEntries.Add("ELEMENTOTooltipsEntry", ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry(""));
			tooltipsEntries.Add("TIPOATTIVITATooltipsEntry", ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry(""));
			tooltipsEntries.Add("ATTIVITATooltipsEntry", ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry(""));
			tooltipsEntries.Add("DATATooltipsEntry", ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry(""));
			tooltipsEntries.Add("UTENTETooltipsEntry", ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry(""));
			tooltipsEntries.Add("NOTEATTIVITATooltipsEntry", ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry(""));
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
			    ColumnsHeaderEntries = GetColumnsHeaderEntriesCursorGDiario(columnsEntries),
			    ColumnsGroupsEntries = GetColumnsGroupsEntriesCursorGDiario(),
			    GridColumnsValidatorsEntries = GetGridColumnsValidatorsEntriesCursorGDiario(columnsEntries),
			    FiltersEntries = GetFiltersEntriesMethodNameCursorGDiario(),
			    FiltersSuggestions =  GetFiltersSuggestionsCursorGDiario(),
			    ColumnsTooltipsEntries = GetColumnsTooltipEntriesCursorGDiario(tooltipsEntries),
			    ButtonsPanelEntries = GetButtonsPanelEntriesCursorGDiario(buttonsPanelEntries)
			};
		}
		public  void CursorGDiarioResetFieldIfNoLongerValid (string fieldName)
		{
			GDiarioRTI.GetRTColumn(fieldName).ResetFieldIfNoLongerValid(true);
		}
		public  void InitComponentRTIsGDiario ()
		{
			CursorGDiarioELEMENTORTI = new RTLinkColumn("ELEMENTO", "ELEMENTO");
			CursorGDiarioELEMENTORTI.GlobalVisible = false;
			CursorGDiarioELEMENTORTI.GlobalExportXLS = false;
			CursorGDiarioELEMENTORTI.SecurityLevel = SecurityLevels.Restricted("DiarioPage");
			CursorGDiarioELEMENTORTI.ModulesArray = CursorGDiarioELEMENTORTIModules;
			CursorGDiarioELEMENTORTI.GlobalReadOnly = true;
			CursorGDiarioELEMENTORTI.ImmediateFieldUpdate = false;
			GDiarioRTI.AddRTColumn(CursorGDiarioELEMENTORTI);
			CursorGDiarioELEMENTORTI.ResetFieldIfNoLongerValid = this.CursorGDiarioELEMENTOResetFieldIfNoLongerValid;
			CursorGDiarioTIPOATTIVITARTI = new RTColumn("TIPOATTIVITA", "TIPOATTIVITA");
			CursorGDiarioTIPOATTIVITARTI.GlobalVisible = false;
			CursorGDiarioTIPOATTIVITARTI.GlobalExportXLS = false;
			CursorGDiarioTIPOATTIVITARTI.SecurityLevel = SecurityLevels.Restricted("DiarioPage");
			CursorGDiarioTIPOATTIVITARTI.ModulesArray = CursorGDiarioTIPOATTIVITARTIModules;
			CursorGDiarioTIPOATTIVITARTI.GlobalReadOnly = true;
			CursorGDiarioTIPOATTIVITARTI.ImmediateFieldUpdate = false;
			GDiarioRTI.AddRTColumn(CursorGDiarioTIPOATTIVITARTI);
			CursorGDiarioTIPOATTIVITARTI.ResetFieldIfNoLongerValid = this.CursorGDiarioTIPOATTIVITAResetFieldIfNoLongerValid;
			CursorGDiarioATTIVITARTI = new RTLinkColumn("ATTIVITA", "ATTIVITA");
			CursorGDiarioATTIVITARTI.GlobalVisible = true;
			CursorGDiarioATTIVITARTI.GlobalExportXLS = true;
			CursorGDiarioATTIVITARTI.SecurityLevel = SecurityLevels.Restricted("DiarioPage");
			CursorGDiarioATTIVITARTI.ModulesArray = CursorGDiarioATTIVITARTIModules;
			CursorGDiarioATTIVITARTI.GlobalReadOnly = true;
			CursorGDiarioATTIVITARTI.ImmediateFieldUpdate = false;
			GDiarioRTI.AddRTColumn(CursorGDiarioATTIVITARTI);
			CursorGDiarioATTIVITARTI.ResetFieldIfNoLongerValid = this.CursorGDiarioATTIVITAResetFieldIfNoLongerValid;
			CursorGDiarioDATARTI = new RTColumn("DATA", "DATA");
			CursorGDiarioDATARTI.GlobalVisible = true;
			CursorGDiarioDATARTI.GlobalExportXLS = true;
			CursorGDiarioDATARTI.SecurityLevel = SecurityLevels.Restricted("DiarioPage");
			CursorGDiarioDATARTI.ModulesArray = CursorGDiarioDATARTIModules;
			CursorGDiarioDATARTI.GlobalReadOnly = true;
			CursorGDiarioDATARTI.ImmediateFieldUpdate = false;
			GDiarioRTI.AddRTColumn(CursorGDiarioDATARTI);
			CursorGDiarioDATARTI.ResetFieldIfNoLongerValid = this.CursorGDiarioDATAResetFieldIfNoLongerValid;
			CursorGDiarioUTENTERTI = new RTColumn("UTENTE", "UTENTE");
			CursorGDiarioUTENTERTI.GlobalVisible = true;
			CursorGDiarioUTENTERTI.GlobalExportXLS = true;
			CursorGDiarioUTENTERTI.SecurityLevel = SecurityLevels.Restricted("DiarioPage");
			CursorGDiarioUTENTERTI.ModulesArray = CursorGDiarioUTENTERTIModules;
			CursorGDiarioUTENTERTI.GlobalReadOnly = true;
			CursorGDiarioUTENTERTI.ImmediateFieldUpdate = false;
			GDiarioRTI.AddRTColumn(CursorGDiarioUTENTERTI);
			CursorGDiarioUTENTERTI.ResetFieldIfNoLongerValid = this.CursorGDiarioUTENTEResetFieldIfNoLongerValid;
			CursorGDiarioNOTEATTIVITARTI = new RTColumn("NOTEATTIVITA", "NOTEATTIVITA");
			CursorGDiarioNOTEATTIVITARTI.GlobalVisible = true;
			CursorGDiarioNOTEATTIVITARTI.GlobalExportXLS = true;
			CursorGDiarioNOTEATTIVITARTI.SecurityLevel = SecurityLevels.Restricted("DiarioPage");
			CursorGDiarioNOTEATTIVITARTI.ModulesArray = CursorGDiarioNOTEATTIVITARTIModules;
			CursorGDiarioNOTEATTIVITARTI.GlobalReadOnly = true;
			CursorGDiarioNOTEATTIVITARTI.ImmediateFieldUpdate = false;
			GDiarioRTI.AddRTColumn(CursorGDiarioNOTEATTIVITARTI);
			CursorGDiarioNOTEATTIVITARTI.ResetFieldIfNoLongerValid = this.CursorGDiarioNOTEATTIVITAResetFieldIfNoLongerValid;
		}
		public  void CursorGDiarioSelectRow (int rowIndex)
		{
			GridHelperCursorGDiario.SelectRow(rowIndex);
		}
		private  object GetFiltersSuggestionsCursorGDiario ()
		{
			return new
			{
			CursorGDiarioELEMENTOFilter01 = this.GetCursorGDiarioELEMENTOFilter01Suggestion()
			,
			CursorGDiarioTIPOATTIVITAFilter01 = this.GetCursorGDiarioTIPOATTIVITAFilter01Suggestion()
			,
			CursorGDiarioATTIVITAFilter01 = this.GetCursorGDiarioATTIVITAFilter01Suggestion()
			,
			CursorGDiarioDATAFilter01 = this.GetCursorGDiarioDATAFilter01Suggestion()
			,
			CursorGDiarioDATAFilter02 = this.GetCursorGDiarioDATAFilter02Suggestion()
			,
			CursorGDiarioUTENTEFilter01 = this.GetCursorGDiarioUTENTEFilter01Suggestion()
			,
			CursorGDiarioNOTEATTIVITAFilter01 = this.GetCursorGDiarioNOTEATTIVITAFilter01Suggestion()
			};
		}
		public  void GDiarioInsertNew ()
		{
			GridHelperCursorGDiario.InsertNewRow(this.CursorGDiarioSetDefaultValues);
		}
		public  void CursorGDiarioPerformAfterEdit (ref NavigationResult result)
		{
			result = ShowPageForBrowseGDiario(CursorGDiario.identitadiario);
			GridHelperCursorGDiario.PerformAfterAction(BusinessPage.AfterRowUpdate, ref result);
		}
		public  bool CursorGDiarioUTENTEIsFieldStillValid ()
		{
			return true;
		}
		public  void RegisterClientChangesCursorGDiario (List<CursorGDiarioItem> clientItemList)
		{
			GridHelperCursorGDiario.RegisterClientChanges(clientItemList.Cast<AbstractItem>().ToList());
		}
		public  void GridRowsPreRenderCursorGDiario ()
		{
			int currentRowIndex = CursorGDiario.CurrentRowIndex;
			for(int i = 0; i < CursorGDiario.CurrentItemsList.Count; i++)
			{
			    AbstractItem abstractItem = CursorGDiario.CurrentItemsList[i];
			    CursorGDiarioSelectRow(abstractItem.ItemSort);
			    BusinessPage.RowPreRender(CursorGDiario);
			}
			CursorGDiarioSelectRow(currentRowIndex);
		}
		public  void CursorGDiarioDATAResetFieldIfNoLongerValid (bool skipCheckCurrentField)
		{
			bool checkDependentFields = true;
			if(!skipCheckCurrentField)
			{
			    if (!CursorGDiarioDATAIsFieldStillValid())
			    {
			        CursorGDiarioItem currentItem = this.CursorGDiarioGetCurrentItem();
			        currentItem.SetDATA(null);
			        this.CursorGDiarioRegisterCurrentItemClientChanges(currentItem);
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
		public  void CursorGDiarioDeleteCurrentItem (ref NavigationResult result)
		{
			bool cancel = false;
			BusinessPage.BeforeRowDelete(CursorGDiario, ref cancel, ref result);
			if (!cancel)
			{
			    this.CursorGDiarioPerformDelete(ref result);
			}
		}
		public  void CursorGDiarioSetDefaultValues ()
		{
			BusinessPage.SetDefaultValues(CursorGDiario);
			PersistentVar.ClearSaveAndNewVar();
		}
		public  static KamNavigationResult ShowPageForBrowseGDiario (Int32? identitadiario)
		{
			ShowPageParamsForBrowseGDiario.InitShowPageParams(identitadiario);
			return new KamNavigationResult() { ActionResult = NavigationActionResults.GoToPageForBrowse, PageUrl = "#Diario", CursorName = "CursorGDiario" };
		}
		public  bool CursorGDiarioNOTEATTIVITAIsFieldStillValid ()
		{
			return true;
		}
		protected  override BusinessPage CreateNewBusinessPage ()
		{
			return new BSNDiarioPage(this);
		}
		public  void InitXlsHttpResponseMessageCursorGDiario (HttpResponseMessage httpResponseMessage)
		{
			ExportColumns Columns=new ExportColumns();
			if (CursorGDiarioELEMENTORTI.CanRead && CursorGDiarioELEMENTORTI.GlobalExportXLS) Columns.Add("ELEMENTO",new ExportColumn("ELEMENTO", ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry("elemento"), string.Empty));
			if (CursorGDiarioTIPOATTIVITARTI.CanRead && CursorGDiarioTIPOATTIVITARTI.GlobalExportXLS) Columns.Add("TIPOATTIVITA",new ExportColumn("TIPOATTIVITA", ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry("tipoattivita"), string.Empty));
			if (CursorGDiarioATTIVITARTI.CanRead && CursorGDiarioATTIVITARTI.GlobalExportXLS) Columns.Add("ATTIVITA",new ExportColumn("ATTIVITA", ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry("attivita"), string.Empty));
			if (CursorGDiarioDATARTI.CanRead && CursorGDiarioDATARTI.GlobalExportXLS) Columns.Add("DATA",new ExportColumn("DATA", ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry("data"), string.Empty));
			if (CursorGDiarioUTENTERTI.CanRead && CursorGDiarioUTENTERTI.GlobalExportXLS) Columns.Add("UTENTE",new ExportColumn("UTENTE", ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry("utente"), string.Empty));
			if (CursorGDiarioNOTEATTIVITARTI.CanRead && CursorGDiarioNOTEATTIVITARTI.GlobalExportXLS) Columns.Add("NOTEATTIVITA",new ExportColumn("NOTEATTIVITA", ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry("noteattivita"), string.Empty));
			CursorGDiario.InitExcelHttpResponseMessage(httpResponseMessage, Columns);
		}
		public  void CursorGDiarioELEMENTOResetFieldIfNoLongerValid (bool skipCheckCurrentField)
		{
			bool checkDependentFields = true;
			if(!skipCheckCurrentField)
			{
			    if (!CursorGDiarioELEMENTOIsFieldStillValid())
			    {
			        CursorGDiarioItem currentItem = this.CursorGDiarioGetCurrentItem();
			        currentItem.SetELEMENTO(null);
			        this.CursorGDiarioRegisterCurrentItemClientChanges(currentItem);
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
		public  bool CursorGDiarioELEMENTOIsFieldStillValid ()
		{
			return true;
		}
		public  object GetComponentRTIsGDiario ()
		{
			return new
			{
			    ComponentRTI = GDiarioRTI,
			    CurrentRowsRTI = GridHelperCursorGDiario.GetCurrentRTRowsList(),
			    GridColumnsRTI = new
			    {
			    CursorGDiarioELEMENTORTI
			,
			CursorGDiarioTIPOATTIVITARTI
			,
			CursorGDiarioATTIVITARTI
			,
			CursorGDiarioDATARTI
			,
			CursorGDiarioUTENTERTI
			,
			CursorGDiarioNOTEATTIVITARTI
			    }
			};
		}
		private  string GetCursorGDiarioDATAFilter02Suggestion ()
		{
			string suggestion = "";
			return suggestion;
		}
		private  object GetGridColumnsValidatorsEntriesCursorGDiario (Dictionary<string, string> columnsEntries)
		{
			return new
			{
			ELEMENTOTextSizeWebGridDataColumnValidatorEntry = ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry("Il testo digitato supera la dimensione massima del campo:", new { FieldName = columnsEntries["CursorGDiarioELEMENTOColumnsEntry"].Trim() }) + " 10"
			,
			TIPOATTIVITATextSizeWebGridDataColumnValidatorEntry = ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry("Il testo digitato supera la dimensione massima del campo:", new { FieldName = columnsEntries["CursorGDiarioTIPOATTIVITAColumnsEntry"].Trim() }) + " 50"
			,
			ATTIVITATextSizeWebGridDataColumnValidatorEntry = ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry("Il testo digitato supera la dimensione massima del campo:", new { FieldName = columnsEntries["CursorGDiarioATTIVITAColumnsEntry"].Trim() }) + " 100"
			,
			DATATextSizeWebGridDataColumnValidatorEntry = ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry("Il testo digitato supera la dimensione massima del campo:", new { FieldName = columnsEntries["CursorGDiarioDATAColumnsEntry"].Trim() }) + " 19"
			,
			UTENTETextSizeWebGridDataColumnValidatorEntry = ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry("Il testo digitato supera la dimensione massima del campo:", new { FieldName = columnsEntries["CursorGDiarioUTENTEColumnsEntry"].Trim() }) + " 50"
			};
		}
		public  object CursorGDiarioManageResetGridDataSourceRequest (GridDataRequestParamsObj<CursorGDiarioItem> gridDataRequestParamsObj)
		{
			gridDataRequestParamsObj.PageIndex = 0;
			gridDataRequestParamsObj.PageSize = 20;
			gridDataRequestParamsObj.Sort = null;
			gridDataRequestParamsObj.Filters = null;
			this.GDiarioUpdateDataSet(gridDataRequestParamsObj);
			this.CursorGDiarioInitCurrentItemsForClient();
			object responseObj = new
			{
			    CurrentRowsRTI = GridHelperCursorGDiario.GetCurrentRTRowsList(),
			    GridSourceData = new
			    {
			        CurrentItemsList = this.CursorGDiario.CurrentItemsList,
			        TotalRowsCount = this.CursorGDiario.TotalRowsCount,
			        AreRowsLimited = this.CursorGDiario.AreRowsLimited
			      },
			      GridDataRequestParamsObj = gridDataRequestParamsObj
			};
			return responseObj;
		}
		public  object CursorGDiarioGetFieldChangedResponseObj ()
		{
			CursorGDiarioItem currentItem = this.CursorGDiarioGetCurrentItem();
			CursorGDiarioInitItemForClient(currentItem);
			return new
			{
			    ComponentRTIs = this.GetComponentRTIsGDiario(),
			    CurrentItem = currentItem
			};
		}
		private  object GetColumnsTooltipEntriesCursorGDiario (Dictionary<string, string> tooltipsEntries)
		{
			return new
			{
			ELEMENTOTooltipsEntry = tooltipsEntries["ELEMENTOTooltipsEntry"],
			TIPOATTIVITATooltipsEntry = tooltipsEntries["TIPOATTIVITATooltipsEntry"],
			ATTIVITATooltipsEntry = tooltipsEntries["ATTIVITATooltipsEntry"],
			DATATooltipsEntry = tooltipsEntries["DATATooltipsEntry"],
			UTENTETooltipsEntry = tooltipsEntries["UTENTETooltipsEntry"],
			NOTEATTIVITATooltipsEntry = tooltipsEntries["NOTEATTIVITATooltipsEntry"],
			};
		}
		private  string GetCursorGDiarioNOTEATTIVITAFilter01Suggestion ()
		{
			string suggestion = "";
			return suggestion;
		}
		private  string GetCursorGDiarioUTENTEFilter01Suggestion ()
		{
			string suggestion = "";
			return suggestion;
		}
		private  object GetFiltersEntriesMethodNameCursorGDiario ()
		{
			return new
			{
			CursorGDiarioELEMENTOFilter01 = ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry("elemento")
			,
			CursorGDiarioTIPOATTIVITAFilter01 = ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry("tipoattivita")
			,
			CursorGDiarioATTIVITAFilter01 = ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry("attivita")
			,
			CursorGDiarioDATAFilter01 = ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry("DAL")
			,
			CursorGDiarioDATAFilter02 = ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry("AL")
			,
			CursorGDiarioUTENTEFilter01 = ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry("UTENTE")
			,
			CursorGDiarioNOTEATTIVITAFilter01 = ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry("NOTEATTIVITA")
			};
		}
		private  List<KamColumn> GetKamGDiarioColumnsList ()
		{
			List<KamColumn> kamColumnsList = new List<KamColumn>();
			kamColumnsList.Add(new KamColumn() { FieldName = "ELEMENTO", DBColumnName = @"diario.elemento", FieldTypeName = "Link" });
			kamColumnsList.Add(new KamColumn() { FieldName = "ELEMENTO", DBColumnName = @"diario.elemento", FieldTypeName = "Link" });
			kamColumnsList.Add(new KamColumn() { FieldName = "TIPOATTIVITA", DBColumnName = @"diario.tipoattivita", FieldTypeName = "Text" });
			kamColumnsList.Add(new KamColumn() { FieldName = "ATTIVITA", DBColumnName = @"diario.attivita", FieldTypeName = "Link" });
			kamColumnsList.Add(new KamColumn() { FieldName = "ATTIVITA", DBColumnName = @"diario.attivita", FieldTypeName = "Link" });
			kamColumnsList.Add(new KamColumn() { FieldName = "DATA", DBColumnName = @"diario.data", FieldTypeName = "Date" });
			kamColumnsList.Add(new KamColumn() { FieldName = "UTENTE", DBColumnName = @"diario.utente", FieldTypeName = "Text" });
			kamColumnsList.Add(new KamColumn() { FieldName = "NOTEATTIVITA", DBColumnName = @"diario.noteattivita", FieldTypeName = "Text" });
			return kamColumnsList;
		}
		public  void CursorGDiarioRegisterCurrentItemClientChanges (CursorGDiarioItem item)
		{
			GridHelperCursorGDiario.RegisterClientChanges(item);
			CursorGDiarioSelectRowByItem(item);
		}
		public  void CursorGDiarioTIPOATTIVITAResetFieldIfNoLongerValid (bool skipCheckCurrentField)
		{
			bool checkDependentFields = true;
			if(!skipCheckCurrentField)
			{
			    if (!CursorGDiarioTIPOATTIVITAIsFieldStillValid())
			    {
			        CursorGDiarioItem currentItem = this.CursorGDiarioGetCurrentItem();
			        currentItem.SetTIPOATTIVITA(null);
			        this.CursorGDiarioRegisterCurrentItemClientChanges(currentItem);
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
		public  void CursorGDiarioInitItemForClient (CursorGDiarioItem currentItem)
		{
			currentItem.FieldsData = new
			{
			};
		}
		public  void CursorGDiarioSetSelectCommand (IDbCommandEx Command)
		{
			object fTSFilterFromClause = new
			{
			};
			Command.CommandText=IT4.Common.Classes.IdeaString.ParseTemplate("SELECT DIARIO.IDENTITADIARIO," +
			"                            DIARIO.DATA," +
			"                            DIARIO.UTENTE," +
			"                            DIARIO.TIPOELEMENTO," +
			"                            DIARIO.ELEMENTO," +
			"                            DIARIO.TIPOATTIVITA," +
			"                            DIARIO.ATTIVITA," +
			"                            DIARIO.NOTEATTIVITA" +
			"                            FROM DIARIO" +
			"                            WHERE DIARIO.ELEMENTO=0$PersistentVar.IDELEMENTO$ AND DIARIO.TIPOELEMENTO='$PersistentVar.TIPOELEMENTO$'", "GlobalPublic;GlobalPrivate;UserProperties;CursorGDiario;ShowPageParams;FTSFilterFromClause;PersistentVar", new object [] {ApplicationPublicSession.Current, ApplicationPrivateSession.Current, ApplicationPrivateSession.Current.UserInfo, CursorGDiario, ShowPageParamsGDiario, fTSFilterFromClause, PersistentVar});
		}
		private  object GetColumnsHeaderEntriesCursorGDiario (Dictionary<string, string> columnsEntries)
		{
			return new
			{
			ELEMENTOColumnEntry = columnsEntries["CursorGDiarioELEMENTOColumnsEntry"]
			,
			TIPOATTIVITAColumnEntry = columnsEntries["CursorGDiarioTIPOATTIVITAColumnsEntry"]
			,
			ATTIVITAColumnEntry = columnsEntries["CursorGDiarioATTIVITAColumnsEntry"]
			,
			DATAColumnEntry = columnsEntries["CursorGDiarioDATAColumnsEntry"]
			,
			UTENTEColumnEntry = columnsEntries["CursorGDiarioUTENTEColumnsEntry"]
			,
			NOTEATTIVITAColumnEntry = columnsEntries["CursorGDiarioNOTEATTIVITAColumnsEntry"]
			};
		}
		public  NavigationResult PostEditedItemsCursorGDiario (bool isSaveAndNewAction = false)
		{
			NavigationResult result = new KamNavigationResult();
			CursorGDiario.IsSaveAndNewAction = isSaveAndNewAction;
			bool cancel = false;
			switch(GridHelperCursorGDiario.ComponentShowMode)
			{
			    case ComponentShowMode.edit:
			        GridHelperCursorGDiario.UpdateEditedItems(BusinessPage.BeforeRowUpdate, ref cancel, ref result);
			        break;
			    case ComponentShowMode.insert:
			        GridHelperCursorGDiario.UpdateEditedItems(BusinessPage.BeforeRowInsert, ref cancel, ref result);
			        break;
			    default:
			        throw new NotImplementedException();
			}
			if (!cancel)
			{
			    GridHelperCursorGDiario.PostChanges();
			    if (isSaveAndNewAction)
			    {
			        PersistentVar.IsSaveAndNewAction = isSaveAndNewAction;
			        PersistentVar.OldCurrentRowSaveAndNew = CursorGDiario.CurrentRow;
			    }
			    switch (GridHelperCursorGDiario.ComponentShowMode)
			    {
			        case ComponentShowMode.edit:
			            this.CursorGDiarioPerformAfterEdit(ref result);
			            break;
			           case ComponentShowMode.insert:
			            this.CursorGDiarioPerformAfterInsert(ref result);
			            break;
			        default:
			            throw new NotImplementedException();
			    }
			}
			return result;
		}
		public  void GDiario_ManageFieldOnClick (string commandName, string columnName, ref NavigationResult result)
		{
			if(commandName == "DeleteRow")
			{
			    CursorGDiarioDeleteCurrentItem(ref result);
			    return;
			}
		}
		private  string GetCursorGDiarioELEMENTOFilter01Suggestion ()
		{
			string suggestion = "";
			return suggestion;
		}
		private  object GetButtonsPanelEntriesCursorGDiario (Dictionary<string, string> buttonsPanelEntries)
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
		public  FiltersInformation[] CursorGDiarioGetDefaultFilters ()
		{
			List<FiltersInformation> gridDataResponseParamsFilterObjList = new List<FiltersInformation>();
			return gridDataResponseParamsFilterObjList.ToArray();
		}
		public  void GDiarioInitFilterFieldMapping ()
		{
			GridHelperCursorGDiario.RegisterFilterFieldMapping("CursorGDiarioELEMENTOFilter01", "diario.elemento", "text", "FilterGDiarioELEMENTO");
			GridHelperCursorGDiario.RegisterFilterFieldMapping("CursorGDiarioTIPOATTIVITAFilter01", "diario.tipoattivita", "text", "FilterGDiarioTIPOATTIVITA");
			GridHelperCursorGDiario.RegisterFilterFieldMapping("CursorGDiarioATTIVITAFilter01", "diario.attivita", "text", "FilterGDiarioATTIVITA");
			GridHelperCursorGDiario.RegisterFilterFieldMapping("CursorGDiarioDATAFilter01", "diario.data", "date", "FilterGDiarioDATA");
			GridHelperCursorGDiario.RegisterFilterFieldMapping("CursorGDiarioDATAFilter02", "diario.data", "date", "FilterGDiarioDATA1");
			GridHelperCursorGDiario.RegisterFilterFieldMapping("CursorGDiarioUTENTEFilter01", "diario.utente", "text", "FilterGDiarioUTENTE");
			GridHelperCursorGDiario.RegisterFilterFieldMapping("CursorGDiarioNOTEATTIVITAFilter01", "diario.noteattivita", "text", "FilterGDiarioNOTEATTIVITA");
		}
		public  object CursorGDiarioManageGetRequest (GridDataRequestParamsObj<CursorGDiarioItem> gridDataRequestParamsObj, PersistentGridDataResponseParamsObj persistentGridDataResponseParamsObj)
		{
			gridDataRequestParamsObj.Filters = this.CursorGDiarioGetDefaultFilters();
			bool hasDefaultFilters = gridDataRequestParamsObj.Filters != null && gridDataRequestParamsObj.Filters.Length != 0;
			if(persistentGridDataResponseParamsObj != null)
			{
			    gridDataRequestParamsObj.SetPersistentData(persistentGridDataResponseParamsObj.GridDataResponseParamsObj);
			}
			this.GDiarioUpdateDataSet(gridDataRequestParamsObj);
			if (gridDataRequestParamsObj.ComponentShowModeEnumValue == ComponentShowMode.insert)
			{
			    this.GDiarioInsertNew();
			}
			BusinessPage.ComponentPreRender(CursorGDiario);
			this.GridRowsPreRenderCursorGDiario();
			this.CursorGDiarioInitCurrentItemsForClient();
			object responseObj = new
			{
			    ComponentRTIs = this.GetComponentRTIsGDiario(),
			    ComponentEntries = this.GetComponentEntriesCursorGDiario(),
			    HasDefaultFilters = hasDefaultFilters,
			    GridSourceData = new
			    {
			        CurrentItemsList = this.CursorGDiario.CurrentItemsList,
			        TotalRowsCount = this.CursorGDiario.TotalRowsCount,
			        AreRowsLimited = this.CursorGDiario.AreRowsLimited
			    },
			    FiltersDataSources = this.GetComponentFiltersDataSourcesCursorGDiario(gridDataRequestParamsObj),
			    FieldsData = new
			    {
			    },
			    GridDataRequestParamsObj = gridDataRequestParamsObj
			};
			return responseObj;
		}
		private  string GetCursorGDiarioTIPOATTIVITAFilter01Suggestion ()
		{
			string suggestion = "";
			return suggestion;
		}
		public  void CursorGDiarioPerformAfterInsert (ref NavigationResult result)
		{
			result = ShowPageForBrowseGDiario(CursorGDiario.identitadiario);
			GridHelperCursorGDiario.PerformAfterAction(BusinessPage.AfterRowInsert, ref result);
		}
		protected  override void InitializeComponent10 ()
		{
			showPageParamsAllowedTypesList.Add(typeof(ShowPageParamsForBrowseGDiario));
			showPageParamsAllowedTypesList.Add(typeof(ShowPageParamsForEditGDiario));
			showPageParamsAllowedTypesList.Add(typeof(ShowPageParamsForInsertGDiario));
			IDbDataAdapter DataAdapterGDiario = DBUtils.NewDataAdapter();
			IDbCommandEx CommandGDiarioSelect = DBUtils.NewCommand(string.Empty);
			DataAdapterGDiario.SelectCommand = CommandGDiarioSelect;
			CursorGDiarioSetSelectCommand(CommandGDiarioSelect);
			CursorGDiario = new CursorGDiario(null, new DataSet(), "GDiario");
			CursorGDiario.DataAdapter = (DbDataAdapter)DataAdapterGDiario;
		}
		public  object CursorGDiarioManageRestoreGridDataSourceRequest (GridDataRequestParamsObj<CursorGDiarioItem> gridDataRequestParamsObj)
		{
			gridDataRequestParamsObj.PageIndex = 0;
			gridDataRequestParamsObj.PageSize = 20;
			gridDataRequestParamsObj.Sort = null;
			gridDataRequestParamsObj.Filters = CursorGDiarioGetDefaultFilters();
			this.GDiarioUpdateDataSet(gridDataRequestParamsObj);
			this.CursorGDiarioInitCurrentItemsForClient();
			object responseObj = new
			{
			    CurrentRowsRTI = GridHelperCursorGDiario.GetCurrentRTRowsList(),
			    GridSourceData = new
			    {
			        CurrentItemsList = this.CursorGDiario.CurrentItemsList,
			        TotalRowsCount = this.CursorGDiario.TotalRowsCount,
			        AreRowsLimited = this.CursorGDiario.AreRowsLimited
			      },
			      GridDataRequestParamsObj = gridDataRequestParamsObj,
			    FiltersDataSources = this.GetComponentFiltersDataSourcesCursorGDiario(gridDataRequestParamsObj)
			};
			return responseObj;
		}
		public  void CursorGDiarioFieldChanged (string fieldName)
		{
			CursorGDiarioItem currentItem = this.CursorGDiarioGetCurrentItem();
			BusinessPage.FieldChanged(this.CursorGDiario, fieldName);
			GridHelperCursorGDiario.RegisterCursorChanges();
			CursorGDiarioItem currentItemForBSNChanges = this.CursorGDiarioGetCurrentItem();
			if (currentItem.IsChangedELEMENTO(currentItemForBSNChanges))
			{
			this.CursorGDiarioELEMENTOResetFieldIfNoLongerValid(false);
			}
			if (currentItem.IsChangedTIPOATTIVITA(currentItemForBSNChanges))
			{
			this.CursorGDiarioTIPOATTIVITAResetFieldIfNoLongerValid(false);
			}
			if (currentItem.IsChangedATTIVITA(currentItemForBSNChanges))
			{
			this.CursorGDiarioATTIVITAResetFieldIfNoLongerValid(false);
			}
			if (currentItem.IsChangedDATA(currentItemForBSNChanges))
			{
			this.CursorGDiarioDATAResetFieldIfNoLongerValid(false);
			}
			if (currentItem.IsChangedUTENTE(currentItemForBSNChanges))
			{
			this.CursorGDiarioUTENTEResetFieldIfNoLongerValid(false);
			}
			if (currentItem.IsChangedNOTEATTIVITA(currentItemForBSNChanges))
			{
			this.CursorGDiarioNOTEATTIVITAResetFieldIfNoLongerValid(false);
			}
		}
		public  NavigationResult GDiarioCancel ()
		{
			NavigationResult result = new KamNavigationResult();
			result = ShowPageForBrowseGDiario(CursorGDiario.identitadiario);
			BusinessPage.AfterRowCancel(CursorGDiario, ref result);
			PersistentVar.ClearSaveAndNewVar();
			return result;
		}
		public  bool CursorGDiarioDATAIsFieldStillValid ()
		{
			return true;
		}
		protected  override void InitializeComponent30 ()
		{
			PageRTI.SetLevel(ApplicationPrivateSession.Current.UserInfo);
			CursorGDiario.InitKamColumnsList(GetKamGDiarioColumnsList());
			GridHelperCursorGDiario = new GridHelper(CursorGDiario, this, GDiarioRTI);
			GridHelperCursorGDiario.GetNewRuntimeParsingValueCollectionMethod = CursorGDiarioFromClauseRuntimeParsingValueCollection.GetNewRuntimeParsingValueCollection;
			GDiarioInitFilterFieldMapping();
		}
		public  void GDiarioUpdateDataSet (GridDataRequestParamsObj<CursorGDiarioItem> gridDataRequestParamsObj)
		{
			BusinessPage.BeforeGridUpdateDataSet(this.CursorGDiario, gridDataRequestParamsObj.Sort, gridDataRequestParamsObj.Filters);
			GridHelperCursorGDiario.UpdateDataSet(gridDataRequestParamsObj.ComponentShowModeEnumValue, gridDataRequestParamsObj.PageIndex, gridDataRequestParamsObj.PageSize, gridDataRequestParamsObj.GetSortClause(CursorGDiario, "DIARIO.IDENTITADIARIO DESC"), gridDataRequestParamsObj.GetWhereClause(CursorGDiario, GridHelperCursorGDiario), gridDataRequestParamsObj.GetFromClauseForFilters(CursorGDiario, GridHelperCursorGDiario), BusinessPage.AfterDatasetUpdate, true);
		}
		public  object GetComponentFiltersDataSourcesCursorGDiario (GridDataRequestParamsObj<CursorGDiarioItem> gridDataRequestParamsObj)
		{
			return new
			{
			};
		}
		public  object CursorGDiarioManageGetGridDataSourceRequest (GridDataRequestParamsObj<CursorGDiarioItem> gridDataRequestParamsObj, PersistentGridDataResponseParamsObj persistentGridDataResponseParamsObj)
		{
			if(gridDataRequestParamsObj.ComponentShowModeEnumValue == ComponentShowMode.edit ||
			gridDataRequestParamsObj.ComponentShowModeEnumValue == ComponentShowMode.insert)
			{
			this.RegisterClientChangesCursorGDiario(gridDataRequestParamsObj.CurrentItemsList);
			}
			if (persistentGridDataResponseParamsObj != null && gridDataRequestParamsObj.AreFiltersDifferent(persistentGridDataResponseParamsObj.GridDataResponseParamsObj.Filters, GridHelperCursorGDiario))
			{
			gridDataRequestParamsObj.PageIndex = 0;
			}
			this.GDiarioUpdateDataSet(gridDataRequestParamsObj);
			this.GridRowsPreRenderCursorGDiario();
			this.CursorGDiarioInitCurrentItemsForClient();
			object responseObj = new
			{
			CurrentRowsRTI = GridHelperCursorGDiario.GetCurrentRTRowsList(),
			PageIndex = gridDataRequestParamsObj.PageIndex,
			GridSourceData = new
			{
			   CurrentItemsList = CursorGDiario.CurrentItemsList,
			   TotalRowsCount = CursorGDiario.TotalRowsCount,
			   AreRowsLimited = CursorGDiario.AreRowsLimited
			}
			};
			return responseObj;
		}
		public  bool CursorGDiarioTIPOATTIVITAIsFieldStillValid ()
		{
			return true;
		}
		private  string GetCursorGDiarioDATAFilter01Suggestion ()
		{
			string suggestion = "";
			return suggestion;
		}
		public  KamNavigationResult GDiario_ItemCommand (int rowIndex, string columnName, string commandName)
		{
			NavigationResult result = new KamNavigationResult()
			{
			    ActionResult = NavigationActionResults.UpdateComponent,
			    CursorName = "CursorGDiario"
			};
			bool commandContinue = true;
			BusinessPage.BeforeCommand("GDiario", commandName, rowIndex, columnName, ref commandContinue, ref result);
			if (commandContinue)
			{
			    this.CursorGDiarioSelectRow(rowIndex);
			this.GDiario_ManageFieldOnClick(commandName, columnName, ref result);
			BusinessPage.AfterCommand("GDiario", commandName, columnName, ref result);
			}
			return (KamNavigationResult)result;
		}
		public  object CursorGDiarioGetItemDependentFieldsUpdatedResponseObj ()
		{
			CursorGDiarioItem currentItem = this.CursorGDiarioGetCurrentItem();
			CursorGDiarioInitItemForClient(currentItem);
			return currentItem;
		}
		public  CursorGDiarioItem CursorGDiarioGetCurrentItem ()
		{
			return (CursorGDiarioItem)GridHelperCursorGDiario.GetCurrentItem();
		}
		public  void CursorGDiarioATTIVITAResetFieldIfNoLongerValid (bool skipCheckCurrentField)
		{
			bool checkDependentFields = true;
			if(!skipCheckCurrentField)
			{
			    if (!CursorGDiarioATTIVITAIsFieldStillValid())
			    {
			        CursorGDiarioItem currentItem = this.CursorGDiarioGetCurrentItem();
			        currentItem.SetATTIVITA(null);
			        this.CursorGDiarioRegisterCurrentItemClientChanges(currentItem);
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
		public  void CursorGDiarioInitCurrentItemsForClient ()
		{
			int currentRowIndex = CursorGDiario.CurrentRowIndex;
			for (int i = 0; i < CursorGDiario.CurrentItemsList.Count; i++)
			{
			    AbstractItem abstractItem = CursorGDiario.CurrentItemsList[i];
			    CursorGDiarioSelectRow(abstractItem.ItemSort);
			    CursorGDiarioInitItemForClient((CursorGDiarioItem)abstractItem);
			}
			CursorGDiarioSelectRow(currentRowIndex);
		}
		protected  override void InitializeComponent20 ()
		{
			PageRTI = new RunTimeComponent(null);
			PageRTI.SecurityLevel = PageSecurityLevel;
			PageRTI.ModulesArray = PageModules;
			GDiarioRTI = new RTGrid(PageRTI);
			GDiarioRTI.SecurityLevel = SecurityLevels.Restricted("DiarioPage");
			GDiarioRTI.ModulesArray = GDiarioRTIModules;
			GDiarioRTI.AllowSaveAndNew = false;
			InitComponentRTIsGDiario();
		}
		private CursorGDiario cursorGDiario;
		private List<Type> showPageParamsAllowedTypesList=new List<Type>();
		private GridHelper GridHelperCursorGDiario;
	}
	[Serializable]
	public class DiarioPersistenceVar
	{
		#region SubClasses
		#endregion
		public DiarioPersistenceVar ()
		{
			_isSaveAndNewAction = false;
			_oldCurrentRowSaveAndNew = null;
			_TIPOELEMENTO = "";
			_IDELEMENTO = 0;
		}
		public   int IDELEMENTO
		{
		    get
		    {
		        return _IDELEMENTO;
		    }
		    set
		    {
		        _IDELEMENTO = value;
		        SaveToSession();
		    }
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
		public   string TIPOELEMENTO
		{
		    get
		    {
		        return _TIPOELEMENTO;
		    }
		    set
		    {
		        _TIPOELEMENTO = value;
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
			SessionHelper.PushValue("Diario.PersistenceVar", this);
		}
		private string _TIPOELEMENTO;
		private DataRow _oldCurrentRowSaveAndNew;
		private bool _isSaveAndNewAction;
		private int _IDELEMENTO;
	}
	public class CursorGDiario:IT4.Common.Data.DataCursor
	{
		#region SubClasses
		#endregion
		public CursorGDiario (DbDataAdapter vDataAdapter, DataSet vDataSet, string vName):base(vDataAdapter, vDataSet, vName)
		{
			PrimaryKey = "identitadiario";
			UpdateTable = "diario";
		}
		public   String tipoelemento
		{
		    get
		    {
		        if (CurrentRow != null)
		        {
		            if (CurrentRow["tipoelemento"] == DBNull.Value) return "";
		            else return Convert.ToString(CurrentRow["tipoelemento"]);
		        }
		        else return "";
		    }
		    set
		    {
		        if (CurrentRow != null) CurrentRow["tipoelemento"] = value;
		        else throw new Exception("Nessuna riga corrente");
		    }
		}
		public   String Oldattivita
		{
		    get
		    {
		        if (CurrentRowOldValues != null)
		        {
		            if (CurrentRowOldValues["attivita"] == DBNull.Value) return "";
		            else return Convert.ToString(CurrentRowOldValues["attivita"]);
		        }
		        else return "";
		    }
		    set
		    {
		        if (CurrentRowOldValues != null) CurrentRowOldValues["attivita"] = value;
		        else throw new Exception("Nessuna riga corrente");
		    }
		}
		public   Int32 elemento
		{
		    get
		    {
		        if (CurrentRow != null)
		        {
		            if (CurrentRow["elemento"] == DBNull.Value) return 0;
		            else return Convert.ToInt32(CurrentRow["elemento"]);
		        }
		        else return 0;
		    }
		    set
		    {
		        if (CurrentRow != null) CurrentRow["elemento"] = value;
		        else throw new Exception("Nessuna riga corrente");
		    }
		}
		public   String Oldnoteattivita
		{
		    get
		    {
		        if (CurrentRowOldValues != null)
		        {
		            if (CurrentRowOldValues["noteattivita"] == DBNull.Value) return "";
		            else return Convert.ToString(CurrentRowOldValues["noteattivita"]);
		        }
		        else return "";
		    }
		    set
		    {
		        if (CurrentRowOldValues != null) CurrentRowOldValues["noteattivita"] = value;
		        else throw new Exception("Nessuna riga corrente");
		    }
		}
		public   String Oldtipoattivita
		{
		    get
		    {
		        if (CurrentRowOldValues != null)
		        {
		            if (CurrentRowOldValues["tipoattivita"] == DBNull.Value) return "";
		            else return Convert.ToString(CurrentRowOldValues["tipoattivita"]);
		        }
		        else return "";
		    }
		    set
		    {
		        if (CurrentRowOldValues != null) CurrentRowOldValues["tipoattivita"] = value;
		        else throw new Exception("Nessuna riga corrente");
		    }
		}
		public   DateTime Olddata
		{
		    get
		    {
		        if (CurrentRowOldValues != null)
		        {
		            if (CurrentRowOldValues["data"] == DBNull.Value) return Convert.ToDateTime("01/01/01");
		            else return Convert.ToDateTime(CurrentRowOldValues["data"]);
		        }
		        else return Convert.ToDateTime("01/01/01");
		    }
		    set
		    {
		        if (CurrentRowOldValues != null) CurrentRowOldValues["data"] = value;
		        else throw new Exception("Nessuna riga corrente");
		    }
		}
		public   String tipoattivita
		{
		    get
		    {
		        if (CurrentRow != null)
		        {
		            if (CurrentRow["tipoattivita"] == DBNull.Value) return "";
		            else return Convert.ToString(CurrentRow["tipoattivita"]);
		        }
		        else return "";
		    }
		    set
		    {
		        if (CurrentRow != null) CurrentRow["tipoattivita"] = value;
		        else throw new Exception("Nessuna riga corrente");
		    }
		}
		public   String Oldtipoelemento
		{
		    get
		    {
		        if (CurrentRowOldValues != null)
		        {
		            if (CurrentRowOldValues["tipoelemento"] == DBNull.Value) return "";
		            else return Convert.ToString(CurrentRowOldValues["tipoelemento"]);
		        }
		        else return "";
		    }
		    set
		    {
		        if (CurrentRowOldValues != null) CurrentRowOldValues["tipoelemento"] = value;
		        else throw new Exception("Nessuna riga corrente");
		    }
		}
		public   String utente
		{
		    get
		    {
		        if (CurrentRow != null)
		        {
		            if (CurrentRow["utente"] == DBNull.Value) return "";
		            else return Convert.ToString(CurrentRow["utente"]);
		        }
		        else return "";
		    }
		    set
		    {
		        if (CurrentRow != null) CurrentRow["utente"] = value;
		        else throw new Exception("Nessuna riga corrente");
		    }
		}
		public   Int32 Oldelemento
		{
		    get
		    {
		        if (CurrentRowOldValues != null)
		        {
		            if (CurrentRowOldValues["elemento"] == DBNull.Value) return 0;
		            else return Convert.ToInt32(CurrentRowOldValues["elemento"]);
		        }
		        else return 0;
		    }
		    set
		    {
		        if (CurrentRowOldValues != null) CurrentRowOldValues["elemento"] = value;
		        else throw new Exception("Nessuna riga corrente");
		    }
		}
		public   DateTime data
		{
		    get
		    {
		        if (CurrentRow != null)
		        {
		            if (CurrentRow["data"] == DBNull.Value) return Convert.ToDateTime("01/01/01");
		            else return Convert.ToDateTime(CurrentRow["data"]);
		        }
		        else return Convert.ToDateTime("01/01/01");
		    }
		    set
		    {
		        if (CurrentRow != null) CurrentRow["data"] = value;
		        else throw new Exception("Nessuna riga corrente");
		    }
		}
		public   Int32 identitadiario
		{
		    get
		    {
		        if (CurrentRow != null)
		        {
		            if (CurrentRow["identitadiario"] == DBNull.Value) return 0;
		            else return Convert.ToInt32(CurrentRow["identitadiario"]);
		        }
		        else return 0;
		    }
		    set
		    {
		        if (CurrentRow != null) CurrentRow["identitadiario"] = value;
		        else throw new Exception("Nessuna riga corrente");
		    }
		}
		public   String Oldutente
		{
		    get
		    {
		        if (CurrentRowOldValues != null)
		        {
		            if (CurrentRowOldValues["utente"] == DBNull.Value) return "";
		            else return Convert.ToString(CurrentRowOldValues["utente"]);
		        }
		        else return "";
		    }
		    set
		    {
		        if (CurrentRowOldValues != null) CurrentRowOldValues["utente"] = value;
		        else throw new Exception("Nessuna riga corrente");
		    }
		}
		public   String attivita
		{
		    get
		    {
		        if (CurrentRow != null)
		        {
		            if (CurrentRow["attivita"] == DBNull.Value) return "";
		            else return Convert.ToString(CurrentRow["attivita"]);
		        }
		        else return "";
		    }
		    set
		    {
		        if (CurrentRow != null) CurrentRow["attivita"] = value;
		        else throw new Exception("Nessuna riga corrente");
		    }
		}
		public   String noteattivita
		{
		    get
		    {
		        if (CurrentRow != null)
		        {
		            if (CurrentRow["noteattivita"] == DBNull.Value) return "";
		            else return Convert.ToString(CurrentRow["noteattivita"]);
		        }
		        else return "";
		    }
		    set
		    {
		        if (CurrentRow != null) CurrentRow["noteattivita"] = value;
		        else throw new Exception("Nessuna riga corrente");
		    }
		}
		public   Int32 Oldidentitadiario
		{
		    get
		    {
		        if (CurrentRowOldValues != null)
		        {
		            if (CurrentRowOldValues["identitadiario"] == DBNull.Value) return 0;
		            else return Convert.ToInt32(CurrentRowOldValues["identitadiario"]);
		        }
		        else return 0;
		    }
		    set
		    {
		        if (CurrentRowOldValues != null) CurrentRowOldValues["identitadiario"] = value;
		        else throw new Exception("Nessuna riga corrente");
		    }
		}
		public  bool utenteIsNull ()
		{
			if (CurrentRow != null)
			{
			    return CurrentRow["utente"] == DBNull.Value;
			}
			else return true;
		}
		public  bool OldtipoelementoIsNull ()
		{
			if (CurrentRowOldValues != null)
			{
			    return CurrentRowOldValues["tipoelemento"] == DBNull.Value;
			}
			else return true;
		}
		public  bool OlddataIsNull ()
		{
			if (CurrentRowOldValues != null)
			{
			    return CurrentRowOldValues["data"] == DBNull.Value;
			}
			else return true;
		}
		public  void attivitaSetNull ()
		{
			if (CurrentRow != null)
			{
			    CurrentRow["attivita"] = DBNull.Value;
			}
		}
		public  bool OldattivitaIsNull ()
		{
			if (CurrentRowOldValues != null)
			{
			    return CurrentRowOldValues["attivita"] == DBNull.Value;
			}
			else return true;
		}
		public  void identitadiarioSetNull ()
		{
			if (CurrentRow != null)
			{
			    CurrentRow["identitadiario"] = DBNull.Value;
			}
		}
		public  bool OldutenteIsNull ()
		{
			if (CurrentRowOldValues != null)
			{
			    return CurrentRowOldValues["utente"] == DBNull.Value;
			}
			else return true;
		}
		public  bool attivitaIsNull ()
		{
			if (CurrentRow != null)
			{
			    return CurrentRow["attivita"] == DBNull.Value;
			}
			else return true;
		}
		public  bool OldtipoattivitaIsNull ()
		{
			if (CurrentRowOldValues != null)
			{
			    return CurrentRowOldValues["tipoattivita"] == DBNull.Value;
			}
			else return true;
		}
		public  bool OldnoteattivitaIsNull ()
		{
			if (CurrentRowOldValues != null)
			{
			    return CurrentRowOldValues["noteattivita"] == DBNull.Value;
			}
			else return true;
		}
		public  void utenteSetNull ()
		{
			if (CurrentRow != null)
			{
			    CurrentRow["utente"] = DBNull.Value;
			}
		}
		public  bool utenteIsChanged ()
		{
			return (OldutenteIsNull() && !utenteIsNull()) || (utenteIsNull() && !OldutenteIsNull()) || (!utenteIsNull() && !OldutenteIsNull() && (utente != Oldutente));
		}
		public  bool elementoIsChanged ()
		{
			return (OldelementoIsNull() && !elementoIsNull()) || (elementoIsNull() && !OldelementoIsNull()) || (!elementoIsNull() && !OldelementoIsNull() && (elemento != Oldelemento));
		}
		public  void tipoattivitaSetNull ()
		{
			if (CurrentRow != null)
			{
			    CurrentRow["tipoattivita"] = DBNull.Value;
			}
		}
		public  bool tipoattivitaIsNull ()
		{
			if (CurrentRow != null)
			{
			    return CurrentRow["tipoattivita"] == DBNull.Value;
			}
			else return true;
		}
		public  void noteattivitaSetNull ()
		{
			if (CurrentRow != null)
			{
			    CurrentRow["noteattivita"] = DBNull.Value;
			}
		}
		public  bool OldelementoIsNull ()
		{
			if (CurrentRowOldValues != null)
			{
			    return CurrentRowOldValues["elemento"] == DBNull.Value;
			}
			else return true;
		}
		public  bool identitadiarioIsNull ()
		{
			if (CurrentRow != null)
			{
			    return CurrentRow["identitadiario"] == DBNull.Value;
			}
			else return true;
		}
		public  bool elementoIsNull ()
		{
			if (CurrentRow != null)
			{
			    return CurrentRow["elemento"] == DBNull.Value;
			}
			else return true;
		}
		public  override void SetItem (int index, AbstractItem item, RunTimeComponent runTimeComponent)
		{
			CursorGDiarioItem CursorGDiarioItem = (CursorGDiarioItem)item;
			RTGrid typedRTIComponent = (RTGrid)runTimeComponent;
			this.SetFieldValue(index, "ELEMENTO", CursorGDiarioItem.GetELEMENTO(), typedRTIComponent.GetRTColumn("ELEMENTO"));
			this.SetFieldValue(index, "TIPOATTIVITA", CursorGDiarioItem.GetTIPOATTIVITA(), typedRTIComponent.GetRTColumn("TIPOATTIVITA"));
			this.SetFieldValue(index, "ATTIVITA", CursorGDiarioItem.GetATTIVITA(), typedRTIComponent.GetRTColumn("ATTIVITA"));
			this.SetFieldValue(index, "DATA", CursorGDiarioItem.GetDATA(), typedRTIComponent.GetRTColumn("DATA"));
			this.SetFieldValue(index, "UTENTE", CursorGDiarioItem.GetUTENTE(), typedRTIComponent.GetRTColumn("UTENTE"));
			this.SetFieldValue(index, "NOTEATTIVITA", CursorGDiarioItem.GetNOTEATTIVITA(), typedRTIComponent.GetRTColumn("NOTEATTIVITA"));
		}
		public  bool dataIsNull ()
		{
			if (CurrentRow != null)
			{
			    return CurrentRow["data"] == DBNull.Value;
			}
			else return true;
		}
		public  bool noteattivitaIsNull ()
		{
			if (CurrentRow != null)
			{
			    return CurrentRow["noteattivita"] == DBNull.Value;
			}
			else return true;
		}
		public  bool attivitaIsChanged ()
		{
			return (OldattivitaIsNull() && !attivitaIsNull()) || (attivitaIsNull() && !OldattivitaIsNull()) || (!attivitaIsNull() && !OldattivitaIsNull() && (attivita != Oldattivita));
		}
		public  bool tipoattivitaIsChanged ()
		{
			return (OldtipoattivitaIsNull() && !tipoattivitaIsNull()) || (tipoattivitaIsNull() && !OldtipoattivitaIsNull()) || (!tipoattivitaIsNull() && !OldtipoattivitaIsNull() && (tipoattivita != Oldtipoattivita));
		}
		public  bool OldidentitadiarioIsNull ()
		{
			if (CurrentRowOldValues != null)
			{
			    return CurrentRowOldValues["identitadiario"] == DBNull.Value;
			}
			else return true;
		}
		public  bool noteattivitaIsChanged ()
		{
			return (OldnoteattivitaIsNull() && !noteattivitaIsNull()) || (noteattivitaIsNull() && !OldnoteattivitaIsNull()) || (!noteattivitaIsNull() && !OldnoteattivitaIsNull() && (noteattivita != Oldnoteattivita));
		}
		public  override AbstractItem GetItem (int index, RunTimeComponent runTimeComponent)
		{
			CursorGDiarioItem CursorGDiarioItem = new CursorGDiarioItem(index);
			RTGrid typedRTIComponent = (RTGrid)runTimeComponent;
			CursorGDiarioItem.SetPrimaryKeyValue(this.GetFieldValue(index, "identitadiario", typedRTIComponent));
			CursorGDiarioItem.SetELEMENTO(this.GetFieldValue(index, "ELEMENTO", typedRTIComponent.GetRTColumn("ELEMENTO")));
			CursorGDiarioItem.SetTIPOATTIVITA(this.GetFieldValue(index, "TIPOATTIVITA", typedRTIComponent.GetRTColumn("TIPOATTIVITA")));
			CursorGDiarioItem.SetATTIVITA(this.GetFieldValue(index, "ATTIVITA", typedRTIComponent.GetRTColumn("ATTIVITA")));
			CursorGDiarioItem.SetDATA(this.GetFieldValue(index, "DATA", typedRTIComponent.GetRTColumn("DATA")));
			CursorGDiarioItem.SetUTENTE(this.GetFieldValue(index, "UTENTE", typedRTIComponent.GetRTColumn("UTENTE")));
			CursorGDiarioItem.SetNOTEATTIVITA(this.GetFieldValue(index, "NOTEATTIVITA", typedRTIComponent.GetRTColumn("NOTEATTIVITA")));
			return CursorGDiarioItem;
		}
		public  bool dataIsChanged ()
		{
			return (OlddataIsNull() && !dataIsNull()) || (dataIsNull() && !OlddataIsNull()) || (!dataIsNull() && !OlddataIsNull() && (data != Olddata));
		}
		public  void tipoelementoSetNull ()
		{
			if (CurrentRow != null)
			{
			    CurrentRow["tipoelemento"] = DBNull.Value;
			}
		}
		public  bool tipoelementoIsNull ()
		{
			if (CurrentRow != null)
			{
			    return CurrentRow["tipoelemento"] == DBNull.Value;
			}
			else return true;
		}
		public  void elementoSetNull ()
		{
			if (CurrentRow != null)
			{
			    CurrentRow["elemento"] = DBNull.Value;
			}
		}
		public  bool identitadiarioIsChanged ()
		{
			return (OldidentitadiarioIsNull() && !identitadiarioIsNull()) || (identitadiarioIsNull() && !OldidentitadiarioIsNull()) || (!identitadiarioIsNull() && !OldidentitadiarioIsNull() && (identitadiario != Oldidentitadiario));
		}
		public  void dataSetNull ()
		{
			if (CurrentRow != null)
			{
			    CurrentRow["data"] = DBNull.Value;
			}
		}
		public  bool tipoelementoIsChanged ()
		{
			return (OldtipoelementoIsNull() && !tipoelementoIsNull()) || (tipoelementoIsNull() && !OldtipoelementoIsNull()) || (!tipoelementoIsNull() && !OldtipoelementoIsNull() && (tipoelemento != Oldtipoelemento));
		}
	}
	[Serializable]
	public abstract class AbstractShowPageParamsGDiario:PageInvokeParams
	{
		#region SubClasses
		#endregion
		public AbstractShowPageParamsGDiario ()
		{
		}
		public   object identitadiario
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
	public class ShowPageParamsForBrowseGDiario:AbstractShowPageParamsGDiario
	{
		#region SubClasses
		#endregion
		public ShowPageParamsForBrowseGDiario ()
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
			ShowPageParamsForBrowseGDiario showParams = new ShowPageParamsForBrowseGDiario();
			showParams.pkValue = pkValue;
			ApplicationPrivateSession.Current.PageInvokeParams = showParams;
		}
	}
	[Serializable]
	public class ShowPageParamsForEditGDiario:AbstractShowPageParamsGDiario
	{
		#region SubClasses
		#endregion
		public ShowPageParamsForEditGDiario ()
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
			ShowPageParamsForEditGDiario showParams = new ShowPageParamsForEditGDiario();
			showParams.pkValue = pkValue;
			ApplicationPrivateSession.Current.PageInvokeParams = showParams;
		}
	}
	[Serializable]
	public class ShowPageParamsForInsertGDiario:AbstractShowPageParamsGDiario
	{
		#region SubClasses
		#endregion
		public ShowPageParamsForInsertGDiario ()
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
			ShowPageParamsForInsertGDiario showParams = new ShowPageParamsForInsertGDiario();
			ApplicationPrivateSession.Current.PageInvokeParams = showParams;
		}
	}
	public abstract class GDiarioLookups
	{
		#region SubClasses
		#endregion
		public GDiarioLookups ()
		{
		}
	}
	public class CursorGDiarioItem:AbstractItem
	{
		#region SubClasses
		#endregion
		public CursorGDiarioItem (int index):base(index)
		{
			this.CursorGDiarioItemSort = index;
		}
		public  override int ItemSort
		{
		    get
		    {
		        return CursorGDiarioItemSort;
		    }
		    set
		    {
		        CursorGDiarioItemSort = value;
		    }
		}
		public string UTENTE;
		public WSDateTime DATA;
		public string NOTEATTIVITA;
		public Int32? ELEMENTO;
		public Int32? ItemPrimaryKeyValue;
		public int CursorGDiarioItemSort;
		public string ATTIVITA;
		public string TIPOATTIVITA;
		public  void SetTIPOATTIVITA (object value)
		{
			TIPOATTIVITA = value == null || value == DBNull.Value ? (string)null : Convert.ToString(value);
		}
		public  void SetNOTEATTIVITA (object value)
		{
			NOTEATTIVITA = value == null || value == DBNull.Value ? (string)null : Convert.ToString(value);
		}
		public  bool IsChangedTIPOATTIVITA (CursorGDiarioItem newItem)
		{
			return (this.GetTIPOATTIVITA() == null && newItem.GetTIPOATTIVITA() != null) || (this.GetTIPOATTIVITA() != null && !this.GetTIPOATTIVITA().Equals(newItem.GetTIPOATTIVITA()));
		}
		public  bool IsChangedELEMENTO (CursorGDiarioItem newItem)
		{
			return (this.GetELEMENTO() == null && newItem.GetELEMENTO() != null) || (this.GetELEMENTO() != null && !this.GetELEMENTO().Equals(newItem.GetELEMENTO()));
		}
		public  bool IsChangedATTIVITA (CursorGDiarioItem newItem)
		{
			return (this.GetATTIVITA() == null && newItem.GetATTIVITA() != null) || (this.GetATTIVITA() != null && !this.GetATTIVITA().Equals(newItem.GetATTIVITA()));
		}
		public  object GetUTENTE ()
		{
			return this.UTENTE == null ? (object)DBNull.Value : (object)this.UTENTE;
		}
		public  object GetATTIVITA ()
		{
			return this.ATTIVITA == null ? (object)DBNull.Value : (object)this.ATTIVITA;
		}
		public  override void SetPrimaryKeyValue (object value)
		{
			this.ItemPrimaryKeyValue = value == null || value == DBNull.Value ? (Int32?)null : Convert.ToInt32(value);
		}
		public  void SetUTENTE (object value)
		{
			UTENTE = value == null || value == DBNull.Value ? (string)null : Convert.ToString(value);
		}
		public  object GetDATA ()
		{
			return this.DATA == null ? (object)DBNull.Value : (DateTime?)this.DATA;
		}
		public  object GetELEMENTO ()
		{
			return this.ELEMENTO == null ? (object)DBNull.Value : (object)this.ELEMENTO;
		}
		public  object GetNOTEATTIVITA ()
		{
			return this.NOTEATTIVITA == null ? (object)DBNull.Value : (object)this.NOTEATTIVITA;
		}
		public  void SetATTIVITA (object value)
		{
			ATTIVITA = value == null || value == DBNull.Value ? (string)null : Convert.ToString(value);
		}
		public  override bool CheckIfIsItemDataRow (DataRow dataRow)
		{
			object dataRowPrimaryKeyValue = dataRow["identitadiario"];
			return this.GetPrimaryKeyValue().Equals(dataRowPrimaryKeyValue == null || dataRowPrimaryKeyValue == DBNull.Value ? (Int32?)null : Convert.ToInt32(dataRowPrimaryKeyValue));
		}
		public  void SetDATA (object value)
		{
			DATA = value == null || value == DBNull.Value ? (DateTime?)null : Convert.ToDateTime(value);
		}
		public  bool IsChangedUTENTE (CursorGDiarioItem newItem)
		{
			return (this.GetUTENTE() == null && newItem.GetUTENTE() != null) || (this.GetUTENTE() != null && !this.GetUTENTE().Equals(newItem.GetUTENTE()));
		}
		public  override object GetPrimaryKeyValue ()
		{
			return this.ItemPrimaryKeyValue == null ? (object)DBNull.Value : (object)this.ItemPrimaryKeyValue;
		}
		public  void SetELEMENTO (object value)
		{
			ELEMENTO = value == null || value == DBNull.Value ? (Int32?)null : Convert.ToInt32(value);
		}
		public  override bool IsChanged (AbstractItem newItem)
		{
			CursorGDiarioItem newTypedItem = (CursorGDiarioItem)newItem;
			bool isChanged = false;
			isChanged |= IsChangedTIPOATTIVITA(newTypedItem);
			isChanged |= IsChangedDATA(newTypedItem);
			isChanged |= IsChangedUTENTE(newTypedItem);
			isChanged |= IsChangedNOTEATTIVITA(newTypedItem);
			return isChanged;
		}
		public  bool IsChangedDATA (CursorGDiarioItem newItem)
		{
			return (this.GetDATA() == null && newItem.GetDATA() != null) || (this.GetDATA() != null && !this.GetDATA().Equals(newItem.GetDATA()));
		}
		public  object GetTIPOATTIVITA ()
		{
			return this.TIPOATTIVITA == null ? (object)DBNull.Value : (object)this.TIPOATTIVITA;
		}
		public  bool IsChangedNOTEATTIVITA (CursorGDiarioItem newItem)
		{
			return (this.GetNOTEATTIVITA() == null && newItem.GetNOTEATTIVITA() != null) || (this.GetNOTEATTIVITA() != null && !this.GetNOTEATTIVITA().Equals(newItem.GetNOTEATTIVITA()));
		}
	}
	public class CursorGDiarioFromClauseRuntimeParsingValueCollection:RuntimeParsingValueCollection
	{
		#region SubClasses
		#endregion
		public CursorGDiarioFromClauseRuntimeParsingValueCollection ():base()
		{
		}
		public  static RuntimeParsingValueCollection GetNewRuntimeParsingValueCollection ()
		{
			return new CursorGDiarioFromClauseRuntimeParsingValueCollection();
		}
	}
}
