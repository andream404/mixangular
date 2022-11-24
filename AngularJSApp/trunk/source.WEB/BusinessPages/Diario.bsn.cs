using IT4.Web.UI.Page;
using IT4.Web.Common;
using System;
using System.Linq;
using IT4.Common.Data;
using System.Data;

namespace AngularJSApp.Pages
{
	public class BSNDiarioPage : BusinessPage
	{
		#region SubClasses
		#endregion
		public BSNDiarioPage(DiarioPage page) : base(page)
		{
		}
		public new DiarioPage Page
		{
			get
			{
				return (DiarioPage)base.Page;
			}
		}

		public static KamNavigationResult ShowPage(int IDElemento, String TipoElemento)
		{
			DiarioPage.PersistentVarStatic.TIPOELEMENTO = TipoElemento;
			DiarioPage.PersistentVarStatic.IDELEMENTO = IDElemento;

			ShowPageParamsForBrowseGDiario.InitShowPageParams(-1);
			return new KamNavigationResult() { ActionResult = NavigationActionResults.GoToPageForBrowse, PageUrl = "#Diario", CursorName = "CursorGDiario" };
		}
		public override void BeforeRowUpdate(DataCursor cursor, ref bool cancel, ref NavigationResult result)
		{
		}
		public override void ComponentPreRender(DataCursor cursor)
		{
			for (int i = 0; i < ((CursorGDiario)cursor).CurrentItemsList.Count; i++)
			{
				((CursorGDiarioItem)((CursorGDiario)cursor).CurrentItemsList[i]).NOTEATTIVITA = cursor.TranslateDiario(((CursorGDiarioItem)((CursorGDiario)cursor).CurrentItemsList[i]).NOTEATTIVITA, ApplicationPrivateSession.Current.UserInfo.Dictionary.GetCurrentNameSpace(), ApplicationPrivateSession.Current.UserInfo.Dictionary).ToString().Replace(Environment.NewLine, "<br>");
			}
		}
		public override void BeforeCommand(string sourceName, string commandName, int rowIndex, string columnName, ref bool commandContinue, ref NavigationResult result)
		{
		}
		public override void AfterRowUpdate(DataCursor cursor, ref NavigationResult result)
		{
		}
		public override void AfterDatasetUpdate(DataCursor cursor)
		{
		}
		public override void RowPreRender(DataCursor cursor)
		{
		}
		public override void AfterRowCancel(DataCursor cursor, ref NavigationResult result)
		{
		}
		public override void AfterRowInsert(DataCursor cursor, ref NavigationResult result)
		{
		}
		public override void SetDefaultValues(DataCursor cursor)
		{
		}
		public override void FieldChanged(DataCursor cursor, string fieldName)
		{
		}
		public override void BeforeRowInsert(DataCursor cursor, ref bool cancel, ref NavigationResult result)
		{
		}
		public override void AfterCommand(string sourceName, string commandName, string columnName, ref NavigationResult result)
		{
		}
	}
}
