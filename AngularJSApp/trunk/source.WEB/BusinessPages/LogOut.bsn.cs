using IT4.Web.UI.Page;
using IT4.Web.Common;
using System;
using System.Linq;
using IT4.Common.Data;
using System.Data;
namespace AngularJSApp.Pages
{
	public class BSNLogOutPage:BusinessPage
	{
		#region SubClasses
		#endregion
		public BSNLogOutPage (LogOutPage page):base(page)
		{
		}
		public new    LogOutPage Page
		{
		    get
		    {
		        return (LogOutPage)base.Page;
		    }
		}
		public  override void AfterDatasetUpdate (DataCursor cursor)
		{
		}
		public  override void LazyLookupFieldInsertNewItem (DataCursor cursor, string fieldName, object newItemKey, object fieldValue)
		{
		}
		public  override void ComponentPreRender (DataCursor cursor)
		{
		}
		public  override void AfterCommand (string sourceName, string commandName, string columnName, ref NavigationResult result)
		{
		}
		public  override void AfterRowInsert (DataCursor cursor, ref NavigationResult result)
		{
		}
		public  override void AfterRowCancel (DataCursor cursor, ref NavigationResult result)
		{
		}
		public  override void BeforeCommand (string sourceName, string commandName, int rowIndex, string columnName, ref bool commandContinue, ref NavigationResult result)
		{
		}
		public  override object LazyLookupFieldGetNewItemKey (DataCursor cursor, string fieldName, object value)
		{
			return null;
		}
		public  override void SetDefaultValues (DataCursor cursor)
		{
		}
		public  override void FieldChanged (DataCursor cursor, string fieldName)
		{
		}
		public  override void BeforeRowInsert (DataCursor cursor, ref bool cancel, ref NavigationResult result)
		{
		}
		public  override void RowPreRender (DataCursor cursor)
		{
		}
		public  override void BeforeRowUpdate (DataCursor cursor, ref bool cancel, ref NavigationResult result)
		{
		}
		public  override void AfterRowUpdate (DataCursor cursor, ref NavigationResult result)
		{
		}
	}
}
