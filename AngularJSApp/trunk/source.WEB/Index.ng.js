'use strict'
var kamApp = angular.module('AngularJSApp');
kamApp.controller('IndexPageController',['$scope','$controller','IndexPageBSNFactory',function($scope,$controller,IndexPageBSNFactory)
{
	$controller('AbstractPageController', { $scope: $scope });
	$scope.Init = function () {
	    $scope.PageWebServiceUrl = 'api/IndexPage';
	    $scope.DefinedComponentsCount = 0;
	    $scope.Base_Init();
	    IndexPageBSNFactory.PageScope = $scope;
	    IndexPageBSNFactory.Page = null;
	    IndexPageBSNFactory.On_PageInit();
	};
}
]);
