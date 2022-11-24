'use strict'
var kamApp = angular.module('AngularJSApp');
kamApp.factory('UpdateConflictPopupFactory',['$window','GlobalEntriesFactory',function($window,GlobalEntriesFactory)
{
	return {
	    ActionDeferred: null,
	    Show: function () {
	        $('#UpdateConflictPopupRefresh').text(GlobalEntriesFactory.GlobalEntries.ApplicationEntries.RefreshEntry);
	        $('#UpdateConflictPopupTitle').text(GlobalEntriesFactory.GlobalEntries.ApplicationEntries.UpdateConflictPopupTitleEntry);
	        $('#UpdateConflictPopup').modal({
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
