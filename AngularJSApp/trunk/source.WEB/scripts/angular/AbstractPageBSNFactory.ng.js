'use strict'
var kamApp = angular.module('AngularJSApp');
kamApp.factory('AbstractPageBSNFactory',function()
{
	return {
	    Page: null,
	    PageScope: null,
	    On_PageInit: function () { },
	    On_ComponentFieldChange: function(CursorName, FieldName, FieldChangeResult) { },
	    On_AfterCommand: function(SourceName, CommandName, ColumnName, RowIndex) { },
	    On_AfterDatasetUpdate: function(SourceName) { }
	}
}
);
