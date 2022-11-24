'use strict'
var kamApp = angular.module('AngularJSApp');
kamApp.factory('OkCancelPopupFactory',['$q','GlobalEntriesFactory',function($q,GlobalEntriesFactory)
{
	return {
	    ActionDeferred: null,
	    Show: function (title, message) {
	        $('#OkCancelPopupOk').text(GlobalEntriesFactory.GlobalEntries.ApplicationEntries.OkEntry);
	        $('#OkCancelPopupCancel').text(GlobalEntriesFactory.GlobalEntries.ApplicationEntries.CancelEntry);
	        $('#OkCancelPopupTitle').text(title);
	        $('#OkCancelPopupMessage').text(message);
	        $('#OkCancelPopup').modal({
	            backdrop: 'static',
	            keyboard: false
	        });
	        this.ActionDeferred = $q.defer();
	        return this.ActionDeferred.promise;
	    },
	    ButtonOkClick: function () {
	        $('#OkCancelPopup').modal('hide');
	        this.ActionDeferred.resolve('OK');
	    },
	    ButtonCancelClick: function () {
	        $('#OkCancelPopup').modal('hide');
	        this.ActionDeferred.resolve('CANCEL');
	    }
	};
}
]);
