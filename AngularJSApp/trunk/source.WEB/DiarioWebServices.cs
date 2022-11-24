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
	public class DiarioPageController:ApiController
	{
		#region SubClasses
		#endregion
		public DiarioPageController ()
		{
		}
		[HttpGet]
		[LoggedUserAuthentication]
		public  HttpResponseMessage Get ()
		{
			try
			{
			    DiarioPage currentPage = PagesNavigationHelper.LoadNewPage<DiarioPage>(Request) as DiarioPage;
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
			    PagesNavigationHelper.CurrentPageRollbackTransaction<DiarioPage>(Request);
			}
		}
	}
	public class CursorGDiarioController:ApiController
	{
		#region SubClasses
		#endregion
		public CursorGDiarioController ()
		{
		}
		[HttpPost]
		[LoggedUserAuthentication]
		public  HttpResponseMessage ButtonSaveClick (List<CursorGDiarioItem> currentItemsList)
		{
			try
			{
			    DiarioPage currentPage = PagesNavigationHelper.GetCurrentPage<DiarioPage>(Request) as DiarioPage;
			    currentPage.RegisterClientChangesCursorGDiario(currentItemsList);
			    HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, currentPage.PostEditedItemsCursorGDiario());
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
			    PagesNavigationHelper.CurrentPageRollbackTransaction<DiarioPage>(Request);
			}
		}
		[HttpPost]
		[LoggedUserAuthentication]
		public  HttpResponseMessage ButtonSaveAndNewClick (List<CursorGDiarioItem> currentItemsList)
		{
			try
			{
			    DiarioPage currentPage = PagesNavigationHelper.GetCurrentPage<DiarioPage>(Request) as DiarioPage;
			    currentPage.RegisterClientChangesCursorGDiario(currentItemsList);
			    HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, currentPage.PostEditedItemsCursorGDiario(true));
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
			    PagesNavigationHelper.CurrentPageRollbackTransaction<DiarioPage>(Request);
			}
		}
		[HttpGet]
		[LoggedUserAuthentication]
		public  HttpResponseMessage ButtonExportXLSClick ()
		{
			try
			{
			    DiarioPage currentPage = PagesNavigationHelper.GetCurrentPage<DiarioPage>(Request) as DiarioPage;
			    KamNavigationResult result = new KamNavigationResult();
			    HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
			    currentPage.InitXlsHttpResponseMessageCursorGDiario(response);
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
			    PagesNavigationHelper.CurrentPageRollbackTransaction<DiarioPage>(Request);
			}
		}
		[HttpGet]
		[LoggedUserAuthentication]
		public  HttpResponseMessage ButtonCancelClick ()
		{
			try
			{
			    DiarioPage currentPage = PagesNavigationHelper.GetCurrentPage<DiarioPage>(Request) as DiarioPage;
			     HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, currentPage.GDiarioCancel());
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
			    PagesNavigationHelper.CurrentPageRollbackTransaction<DiarioPage>(Request);
			}
		}
		[HttpPost]
		[LoggedUserAuthentication]
		public  HttpResponseMessage GetGridDataSource (GridDataRequestParamsObj<CursorGDiarioItem> gridDataRequestParamsObj)
		{
			try
			{
			    DiarioPage currentPage = PagesNavigationHelper.GetCurrentPage<DiarioPage>(Request) as DiarioPage;
			    PersistentGridDataResponseParamsObj persistentGridDataResponseParamsObj = PagesNavigationHelper.GetPersistentGridDataResponseParamsObj(Request, "GDiario");
			    HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, currentPage.CursorGDiarioManageGetGridDataSourceRequest(gridDataRequestParamsObj, persistentGridDataResponseParamsObj));
			    PagesNavigationHelper.PushPersistentGridDataResponseParamsObj(Request, "GDiario", gridDataRequestParamsObj.CreateResponseObj());
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
			    PagesNavigationHelper.CurrentPageRollbackTransaction<DiarioPage>(Request);
			}
		}
		[HttpPost]
		[LoggedUserAuthentication]
		public  HttpResponseMessage ATTIVITAClick (GridCellClickRequest gridCellClickRequest)
		{
			try
			{
			    DiarioPage currentPage = PagesNavigationHelper.GetCurrentPage<DiarioPage>(Request) as DiarioPage;
			    KamNavigationResult result = new KamNavigationResult();
			    result = currentPage.GDiario_ItemCommand(gridCellClickRequest.RowIndex, "ATTIVITA", gridCellClickRequest.CommandName);
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
			    PagesNavigationHelper.CurrentPageRollbackTransaction<DiarioPage>(Request);
			}
		}
		[HttpPost]
		[LoggedUserAuthentication]
		public  HttpResponseMessage ELEMENTOClick (GridCellClickRequest gridCellClickRequest)
		{
			try
			{
			    DiarioPage currentPage = PagesNavigationHelper.GetCurrentPage<DiarioPage>(Request) as DiarioPage;
			    KamNavigationResult result = new KamNavigationResult();
			    result = currentPage.GDiario_ItemCommand(gridCellClickRequest.RowIndex, "ELEMENTO", gridCellClickRequest.CommandName);
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
			    PagesNavigationHelper.CurrentPageRollbackTransaction<DiarioPage>(Request);
			}
		}
		[HttpPost]
		[LoggedUserAuthentication]
		public  HttpResponseMessage FieldChanged (FieldChangedRequestObj<CursorGDiarioItem> fieldChangedRequestObj)
		{
			try
			{
			    DiarioPage currentPage = PagesNavigationHelper.GetCurrentPage<DiarioPage>(Request) as DiarioPage;
			    currentPage.CursorGDiarioRegisterCurrentItemClientChanges(fieldChangedRequestObj.ItemCurrent);
			    currentPage.CursorGDiarioResetFieldIfNoLongerValid(fieldChangedRequestObj.FieldName);
			    currentPage.CursorGDiarioRegisterComponentRTIsClientChanges(fieldChangedRequestObj.ComponentRTIs);
			    currentPage.CursorGDiarioFieldChanged(fieldChangedRequestObj.FieldName);
			    HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, currentPage.CursorGDiarioGetFieldChangedResponseObj());
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
			    PagesNavigationHelper.CurrentPageRollbackTransaction<DiarioPage>(Request);
			}
		}
		[HttpPost]
		[LoggedUserAuthentication]
		public  HttpResponseMessage GetItemDependentFieldsUpdated (GetItemDependentFieldsUpdatedRequestObj<CursorGDiarioItem> getItemDependentFieldsUpdatedData)
		{
			try
			{
			    DiarioPage currentPage = PagesNavigationHelper.GetCurrentPage<DiarioPage>(Request) as DiarioPage;
			    currentPage.CursorGDiarioRegisterCurrentItemClientChanges(getItemDependentFieldsUpdatedData.ItemCurrent);
			    currentPage.CursorGDiarioResetFieldIfNoLongerValid(getItemDependentFieldsUpdatedData.FieldName);
			    HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, currentPage.CursorGDiarioGetItemDependentFieldsUpdatedResponseObj());
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
			    PagesNavigationHelper.CurrentPageRollbackTransaction<DiarioPage>(Request);
			}
		}
		[HttpPost]
		[LoggedUserAuthentication]
		public  HttpResponseMessage ResetGridDataSource (GridDataRequestParamsObj<CursorGDiarioItem> gridDataRequestParamsObj)
		{
			try
			{
			    DiarioPage currentPage = PagesNavigationHelper.GetCurrentPage<DiarioPage>(Request) as DiarioPage;
			    HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, currentPage.CursorGDiarioManageResetGridDataSourceRequest(gridDataRequestParamsObj));
			    PagesNavigationHelper.PushPersistentGridDataResponseParamsObj(Request, "GDiario", gridDataRequestParamsObj.CreateResponseObj());
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
			    PagesNavigationHelper.CurrentPageRollbackTransaction<DiarioPage>(Request);
			}
		}
		[HttpPost]
		[LoggedUserAuthentication]
		public  HttpResponseMessage Get (GridDataRequestParamsObj<CursorGDiarioItem> gridDataRequestParamsObj)
		{
			try
			{
			    DiarioPage currentPage = PagesNavigationHelper.GetCurrentPage<DiarioPage>(Request) as DiarioPage;
			    PersistentGridDataResponseParamsObj persistentGridDataResponseParamsObj = PagesNavigationHelper.GetPersistentGridDataResponseParamsObj(Request, "GDiario");
			    HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, currentPage.CursorGDiarioManageGetRequest(gridDataRequestParamsObj, persistentGridDataResponseParamsObj));
			    PagesNavigationHelper.PushPersistentGridDataResponseParamsObj(Request, "GDiario", gridDataRequestParamsObj.CreateResponseObj());
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
			    PagesNavigationHelper.CurrentPageRollbackTransaction<DiarioPage>(Request);
			}
		}
		[HttpPost]
		[LoggedUserAuthentication]
		public  HttpResponseMessage RestoreGridDataSource (GridDataRequestParamsObj<CursorGDiarioItem> gridDataRequestParamsObj)
		{
			try
			{
			    DiarioPage currentPage = PagesNavigationHelper.GetCurrentPage<DiarioPage>(Request) as DiarioPage;
			    HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, currentPage.CursorGDiarioManageRestoreGridDataSourceRequest(gridDataRequestParamsObj));
			    PagesNavigationHelper.PushPersistentGridDataResponseParamsObj(Request, "GDiario", gridDataRequestParamsObj.CreateResponseObj());
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
			    PagesNavigationHelper.CurrentPageRollbackTransaction<DiarioPage>(Request);
			}
		}
	}
}
