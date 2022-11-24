'use strict'
var kamApp = angular.module('AngularJSApp');
kamApp.controller('NavigationLandingPageController',['$scope','$controller','$location','ComponentsDataHelperService','PagesNavigationHelperService',function($scope,$controller,$location,ComponentsDataHelperService,PagesNavigationHelperService)
{
	$scope.Init = function ()
	{
		$controller('AbstractPageController', { $scope: $scope });
		$scope.PageWebServiceUrl = 'api/NavigationLandingPage';
		$scope.DefinedComponentsCount = 1;
		$scope.Base_Init();
		ComponentsDataHelperService.computeCustomGetRequest($scope.PageWebServiceUrl, 'Get').then(function (result){
		    if (result.Page.PageUrl != undefined && result.Page.PageUrl != '')
		    {
		        PagesNavigationHelperService.manageActionResult( { status: 200, data: result.Page});
		    }
		    else
		    {
		        $location.path('/Index');
		    }
		});
	}
}
]);
