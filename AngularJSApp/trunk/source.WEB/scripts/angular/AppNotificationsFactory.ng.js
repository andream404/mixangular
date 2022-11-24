'use strict'
var kamApp = angular.module('AngularJSApp');
kamApp.factory('AppNotificationsFactory',function()
{
	return {
	    NotifyApplicationError : function (errorMessageText) {
	        $('body').pgNotification({
	            style: 'flip',
	            message: errorMessageText,
	            position: 'top-left',
	            timeout: 0,
	            type: 'danger'
	        }).show();
	    },
	    CloseAllApplicationErrorNotifies: function () {
	        $('.pgn').remove();
	    }
	}
}
);
