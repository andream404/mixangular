'use strict'
var kamApp = angular.module('AngularJSApp');
kamApp.factory('KamMultiPagePopupFactory',['$window','GlobalEntriesFactory',function($window,GlobalEntriesFactory)
{
	return {
	    ActionDeferred: null,
	    Show: function () {
	        $('#KamMultiPagePopupRefresh').text(GlobalEntriesFactory.GlobalEntries.ApplicationEntries.RefreshEntry);
	        $('#KamMultiPagePopupTitle').text(GlobalEntriesFactory.GlobalEntries.ApplicationEntries.KamMultiPagePopupTitleEntry);
	        $('#KamMultiPagePopup').modal({
	            backdrop: 'static',
	            keyboard: false
	        });
	    },
	    ButtonRefreshClick: function () {
	        $window.location.reload();
	    }
	};
}
]);
