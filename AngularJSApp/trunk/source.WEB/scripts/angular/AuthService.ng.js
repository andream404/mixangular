'use strict'
var kamApp = angular.module('AngularJSApp');
kamApp.service('AuthService',['$http','$filter','$window','ExceptionDataFactory',function($http,$filter,$window,ExceptionDataFactory)
{
	var serviceUrl = 'api/auth'
	;
	function getResult(status, data)
	{
		var result = {
		status: status,
		data: data
		};
		return result;
	}
	function manageError(error)
	{
		if(error != null && error.data != null) {
		if (error.data.ExceptionMessage != undefined) {
		    ExceptionDataFactory.ExceptionMessage = error.data.ExceptionMessage;
		    ExceptionDataFactory.ExceptionHtmlErrorBody = null;
		    ExceptionDataFactory.ExceptionMessageText = null;
		    ExceptionDataFactory.ExceptionWhere = null;
		}
		else if(error.data.Message != undefined) {
		    ExceptionDataFactory.ExceptionMessage = error.data.Message;
		    ExceptionDataFactory.ExceptionHtmlErrorBody = null;
		    ExceptionDataFactory.ExceptionMessageText = null;
		    ExceptionDataFactory.ExceptionWhere = null;
		    if(error.data.MessageText != undefined) {
		        ExceptionDataFactory.ExceptionMessageText = error.data.MessageText;
		    }
		    if(error.data.Where != undefined) {
		        ExceptionDataFactory.ExceptionWhere = error.data.Where;
		    }
		}
		else {
		    ExceptionDataFactory.ExceptionMessage = null;
		    ExceptionDataFactory.ExceptionHtmlErrorBody = null;
		    ExceptionDataFactory.ExceptionMessageText = null;
		    ExceptionDataFactory.ExceptionWhere = null;
		    if(!(error.data instanceof ArrayBuffer)) {
		        ExceptionDataFactory.ExceptionHtmlErrorBody = error.data;
		    }
		}
		ExceptionDataFactory.ExceptionStatus = error.status;
		ExceptionDataFactory.ExceptionStatusText = error.statusText;
		if (error.data.ExceptionType != undefined) {
		    ExceptionDataFactory.ExceptionType = error.data.ExceptionType;
		}
		else {
		    ExceptionDataFactory.ExceptionType = error.data.ClassName;
		}
		if (error.data.StackTrace != undefined) {
		    ExceptionDataFactory.ExceptionStackTrace = error.data.StackTrace;
		}
		else {
		    ExceptionDataFactory.ExceptionStackTrace = error.data.StackTraceString;
		}
		}
		ExceptionDataFactory.SourcePageInError = $window.location.hash;
		$window.location.replace('#ErrorPage');
		return getResult(error.statusText, null);
	}
	this.getServerVersion = function ()
	{
		return $http.get(serviceUrl + '/getServerVersion', { }).then(
		function (response) {
		    return {
		        serverKamVersion: response.data,
		        isException: false
		    };
		},
		function (error) {
		    if(error != null && error.data != null) {
		        if (error.data.ExceptionMessage != undefined) {
		            ExceptionDataFactory.ExceptionMessage = error.data.ExceptionMessage;
		            ExceptionDataFactory.ExceptionHtmlErrorBody = null;
		            ExceptionDataFactory.ExceptionMessageText = null;
		            ExceptionDataFactory.ExceptionWhere = null;
		        }
		        else if(error.data.Message != undefined) {
		            ExceptionDataFactory.ExceptionMessage = error.data.Message;
		            ExceptionDataFactory.ExceptionHtmlErrorBody = null;
		            ExceptionDataFactory.ExceptionMessageText = null;
		            ExceptionDataFactory.ExceptionWhere = null;
		            if(error.data.MessageText != undefined) {
		                ExceptionDataFactory.ExceptionMessageText = error.data.MessageText;
		            }
		            if(error.data.Where != undefined) {
		                ExceptionDataFactory.ExceptionWhere = error.data.Where;
		            }
		        }
		        else {
		            ExceptionDataFactory.ExceptionMessage = null;
		            ExceptionDataFactory.ExceptionHtmlErrorBody = null;
		            ExceptionDataFactory.ExceptionMessageText = null;
		            ExceptionDataFactory.ExceptionWhere = null;
		            if(!(error.data instanceof ArrayBuffer)) {
		                ExceptionDataFactory.ExceptionHtmlErrorBody = error.data;
		            }
		        }
		        ExceptionDataFactory.ExceptionStatus = error.status;
		        ExceptionDataFactory.ExceptionStatusText = error.statusText;
		        if (error.data.ExceptionType != undefined) {
		            ExceptionDataFactory.ExceptionType = error.data.ExceptionType;
		        }
		        else {
		            ExceptionDataFactory.ExceptionType = error.data.ClassName;
		        }
		        if (error.data.StackTrace != undefined) {
		            ExceptionDataFactory.ExceptionStackTrace = error.data.StackTrace;
		        }
		        else {
		            ExceptionDataFactory.ExceptionStackTrace = error.data.StackTraceString;
		        }
		    }
		    ExceptionDataFactory.SourcePageInError = $window.location.hash;
		    $window.location.replace('#ErrorPage');
		    return {
		        serverKamVersion: null,
		        isException: true
		    };
		});
	}
	this.getAuthenticationData = function (currentDictionaryNameSpace, absUrl)
	{
		return $http.post(serviceUrl + '/get', { currentDictionaryNameSpace, absUrl }, {  headers: { 'clientDate': $filter("date")(new Date(), "yyyy-MM-dd HH:mm:ss.sss") } }).then(
		function (response) {
		    return getResult(response.status, response.data);
		},
		function (error) {
		    return manageError(error);
		});
	}
}
]);
