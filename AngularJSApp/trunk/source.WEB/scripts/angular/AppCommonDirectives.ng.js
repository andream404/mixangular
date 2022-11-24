'use strict'
var kamApp = angular.module('AngularJSApp');
kamApp.directive('pgFormGroup',function()
{
	return {
	    restrict: 'A',
	    link: function(scope, element, attrs) {
	        $(element).click(function() {
	            $(element).find('input, textarea').focus();
	        });
	        $(element).on('focus', 'input, textarea', function() {
	            $('.form-group.form-group-default').removeClass('focused');
	            $(this).parents('.form-group').addClass('focused');
	        });
	        $(element).on('blur', 'input, textarea', function() {
	            $(this).parents('.form-group').removeClass('focused');
	        });
	    }
	}
}
);
kamApp.directive('speechToText',function()
{
	return {
	    restrict: 'E',
	    controller: 'SpeechToTextController',
	    templateUrl: 'SpeechToText.html?version=ebd7ac43-b02a-4a6d-8050-8567c9aa4754',
	    scope:{
	        field: '='
	    }
	 }
}
);
