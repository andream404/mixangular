'use strict'
var kamApp = angular.module('AngularJSApp');
kamApp.controller('GlobalCustomControlComponentController',['$scope','$controller','ComponentsDataHelperService',function($scope,$controller,ComponentsDataHelperService)
{
	$scope.CustomComponentWebServiceURL = 'api/GlobalCustomControlComponent'
	;
	$scope.Init = function () {
	    /*
	        ComponentsDataHelperService.computeCustomGetRequest(serviceUrl, methodName)
	        ComponentsDataHelperService.computeCustomPostRequest(serviceUrl, methodName, dataToPost)
	    */
	};
}
]);
