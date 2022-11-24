'use strict'
var kamApp = angular.module('AngularJSApp');
kamApp.factory('LogOutPageBSNFactory',['AbstractPageBSNFactory', 'LoginService', '$window',function(AbstractPageBSNFactory, LoginService, $window)
{
	var pageBSNFactory = angular.extend({}, AbstractPageBSNFactory);
	pageBSNFactory.On_PageInit = function () {
		LoginService.deleteLogin().then(function (result) {
			if (result != undefined && result.status === 'OK') {
				$window.location.replace('Login.html');
			}
        });
	};
	return pageBSNFactory;
}
]);
