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
	public class StringhePageController:ApiController
	{
		#region SubClasses
		#endregion
		public StringhePageController ()
		{
		}
		[HttpGet]
		[LoggedUserAuthentication]
		public  HttpResponseMessage Get ()
		{
			try
			{
			    StringhePage currentPage = PagesNavigationHelper.LoadNewPage<StringhePage>(Request) as StringhePage;
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
			    PagesNavigationHelper.CurrentPageRollbackTransaction<StringhePage>(Request);
			}
		}
	}
	public class CursorGStringheController:ApiController
	{
		#region SubClasses
		#endregion
		public CursorGStringheController ()
		{
		}
		[HttpPost]
		[LoggedUserAuthentication]
		public  HttpResponseMessage ButtonSaveClick (List<CursorGStringheItem> currentItemsList)
		{
			try
			{
			    StringhePage currentPage = PagesNavigationHelper.GetCurrentPage<StringhePage>(Request) as StringhePage;
			    currentPage.RegisterClientChangesCursorGStringhe(currentItemsList);
			    HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, currentPage.PostEditedItemsCursorGStringhe());
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
			    PagesNavigationHelper.CurrentPageRollbackTransaction<StringhePage>(Request);
			}
		}
		[HttpPost]
		[LoggedUserAuthentication]
		public  HttpResponseMessage ButtonSaveAndNewClick (List<CursorGStringheItem> currentItemsList)
		{
			try
			{
			    StringhePage currentPage = PagesNavigationHelper.GetCurrentPage<StringhePage>(Request) as StringhePage;
			    currentPage.RegisterClientChangesCursorGStringhe(currentItemsList);
			    HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, currentPage.PostEditedItemsCursorGStringhe(true));
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
			    PagesNavigationHelper.CurrentPageRollbackTransaction<StringhePage>(Request);
			}
		}
		[HttpGet]
		[LoggedUserAuthentication]
		public  HttpResponseMessage ButtonExportXLSClick ()
		{
			try
			{
			    StringhePage currentPage = PagesNavigationHelper.GetCurrentPage<StringhePage>(Request) as StringhePage;
			    KamNavigationResult result = new KamNavigationResult();
			    HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
			    currentPage.InitXlsHttpResponseMessageCursorGStringhe(response);
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
			    PagesNavigationHelper.CurrentPageRollbackTransaction<StringhePage>(Request);
			}
		}
		[HttpGet]
		[LoggedUserAuthentication]
		public  HttpResponseMessage ButtonCancelClick ()
		{
			try
			{
			    StringhePage currentPage = PagesNavigationHelper.GetCurrentPage<StringhePage>(Request) as StringhePage;
			     HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, currentPage.GStringheCancel());
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
			    PagesNavigationHelper.CurrentPageRollbackTransaction<StringhePage>(Request);
			}
		}
		[HttpPost]
		[LoggedUserAuthentication]
		public  HttpResponseMessage GetGridDataSource (GridDataRequestParamsObj<CursorGStringheItem> gridDataRequestParamsObj)
		{
			try
			{
			    StringhePage currentPage = PagesNavigationHelper.GetCurrentPage<StringhePage>(Request) as StringhePage;
			    PersistentGridDataResponseParamsObj persistentGridDataResponseParamsObj = PagesNavigationHelper.GetPersistentGridDataResponseParamsObj(Request, "GStringhe");
			    HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, currentPage.CursorGStringheManageGetGridDataSourceRequest(gridDataRequestParamsObj, persistentGridDataResponseParamsObj));
			    PagesNavigationHelper.PushPersistentGridDataResponseParamsObj(Request, "GStringhe", gridDataRequestParamsObj.CreateResponseObj());
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
			    PagesNavigationHelper.CurrentPageRollbackTransaction<StringhePage>(Request);
			}
		}
		[HttpPost]
		[LoggedUserAuthentication]
		public  HttpResponseMessage RestoreGridDataSource (GridDataRequestParamsObj<CursorGStringheItem> gridDataRequestParamsObj)
		{
			try
			{
			    StringhePage currentPage = PagesNavigationHelper.GetCurrentPage<StringhePage>(Request) as StringhePage;
			    HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, currentPage.CursorGStringheManageRestoreGridDataSourceRequest(gridDataRequestParamsObj));
			    PagesNavigationHelper.PushPersistentGridDataResponseParamsObj(Request, "GStringhe", gridDataRequestParamsObj.CreateResponseObj());
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
			    PagesNavigationHelper.CurrentPageRollbackTransaction<StringhePage>(Request);
			}
		}
		[HttpGet]
		[LoggedUserAuthentication]
		public  HttpResponseMessage ButtonNewClick ()
		{
			try
			{
			    StringhePage currentPage = PagesNavigationHelper.GetCurrentPage<StringhePage>(Request) as StringhePage;
			    KamNavigationResult result = new KamNavigationResult();
			result = StringhePage.ShowPageForInsertGStringhe();
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
			PagesNavigationHelper.CurrentPageRollbackTransaction<StringhePage>(Request);
			}
		}
		[HttpPost]
		[LoggedUserAuthentication]
		public  HttpResponseMessage FieldChanged (FieldChangedRequestObj<CursorGStringheItem> fieldChangedRequestObj)
		{
			try
			{
			    StringhePage currentPage = PagesNavigationHelper.GetCurrentPage<StringhePage>(Request) as StringhePage;
			    currentPage.CursorGStringheRegisterCurrentItemClientChanges(fieldChangedRequestObj.ItemCurrent);
			    currentPage.CursorGStringheResetFieldIfNoLongerValid(fieldChangedRequestObj.FieldName);
			    currentPage.CursorGStringheRegisterComponentRTIsClientChanges(fieldChangedRequestObj.ComponentRTIs);
			    currentPage.CursorGStringheFieldChanged(fieldChangedRequestObj.FieldName);
			    HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, currentPage.CursorGStringheGetFieldChangedResponseObj());
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
			    PagesNavigationHelper.CurrentPageRollbackTransaction<StringhePage>(Request);
			}
		}
		[HttpGet]
		[LoggedUserAuthentication]
		public  HttpResponseMessage ButtonEditClick ()
		{
			try
			{
			    StringhePage currentPage = PagesNavigationHelper.GetCurrentPage<StringhePage>(Request) as StringhePage;
			    KamNavigationResult result = new KamNavigationResult();
			result = StringhePage.ShowPageForEditGStringhe(currentPage.CursorGStringhe.idstring);
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
			PagesNavigationHelper.CurrentPageRollbackTransaction<StringhePage>(Request);
			}
		}
		[HttpPost]
		[LoggedUserAuthentication]
		public  HttpResponseMessage ResetGridDataSource (GridDataRequestParamsObj<CursorGStringheItem> gridDataRequestParamsObj)
		{
			try
			{
			    StringhePage currentPage = PagesNavigationHelper.GetCurrentPage<StringhePage>(Request) as StringhePage;
			    HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, currentPage.CursorGStringheManageResetGridDataSourceRequest(gridDataRequestParamsObj));
			    PagesNavigationHelper.PushPersistentGridDataResponseParamsObj(Request, "GStringhe", gridDataRequestParamsObj.CreateResponseObj());
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
			    PagesNavigationHelper.CurrentPageRollbackTransaction<StringhePage>(Request);
			}
		}
		[HttpPost]
		[LoggedUserAuthentication]
		public  HttpResponseMessage Get (GridDataRequestParamsObj<CursorGStringheItem> gridDataRequestParamsObj)
		{
			try
			{
			    StringhePage currentPage = PagesNavigationHelper.GetCurrentPage<StringhePage>(Request) as StringhePage;
			    PersistentGridDataResponseParamsObj persistentGridDataResponseParamsObj = PagesNavigationHelper.GetPersistentGridDataResponseParamsObj(Request, "GStringhe");
			    HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, currentPage.CursorGStringheManageGetRequest(gridDataRequestParamsObj, persistentGridDataResponseParamsObj));
			    PagesNavigationHelper.PushPersistentGridDataResponseParamsObj(Request, "GStringhe", gridDataRequestParamsObj.CreateResponseObj());
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
			    PagesNavigationHelper.CurrentPageRollbackTransaction<StringhePage>(Request);
			}
		}
		[HttpPost]
		[LoggedUserAuthentication]
		public  HttpResponseMessage GetItemDependentFieldsUpdated (GetItemDependentFieldsUpdatedRequestObj<CursorGStringheItem> getItemDependentFieldsUpdatedData)
		{
			try
			{
			    StringhePage currentPage = PagesNavigationHelper.GetCurrentPage<StringhePage>(Request) as StringhePage;
			    currentPage.CursorGStringheRegisterCurrentItemClientChanges(getItemDependentFieldsUpdatedData.ItemCurrent);
			    currentPage.CursorGStringheResetFieldIfNoLongerValid(getItemDependentFieldsUpdatedData.FieldName);
			    HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, currentPage.CursorGStringheGetItemDependentFieldsUpdatedResponseObj());
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
			    PagesNavigationHelper.CurrentPageRollbackTransaction<StringhePage>(Request);
			}
		}
	}
}
