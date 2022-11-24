'use strict'
var kamApp = angular.module('AngularJSApp');
kamApp.factory('DiarioPageBSNFactory',['AbstractPageBSNFactory',function(AbstractPageBSNFactory)
{
	var pageBSNFactory = angular.extend({}, AbstractPageBSNFactory);
	// pageBSNFactory.On_PageInit = function () {
	// };
	// pageBSNFactory.On_ComponentFieldChange = function(CursorName, FieldName, FieldChangeResult) {
	// }
	// pageBSNFactory.On_AfterCommand = function(SourceName, CommandName, ColumnName, RowIndex) {
	// }
	// pageBSNFactory.On_AfterDatasetUpdate = function (SourceName) {
	// }
	return pageBSNFactory;
}
]);
