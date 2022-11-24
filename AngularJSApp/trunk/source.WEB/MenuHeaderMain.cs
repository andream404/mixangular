using IT4.Web.RuntimeObjects;
using IT4.Web.UI.Menu;
using IT4.Web.UI.Page;
using IT4.Common.Security;
using AngularJSApp.Pages;
namespace AngularJSApp.Menus
{
	public class MenuHeaderMain:BaseMenu
	{
		#region SubClasses
		#endregion
		public MenuHeaderMain (BasePage parentPage):base(parentPage)
		{
		}
		public   RTMenuItem MenuEntryLingue
		{
		    get
		    {
		        return MenuItem1RTIMenuItem0RTI;
		    }
		}
		public   RTMenuItem MenuEntryTraduzioni
		{
		    get
		    {
		        return MenuItem1RTIMenuItem2RTI;
		    }
		}
		public static  ModulesArray MenuModules
		{
		    get
		    {
		        return null;
		    }
		}
		public   RTMenuItem MenuEntryStringhe
		{
		    get
		    {
		        return MenuItem1RTIMenuItem1RTI;
		    }
		}
		public   RTMenuItem MenuEntryIndex
		{
		    get
		    {
		        return MenuItem0RTI;
		    }
		}
		public   RTMenuItem MenuEntryDizionario
		{
		    get
		    {
		        return MenuItem1RTI;
		    }
		}
		public RTMenu MenuRTI;
		public RTMenuItem MenuItem1RTIMenuItem1RTI;
		public RTMenuItem MenuItem1RTIMenuItem0RTI;
		public RTMenuItem MenuItem1RTIMenuItem2RTI;
		public RTMenuItem MenuItem1RTI;
		public RTMenuItem MenuItem0RTI;
		public  object GetMenuSettings ()
		{
			this.BusinessMenu.ComponentPreRender();
			object menuSettings = null;
			menuSettings = new
			{
			    MenuRTIs = new
			    {
			        MenuRTI = this.MenuRTI,
			        ItemsRTIs = new
			        {
			        MenuItem0RTIs = new
			        {
			            ItemRTI = this.MenuItem0RTI,
			            ItemsRTIs = new
			            {
			            }
			        }
			        ,
			        MenuItem1RTIs = new
			        {
			            ItemRTI = this.MenuItem1RTI,
			            ItemsRTIs = new
			            {
			        MenuItem0RTIs = new
			        {
			            ItemRTI = this.MenuItem1RTIMenuItem0RTI,
			            ItemsRTIs = new
			            {
			            }
			        }
			        ,
			        MenuItem1RTIs = new
			        {
			            ItemRTI = this.MenuItem1RTIMenuItem1RTI,
			            ItemsRTIs = new
			            {
			            }
			        }
			        ,
			        MenuItem2RTIs = new
			        {
			            ItemRTI = this.MenuItem1RTIMenuItem2RTI,
			            ItemsRTIs = new
			            {
			            }
			        }
			            }
			        }
			        }
			    },
			    MenuEntries = new
			    {
			        MenuEntry0Entries = new
			        {
			            Entry = ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry("Index"),
			            Entries = new
			            {
			            }
			        },
			        MenuEntry1Entries = new
			        {
			            Entry = ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry("Dizionario"),
			            Entries = new
			            {
			        MenuEntry0Entries = new
			        {
			            Entry = ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry("Lingue"),
			            Entries = new
			            {
			            }
			        },
			        MenuEntry1Entries = new
			        {
			            Entry = ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry("Stringhe"),
			            Entries = new
			            {
			            }
			        },
			        MenuEntry2Entries = new
			        {
			            Entry = ApplicationPrivateSession.Current.UserInfo.Dictionary.GetEntry("Traduzioni"),
			            Entries = new
			            {
			            }
			        }
			            }
			        }
			    }
			};
			return menuSettings;
		}
		protected  override void InitializeComponent30 ()
		{
		}
		protected  override void InitializeComponent10 ()
		{
			MenuRTI = new RTMenu(null);
			MenuRTI.SecurityLevel = SecurityLevels.@Public(null);
			MenuRTI.ModulesArray = MenuModules;
			MenuItem0RTI = new RTMenuItem("Index");
			MenuItem0RTI.SecurityLevel = IndexPage.PageSecurityLevel;
			MenuItem0RTI.ModulesArray = IndexPage.PageModules;
			MenuItem0RTI.GlobalVisible = true;
			MenuItem0RTI.Parent = MenuRTI;
			MenuRTI.AddRTMenuItem(MenuItem0RTI);
			MenuItem1RTI = new RTMenuItem("Dizionario");
			MenuItem1RTI.SecurityLevel = LinguePage.PageSecurityLevel;
			MenuItem1RTI.ModulesArray = LinguePage.PageModules;
			MenuItem1RTI.GlobalVisible = true;
			MenuItem1RTI.Parent = MenuRTI;
			MenuRTI.AddRTMenuItem(MenuItem1RTI);
			MenuItem1RTIMenuItem0RTI = new RTMenuItem("Lingue");
			MenuItem1RTIMenuItem0RTI.SecurityLevel = LinguePage.PageSecurityLevel;
			MenuItem1RTIMenuItem0RTI.ModulesArray = LinguePage.PageModules;
			MenuItem1RTIMenuItem0RTI.GlobalVisible = true;
			MenuItem1RTIMenuItem0RTI.Parent = MenuItem1RTI;
			MenuItem1RTI.AddRTMenuItem(MenuItem1RTIMenuItem0RTI);
			MenuItem1RTIMenuItem1RTI = new RTMenuItem("Stringhe");
			MenuItem1RTIMenuItem1RTI.SecurityLevel = StringhePage.PageSecurityLevel;
			MenuItem1RTIMenuItem1RTI.ModulesArray = StringhePage.PageModules;
			MenuItem1RTIMenuItem1RTI.GlobalVisible = true;
			MenuItem1RTIMenuItem1RTI.Parent = MenuItem1RTI;
			MenuItem1RTI.AddRTMenuItem(MenuItem1RTIMenuItem1RTI);
			MenuItem1RTIMenuItem2RTI = new RTMenuItem("Traduzioni");
			MenuItem1RTIMenuItem2RTI.SecurityLevel = TraduzioniPage.PageSecurityLevel;
			MenuItem1RTIMenuItem2RTI.ModulesArray = TraduzioniPage.PageModules;
			MenuItem1RTIMenuItem2RTI.GlobalVisible = true;
			MenuItem1RTIMenuItem2RTI.Parent = MenuItem1RTI;
			MenuItem1RTI.AddRTMenuItem(MenuItem1RTIMenuItem2RTI);
		}
		protected  override void InitializeComponent20 ()
		{
			MenuRTI.SetLevel(ApplicationPrivateSession.Current.UserInfo);
		}
		protected  override BusinessMenu CreateNewBusinessMenu ()
		{
			return new BSNMenuHeaderMain(this);
		}
	}
}
