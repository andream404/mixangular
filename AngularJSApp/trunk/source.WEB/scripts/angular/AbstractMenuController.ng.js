'use strict'
var kamApp = angular.module('AngularJSApp');
kamApp.controller('AbstractMenuController',['$scope','PromisesListFactory',function($scope,PromisesListFactory)
{
	$scope.Kam4ControlsContainerScope = $scope.$parent.$parent.$parent.$parent;
	$scope.AbstractMenuScope = $scope.$parent.$parent.$parent;
	$scope.SetMenuAsLoaded = function () {
	    $scope.$$postDigest(function () {
	        $scope.AbstractMenuScope.menuItem.MenuLoadDoneDef.resolve();
	        if($scope.AfterSetMenuAsLoaded) {
	            $scope.AfterSetMenuAsLoaded();
	        }
	    });
	}
	$scope.Init = function ()
	{
	    var pageLoadedPromisesArray = new PromisesListFactory.PromisesList();
	    pageLoadedPromisesArray.Add($scope.Kam4ControlsContainerScope.pageLoadedDef.promise);
	    pageLoadedPromisesArray.InTheEndDoAction($scope.OnPageLoaded)
	}
	$scope.OnPageLoaded = function()
	{
	}
}
]);
