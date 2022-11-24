using IT4.Common.DB;
using System.Data;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using IT4.Web.Authentication;
using IT4.Common.Data;
using IT4.Web.Common;
using System;
using IT4.Common.Security;
using static IT4.Web.Common.ApplicationNavigationHelper;
namespace AngularJSApp
{
	public class LoginController:ApiController
	{
		#region SubClasses
		#endregion
		public LoginController ()
		{
		}
		[HttpGet]
		[LoggedUserAuthentication]
		public  HttpResponseMessage GetGlobalData ()
		{
			return Request.CreateResponse(HttpStatusCode.OK, new
			{
			    GlobalEntries = ApplicationNavigationHelper.GetGlobalEntries(ApplicationPrivateSession.Current.UserInfo),
			    GlobalSettings = ApplicationNavigationHelper.GetGlobalSettings(),
			    UserInfo = ApplicationPrivateSession.Current.UserInfo,
			    UserSettings = new { ErrorSummaryCanRead = true , ErrorDetailsCanRead = true}
			});
		}
		[HttpGet]
		[RequestFormatAuthentication]
		public  HttpResponseMessage ThirdPartyLogin ()
		{
			try
			{
			    ApplicationPrivateSession.Current.LoginData = null;
			    if (ApplicationPrivateSession.Current.UserInfo.ThirdPartyLogin())
			    {
			        SessionHelper.PushValue<string>("Token", Request.GetHeaderValue("token"));
			        return Request.CreateResponse(HttpStatusCode.OK);
			    }
			    return Request.CreateResponse(HttpStatusCode.Forbidden);
			}
			catch
			{
			    return new HttpResponseMessage(HttpStatusCode.InternalServerError);
			}
		}
		[HttpPost]
		[LoggedUserAuthentication]
		public  HttpResponseMessage Delete (AutologinDataObj autologinDataObj)
		{
			if(autologinDataObj != null && !string.IsNullOrEmpty(autologinDataObj.AutologinKey))
			{
			    DBUtils dBUtils = DBUtilsHelper.GetNewDBUtils();
			    dBUtils.BeginTransaction(IsolationLevel.ReadCommitted);
			    try
			    {
			        ApplicationPrivateSession.Current.UserInfo.DeleteAutologinKey(dBUtils, autologinDataObj.AutologinKey);
			    }
			    catch (Exception ex)
			    {
			        if (dBUtils.InTransaction())
			        {
			            dBUtils.Rollback();
			        }
			        throw new Exception(ex.Message, ex);
			    }
			    finally
			    {
			        if (dBUtils.InTransaction())
			        {
			            dBUtils.Commit();
			        }
			        dBUtils.Close();
			    }
			}
			SessionHelper.Clear();
			AuthenticationTokensLibrary.AuthenticationTokenList.RemoveToken(SessionHelper.GetSessionID(), SessionHelper.GetValue<string>("Token"));
			return new HttpResponseMessage(HttpStatusCode.OK);
		}
		[HttpPost]
		[RequestFormatAuthentication]
		public  HttpResponseMessage Post (LoginDataObj loginDataObj)
		{
			if (loginDataObj.IsValid())
			{
			    try
			    {
			        ApplicationPrivateSession.Current.LoginData = loginDataObj;
			        if (ApplicationPrivateSession.Current.UserInfo.Login(loginDataObj.Username, loginDataObj.Password))
			        {
			            string autologinKey = null;
			            if (loginDataObj.KeepMeSignedIn)
			            {
			                DBUtils dBUtils = DBUtilsHelper.GetNewDBUtils();
			                dBUtils.BeginTransaction(IsolationLevel.ReadCommitted);
			                try
			                {
			                    autologinKey = ApplicationPrivateSession.Current.UserInfo.SaveAutologin(dBUtils, loginDataObj.Username, loginDataObj.Password, Request.GetClientIpAddress());
			                }
			                catch (Exception ex)
			                {
			                    if (dBUtils.InTransaction())
			                    {
			                        dBUtils.Rollback();
			                    }
			                    throw new Exception(ex.Message, ex);
			                }
			                finally
			                {
			                    if (dBUtils.InTransaction())
			                    {
			                        dBUtils.Commit();
			                    }
			                    dBUtils.Close();
			                }
			            }
			            SessionHelper.PushValue<string>("Token", Request.GetHeaderValue("token"));
			            return Request.CreateResponse(HttpStatusCode.OK, new
			            {
			                AutologinKey = autologinKey
			            });
			        }
			    }
			    catch
			    {
			        return new HttpResponseMessage(HttpStatusCode.InternalServerError);
			    }
			}
			return new HttpResponseMessage(HttpStatusCode.Unauthorized);
		}
		[HttpPost]
		[RequestFormatAuthentication]
		public  HttpResponseMessage NavigationLandingPageLogin (NavigationLandingPageObj navigationLandingPageObj)
		{
			try
			{
			    if (!string.IsNullOrEmpty(navigationLandingPageObj.ParamsJSON))
			    {
			        ApplicationPrivateSession.Current.QueryStringParams = new QueryStringParamsObj(navigationLandingPageObj.ParamsJSON);
			        ApplicationPrivateSession.Current.UserInfo.StartPage = "NavigationLandingPage";
			}
			    return Request.CreateResponse(HttpStatusCode.OK);
			}
			catch
			{
			    return new HttpResponseMessage(HttpStatusCode.InternalServerError);
			}
		}
		[HttpGet]
		[LoggedUserAuthentication]
		public  HttpResponseMessage Get ()
		{
			return Request.CreateResponse(HttpStatusCode.OK);
		}
		[HttpPost]
		[RequestFormatAuthentication]
		public  HttpResponseMessage Autologin (AutologinDataObj autologinDataObj)
		{
			DBUtils dBUtils = DBUtilsHelper.GetNewDBUtils();
			dBUtils.BeginTransaction(IsolationLevel.ReadCommitted);
			try
			{
			    ApplicationPrivateSession.Current.LoginData = null;
			    string newAutologinKey = null;
			    if (ApplicationPrivateSession.Current.UserInfo.Autologin(dBUtils, autologinDataObj.AutologinKey, Request.GetClientIpAddress(), out newAutologinKey))
			    {
			        SessionHelper.PushValue<string>("Token", Request.GetHeaderValue("token"));
			        return Request.CreateResponse(HttpStatusCode.OK, new
			        {
			            AutologinKey = newAutologinKey
			        });
			    }
			    return Request.CreateResponse(HttpStatusCode.Forbidden);
			}
			catch
			{
			    if (dBUtils.InTransaction())
			    {
			        dBUtils.Rollback();
			    }
			    return new HttpResponseMessage(HttpStatusCode.InternalServerError);
			}
			finally
			{
			    if (dBUtils.InTransaction())
			    {
			        dBUtils.Commit();
			    }
			    dBUtils.Close();
			}
		}
	}
}
