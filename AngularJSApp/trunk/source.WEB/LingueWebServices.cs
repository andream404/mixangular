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
using IT4.Web.UI;
using IT4.Web.UI.Grid;
using System.Linq;
namespace AngularJSApp.Pages
{
	public class LinguePageController:ApiController
	{
		#region SubClasses
		#endregion
		public LinguePageController ()
		{
		}
		[HttpGet]
		[LoggedUserAuthentication]
		public  HttpResponseMessage Get ()
		{
			try
			{
			    LinguePage currentPage = PagesNavigationHelper.LoadNewPage<LinguePage>(Request) as LinguePage;
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
			    PagesNavigationHelper.CurrentPageRollbackTransaction<LinguePage>(Request);
			}
		}
	}
	public class CursorGLingueController:ApiController
	{
		#region SubClasses
		#endregion
		public CursorGLingueController ()
		{
		}
		[HttpPost]
		[LoggedUserAuthentication]
		public  HttpResponseMessage ButtonSaveClick (List<CursorGLingueItem> currentItemsList)
		{
			try
			{
			    LinguePage currentPage = PagesNavigationHelper.GetCurrentPage<LinguePage>(Request) as LinguePage;
			    currentPage.RegisterClientChangesCursorGLingue(currentItemsList);
			    HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, currentPage.PostEditedItemsCursorGLingue());
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
			    PagesNavigationHelper.CurrentPageRollbackTransaction<LinguePage>(Request);
			}
		}
		[HttpPost]
		[LoggedUserAuthentication]
		public  HttpResponseMessage ButtonSaveAndNewClick (List<CursorGLingueItem> currentItemsList)
		{
			try
			{
			    LinguePage currentPage = PagesNavigationHelper.GetCurrentPage<LinguePage>(Request) as LinguePage;
			    currentPage.RegisterClientChangesCursorGLingue(currentItemsList);
			    HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, currentPage.PostEditedItemsCursorGLingue(true));
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
			    PagesNavigationHelper.CurrentPageRollbackTransaction<LinguePage>(Request);
			}
		}
		[HttpGet]
		[LoggedUserAuthentication]
		public  HttpResponseMessage ButtonExportXLSClick ()
		{
			try
			{
			    LinguePage currentPage = PagesNavigationHelper.GetCurrentPage<LinguePage>(Request) as LinguePage;
			    KamNavigationResult result = new KamNavigationResult();
			    HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
			    currentPage.InitXlsHttpResponseMessageCursorGLingue(response);
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
			    PagesNavigationHelper.CurrentPageRollbackTransaction<LinguePage>(Request);
			}
		}
		[HttpGet]
		[LoggedUserAuthentication]
		public  HttpResponseMessage ButtonCancelClick ()
		{
			try
			{
			    LinguePage currentPage = PagesNavigationHelper.GetCurrentPage<LinguePage>(Request) as LinguePage;
			     HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, currentPage.GLingueCancel());
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
			    PagesNavigationHelper.CurrentPageRollbackTransaction<LinguePage>(Request);
			}
		}
		[HttpPost]
		[LoggedUserAuthentication]
		public  HttpResponseMessage GetGridDataSource (GridDataRequestParamsObj<CursorGLingueItem> gridDataRequestParamsObj)
		{
			try
			{
			    LinguePage currentPage = PagesNavigationHelper.GetCurrentPage<LinguePage>(Request) as LinguePage;
			    PersistentGridDataResponseParamsObj persistentGridDataResponseParamsObj = PagesNavigationHelper.GetPersistentGridDataResponseParamsObj(Request, "GLingue");
			    HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, currentPage.CursorGLingueManageGetGridDataSourceRequest(gridDataRequestParamsObj, persistentGridDataResponseParamsObj));
			    PagesNavigationHelper.PushPersistentGridDataResponseParamsObj(Request, "GLingue", gridDataRequestParamsObj.CreateResponseObj());
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
			    PagesNavigationHelper.CurrentPageRollbackTransaction<LinguePage>(Request);
			}
		}
		[HttpPost]
		[LoggedUserAuthentication]
		public  HttpResponseMessage RestoreGridDataSource (GridDataRequestParamsObj<CursorGLingueItem> gridDataRequestParamsObj)
		{
			try
			{
			    LinguePage currentPage = PagesNavigationHelper.GetCurrentPage<LinguePage>(Request) as LinguePage;
			    HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, currentPage.CursorGLingueManageRestoreGridDataSourceRequest(gridDataRequestParamsObj));
			    PagesNavigationHelper.PushPersistentGridDataResponseParamsObj(Request, "GLingue", gridDataRequestParamsObj.CreateResponseObj());
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
			    PagesNavigationHelper.CurrentPageRollbackTransaction<LinguePage>(Request);
			}
		}
		[HttpGet]
		[LoggedUserAuthentication]
		public  HttpResponseMessage ButtonNewClick ()
		{
			try
			{
			    LinguePage currentPage = PagesNavigationHelper.GetCurrentPage<LinguePage>(Request) as LinguePage;
			    KamNavigationResult result = new KamNavigationResult();
			result = LinguePage.ShowPageForInsertGLingue();
			HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, result);
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
			PagesNavigationHelper.CurrentPageRollbackTransaction<LinguePage>(Request);
			}
		}
		[HttpPost]
		[LoggedUserAuthentication]
		public  HttpResponseMessage FieldChanged (FieldChangedRequestObj<CursorGLingueItem> fieldChangedRequestObj)
		{
			try
			{
			    LinguePage currentPage = PagesNavigationHelper.GetCurrentPage<LinguePage>(Request) as LinguePage;
			    currentPage.CursorGLingueRegisterCurrentItemClientChanges(fieldChangedRequestObj.ItemCurrent);
			    currentPage.CursorGLingueResetFieldIfNoLongerValid(fieldChangedRequestObj.FieldName);
			    currentPage.CursorGLingueRegisterComponentRTIsClientChanges(fieldChangedRequestObj.ComponentRTIs);
			    currentPage.CursorGLingueFieldChanged(fieldChangedRequestObj.FieldName);
			    HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, currentPage.CursorGLingueGetFieldChangedResponseObj());
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
			    PagesNavigationHelper.CurrentPageRollbackTransaction<LinguePage>(Request);
			}
		}
		[HttpGet]
		[LoggedUserAuthentication]
		public  HttpResponseMessage ButtonEditClick ()
		{
			try
			{
			    LinguePage currentPage = PagesNavigationHelper.GetCurrentPage<LinguePage>(Request) as LinguePage;
			    KamNavigationResult result = new KamNavigationResult();
			result = LinguePage.ShowPageForEditGLingue(currentPage.CursorGLingue.idlanguage);
			HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, result);
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
			PagesNavigationHelper.CurrentPageRollbackTransaction<LinguePage>(Request);
			}
		}
		[HttpPost]
		[LoggedUserAuthentication]
		public  HttpResponseMessage ResetGridDataSource (GridDataRequestParamsObj<CursorGLingueItem> gridDataRequestParamsObj)
		{
			try
			{
			    LinguePage currentPage = PagesNavigationHelper.GetCurrentPage<LinguePage>(Request) as LinguePage;
			    HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, currentPage.CursorGLingueManageResetGridDataSourceRequest(gridDataRequestParamsObj));
			    PagesNavigationHelper.PushPersistentGridDataResponseParamsObj(Request, "GLingue", gridDataRequestParamsObj.CreateResponseObj());
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
			    PagesNavigationHelper.CurrentPageRollbackTransaction<LinguePage>(Request);
			}
		}
		[HttpPost]
		[LoggedUserAuthentication]
		public  HttpResponseMessage Get (GridDataRequestParamsObj<CursorGLingueItem> gridDataRequestParamsObj)
		{
			try
			{
			    LinguePage currentPage = PagesNavigationHelper.GetCurrentPage<LinguePage>(Request) as LinguePage;
			    PersistentGridDataResponseParamsObj persistentGridDataResponseParamsObj = PagesNavigationHelper.GetPersistentGridDataResponseParamsObj(Request, "GLingue");
			    HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, currentPage.CursorGLingueManageGetRequest(gridDataRequestParamsObj, persistentGridDataResponseParamsObj));
			    PagesNavigationHelper.PushPersistentGridDataResponseParamsObj(Request, "GLingue", gridDataRequestParamsObj.CreateResponseObj());
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
			    PagesNavigationHelper.CurrentPageRollbackTransaction<LinguePage>(Request);
			}
		}
		[HttpPost]
		[LoggedUserAuthentication]
		public  HttpResponseMessage GetItemDependentFieldsUpdated (GetItemDependentFieldsUpdatedRequestObj<CursorGLingueItem> getItemDependentFieldsUpdatedData)
		{
			try
			{
			    LinguePage currentPage = PagesNavigationHelper.GetCurrentPage<LinguePage>(Request) as LinguePage;
			    currentPage.CursorGLingueRegisterCurrentItemClientChanges(getItemDependentFieldsUpdatedData.ItemCurrent);
			    currentPage.CursorGLingueResetFieldIfNoLongerValid(getItemDependentFieldsUpdatedData.FieldName);
			    HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, currentPage.CursorGLingueGetItemDependentFieldsUpdatedResponseObj());
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
			    PagesNavigationHelper.CurrentPageRollbackTransaction<LinguePage>(Request);
			}
		}
	}
}
