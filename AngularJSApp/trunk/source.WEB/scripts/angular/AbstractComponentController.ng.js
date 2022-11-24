'use strict'
var kamApp = angular.module('AngularJSApp');
kamApp.controller('AbstractComponentController',['$scope','$q','$sce','PromisesListFactory',function($scope,$q,$sce,PromisesListFactory)
{
	$scope.ComponentShowMode = null;
	$scope.ITEMCurrent = null;
	$scope.ShowComponentLoader = false;
	$scope.ComponentRTIs = null;
	$scope.ComponentLoadDoneDef = $q.defer();
	$scope.LoaderPromisesList = new PromisesListFactory.PromisesList();
	$scope.PendingChangesPromisesList = new PromisesListFactory.PromisesList();
	$scope.PerformComponentInit = function () { };
	$scope.FocusedElement = null;
	$scope.ShowLoaderComponent = function (promise) {
	    $scope.FocusedElement = $(document.activeElement);
	    if($scope.FocusedElement != null && $scope.FocusedElement.length != 0) {
	        $scope.FocusedElement.blur();
	    }
	    $scope.ShowComponentLoader = true;
	    $scope.CenterScroll();
	}
	$scope.AddLoaderPromise = function (promise) {
	    if (promise != null) {
	        $scope.LoaderPromisesList.Add(promise);
	    }
	}
	$scope.HideLoaderComponent = function () {
	    if ($scope.LoaderPromisesList.promises.length != 0) {
	        $scope.LoaderPromisesList.InTheEndDoAction(function () {
	            $scope.ShowComponentLoader = false;
	            $scope.LoaderPromisesList = new PromisesListFactory.PromisesList();
	            if($scope.FocusedElement != null && $scope.FocusedElement.length != 0) {
	                $scope.FocusedElement.focus();
	            }
	        });
	    }
	    else {
	        $scope.ShowComponentLoader = false;
	        if($scope.FocusedElement != null && $scope.FocusedElement.length != 0) {
	            $scope.FocusedElement.focus();
	        }
	    }
	}
	$scope.ClearPendingChangesPromisesList = function() {
	    $scope.PendingChangesPromisesList = new PromisesListFactory.PromisesList();
	}
	$scope.AddPendingChangesPromise = function (promise) {
	    if (promise != null) {
	        $scope.PendingChangesPromisesList.Add(promise);
	    }
	}
	$scope.SetComponentRTIs = function (componentsRTIs) {
	    $scope.ComponentRTIs = componentsRTIs;
	}
	$scope.TrustAsHtml = function(value) {
	    return $sce.trustAsHtml(value);
	};
	$scope.SafeApply = function(fn) {
	    var phase = $scope.$root.$$phase;
	    if(phase == '$apply' || phase == '$digest') {
	        if (fn) {
	            $scope.$eval(fn);
	        }
	    }
	    else {
	        if (fn) {
	            $scope.$apply(fn);
	        } else {
	            $scope.$apply();
	        }
	    }
	}
}
]);
