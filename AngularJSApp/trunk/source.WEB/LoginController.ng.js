'use strict'
var kamApp = angular.module('AngularJSApp');
kamApp.controller('LoginController',['$scope','$window','$cookies','$sce','$location','$timeout','AuthService','LoginService','PromisesListFactory','NavigationDataFactory',function($scope,$window,$cookies,$sce,$location,$timeout,AuthService,LoginService,PromisesListFactory,NavigationDataFactory)
{
	$scope.RightUsernamePassword = true;
	$scope.UsernameFormGroupRTI = {};
	$scope.PasswordFormGroupRTI = {};
	$scope.keepMeSignedIn;
	$scope.buttonLoginDisabled = true;
	$scope.Init = function() {
	    $scope.keepMeSignedIn = $cookies.get('KeepMeSignedIn');
	    if($scope.keepMeSignedIn == undefined) {
	        $scope.keepMeSignedIn = false;
	    }
	}
	function IsFormValid()
	{
	    $('#form-login').validate();
	    return !$scope.FLoginForm.$invalid;
	}
	$scope.ShowPageLoader = function ()
	{
	    $('#LoginLoading').fadeIn();
	}
	$scope.HidePageLoader = function ()
	{
	    $('#LoginLoading').fadeOut();
	}
	$scope.DoLogin = function ()
	{
	    /* HACK per chrome quando pre-valorizza i campi username e password */
	    var usernameInput = $('#usernameInput');
	    if ($scope.username === undefined && usernameInput[0].value != undefined && usernameInput[0].value != '')
	    {
	        $scope.username = usernameInput[0].value;
	    }
	    var passwordInput = $('#passwordInput');
	    if ($scope.password === undefined && passwordInput[0].value != undefined && passwordInput[0].value != '') {
	        $scope.password = passwordInput[0].value;
	    }
	    $scope.RightUsernamePassword = true;
	    $scope.errorMessage(false);
	    if (IsFormValid()) {
	        $scope.ShowPageLoader();
	        var promisesList = new PromisesListFactory.PromisesList();
	        var postLoginPromise = LoginService.postLogin($scope.username, $scope.password, $scope.keepMeSignedIn, $scope.LanguageNamespaceEditValue.item != null ? $scope.LanguageNamespaceEditValue.item.name : null);
	        postLoginPromise.then(function (result) {
	            if (result.status === 200) {
	                $cookies.put('KeepMeSignedIn', $scope.keepMeSignedIn);
	                $cookies.put('AutologinKey', result.data.AutologinKey);
	                $window.location.replace('default.html');
	            }
	            else {
	                $scope.RightUsernamePassword = false;
	                $scope.errorMessage();
	            }
	        });
	        promisesList.Add(postLoginPromise);
	        promisesList.InTheEndDoAction(function () {
	            $scope.HidePageLoader();
	        });
	    }
	}
	$scope.LanguageNamespaceComboBoxDataSource = null;
	$scope.LanguageNamespaceEditValue = { item: null };
	$scope.LanguageNamespaceShow = false;
	$scope.LanguageNamespaceComboBoxControlOnChange = function(languageNamespaceSelected) {
	    $scope.LanguageNamespaceEditValue.item = languageNamespaceSelected;
	    $cookies.put('DictionaryNameSpace', $scope.LanguageNamespaceEditValue.item.name);
	    location.reload(true);
	}
	$scope.LoginEntries = null;
	$scope.CheckButtonLoginDisableStatus = function(){
	    /* HACK per chrome quando pre-valorizza i campi username e password */
	    var usernameInput = $('#usernameInput');
	    if ($scope.username === undefined && usernameInput[0].value != undefined && usernameInput[0].value != '')
	    {
	        $scope.username = usernameInput[0].value;
	    }
	    var passwordInput = $('#passwordInput');
	    if ($scope.password === undefined && passwordInput[0].value != undefined && passwordInput[0].value != '') {
	        $scope.password = passwordInput[0].value;
	    }
	    if($scope.username != undefined && $scope.username != '' && $scope.password != undefined && $scope.password != '')
	        $scope.buttonLoginDisabled = false;
	    else
	        $scope.buttonLoginDisabled = true;
	}
	$scope.TrustAsHtml = function (html) {
	    return $sce.trustAsHtml(html);
	}
	function InitLanguageNamespaceItems () {
	    for(var i = 0; i < $scope.LanguageNamespaceComboBoxDataSource.length; i++) {
	        var item = $scope.LanguageNamespaceComboBoxDataSource[i];
	        $scope.LanguageNamespaceComboBoxDataSource[i].itemDescription = '';
	        if(item != null) {
	            $scope.LanguageNamespaceComboBoxDataSource[i].itemDescription = item.description;
	            var hasIcon = false;
	            if(item.iconsrc != undefined && item.iconsrc != null && item.iconsrc != '') {
	                hasIcon = true;
	            }
	            if($scope.LanguageNamespaceComboBoxDataSource[i].itemDescription == null) {
	                if(hasIcon) {
	                    $scope.LanguageNamespaceComboBoxDataSource[i].itemDescription = '';
	                }
	                else {
	                    $scope.LanguageNamespaceComboBoxDataSource[i].itemDescription = item.name;
	                }
	            }
	        }
	    }
	}
	AuthService.getServerVersion().then(function (result) {
	    if(!result.isException) {
	        console.log('Body version: ' + document.body.getAttribute('kamversion'));
	        console.log('Server version: ' + result.serverKamVersion);
	        if(document.body.getAttribute('kamversion') != result.serverKamVersion) {
	            console.log('Call reload');
	            location.reload(true);
	        }
	        else {
	            var paramsURL = $location.search();
	            LoginService.navigationLandingPageLogin(paramsURL).then(function (result) {
	            LoginService.checkLogin().then(function (result) {
	                if (result != undefined && result.status === 200) {
	                    $window.location.replace('default.html');
	                }
	                else {
	                    var savedDictionaryNameSpace = $cookies.get('DictionaryNameSpace');
	                    if(savedDictionaryNameSpace == undefined) {
	                        savedDictionaryNameSpace = null;
	                    }
	                    var absUrl = $location.absUrl();
	                    AuthService.getAuthenticationData(savedDictionaryNameSpace, absUrl).then(function (result) {
	                        if (result != undefined && result.status === 200) {
	                            if(result.data.DictionaryNameSpaceData != null) {
	                                var dictionaryNameSpaceData = result.data.DictionaryNameSpaceData;
	                                $scope.LoginEntries = result.data.LoginEntries;
	                                var selectedItem = null;
	                                if(dictionaryNameSpaceData.DictionaryNameSpaces.length != 0) {
	                                    selectedItem = dictionaryNameSpaceData.DictionaryNameSpaces[0];
	                                }
	                                if(dictionaryNameSpaceData.DictionaryNameSpaces.length > 1) {
	                                    $scope.LanguageNamespaceComboBoxDataSource = dictionaryNameSpaceData.DictionaryNameSpaces;
	                                    InitLanguageNamespaceItems();
	                                    $scope.LanguageNamespaceShow = true;
	                                    var dictionaryNameSpaceToSelect = null;
	                                    if(savedDictionaryNameSpace != null) {
	                                        dictionaryNameSpaceToSelect = savedDictionaryNameSpace;
	                                    }
	                                    else {
	                                        for(var i = 0; i < dictionaryNameSpaceData.ConfigDictionaryNameSpaces.length; i++) {
	                                            var configDictionaryNameSpace = dictionaryNameSpaceData.ConfigDictionaryNameSpaces[i];
	                                            if(configDictionaryNameSpace.url == absUrl) {
	                                                dictionaryNameSpaceToSelect = configDictionaryNameSpace.name;
	                                            }
	                                        }
	                                    }
	                                    if(dictionaryNameSpaceToSelect != null) {
	                                        for(var i = 0; i < dictionaryNameSpaceData.DictionaryNameSpaces.length; i++) {
	                                            var dictionaryNameSpaces = dictionaryNameSpaceData.DictionaryNameSpaces[i];
	                                            if(dictionaryNameSpaces.name == dictionaryNameSpaceToSelect) {
	                                                selectedItem = dictionaryNameSpaces;
	                                            }
	                                        }
	                                    }
	                                    $scope.LanguageNamespaceEditValue.item = selectedItem;
	                                }
	                            }
	                            $cookies.put('token', result.data.NewToken);
	                                LoginService.thirdPartyLogin().then(function (result){
	                                if (result != undefined && result.status === 200) {
	                                    $window.location.replace('default.html');
	                                }
	                                else {
	                                    var keepMeSignedIn = $cookies.get('KeepMeSignedIn');
	                                    var autologinKey = $cookies.get('AutologinKey');
	                                    $cookies.remove('AutologinKey');
	                                    var promisesList = new PromisesListFactory.PromisesList();
	                                    if(keepMeSignedIn && autologinKey != undefined && autologinKey != null && autologinKey != '') {
	                                        var postAutologinPromise = LoginService.postAutologin(autologinKey);
	                                        postAutologinPromise.then(function (result) {
	                                            if (result.status === 200) {
	                                                $cookies.put('AutologinKey', result.data.AutologinKey);
	                                                $window.location.replace('default.html');
	                                            }
	                                        });
	                                        promisesList.Add(postAutologinPromise);
	                                    }
	                                    NavigationDataFactory.LoginCheckedDef.resolve();
	                                    promisesList.InTheEndDoAction(function () {
	                                        $scope.HidePageLoader();
	                                        $timeout(function() {
	                                            $('#usernameInput').focus();
	                                            $scope.CheckButtonLoginDisableStatus();
	                                        }, 400);
	                                    });
	                                }
	                            });
	                        }
	                    });
	                }
	            });
	            });
	        }
	    }
	});
	$scope.errorMessage = function(show = true){
	    $('#LoginFail').css('display', show ? 'block' : 'none');
	}
}
]);
