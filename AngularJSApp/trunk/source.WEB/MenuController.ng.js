'use strict'
var kamApp = angular.module('AngularJSApp');
kamApp.controller('MenuController',['$scope',function($scope)
{
	this.currentMenuName = $scope.name + '.html'
	;
}
]);
