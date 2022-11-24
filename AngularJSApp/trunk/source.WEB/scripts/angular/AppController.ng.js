'use strict'
var kamApp = angular.module('AngularJSApp');
kamApp.controller('AppController',['$scope','$cookies','$window','$q','$location','LoginService','AppNotificationsFactory','OkCancelPopupFactory','AuthService','NavigationDataFactory','KamMultiPagePopupFactory','UpdateConflictPopupFactory','CommandPopupFactory','SpeechToTextFactory',function($scope,$cookies,$window,$q,$location,LoginService,AppNotificationsFactory,OkCancelPopupFactory,AuthService,NavigationDataFactory,KamMultiPagePopupFactory,UpdateConflictPopupFactory,CommandPopupFactory,SpeechToTextFactory)
{
	AuthService.getServerVersion().then(function (result) {
	    if(!result.isException) {
	        console.log('Body version: ' + document.body.getAttribute('kamversion'));
	        console.log('Server version: ' + result.serverKamVersion);
	        if(document.body.getAttribute('kamversion') != result.serverKamVersion) {
	            console.log('Call reload');
	            location.reload(true);
	        }
	        else {
	            var token = $cookies.get('token');
	            if(token != undefined) {
	                var paramsURL = $location.search();
	                LoginService.navigationLandingPageLogin(paramsURL).then(function (result) {
	                LoginService.checkLogin().then(function (result){
	                    if (result == undefined || result.status != 200) {
	                            LoginService.thirdPartyLogin().then(function (result){
	                            if (result == undefined || result.status != 200) {
	                                $cookies.remove('token');
	                                $window.location.replace('Login.html');
	                            }
	                            else {
	                                NavigationDataFactory.LoginCheckedDef.resolve();
	                                $scope.AppNotificationsFactory = AppNotificationsFactory;
	                                $scope.OkCancelPopupFactory = OkCancelPopupFactory;
	                                $scope.KamMultiPagePopupFactory = KamMultiPagePopupFactory;
	                                $scope.UpdateConflictPopupFactory = UpdateConflictPopupFactory;
	                                $scope.CommandPopupFactory = CommandPopupFactory;
	                            }
	                        });
	                    }
	                    else {
	                        NavigationDataFactory.LoginCheckedDef.resolve();
	                        $scope.AppNotificationsFactory = AppNotificationsFactory;
	                        $scope.OkCancelPopupFactory = OkCancelPopupFactory;
	                        $scope.KamMultiPagePopupFactory = KamMultiPagePopupFactory;
	                        $scope.UpdateConflictPopupFactory = UpdateConflictPopupFactory;
	                        $scope.CommandPopupFactory = CommandPopupFactory;
	                    }
	                });
	                });
	            }
	            else {
	                $cookies.remove('token');
	                $window.location.replace('Login.html');
	            }
	        }
	    }
	});
	$scope.menu = {
	    menuList: [],
	    EntryContext: [],
	    setMenuList: function (newEntryContext, newMenuList) {
	        if ($scope.menu.EntryContext === undefined || $scope.menu.EntryContext === null || $scope.menu.EntryContext === []) {
	            newEntryContext = [0];
	        }
	        $scope.menu.EntryContext = newEntryContext;
	        $scope.menu.menuList.sort(function (a, b) { return a.contextLevel - b.contextLevel });
	        newMenuList.sort(function (a, b) { return a.contextLevel - b.contextLevel });
	        $scope.menu.EntryContext.sort();
	        var newMinEntryContext = $scope.menu.EntryContext[0];
	        for (var i = $scope.menu.menuList.length - 1; i >= 0; i--) {
	            if ($scope.menu.menuList[i].contextLevel >= newMinEntryContext) {
	                $scope.menu.menuList.pop();
	            }
	        }
	        for (var i = 0; i < newMenuList.length; i++) {
	            if (newMenuList[i].contextLevel >= newMinEntryContext) {
	                newMenuList[i].MenuLoadDoneDef = $q.defer();
	                $scope.menu.menuList.push(newMenuList[i]);
	            }
	        }
	    }
	};
	$scope.menu.EntryContext = [];
	angular.element(window).bind("keydown", keydown);
	function keydown(evt) {
	    if (evt.keyCode === 13 && !evt.Handled)
	    {
	        if (SpeechToTextFactory.IsRecording == true)
	        {
	            SpeechToTextFactory.CurrRecordingElemScope.stopstt();
	            evt.Handled = true;
	            evt.preventDefault();
	        }
	    }
	}
}
]);
