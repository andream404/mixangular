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
namespace AngularJSApp.Pages
{
	public class IndexPageController:ApiController
	{
		#region SubClasses
		#endregion
		public IndexPageController ()
		{
		}
		[HttpGet]
		[LoggedUserAuthentication]
		public  HttpResponseMessage Get ()
		{
			try
			{
			    IndexPage currentPage = PagesNavigationHelper.LoadNewPage<IndexPage>(Request) as IndexPage;
			    HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, new
			    {
			        ActionResult = new KamNavigationResult(),
			        PageRTI = currentPage.PageRTI,
			        PageCode = currentPage.PageCode
			    });
			    PagesNavigationHelper.SaveCurrentPage(Request, currentPage);
			    return response;
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
			    PagesNavigationHelper.CurrentPageRollbackTransaction<IndexPage>(Request);
			}
		}
	}
}
