'use strict'
var kamApp = angular.module('AngularJSApp');
kamApp.service('SecureWSService',['$rootScope','$http','$window','$cookies','$filter','$q','md5','privateKey','ExceptionDataFactory','AppNotificationsFactory','NavigationDataFactory','PromisesListFactory','LoggedUserSettingsFactory','KamMultiPagePopupFactory','UpdateConflictPopupFactory','GlobalSettingsFactory',function($rootScope,$http,$window,$cookies,$filter,$q,md5,privateKey,ExceptionDataFactory,AppNotificationsFactory,NavigationDataFactory,PromisesListFactory,LoggedUserSettingsFactory,KamMultiPagePopupFactory,UpdateConflictPopupFactory,GlobalSettingsFactory)
{
	var clientProg = 0
	;
	function getHeaders(serviceUrl)
	{
		var token = $cookies.get('token');
		var clientDate = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss.sss');
		var hash = md5.createHash('~/' + serviceUrl + token + clientDate + privateKey);
		var headers = {
		    'Content-Type': 'application/json',
		    'token': token,
		    'clientDate': clientDate,
		    'hash': hash,
		    'pageCode': LoggedUserSettingsFactory.PageCode
		};
		if(GlobalSettingsFactory != null && GlobalSettingsFactory.GlobalSettings != null && GlobalSettingsFactory.GlobalSettings.LogWebRequests) {
		    clientProg++;
		    var clientProgStr = '' + clientProg;
		    clientProgStr = '0'.repeat(8 - clientProgStr.length) + clientProgStr;
		    headers.requestID = md5.createHash(token + clientDate) + '_' + clientProgStr;
		}
		return headers;
	}
	function logBeginRequest(headers, serviceFullUrl)
	{
		if(GlobalSettingsFactory != null && GlobalSettingsFactory.GlobalSettings != null && GlobalSettingsFactory.GlobalSettings.LogWebRequests) {
		var requestBeginTime = new Date();
		console.log(
		    'BeginWebRequest ' +
		    '{' +
		    '"RequestID":"' + headers.requestID + '",' +
		    '"RequestURL":"' + serviceFullUrl + '",' +
		    '"RequestBeginTime":"'+ requestBeginTime.getDate() + '/' +
		        (requestBeginTime.getMonth() + 1)  + '/' +
		        requestBeginTime.getFullYear() + ' '  +
		        requestBeginTime.getHours() + ':' +
		        requestBeginTime.getMinutes() + ':' +
		        requestBeginTime.getSeconds() + '.' +
		        requestBeginTime.getMilliseconds() + '"'+
		    '}');
		}
	}
	function logEndRequest(headers, serviceFullUrl)
	{
		if(GlobalSettingsFactory != null && GlobalSettingsFactory.GlobalSettings != null && GlobalSettingsFactory.GlobalSettings.LogWebRequests) {
		var requestEndTime = new Date();
		console.log(
		    'EndWebRequest ' +
		    '{' +
		    '"RequestID":"' + headers.requestID + '",' +
		    '"RequestURL":"' + serviceFullUrl + '",' +
		    '"RequestEndTime":"'+ requestEndTime.getDate() + '/' +
		        (requestEndTime.getMonth() + 1)  + '/' +
		        requestEndTime.getFullYear() + ' '  +
		        requestEndTime.getHours() + ':' +
		        requestEndTime.getMinutes() + ':' +
		        requestEndTime.getSeconds() + '.' +
		        requestEndTime.getMilliseconds() + '"'+
		    '}');
		}
	}
	function getResult(status, data)
	{
		var result = {
		status: status,
		data: data
		};
		return result;
	}
	function getResult(status, data, headers)
	{
		var result = {
		status: status,
		data: data,
		headers: headers
		};
		return result;
	}
	function manageError(error, catchError, redirectToLoginOn403)
	{
		if (error.status === 403) {
		if (redirectToLoginOn403 === null || redirectToLoginOn403 === undefined || redirectToLoginOn403 === true) {
		    $cookies.remove('token');
		    $window.location.replace('Login.html');
		}
		}
		else {
		if(catchError === true) {
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
		    if (ExceptionDataFactory.ExceptionType == 'System.ApplicationException') {
		        AppNotificationsFactory.NotifyApplicationError(ExceptionDataFactory.ExceptionMessage);
		        return getResult('ApplicationException', ExceptionDataFactory.ExceptionMessage);
		    }
		    else if (ExceptionDataFactory.ExceptionType == 'IT4.Web.Common.KamMultiPageException'){
		        KamMultiPagePopupFactory.Show()
		        return getResult('IT4.Web.Common.KamMultiPageException', ExceptionDataFactory.ExceptionMessage);
		    }
		    else if (ExceptionDataFactory.ExceptionType == 'IT4.Common.DB.UpdateConflictException') {
		        UpdateConflictPopupFactory.Show()
		        return getResult('IT4.Common.DB.UpdateConflictException', ExceptionDataFactory.ExceptionMessage);
		    }
		    else {
		        ExceptionDataFactory.SourcePageInError = $window.location.hash;
		        $window.location.replace('#ErrorPage');
		    }
		}
		else {
		    return getResult(error.statusText, null);
		}
		}
	}
	function performGet(serviceFullUrl, responseType)
	{
		var onWebRequestDoneDef = $q.defer();
		if(NavigationDataFactory.LoginCheckedDef.promise.$$state.status == 1) {
		    performHTTPGet(serviceFullUrl, responseType, onWebRequestDoneDef);
		}
		else {
		    var promisesList = new PromisesListFactory.PromisesList();
		    promisesList.Add(NavigationDataFactory.LoginCheckedDef.promise);
		    promisesList.InTheEndDoAction(function (params) {
		        performHTTPGet(params.serviceFullUrl, params.responseType, params.onWebRequestDoneDef);
		    },
		    {
		        'serviceFullUrl': serviceFullUrl,
		        'responseType': responseType,
		        'onWebRequestDoneDef': onWebRequestDoneDef
		    });
		}
		return onWebRequestDoneDef.promise;
	}
	function performHTTPGet(serviceFullUrl, responseType, onWebRequestDoneDef)
	{
		var headers = getHeaders(serviceFullUrl);
		logBeginRequest(headers, serviceFullUrl);
		if(responseType == undefined) {
		    $http.get(serviceFullUrl, { headers: headers }).then(
		        function(response) {
		            logEndRequest(headers, serviceFullUrl);
		            onWebRequestDoneDef.resolve(response);
		        },
		        function(error) {
		            logEndRequest(headers, serviceFullUrl);
		            onWebRequestDoneDef.reject(error);
		        });
		}
		else {
		    $http.get(serviceFullUrl, { headers: headers, responseType: responseType }).then(
		        function(response) {
		            logEndRequest(headers, serviceFullUrl);
		            onWebRequestDoneDef.resolve(response);
		        },
		        function(error) {
		            logEndRequest(headers, serviceFullUrl);
		            onWebRequestDoneDef.reject(error);
		        });
		}
	}
	function performPost(serviceFullUrl, dataToPost)
	{
		var onWebRequestDoneDef = $q.defer();
		if(NavigationDataFactory.LoginCheckedDef.promise.$$state.status == 1) {
		    performHTTPPost(serviceFullUrl, dataToPost, onWebRequestDoneDef);
		}
		else {
		    var promisesList = new PromisesListFactory.PromisesList();
		    promisesList.Add(NavigationDataFactory.LoginCheckedDef.promise);
		    promisesList.InTheEndDoAction(function (params) {
		        performHTTPPost(params.serviceFullUrl, params.dataToPost, params.onWebRequestDoneDef);
		    },
		    {
		        'serviceFullUrl': serviceFullUrl,
		        'dataToPost': dataToPost,
		        'onWebRequestDoneDef': onWebRequestDoneDef
		    });
		}
		return onWebRequestDoneDef.promise;
	}
	function performHTTPPost(serviceFullUrl, dataToPost, onWebRequestDoneDef)
	{
		var headers = getHeaders(serviceFullUrl);
		logBeginRequest(headers, serviceFullUrl);
		if(dataToPost == undefined) {
		    $http.post(serviceFullUrl, { headers: headers }).then(
		        function(response) {
		            logEndRequest(headers, serviceFullUrl);
		            onWebRequestDoneDef.resolve(response);
		        },
		        function(error) {
		            logEndRequest(headers, serviceFullUrl);
		            onWebRequestDoneDef.reject(error);
		        });
		}
		else {
		    $http.post(serviceFullUrl, dataToPost, { headers: headers }).then(
		        function(response) {
		            logEndRequest(headers, serviceFullUrl);
		            onWebRequestDoneDef.resolve(response);
		        },
		        function(error) {
		            logEndRequest(headers, serviceFullUrl);
		            onWebRequestDoneDef.reject(error);
		        });
		}
	}
	this.computeGet = function (serviceUrl, methodName, catchError, redirectToLoginOn403)
	{
		if (catchError === undefined) {
		catchError = false;
		}
		if (methodName === null || methodName === undefined) {
		methodName = 'get';
		}
		var serviceFullUrl = serviceUrl + '/' + methodName;
		return performGet(serviceFullUrl).then(
		function (response) {
		    return getResult(response.status, response.data, response.headers);
		},
		function (error) {
		    return manageError(error, catchError, redirectToLoginOn403);
		});
	}
	this.computePost = function (serviceUrl, dataToPost, methodName, catchError)
	{
		if (catchError === undefined) {
		catchError = false;
		}
		if (methodName === null || methodName === undefined) {
		methodName = 'post';
		}
		var serviceFullUrl = serviceUrl + '/' + methodName;
		return performPost(serviceFullUrl, dataToPost).then(
		function (response) {
		   return getResult(response.status, response.data);
		},
		function (error) {
		   return manageError(error, catchError);
		});
	}
	this.uploadFile = function (serviceUrl, uploaderElement)
	{
		var headers = getHeaders(serviceUrl);
		delete headers["Content-Type"];
		uploaderElement.options.headers = headers;
		var onResultDef = $q.defer();
		uploaderElement.on('success', function(file, response) {
		    onResultDef.resolve(response);
		});
		uploaderElement.on('error', function(file, response) {
		    if(response.InnerException != null) {
		        manageError({data: response.InnerException}, true, false);
		    }
		    else {
		        manageError({data: response}, true, false);
		    }
		});
		uploaderElement.processQueue();
		return onResultDef.promise;
	}
	this.downloadFile = function (serviceUrl, methodName)
	{
		var serviceFullUrl = serviceUrl + '/' + methodName;
		return performGet(serviceFullUrl, 'arraybuffer').then(
		    function (response) {
		        return response;
		    },
		    function (error) {
		        manageError(error, true, false);
		    }
		);
	}
	this.checkLogin = function (serviceUrl)
	{
		var serviceFullUrl = serviceUrl + '/get';
		return $http.get(serviceFullUrl, { headers: getHeaders(serviceFullUrl) }).then(
		function (response) {
		    return getResult(response.status, response.data, response.headers);
		},
		function (error) {
		    return manageError(error, false, false);
		});
	}
	this.thirdPartyLogin = function (serviceUrl)
	{
		var serviceFullUrl = serviceUrl + '/thirdPartyLogin';
		return $http.get(serviceFullUrl, { headers: getHeaders(serviceFullUrl) }).then(
		function (response) {
		    return getResult(response.status, response.data, response.headers);
		},
		function (error) {
		    return manageError(error, false, false);
		});
	}
	this.navigationLandingPageLogin = function (serviceUrl, paramsURL)
	{
		var serviceFullUrl = serviceUrl + '/navigationLandingPageLogin';
		var paramsJSON = null;
		if(!angular.equals(paramsURL, {})){
		    paramsJSON = JSON.stringify(paramsURL);
		}
		return $http.post(serviceFullUrl, { paramsJSON }, { headers: getHeaders(serviceFullUrl) }).then(
		function (response) {
		    return getResult(response.status, response.data, response.headers);
		},
		function (error) {
		    return manageError(error, false, false);
		});
	}
	this.getEntriesResetPassword = function (serviceUrl, paramsURL)
	{
		var serviceFullUrl = serviceUrl + '/getEntries';
		return $http.post(serviceFullUrl, paramsURL , { headers: getHeaders(serviceFullUrl) }).then(
		function (response) {
		    return getResult(response.status, response.data, response.headers);
		},
		function (error) {
		    return manageError(error, true, false);
		});
	}
	this.resetPasswordRequestValidation = function (serviceUrl, paramsURL)
	{
		var serviceFullUrl = serviceUrl + '/resetPasswordRequestValidation';
		return $http.post(serviceFullUrl, paramsURL , { headers: getHeaders(serviceFullUrl) }).then(
		function (response) {
		    return getResult(response.status, response.data, response.headers);
		},
		function (error) {
		    return manageError(error, true, false);
		});
	}
	this.updateUserPassword = function (serviceUrl, paramsURL)
	{
		var serviceFullUrl = serviceUrl + '/updateUserPassword';
		return $http.post(serviceFullUrl, paramsURL , { headers: getHeaders(serviceFullUrl) }).then(
		function (response) {
		    return getResult(response.status, response.data, response.headers);
		},
		function (error) {
		    return manageError(error, true, false);
		});
	}
}
]);
