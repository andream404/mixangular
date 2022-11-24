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
	public class TraduzioniPageController:ApiController
	{
		#region SubClasses
		#endregion
		public TraduzioniPageController ()
		{
		}
		[HttpGet]
		[LoggedUserAuthentication]
		public  HttpResponseMessage Get ()
		{
			try
			{
			    TraduzioniPage currentPage = PagesNavigationHelper.LoadNewPage<TraduzioniPage>(Request) as TraduzioniPage;
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
			    PagesNavigationHelper.CurrentPageRollbackTransaction<TraduzioniPage>(Request);
			}
		}
	}
	public class CursorGTraduzioniController:ApiController
	{
		#region SubClasses
		#endregion
		public CursorGTraduzioniController ()
		{
		}
		[HttpGet]
		[LoggedUserAuthentication]
		public  HttpResponseMessage ButtonExportXLSClick ()
		{
			try
			{
			    TraduzioniPage currentPage = PagesNavigationHelper.GetCurrentPage<TraduzioniPage>(Request) as TraduzioniPage;
			    KamNavigationResult result = new KamNavigationResult();
			    HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
			    currentPage.InitXlsHttpResponseMessageCursorGTraduzioni(response);
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
			    PagesNavigationHelper.CurrentPageRollbackTransaction<TraduzioniPage>(Request);
			}
		}
		[HttpPost]
		[LoggedUserAuthentication]
		public  HttpResponseMessage ButtonSaveAndNewClick (List<CursorGTraduzioniItem> currentItemsList)
		{
			try
			{
			    TraduzioniPage currentPage = PagesNavigationHelper.GetCurrentPage<TraduzioniPage>(Request) as TraduzioniPage;
			    currentPage.RegisterClientChangesCursorGTraduzioni(currentItemsList);
			    HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, currentPage.PostEditedItemsCursorGTraduzioni(true));
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
			    PagesNavigationHelper.CurrentPageRollbackTransaction<TraduzioniPage>(Request);
			}
		}
		[HttpGet]
		[LoggedUserAuthentication]
		public  HttpResponseMessage ButtonEditClick ()
		{
			try
			{
			    TraduzioniPage currentPage = PagesNavigationHelper.GetCurrentPage<TraduzioniPage>(Request) as TraduzioniPage;
			    KamNavigationResult result = new KamNavigationResult();
			result = TraduzioniPage.ShowPageForEditGTraduzioni(currentPage.CursorGTraduzioni.idtranslation);
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
			PagesNavigationHelper.CurrentPageRollbackTransaction<TraduzioniPage>(Request);
			}
		}
		[HttpPost]
		[LoggedUserAuthentication]
		public  HttpResponseMessage GetGridDataSource (GridDataRequestParamsObj<CursorGTraduzioniItem> gridDataRequestParamsObj)
		{
			try
			{
			    TraduzioniPage currentPage = PagesNavigationHelper.GetCurrentPage<TraduzioniPage>(Request) as TraduzioniPage;
			    PersistentGridDataResponseParamsObj persistentGridDataResponseParamsObj = PagesNavigationHelper.GetPersistentGridDataResponseParamsObj(Request, "GTraduzioni");
			    HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, currentPage.CursorGTraduzioniManageGetGridDataSourceRequest(gridDataRequestParamsObj, persistentGridDataResponseParamsObj));
			    PagesNavigationHelper.PushPersistentGridDataResponseParamsObj(Request, "GTraduzioni", gridDataRequestParamsObj.CreateResponseObj());
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
			    PagesNavigationHelper.CurrentPageRollbackTransaction<TraduzioniPage>(Request);
			}
		}
		[HttpPost]
		[LoggedUserAuthentication]
		public  HttpResponseMessage GetFilterLookupCursorGTraduzioniIDLANGUAGEFilter01BySearchText (GetLookupSearchTextRequestObj<CursorGTraduzioniItem> getLookupSearchTextData)
		{
			try
			{
			    TraduzioniPage currentPage = PagesNavigationHelper.GetCurrentPage<TraduzioniPage>(Request) as TraduzioniPage;
			    HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, currentPage.GetCursorGTraduzioniIDLANGUAGEFilter01FilterItemsBySearchText(getLookupSearchTextData.SearchText));
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
			    PagesNavigationHelper.CurrentPageRollbackTransaction<TraduzioniPage>(Request);
			}
		}
		[HttpPost]
		[LoggedUserAuthentication]
		public  HttpResponseMessage CursorGTraduzioniComponentManagementDeleteColumClick (GridCellClickRequest gridCellClickRequest)
		{
			try
			{
			    TraduzioniPage currentPage = PagesNavigationHelper.GetCurrentPage<TraduzioniPage>(Request) as TraduzioniPage;
			    KamNavigationResult result = new KamNavigationResult();
			    result = currentPage.GTraduzioni_ItemCommand(gridCellClickRequest.RowIndex, "CursorGTraduzioniComponentManagementDeleteColum", "DeleteRow");
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
			    PagesNavigationHelper.CurrentPageRollbackTransaction<TraduzioniPage>(Request);
			}
		}
		[HttpPost]
		[LoggedUserAuthentication]
		public  HttpResponseMessage GetLookupIDLANGUAGEBySearchText (GetLookupSearchTextRequestObj<CursorGTraduzioniItem> getLookupSearchTextData)
		{
			try
			{
			    TraduzioniPage currentPage = PagesNavigationHelper.GetCurrentPage<TraduzioniPage>(Request) as TraduzioniPage;
			    currentPage.CursorGTraduzioniRegisterCurrentItemClientChanges(getLookupSearchTextData.ItemCurrent);
			    HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, currentPage.GetCursorGTraduzioniIDLANGUAGEItemsBySearchText(getLookupSearchTextData.SearchText));
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
			    PagesNavigationHelper.CurrentPageRollbackTransaction<TraduzioniPage>(Request);
			}
		}
		[HttpGet]
		[LoggedUserAuthentication]
		public  HttpResponseMessage ButtonCancelClick ()
		{
			try
			{
			    TraduzioniPage currentPage = PagesNavigationHelper.GetCurrentPage<TraduzioniPage>(Request) as TraduzioniPage;
			     HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, currentPage.GTraduzioniCancel());
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
			    PagesNavigationHelper.CurrentPageRollbackTransaction<TraduzioniPage>(Request);
			}
		}
		[HttpPost]
		[LoggedUserAuthentication]
		public  HttpResponseMessage Get (GridDataRequestParamsObj<CursorGTraduzioniItem> gridDataRequestParamsObj)
		{
			try
			{
			    TraduzioniPage currentPage = PagesNavigationHelper.GetCurrentPage<TraduzioniPage>(Request) as TraduzioniPage;
			    PersistentGridDataResponseParamsObj persistentGridDataResponseParamsObj = PagesNavigationHelper.GetPersistentGridDataResponseParamsObj(Request, "GTraduzioni");
			    HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, currentPage.CursorGTraduzioniManageGetRequest(gridDataRequestParamsObj, persistentGridDataResponseParamsObj));
			    PagesNavigationHelper.PushPersistentGridDataResponseParamsObj(Request, "GTraduzioni", gridDataRequestParamsObj.CreateResponseObj());
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
			    PagesNavigationHelper.CurrentPageRollbackTransaction<TraduzioniPage>(Request);
			}
		}
		[HttpPost]
		[LoggedUserAuthentication]
		public  HttpResponseMessage FieldChanged (FieldChangedRequestObj<CursorGTraduzioniItem> fieldChangedRequestObj)
		{
			try
			{
			    TraduzioniPage currentPage = PagesNavigationHelper.GetCurrentPage<TraduzioniPage>(Request) as TraduzioniPage;
			    currentPage.CursorGTraduzioniRegisterCurrentItemClientChanges(fieldChangedRequestObj.ItemCurrent);
			    currentPage.CursorGTraduzioniResetFieldIfNoLongerValid(fieldChangedRequestObj.FieldName);
			    currentPage.CursorGTraduzioniRegisterComponentRTIsClientChanges(fieldChangedRequestObj.ComponentRTIs);
			    currentPage.CursorGTraduzioniFieldChanged(fieldChangedRequestObj.FieldName);
			    HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, currentPage.CursorGTraduzioniGetFieldChangedResponseObj());
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
			    PagesNavigationHelper.CurrentPageRollbackTransaction<TraduzioniPage>(Request);
			}
		}
		[HttpPost]
		[LoggedUserAuthentication]
		public  HttpResponseMessage ButtonSaveClick (List<CursorGTraduzioniItem> currentItemsList)
		{
			try
			{
			    TraduzioniPage currentPage = PagesNavigationHelper.GetCurrentPage<TraduzioniPage>(Request) as TraduzioniPage;
			    currentPage.RegisterClientChangesCursorGTraduzioni(currentItemsList);
			    HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, currentPage.PostEditedItemsCursorGTraduzioni());
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
			    PagesNavigationHelper.CurrentPageRollbackTransaction<TraduzioniPage>(Request);
			}
		}
		[HttpPost]
		[LoggedUserAuthentication]
		public  HttpResponseMessage ResetGridDataSource (GridDataRequestParamsObj<CursorGTraduzioniItem> gridDataRequestParamsObj)
		{
			try
			{
			    TraduzioniPage currentPage = PagesNavigationHelper.GetCurrentPage<TraduzioniPage>(Request) as TraduzioniPage;
			    HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, currentPage.CursorGTraduzioniManageResetGridDataSourceRequest(gridDataRequestParamsObj));
			    PagesNavigationHelper.PushPersistentGridDataResponseParamsObj(Request, "GTraduzioni", gridDataRequestParamsObj.CreateResponseObj());
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
			    PagesNavigationHelper.CurrentPageRollbackTransaction<TraduzioniPage>(Request);
			}
		}
		[HttpPost]
		[LoggedUserAuthentication]
		public  HttpResponseMessage RestoreGridDataSource (GridDataRequestParamsObj<CursorGTraduzioniItem> gridDataRequestParamsObj)
		{
			try
			{
			    TraduzioniPage currentPage = PagesNavigationHelper.GetCurrentPage<TraduzioniPage>(Request) as TraduzioniPage;
			    HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, currentPage.CursorGTraduzioniManageRestoreGridDataSourceRequest(gridDataRequestParamsObj));
			    PagesNavigationHelper.PushPersistentGridDataResponseParamsObj(Request, "GTraduzioni", gridDataRequestParamsObj.CreateResponseObj());
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
			    PagesNavigationHelper.CurrentPageRollbackTransaction<TraduzioniPage>(Request);
			}
		}
		[HttpPost]
		[LoggedUserAuthentication]
		public  HttpResponseMessage GetLookupIDSTRINGBySearchText (GetLookupSearchTextRequestObj<CursorGTraduzioniItem> getLookupSearchTextData)
		{
			try
			{
			    TraduzioniPage currentPage = PagesNavigationHelper.GetCurrentPage<TraduzioniPage>(Request) as TraduzioniPage;
			    currentPage.CursorGTraduzioniRegisterCurrentItemClientChanges(getLookupSearchTextData.ItemCurrent);
			    HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, currentPage.GetCursorGTraduzioniIDSTRINGItemsBySearchText(getLookupSearchTextData.SearchText));
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
			    PagesNavigationHelper.CurrentPageRollbackTransaction<TraduzioniPage>(Request);
			}
		}
		[HttpPost]
		[LoggedUserAuthentication]
		public  HttpResponseMessage GetFilterLookupCursorGTraduzioniIDSTRINGFilter01BySearchText (GetLookupSearchTextRequestObj<CursorGTraduzioniItem> getLookupSearchTextData)
		{
			try
			{
			    TraduzioniPage currentPage = PagesNavigationHelper.GetCurrentPage<TraduzioniPage>(Request) as TraduzioniPage;
			    HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, currentPage.GetCursorGTraduzioniIDSTRINGFilter01FilterItemsBySearchText(getLookupSearchTextData.SearchText));
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
			    PagesNavigationHelper.CurrentPageRollbackTransaction<TraduzioniPage>(Request);
			}
		}
		[HttpPost]
		[LoggedUserAuthentication]
		public  HttpResponseMessage GetItemDependentFieldsUpdated (GetItemDependentFieldsUpdatedRequestObj<CursorGTraduzioniItem> getItemDependentFieldsUpdatedData)
		{
			try
			{
			    TraduzioniPage currentPage = PagesNavigationHelper.GetCurrentPage<TraduzioniPage>(Request) as TraduzioniPage;
			    currentPage.CursorGTraduzioniRegisterCurrentItemClientChanges(getItemDependentFieldsUpdatedData.ItemCurrent);
			    currentPage.CursorGTraduzioniResetFieldIfNoLongerValid(getItemDependentFieldsUpdatedData.FieldName);
			    HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, currentPage.CursorGTraduzioniGetItemDependentFieldsUpdatedResponseObj());
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
			    PagesNavigationHelper.CurrentPageRollbackTransaction<TraduzioniPage>(Request);
			}
		}
		[HttpGet]
		[LoggedUserAuthentication]
		public  HttpResponseMessage ButtonNewClick ()
		{
			try
			{
			    TraduzioniPage currentPage = PagesNavigationHelper.GetCurrentPage<TraduzioniPage>(Request) as TraduzioniPage;
			    KamNavigationResult result = new KamNavigationResult();
			result = TraduzioniPage.ShowPageForInsertGTraduzioni();
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
			PagesNavigationHelper.CurrentPageRollbackTransaction<TraduzioniPage>(Request);
			}
		}
	}
}
