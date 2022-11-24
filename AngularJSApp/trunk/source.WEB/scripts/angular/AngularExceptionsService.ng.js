'use strict'
var kamApp = angular.module('AngularJSApp');
kamApp.service('AngularExceptionsService',['$window','ExceptionDataFactory',function($window,ExceptionDataFactory)
{
	function manageError(error)
	{
		ExceptionDataFactory.ExceptionMessage = error.message;
		ExceptionDataFactory.ExceptionMessageText = null;
		ExceptionDataFactory.ExceptionWhere = null;
		ExceptionDataFactory.ExceptionStatus = error.status;
		ExceptionDataFactory.ExceptionStatusText = error.statusText;
		ExceptionDataFactory.ExceptionType = error.exceptionType;
		ExceptionDataFactory.ExceptionHtmlErrorBody = null;
		ExceptionDataFactory.ExceptionStackTrace = error.stack;
		ExceptionDataFactory.SourcePageInError = $window.location.hash;
		$window.location.replace('#ErrorPage');
	}
	this.throwNotImplementedException = function ()
	{
		var error = new Error('Method not implemented');
		error.status = 500;
		error.statusText = 'Internal Server Error';
		error.exceptionType = 'NotImplementedException';
		manageError(error);
	}
	this.throwBadRequestException = function ()
	{
		var error = new Error('Bad request');
		error.status = 400;
		error.statusText = 'Your browser sent a request that this server could not understand.';
		error.exceptionType = 'BadRequestException';
		manageError(error);
	}
	this.throwForbiddenException = function ()
	{
		var error = new Error('Forbidden');
		error.status = 403;
		error.statusText = 'You don\'t have permission to access the resource on this server.';
		error.exceptionType = 'ForbiddenException';
		manageError(error);
	}
}
]);
