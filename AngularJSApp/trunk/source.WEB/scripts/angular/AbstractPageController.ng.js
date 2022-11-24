'use strict'
var kamApp = angular.module('AngularJSApp');
kamApp.controller('AbstractPageController',['$scope','$q','PagesNavigationHelperService','PromisesListFactory','AppNotificationsFactory','GlobalEntriesFactory','ComponentsNavigationHelperService','LoggedUserSettingsFactory',function($scope,$q,PagesNavigationHelperService,PromisesListFactory,AppNotificationsFactory,GlobalEntriesFactory,ComponentsNavigationHelperService,LoggedUserSettingsFactory)
{
	$scope.Kam4ControlsContainerScope = $scope.$parent.$parent;
	$scope.Kam4ControlsContainerScope.ShowPageComponents = false;
	$scope.GlobalEntries = GlobalEntriesFactory.GlobalEntries;
	$scope.IsLoadDone = false;
	$scope.ShowPageParams = PagesNavigationHelperService.getShowPageParams();
	$scope.DefinedComponentsCount = 0;
	$scope.SubComponentsArray = [];
	$scope.SubComponentLoadDonePromisesArray = new PromisesListFactory.PromisesList();
	$scope.RouteChangeDonePromisesArray = new PromisesListFactory.PromisesList();
	$scope.AllMenusLoadDoneDef = $q.defer();
	$scope.AllComponentsLoadedDef = $q.defer();
	$scope.CurrentPageLoadedDef = $q.defer();
	$scope.SubComponentLoadDonePromisesArray.Add($scope.AllMenusLoadDoneDef.promise);
	$scope.RouteChangeDonePromisesArray.Add($scope.Kam4ControlsContainerScope.routeChangedDef.promise);
	$scope.RouteChangeDonePromisesArray.Add($scope.CurrentPageLoadedDef.promise);
	$scope.RouteChangeDonePromisesArray.InTheEndDoAction(function () {
	    $scope.Kam4ControlsContainerScope.routeChangedDef = $q.defer();
	    var menuLoadDonePromisesArray = new PromisesListFactory.PromisesList();
	    for(var i = 0; i < $scope.Kam4ControlsContainerScope.menu.menuList.length; i++) {
	        menuLoadDonePromisesArray.Add($scope.Kam4ControlsContainerScope.menu.menuList[i].MenuLoadDoneDef.promise);
	    }
	    menuLoadDonePromisesArray.InTheEndDoAction(function () {
	        $scope.AllMenusLoadDoneDef.resolve();
	    })
	});
	$scope.PageWebServiceUrl = null;
	$scope.PageRTI = null;
	$scope.PageCode = null;
	$scope.Init = function () {
	    $scope.Base_Init();
	};
	$scope.Base_Init = function () {
	    AppNotificationsFactory.CloseAllApplicationErrorNotifies();
	    $scope.ShowPageLoader();
	    if ($scope.DefinedComponentsCount == 0) {
	        LoadPage();
	    }
	}
	$scope.ShowPageLoader = function () {
	    $scope.Base_ShowPageLoader();
	}
	$scope.Base_ShowPageLoader = function () {
	    $('#PageLoaderElement').fadeIn();
	}
	$scope.HidePageLoader = function () {
	    $scope.Base_HidePageLoader();
	}
	$scope.Base_HidePageLoader = function () {
	    $('#PageLoaderElement').fadeOut(400, 'swing', function(){
	        $scope.AllComponentsLoadedDef.resolve();
	        $scope.IsLoadDone = true;
	    });
	}
	$scope.RegisterComponent = function (subComponent) {
	    $scope.SubComponentsArray.push(subComponent);
	    if ($scope.DefinedComponentsCount == $scope.SubComponentsArray.length) {
	        LoadPage();
	    }
	}
	function LoadPage() {
	    PagesNavigationHelperService.loadNewPage($scope.PageWebServiceUrl).then(function (result) {
	        $scope.PageRTI = result.PageRTI;
	        LoggedUserSettingsFactory.PageCode = result.PageCode;
	        $scope.CurrentPageLoadedDef.resolve();
	        $scope.Kam4ControlsContainerScope.pageLoadedDef.resolve();
	        for (var i = 0; i < $scope.SubComponentsArray.length; i++) {
	            $scope.SubComponentLoadDonePromisesArray.Add($scope.SubComponentsArray[i].ComponentLoadDoneDef.promise);
	            $scope.SubComponentsArray[i].PerformComponentInit();
	        }
	        $scope.SubComponentLoadDonePromisesArray.InTheEndDoAction(function () {
	            $scope.Kam4ControlsContainerScope.ShowPageComponents = true;
	            $scope.HidePageLoader();
	        });
	    });
	}
	$(document).click(function(e) {
	    ComponentsNavigationHelperService.pageClick();
	});
}
]);
