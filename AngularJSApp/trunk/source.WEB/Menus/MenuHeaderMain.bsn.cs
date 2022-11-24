using IT4.Web.UI.Menu;
using IT4.Web.UI.Page;
namespace AngularJSApp.Menus
{
	public class BSNMenuHeaderMain:BusinessMenu
	{
		#region SubClasses
		#endregion
		public BSNMenuHeaderMain (BaseMenu menu):base(menu)
		{
		}
		public new    MenuHeaderMain Menu
		{
		    get
		    {
		        return (MenuHeaderMain)base.Menu;
		    }
		}
		public  override void ComponentPreRender ()
		{
		}
	}
}
