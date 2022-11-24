using IT4.Web.Common;
using System.Web.Http;
using IT4.Web.Authentication;
using System.Net;
using System.Net.Http;
using System;
namespace AngularJSApp
{
	public class NavigationLandingPageController:ApiController
	{
		#region SubClasses
		#endregion
		public NavigationLandingPageController ()
		{
		}
		[HttpGet]
		[LoggedUserAuthentication]
		public  HttpResponseMessage Get ()
		{
			try
			{
			    BSNNavigationLandingPage landingPage = new BSNNavigationLandingPage();
			    NavigationResult result = new KamNavigationResult();
			    if (ApplicationPrivateSession.Current.QueryStringParams.Params == null)
			    {
			        result = new KamNavigationResult();
			    }
			    else
			    {
			        landingPage.RedirectToPage(ref result);
			        landingPage.ClearQueryStringParams();
			    }
			    HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, new {
			        Page = result
			    });
			    return response;
			}
			catch(ApplicationException ex)
			{
			    return Request.CreateResponse(HttpStatusCode.InternalServerError, ex);
			}
			catch (Exception ex)
			{
			    return Request.CreateResponse(HttpStatusCode.InternalServerError, ex);
			}
			finally
			{
			}
		}
	}
}
