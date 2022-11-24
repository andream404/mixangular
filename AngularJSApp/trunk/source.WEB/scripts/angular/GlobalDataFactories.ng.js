'use strict'
var kamApp = angular.module('AngularJSApp');
kamApp.factory('GlobalEntriesFactory',function()
{
	return {
	    LoadedFromServer: false,
	    GlobalEntries: null
	};
}
);
kamApp.factory('GlobalSettingsFactory',function()
{
	return {
	    LoadedFromServer: false,
	    GlobalSettings: null
	};
}
);
kamApp.factory('LoggedUserSettingsFactory',function()
{
	return {
	    LoadedFromServer: false,
	    UserInfo: null,
	    UserSettings: null
	};
}
);
kamApp.factory('SpeechToTextFactory',function()
{
	return {
	    IsRecording: false,
	    CurrRecordingElemScope: null,
	    StartRecording: function (recordingElemScope) {
	        this.IsRecording = true;
	        this.CurrRecordingElemScope = recordingElemScope;
	    },
	    StopRecording: function () {
	        this.IsRecording = false;
	        this.CurrRecordingElemScope = null;
	    }
	};
}
);
