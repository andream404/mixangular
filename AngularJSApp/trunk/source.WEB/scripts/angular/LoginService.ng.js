'use strict'
var kamApp = angular.module('AngularJSApp');
kamApp.service('LoginService',['$cookies','SecureWSService',function($cookies,SecureWSService)
{
	var serviceUrl = 'api/login'
	;
	this.postLogin = function (username, password, keepMeSignedIn, languageNamespace)
	{
		var dataToPost = {
		'Username': username,
		'Password': password,
		'KeepMeSignedIn': keepMeSignedIn,
		'LanguageNamespace': languageNamespace
		};
		return SecureWSService.computePost(serviceUrl, dataToPost).then(function (result) {
		return result;
		});
	}
	this.postAutologin = function (autologinKey)
	{
		var dataToPost = {
		'AutologinKey': autologinKey
		};
		return SecureWSService.computePost(serviceUrl, dataToPost, 'Autologin', false).then(function (result) {
		return result;
		});
	}
	this.checkLogin = function ()
	{
		return SecureWSService.checkLogin(serviceUrl).then(function (result) {
		return result;
		});
	}
	this.thirdPartyLogin = function ()
	{
		return SecureWSService.thirdPartyLogin(serviceUrl).then(function (result) {
		return result;
		});
	}
	this.navigationLandingPageLogin = function (paramsURL)
	{
		return SecureWSService.navigationLandingPageLogin(serviceUrl, paramsURL).then(function (result) {
		return result;
		});
	}
	this.deleteLogin = function ()
	{
		var autologinKey = $cookies.get('AutologinKey');
		$cookies.remove('AutologinKey');
		$cookies.remove('KeepMeSignedIn');
		if(autologinKey == undefined) {
		    autologinKey = null;
		}
		var dataToPost = {
		    'AutologinKey': autologinKey
		};
		return SecureWSService.computePost(serviceUrl, dataToPost, 'delete', false).then(function (result) {
		    return result;
		});
	}
	this.getGlobalData = function ()
	{
		return SecureWSService.computeGet(serviceUrl, 'getGlobalData', false, false).then(function (result) {
		return result;
		});
	}
}
]);
