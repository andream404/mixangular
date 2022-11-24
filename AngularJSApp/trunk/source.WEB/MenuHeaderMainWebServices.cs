using System;
using System.Collections.Generic;
using System.Data;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using IT4.Web.Authentication;
using IT4.Common.Data;
using IT4.Web.Common;
using IT4.Web.UI.Page;
namespace AngularJSApp.Menus
{
	public class MenuHeaderMainController:ApiController
	{
		#region SubClasses
		#endregion
		public MenuHeaderMainController ()
		{
		}
		[HttpGet]
		[LoggedUserAuthentication]
		public  HttpResponseMessage Get ()
		{
			try
			{
			    BasePage currentPage = PagesNavigationHelper.GetCurrentPage<BasePage>(Request);
			    MenuHeaderMain menu = new MenuHeaderMain(currentPage);
			    object menuSettings = menu.GetMenuSettings();
			    PagesNavigationHelper.SaveCurrentPage(Request, currentPage);
			    return Request.CreateResponse(HttpStatusCode.OK, menuSettings);
			}
			catch(ApplicationException ex)
			{
			    return Request.CreateResponse(HttpStatusCode.InternalServerError, ex);
			}
			catch (Exception ex)
			{
			    SessionHelper.Remove("CurrentPage");
			    return Request.CreateResponse(HttpStatusCode.InternalServerError, ex);
			}
			finally
			{
			    PagesNavigationHelper.CurrentPageRollbackTransaction<BasePage>(Request);
			}
		}
	}
}
