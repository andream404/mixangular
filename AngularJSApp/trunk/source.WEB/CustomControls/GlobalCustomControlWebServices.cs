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
namespace AngularJSApp.CustomComponents
{
	/**************************************/
	/* Esempio implementazione metodo GET */
	/**************************************/
	/*
	[HttpGet]
	[LoggedUserAuthentication]
	public HttpResponseMessage Get()
	{
	    GlobalCustomControlComponent myCustomComponent = new GlobalCustomControlComponent();
	    try
	    {
	        myCustomComponent.CustomComponentTransactionBegin();
	        HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, new
	        {
	            // <-- insert return params here
	        });
	        myCustomComponent.CustomComponentTransactionCommit();
	        return response;
	    }
	    catch (Exception ex)
	    {
	        return Request.CreateResponse(HttpStatusCode.InternalServerError, ex);
	    }
	    finally
	    {
	        if (myCustomComponent != null)
	        {
	            myCustomComponent.CustomComponentTransactionRollback();
	        }
	        myCustomComponent.UnloadCustomComponent();
	    }
	}
	*/
	public class GlobalCustomControlComponentController:ApiController
	{
		#region SubClasses
		#endregion
		public GlobalCustomControlComponentController ()
		{
		}
	}
}
