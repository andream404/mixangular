'use strict'
var kamApp = angular.module('AngularJSApp');
kamApp.controller('AbstractCustomComponentController',['$scope','$controller',function($scope,$controller)
{
	$controller('AbstractComponentController', { $scope: $scope });
}
]);
