'use strict'
var kamApp = angular.module('AngularJSApp');
kamApp.controller('ErrorPageController',['$scope','$cookies','ExceptionDataFactory','$window','GlobalEntriesFactory','LoggedUserSettingsFactory',function($scope,$cookies,ExceptionDataFactory,$window,GlobalEntriesFactory,LoggedUserSettingsFactory)
{
	$scope.ExceptionMessage = ExceptionDataFactory.ExceptionMessage
	;
	$scope.ExceptionMessageText = ExceptionDataFactory.ExceptionMessageText
	;
	$scope.ExceptionWhere = ExceptionDataFactory.ExceptionWhere
	;
	$scope.Status = ExceptionDataFactory.ExceptionStatus
	;
	$scope.StatusText = ExceptionDataFactory.ExceptionStatusText
	;
	$scope.ExceptionType = ExceptionDataFactory.ExceptionType
	;
	$scope.StackTrace = ExceptionDataFactory.ExceptionStackTrace
	;
	$scope.HtmlErrorBody = ExceptionDataFactory.ExceptionHtmlErrorBody
	;
	$scope.HideStackTrace = false
	;
	$scope.SourcePageInError = ExceptionDataFactory.SourcePageInError
	;
	$scope.SourcePageInErrorGoToPreviousPageButtonEntry = (GlobalEntriesFactory ? GlobalEntriesFactory.GlobalEntries.ApplicationEntries.SourcePageInErrorGoToPreviousPageButtonEntry : '')
	;
	$scope.SourcePageInErrorGoToStartPageButtonEntry = (GlobalEntriesFactory ? GlobalEntriesFactory.GlobalEntries.ApplicationEntries.SourcePageInErrorGoToStartPageButtonEntry : '')
	;
	$scope.ExceptionStandardMessage = (GlobalEntriesFactory ? GlobalEntriesFactory.GlobalEntries.ApplicationEntries.ErrorStandardMessageEntry : '')
	;
	$scope.ExceptionSummaryCanRead = (LoggedUserSettingsFactory ? LoggedUserSettingsFactory.UserSettings.ErrorSummaryCanRead : '')
	;
	$scope.ExceptionDetailsCanRead = (LoggedUserSettingsFactory ? LoggedUserSettingsFactory.UserSettings.ErrorDetailsCanRead : '')
	;
	$scope.Init = function ()
	{
		$('#PageLoaderElement').fadeOut();
		if ($scope.ExceptionType === 'System.ApplicationException') {
		    $scope.HideStackTrace = true;
		}
	}
	$scope.IsNoExitException = function ()
	{
		return $scope.ExceptionType === 'IT4.Web.Common.NoExitException';
	}
	$scope.IsGoToStartPageException = function ()
	{
		return $scope.ExceptionType === 'IT4.Web.Common.GoToStartPageException';
	}
	$scope.IsGenericException = function ()
	{
		return !($scope.IsNoExitException() ||
		$scope.IsGoToStartPageException());
	}
	$scope.GoToPrevoiusPage = function ()
	{
		$window.location.replace($scope.SourcePageInError);
	}
	$scope.GoToStartPage = function ()
	{
		$window.location.replace('default.html');
	}
}
]);
