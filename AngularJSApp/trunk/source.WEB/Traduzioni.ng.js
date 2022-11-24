'use strict'
var kamApp = angular.module('AngularJSApp');
kamApp.controller('TraduzioniPageController',['$scope','$controller','TraduzioniPageBSNFactory',function($scope,$controller,TraduzioniPageBSNFactory)
{
	$controller('AbstractPageController', { $scope: $scope });
	$scope.Init = function () {
	    $scope.PageWebServiceUrl = 'api/TraduzioniPage';
	    $scope.DefinedComponentsCount = 1;
	    $scope.Base_Init();
	    TraduzioniPageBSNFactory.PageScope = $scope;
	    TraduzioniPageBSNFactory.Page = null;
	    TraduzioniPageBSNFactory.On_PageInit();
	};
}
]);
kamApp.controller('CursorGTraduzioniController',['$scope','$q','$controller','$compile','$window','$timeout','AngularExceptionsService','ComponentsDataHelperService','ComponentsNavigationHelperService','ValidationHelperService','MenusHelperService','PromisesListFactory','SpeechToTextFactory','TraduzioniPageBSNFactory','PagesHelperService','PagesDataTableHelperService','OkCancelPopupFactory','$sce','$filter','PagesFormHelperService','CommandPopupFactory','GlobalEntriesFactory',function($scope,$q,$controller,$compile,$window,$timeout,AngularExceptionsService,ComponentsDataHelperService,ComponentsNavigationHelperService,ValidationHelperService,MenusHelperService,PromisesListFactory,SpeechToTextFactory,TraduzioniPageBSNFactory,PagesHelperService,PagesDataTableHelperService,OkCancelPopupFactory,$sce,$filter,PagesFormHelperService,CommandPopupFactory,GlobalEntriesFactory)
{
	$controller('AbstractComponentController', { $scope: $scope });
	$scope.CursorGTraduzioniIDTRANSLATIONFilter01 = { name: 'CursorGTraduzioniIDTRANSLATIONFilter01', fieldName: 'idtranslation'
	, isFilterValued: function() {
	    if($scope.CurrentFilters != undefined && $scope.CurrentFilters != null) {
	        for(var i = 0; i < $scope.CurrentFilters.length; i++) {
	            var currentFilter = $scope.CurrentFilters[i];
	            if(currentFilter.ColumnName == 'IDTRANSLATION') {
	                for(var j = 0; j < currentFilter.FilterDetails.length; j++) {
	                    var currentFilterDetail = currentFilter.FilterDetails[j];
	                    if(currentFilterDetail.Name == 'CursorGTraduzioniIDTRANSLATIONFilter01') {
	                        return true;
	                    }
	                }
	            }
	        }
	    }
	    return false;
	}
	, filterType: 'text', filterCondition: 'EQUAL' }
	;
	$scope.IDTRANSLATIONColumn = { name: 'IDTRANSLATION', text: '', widthType: 'auto', xmlWidth: 0.00, defaultWidth: 85, areFiltersValued: function() {
	if($scope.CurrentFilters != undefined && $scope.CurrentFilters != null) {
	    for(var i = 0; i < $scope.CurrentFilters.length; i++) {
	        var currentFilter = $scope.CurrentFilters[i];
	        if(currentFilter.ColumnName == 'IDTRANSLATION') {
	            return true;
	        }
	    }
	}
	return false;
	}, onFieldChange: function(rowIndex, updatedValue=true) {
	let dependentFieldsUpdates = Promise.resolve(false);
	$scope.ITEMCurrent = $scope.ComponentData.GridSourceData.CurrentItemsList[rowIndex];
	if(!$scope.FieldChangedManagedByImmediateFieldUpdate('IDTRANSLATION', $scope.ComponentRTIs.GridColumnsRTI.CursorGTraduzioniIDTRANSLATIONRTI, rowIndex) &&
	   ComponentsDataHelperService.hasChangedFieldDependentFieldsValued('CursorGTraduzioni', 'IDTRANSLATION', $scope.ComponentRTIs.GridColumnsRTI, $scope.ITEMCurrent)) {
	    $scope.ShowLoaderComponent();
	    dependentFieldsUpdates = ComponentsDataHelperService.getItemDependentFieldsUpdated('api/CursorGTraduzioni', 'IDTRANSLATION', $scope.ITEMCurrent).then(function(result) {
	        $scope.ComponentData.GridSourceData.CurrentItemsList[rowIndex] = result;
	        $scope.ITEMCurrent = $scope.ComponentData.GridSourceData.CurrentItemsList[rowIndex];
	        var dataTableRTI = $('#GTraduzioniGrid').DataTable();
	        dataTableRTI.rows().every( function ( ) {
	            if(this.index() == rowIndex) {
	                $(this.node()).find('input').each(function() {
	                    $(this).unbind( 'blur' );
	                });
	                var oldDataRowState = this.data().DataRowState;
	                this.data($scope.ITEMCurrent);
	                this.data().DataRowState = oldDataRowState;
	                $scope.ResponsiveKam4DatatableControl.RedrawRow(this.node());
	            }
	        });
	        $scope.HideLoaderComponent();
	        var firstEditableTD = $scope.ResponsiveKam4DatatableControl.GetFirstEditableCell();
	        if(firstEditableTD != null) {
	            $scope.ResponsiveKam4DatatableControl.ResetCurrentEditingCellIndexes();
	            firstEditableTD.click();
	        }
	    });
	}
	}
	, data: 'IDTRANSLATION', dbColumnType: 'system.int32', className: 'td-text-right', editortype: 'text', orderable: true, cellsdatastyle: 'n', rtComponentCSClass: 'RTColumn', render: function ( data, type, row, meta ) {
	var cellRT = ComponentsDataHelperService.getCellRT(row.PrimaryKeyValue, 'IDTRANSLATION', $scope.ComponentRTIs.CurrentRowsRTI);
	var cellRenderer = PagesDataTableHelperService.getBaseBrowseCellRenderer(data, cellRT, $scope.ComponentShowMode, $scope.IDTRANSLATIONColumn.cellsdatastyle , null);
	return cellRenderer;
	}, isReadonly: function() {
	if ($scope.IsComponentReadonly() === false &&
	!$scope.ComponentRTIs.GridColumnsRTI.CursorGTraduzioniIDTRANSLATIONRTI.GlobalReadOnly &&
	(
	    ($scope.ComponentShowMode === 'edit' && $scope.ComponentRTIs.GridColumnsRTI.CursorGTraduzioniIDTRANSLATIONRTI.CanEdit === true) ||
	    ($scope.ComponentShowMode === 'insert' && $scope.ComponentRTIs.GridColumnsRTI.CursorGTraduzioniIDTRANSLATIONRTI.CanInsert === true)
	)) {
	return false;
	}
	return true;
	}, filters: [ $scope.CursorGTraduzioniIDTRANSLATIONFilter01
	] }
	;
	$scope.CursorGTraduzioniIDSTRINGFilter01 = { name: 'CursorGTraduzioniIDSTRINGFilter01', fieldName: 'IDSTRING'
	, isFilterValued: function() {
	    if($scope.CurrentFilters != undefined && $scope.CurrentFilters != null) {
	        for(var i = 0; i < $scope.CurrentFilters.length; i++) {
	            var currentFilter = $scope.CurrentFilters[i];
	            if(currentFilter.ColumnName == 'IDSTRING') {
	                for(var j = 0; j < currentFilter.FilterDetails.length; j++) {
	                    var currentFilterDetail = currentFilter.FilterDetails[j];
	                    if(currentFilterDetail.Name == 'CursorGTraduzioniIDSTRINGFilter01') {
	                        return true;
	                    }
	                }
	            }
	        }
	    }
	    return false;
	}
	, filterType: 'dropdown', filterCondition: 'EQUAL', FilterValueModel: { item: null}, filterIsDatabasedLookup: true }
	;
	$scope.IDSTRINGColumn = { name: 'IDSTRING', text: '', widthType: 'fixed', xmlWidth: 180.00, defaultWidth: 130, areFiltersValued: function() {
	if($scope.CurrentFilters != undefined && $scope.CurrentFilters != null) {
	    for(var i = 0; i < $scope.CurrentFilters.length; i++) {
	        var currentFilter = $scope.CurrentFilters[i];
	        if(currentFilter.ColumnName == 'IDSTRING') {
	            return true;
	        }
	    }
	}
	return false;
	}, onFieldChange: function(rowIndex, updatedValue=true) {
	let dependentFieldsUpdates = Promise.resolve(false);
	$scope.ITEMCurrent = $scope.ComponentData.GridSourceData.CurrentItemsList[rowIndex];
	if(!$scope.FieldChangedManagedByImmediateFieldUpdate('IDSTRING', $scope.ComponentRTIs.GridColumnsRTI.CursorGTraduzioniIDSTRINGRTI, rowIndex) &&
	   ComponentsDataHelperService.hasChangedFieldDependentFieldsValued('CursorGTraduzioni', 'IDSTRING', $scope.ComponentRTIs.GridColumnsRTI, $scope.ITEMCurrent)) {
	    $scope.ShowLoaderComponent();
	    dependentFieldsUpdates = ComponentsDataHelperService.getItemDependentFieldsUpdated('api/CursorGTraduzioni', 'IDSTRING', $scope.ITEMCurrent).then(function(result) {
	        $scope.ComponentData.GridSourceData.CurrentItemsList[rowIndex] = result;
	        $scope.ITEMCurrent = $scope.ComponentData.GridSourceData.CurrentItemsList[rowIndex];
	        var dataTableRTI = $('#GTraduzioniGrid').DataTable();
	        dataTableRTI.rows().every( function ( ) {
	            if(this.index() == rowIndex) {
	                $(this.node()).find('input').each(function() {
	                    $(this).unbind( 'blur' );
	                });
	                var oldDataRowState = this.data().DataRowState;
	                this.data($scope.ITEMCurrent);
	                this.data().DataRowState = oldDataRowState;
	                $scope.ResponsiveKam4DatatableControl.RedrawRow(this.node());
	            }
	        });
	        $scope.HideLoaderComponent();
	        var firstEditableTD = $scope.ResponsiveKam4DatatableControl.GetFirstEditableCell();
	        if(firstEditableTD != null) {
	            $scope.ResponsiveKam4DatatableControl.ResetCurrentEditingCellIndexes();
	            firstEditableTD.click();
	        }
	    });
	}
	}
	, data: 'IDSTRING', dbColumnType: 'system.int32', columntype: 'lookup', isDatabasedLookup: true, isMultichoiceLookup: false, cellsformat: 'n', className: 'td-text-left', editortype: 'lookup', orderable: true, cellsdatastyle: null, rtComponentCSClass: 'RTColumn', render: function ( data, type, row, meta ) {
	var cellRT = ComponentsDataHelperService.getCellRT(row.PrimaryKeyValue, 'IDSTRING', $scope.ComponentRTIs.CurrentRowsRTI);
	var cellRenderer = PagesDataTableHelperService.getBaseBrowseCellRenderer(data, cellRT, $scope.ComponentShowMode, $scope.IDSTRINGColumn.cellsdatastyle , null);
	cellRenderer = PagesDataTableHelperService.getLookupCellRenderer(row.FieldsData.IDSTRINGItems, cellRT, $scope.ComponentShowMode);
	return cellRenderer;
	}, isReadonly: function() {
	if ($scope.IsComponentReadonly() === false &&
	!$scope.ComponentRTIs.GridColumnsRTI.CursorGTraduzioniIDSTRINGRTI.GlobalReadOnly &&
	(
	    ($scope.ComponentShowMode === 'edit' && $scope.ComponentRTIs.GridColumnsRTI.CursorGTraduzioniIDSTRINGRTI.CanEdit === true) ||
	    ($scope.ComponentShowMode === 'insert' && $scope.ComponentRTIs.GridColumnsRTI.CursorGTraduzioniIDSTRINGRTI.CanInsert === true)
	)) {
	return false;
	}
	return true;
	}, filters: [ $scope.CursorGTraduzioniIDSTRINGFilter01
	] }
	;
	$scope.CursorGTraduzioniSTRINGVALUEFilter01 = { name: 'CursorGTraduzioniSTRINGVALUEFilter01', fieldName: 'stringvalue'
	, isFilterValued: function() {
	    if($scope.CurrentFilters != undefined && $scope.CurrentFilters != null) {
	        for(var i = 0; i < $scope.CurrentFilters.length; i++) {
	            var currentFilter = $scope.CurrentFilters[i];
	            if(currentFilter.ColumnName == 'STRINGVALUE') {
	                for(var j = 0; j < currentFilter.FilterDetails.length; j++) {
	                    var currentFilterDetail = currentFilter.FilterDetails[j];
	                    if(currentFilterDetail.Name == 'CursorGTraduzioniSTRINGVALUEFilter01') {
	                        return true;
	                    }
	                }
	            }
	        }
	    }
	    return false;
	}
	, filterType: 'text', filterCondition: 'CONTAINING_WORDS' }
	;
	$scope.STRINGVALUEColumn = { name: 'STRINGVALUE', text: '', widthType: 'fixed', xmlWidth: 720.00, defaultWidth: 425, areFiltersValued: function() {
	if($scope.CurrentFilters != undefined && $scope.CurrentFilters != null) {
	    for(var i = 0; i < $scope.CurrentFilters.length; i++) {
	        var currentFilter = $scope.CurrentFilters[i];
	        if(currentFilter.ColumnName == 'STRINGVALUE') {
	            return true;
	        }
	    }
	}
	return false;
	}, onFieldChange: function(rowIndex, updatedValue=true) {
	let dependentFieldsUpdates = Promise.resolve(false);
	$scope.ITEMCurrent = $scope.ComponentData.GridSourceData.CurrentItemsList[rowIndex];
	if(!$scope.FieldChangedManagedByImmediateFieldUpdate('STRINGVALUE', $scope.ComponentRTIs.GridColumnsRTI.CursorGTraduzioniSTRINGVALUERTI, rowIndex) &&
	   ComponentsDataHelperService.hasChangedFieldDependentFieldsValued('CursorGTraduzioni', 'STRINGVALUE', $scope.ComponentRTIs.GridColumnsRTI, $scope.ITEMCurrent)) {
	    $scope.ShowLoaderComponent();
	    dependentFieldsUpdates = ComponentsDataHelperService.getItemDependentFieldsUpdated('api/CursorGTraduzioni', 'STRINGVALUE', $scope.ITEMCurrent).then(function(result) {
	        $scope.ComponentData.GridSourceData.CurrentItemsList[rowIndex] = result;
	        $scope.ITEMCurrent = $scope.ComponentData.GridSourceData.CurrentItemsList[rowIndex];
	        var dataTableRTI = $('#GTraduzioniGrid').DataTable();
	        dataTableRTI.rows().every( function ( ) {
	            if(this.index() == rowIndex) {
	                $(this.node()).find('input').each(function() {
	                    $(this).unbind( 'blur' );
	                });
	                var oldDataRowState = this.data().DataRowState;
	                this.data($scope.ITEMCurrent);
	                this.data().DataRowState = oldDataRowState;
	                $scope.ResponsiveKam4DatatableControl.RedrawRow(this.node());
	            }
	        });
	        $scope.HideLoaderComponent();
	        var firstEditableTD = $scope.ResponsiveKam4DatatableControl.GetFirstEditableCell();
	        if(firstEditableTD != null) {
	            $scope.ResponsiveKam4DatatableControl.ResetCurrentEditingCellIndexes();
	            firstEditableTD.click();
	        }
	    });
	}
	}
	, data: 'STRINGVALUE', dbColumnType: 'system.string', textSize: '500', cellsformat: 'n', className: 'td-text-left', editortype: 'text', orderable: true, cellsdatastyle: null, rtComponentCSClass: 'RTColumn', render: function ( data, type, row, meta ) {
	var cellRT = ComponentsDataHelperService.getCellRT(row.PrimaryKeyValue, 'STRINGVALUE', $scope.ComponentRTIs.CurrentRowsRTI);
	var cellRenderer = PagesDataTableHelperService.getBaseBrowseCellRenderer(data, cellRT, $scope.ComponentShowMode, $scope.STRINGVALUEColumn.cellsdatastyle , null);
	return cellRenderer;
	}, isReadonly: function() {
	if ($scope.IsComponentReadonly() === false &&
	!$scope.ComponentRTIs.GridColumnsRTI.CursorGTraduzioniSTRINGVALUERTI.GlobalReadOnly &&
	(
	    ($scope.ComponentShowMode === 'edit' && $scope.ComponentRTIs.GridColumnsRTI.CursorGTraduzioniSTRINGVALUERTI.CanEdit === true) ||
	    ($scope.ComponentShowMode === 'insert' && $scope.ComponentRTIs.GridColumnsRTI.CursorGTraduzioniSTRINGVALUERTI.CanInsert === true)
	)) {
	return false;
	}
	return true;
	}, filters: [ $scope.CursorGTraduzioniSTRINGVALUEFilter01
	] }
	;
	$scope.CursorGTraduzioniIDLANGUAGEFilter01 = { name: 'CursorGTraduzioniIDLANGUAGEFilter01', fieldName: 'idlanguage'
	, isFilterValued: function() {
	    if($scope.CurrentFilters != undefined && $scope.CurrentFilters != null) {
	        for(var i = 0; i < $scope.CurrentFilters.length; i++) {
	            var currentFilter = $scope.CurrentFilters[i];
	            if(currentFilter.ColumnName == 'IDLANGUAGE') {
	                for(var j = 0; j < currentFilter.FilterDetails.length; j++) {
	                    var currentFilterDetail = currentFilter.FilterDetails[j];
	                    if(currentFilterDetail.Name == 'CursorGTraduzioniIDLANGUAGEFilter01') {
	                        return true;
	                    }
	                }
	            }
	        }
	    }
	    return false;
	}
	, filterType: 'dropdown', filterCondition: 'EQUAL', FilterValueModel: { item: null}, filterIsDatabasedLookup: true }
	;
	$scope.IDLANGUAGEColumn = { name: 'IDLANGUAGE', text: '', widthType: 'fixed', xmlWidth: 180.00, defaultWidth: 130, areFiltersValued: function() {
	if($scope.CurrentFilters != undefined && $scope.CurrentFilters != null) {
	    for(var i = 0; i < $scope.CurrentFilters.length; i++) {
	        var currentFilter = $scope.CurrentFilters[i];
	        if(currentFilter.ColumnName == 'IDLANGUAGE') {
	            return true;
	        }
	    }
	}
	return false;
	}, onFieldChange: function(rowIndex, updatedValue=true) {
	let dependentFieldsUpdates = Promise.resolve(false);
	$scope.ITEMCurrent = $scope.ComponentData.GridSourceData.CurrentItemsList[rowIndex];
	if(!$scope.FieldChangedManagedByImmediateFieldUpdate('IDLANGUAGE', $scope.ComponentRTIs.GridColumnsRTI.CursorGTraduzioniIDLANGUAGERTI, rowIndex) &&
	   ComponentsDataHelperService.hasChangedFieldDependentFieldsValued('CursorGTraduzioni', 'IDLANGUAGE', $scope.ComponentRTIs.GridColumnsRTI, $scope.ITEMCurrent)) {
	    $scope.ShowLoaderComponent();
	    dependentFieldsUpdates = ComponentsDataHelperService.getItemDependentFieldsUpdated('api/CursorGTraduzioni', 'IDLANGUAGE', $scope.ITEMCurrent).then(function(result) {
	        $scope.ComponentData.GridSourceData.CurrentItemsList[rowIndex] = result;
	        $scope.ITEMCurrent = $scope.ComponentData.GridSourceData.CurrentItemsList[rowIndex];
	        var dataTableRTI = $('#GTraduzioniGrid').DataTable();
	        dataTableRTI.rows().every( function ( ) {
	            if(this.index() == rowIndex) {
	                $(this.node()).find('input').each(function() {
	                    $(this).unbind( 'blur' );
	                });
	                var oldDataRowState = this.data().DataRowState;
	                this.data($scope.ITEMCurrent);
	                this.data().DataRowState = oldDataRowState;
	                $scope.ResponsiveKam4DatatableControl.RedrawRow(this.node());
	            }
	        });
	        $scope.HideLoaderComponent();
	        var firstEditableTD = $scope.ResponsiveKam4DatatableControl.GetFirstEditableCell();
	        if(firstEditableTD != null) {
	            $scope.ResponsiveKam4DatatableControl.ResetCurrentEditingCellIndexes();
	            firstEditableTD.click();
	        }
	    });
	}
	}
	, data: 'IDLANGUAGE', dbColumnType: 'system.int32', columntype: 'lookup', isDatabasedLookup: true, isMultichoiceLookup: false, cellsformat: 'n', className: 'td-text-left', editortype: 'lookup', orderable: true, cellsdatastyle: null, rtComponentCSClass: 'RTColumn', render: function ( data, type, row, meta ) {
	var cellRT = ComponentsDataHelperService.getCellRT(row.PrimaryKeyValue, 'IDLANGUAGE', $scope.ComponentRTIs.CurrentRowsRTI);
	var cellRenderer = PagesDataTableHelperService.getBaseBrowseCellRenderer(data, cellRT, $scope.ComponentShowMode, $scope.IDLANGUAGEColumn.cellsdatastyle , null);
	cellRenderer = PagesDataTableHelperService.getLookupCellRenderer(row.FieldsData.IDLANGUAGEItems, cellRT, $scope.ComponentShowMode);
	return cellRenderer;
	}, isReadonly: function() {
	if ($scope.IsComponentReadonly() === false &&
	!$scope.ComponentRTIs.GridColumnsRTI.CursorGTraduzioniIDLANGUAGERTI.GlobalReadOnly &&
	(
	    ($scope.ComponentShowMode === 'edit' && $scope.ComponentRTIs.GridColumnsRTI.CursorGTraduzioniIDLANGUAGERTI.CanEdit === true) ||
	    ($scope.ComponentShowMode === 'insert' && $scope.ComponentRTIs.GridColumnsRTI.CursorGTraduzioniIDLANGUAGERTI.CanInsert === true)
	)) {
	return false;
	}
	return true;
	}, filters: [ $scope.CursorGTraduzioniIDLANGUAGEFilter01
	] }
	;
	$scope.CursorGTraduzioniComponentManagementDeleteColumColumn = { name: 'CursorGTraduzioniComponentManagementDeleteColum', text: '', widthType: 'auto', xmlWidth: 1.00, defaultWidth: 1, areFiltersValued: function() {
	if($scope.CurrentFilters != undefined && $scope.CurrentFilters != null) {
	    for(var i = 0; i < $scope.CurrentFilters.length; i++) {
	        var currentFilter = $scope.CurrentFilters[i];
	        if(currentFilter.ColumnName == 'CursorGTraduzioniComponentManagementDeleteColum') {
	            return true;
	        }
	    }
	}
	return false;
	}, onFieldChange: function(rowIndex, updatedValue=true) {
	let dependentFieldsUpdates = Promise.resolve(false);
	$scope.ITEMCurrent = $scope.ComponentData.GridSourceData.CurrentItemsList[rowIndex];
	if(!$scope.FieldChangedManagedByImmediateFieldUpdate('', $scope.ComponentRTIs.GridColumnsRTI.CursorGTraduzioniCursorGTraduzioniComponentManagementDeleteColumRTI, rowIndex) &&
	   ComponentsDataHelperService.hasChangedFieldDependentFieldsValued('CursorGTraduzioni', '', $scope.ComponentRTIs.GridColumnsRTI, $scope.ITEMCurrent)) {
	    $scope.ShowLoaderComponent();
	    dependentFieldsUpdates = ComponentsDataHelperService.getItemDependentFieldsUpdated('api/CursorGTraduzioni', '', $scope.ITEMCurrent).then(function(result) {
	        $scope.ComponentData.GridSourceData.CurrentItemsList[rowIndex] = result;
	        $scope.ITEMCurrent = $scope.ComponentData.GridSourceData.CurrentItemsList[rowIndex];
	        var dataTableRTI = $('#GTraduzioniGrid').DataTable();
	        dataTableRTI.rows().every( function ( ) {
	            if(this.index() == rowIndex) {
	                $(this.node()).find('input').each(function() {
	                    $(this).unbind( 'blur' );
	                });
	                var oldDataRowState = this.data().DataRowState;
	                this.data($scope.ITEMCurrent);
	                this.data().DataRowState = oldDataRowState;
	                $scope.ResponsiveKam4DatatableControl.RedrawRow(this.node());
	            }
	        });
	        $scope.HideLoaderComponent();
	        var firstEditableTD = $scope.ResponsiveKam4DatatableControl.GetFirstEditableCell();
	        if(firstEditableTD != null) {
	            $scope.ResponsiveKam4DatatableControl.ResetCurrentEditingCellIndexes();
	            firstEditableTD.click();
	        }
	    });
	}
	}
	, dbColumnType: 'system.string', raiseOnClick: true, editortype: '', orderable: false, onClickConfirmRequired: true, onClickConfirmMessage: $scope.GlobalEntries.PageEntries.ButtonsPanelEntries.ButtonDeleteConfirmMessage, cellsdatastyle: null, rtComponentCSClass: 'RTColumn', render: function ( data, type, row, meta ) {
	var cellRT = ComponentsDataHelperService.getCellRT(row.PrimaryKeyValue, '', $scope.ComponentRTIs.CurrentRowsRTI);
	var cellRenderer = PagesDataTableHelperService.getBaseBrowseCellRenderer(data, cellRT, $scope.ComponentShowMode, $scope.CursorGTraduzioniComponentManagementDeleteColumColumn.cellsdatastyle , null);
	cellRenderer = PagesDataTableHelperService.getLinkCellRenderer($scope.GlobalEntries.PageEntries.ButtonsPanelEntries.ButtonDeleteEntry, cellRT);
	cellRenderer = PagesDataTableHelperService.addCellRendererHtmlCssClass(cellRenderer, 'GridDeleteLink');
	$scope.CursorGTraduzioniComponentManagementDeleteColumColumn.onClickConfirmMessage = $scope.ComponentData.ComponentEntries.ButtonsPanelEntries.ButtonDeleteConfirmMessage;
	return cellRenderer;
	}, isReadonly: function() {
	    return true;
	}, filters: [ ] }
	;
	$scope.ComponentData = null
	;
	$scope.SpeechToTextFactory = SpeechToTextFactory
	;
	$scope.CursorGTraduzioniItemSortColumn = { name: 'CursorGTraduzioniItemSort', text: '', widthType: 'fixed', xmlWidth: 0.00, defaultWidth: 0, data: 'CursorGTraduzioniItemSort', filterType: '', orderable: true, hidden: true, isSystemColumn: true }
	;
	$scope.GridColumns = [
	$scope.CursorGTraduzioniItemSortColumn,
	$scope.IDTRANSLATIONColumn,
	$scope.IDSTRINGColumn,
	$scope.STRINGVALUEColumn,
	$scope.IDLANGUAGEColumn,
	$scope.CursorGTraduzioniComponentManagementDeleteColumColumn
	]
	;
	$scope.GridColumnsGroups = [
	]
	;
	$scope.DefaultPageSize = 20
	;
	$scope.PageSize = 20
	;
	$scope.DataTableInitCompleteDef = $q.defer()
	;
	$scope.GridSummaryData = {
	Begin: 0,
	End: 0,
	TotalRowsCount: 0,
	TotalRowsCountDescr: ''
	}
	;
	$scope.SettingGridData = true
	;
	$scope.CurrentPageIndex = 1
	;
	$scope.PreviousPageIndex = 1
	;
	$scope.PaginationTotalRowsCount = 0
	;
	$scope.IsFilterDefaultValue = false
	;
	$scope.SelectedItemsPerPageObject = {
	Value: {
	    number: $scope.PageSize,
	    text: '' + $scope.PageSize
	}
	}
	;
	$scope.ItemsPerPageOptions = [
	{number: 5, text: '5'},{number: 10, text: '10'},{number: 20, text: '20'}
	]
	;
	$scope.DataTableOptions = {
	"sDom": "<'table-responsive't><'row'<>>",
	"autoWidth": false,
	columns: $scope.GridColumns,
	"aaSorting": [],
	"aaData": [],
	"iDisplayLength": $scope.PageSize,
	"bDestroy": true,
	"orderFixed": {
	    "pre": [ 0, 'asc' ]
	},
	fnFooterCallback: function(row, data, start, end, display) {
	    PagesDataTableHelperService.CreateFilterRow(this, $scope.GridColumns, 'GTraduzioniGrid', $scope);
	},
	initComplete: function () {
	    $scope.DataTableInitCompleteDef.resolve();
	},
	"language": {
	  "emptyTable": $scope.GlobalEntries.PageEntries.GridEntries.EmptyDataString
	}
	}
	;
	$scope.ResponsiveKam4DatatableControl = {}
	;
	$scope.OriginalGridSourceData = {}
	;
	$scope.ModifiedGridSourceData = {}
	;
	$scope.IsSaveEvent = false
	;
	$scope.IsCancelEvent = false
	;
	function InitColumnsGroupsEntries()
	{
	}
	function InitFiltersEntries()
	{
		$scope.CursorGTraduzioniIDTRANSLATIONFilter01.filterEntry = $scope.ComponentData.ComponentEntries.FiltersEntries.CursorGTraduzioniIDTRANSLATIONFilter01;
		$scope.CursorGTraduzioniIDSTRINGFilter01.filterEntry = $scope.ComponentData.ComponentEntries.FiltersEntries.CursorGTraduzioniIDSTRINGFilter01;
		$scope.CursorGTraduzioniSTRINGVALUEFilter01.filterEntry = $scope.ComponentData.ComponentEntries.FiltersEntries.CursorGTraduzioniSTRINGVALUEFilter01;
		$scope.CursorGTraduzioniIDLANGUAGEFilter01.filterEntry = $scope.ComponentData.ComponentEntries.FiltersEntries.CursorGTraduzioniIDLANGUAGEFilter01;
	}
	function InitFiltersSuggestions()
	{
		$scope.CursorGTraduzioniIDTRANSLATIONFilter01.filterSuggestion = $scope.ComponentData.ComponentEntries.FiltersSuggestions.CursorGTraduzioniIDTRANSLATIONFilter01;
		$scope.CursorGTraduzioniIDSTRINGFilter01.filterSuggestion = $scope.ComponentData.ComponentEntries.FiltersSuggestions.CursorGTraduzioniIDSTRINGFilter01;
		$scope.CursorGTraduzioniSTRINGVALUEFilter01.filterSuggestion = $scope.ComponentData.ComponentEntries.FiltersSuggestions.CursorGTraduzioniSTRINGVALUEFilter01;
		$scope.CursorGTraduzioniIDLANGUAGEFilter01.filterSuggestion = $scope.ComponentData.ComponentEntries.FiltersSuggestions.CursorGTraduzioniIDLANGUAGEFilter01;
	}
	function SetFiltersDataSources()
	{
		SetCursorGTraduzioniIDSTRINGFilter01FilterDataSource($scope.ComponentData.FiltersDataSources.CursorGTraduzioniIDSTRINGFilter01Items);
		SetCursorGTraduzioniIDLANGUAGEFilter01FilterDataSource($scope.ComponentData.FiltersDataSources.CursorGTraduzioniIDLANGUAGEFilter01Items);
	}
	function InitColumnsRTIs()
	{
		$scope.IDTRANSLATIONColumn.text = $scope.ComponentData.ComponentEntries.ColumnsHeaderEntries.IDTRANSLATIONColumnEntry;
		$scope.IDTRANSLATIONColumn.hidden = ($scope.ComponentShowMode === 'browse' && !$scope.ComponentRTIs.GridColumnsRTI.CursorGTraduzioniIDTRANSLATIONRTI.CanRead) || !$scope.ComponentRTIs.GridColumnsRTI.CursorGTraduzioniIDTRANSLATIONRTI.GlobalVisible;
		$scope.IDSTRINGColumn.text = $scope.ComponentData.ComponentEntries.ColumnsHeaderEntries.IDSTRINGColumnEntry;
		$scope.IDSTRINGColumn.hidden = ($scope.ComponentShowMode === 'browse' && !$scope.ComponentRTIs.GridColumnsRTI.CursorGTraduzioniIDSTRINGRTI.CanRead) || !$scope.ComponentRTIs.GridColumnsRTI.CursorGTraduzioniIDSTRINGRTI.GlobalVisible;
		$scope.STRINGVALUEColumn.text = $scope.ComponentData.ComponentEntries.ColumnsHeaderEntries.STRINGVALUEColumnEntry;
		$scope.STRINGVALUEColumn.hidden = ($scope.ComponentShowMode === 'browse' && !$scope.ComponentRTIs.GridColumnsRTI.CursorGTraduzioniSTRINGVALUERTI.CanRead) || !$scope.ComponentRTIs.GridColumnsRTI.CursorGTraduzioniSTRINGVALUERTI.GlobalVisible;
		$scope.IDLANGUAGEColumn.text = $scope.ComponentData.ComponentEntries.ColumnsHeaderEntries.IDLANGUAGEColumnEntry;
		$scope.IDLANGUAGEColumn.hidden = ($scope.ComponentShowMode === 'browse' && !$scope.ComponentRTIs.GridColumnsRTI.CursorGTraduzioniIDLANGUAGERTI.CanRead) || !$scope.ComponentRTIs.GridColumnsRTI.CursorGTraduzioniIDLANGUAGERTI.GlobalVisible;
		$scope.CursorGTraduzioniComponentManagementDeleteColumColumn.text = $scope.ComponentData.ComponentEntries.ColumnsHeaderEntries.CursorGTraduzioniComponentManagementDeleteColumColumnEntry;
		$scope.CursorGTraduzioniComponentManagementDeleteColumColumn.hidden = $scope.ComponentShowMode !== 'browse';
	}
	function InitColumnsGroupsRTIs()
	{
	}
	function SetCursorGTraduzioniIDSTRINGFilter01FilterDataSource(items)
	{
		$scope.CursorGTraduzioniIDSTRINGFilter01.filterItems = items;
	}
	function SetCursorGTraduzioniIDLANGUAGEFilter01FilterDataSource(items)
	{
		$scope.CursorGTraduzioniIDLANGUAGEFilter01.filterItems = items;
	}
	function LoadComponentData()
	{
		var loadComponentDataPromise = ComponentsDataHelperService.getGridData('api/CursorGTraduzioni', $scope.PageSize, $scope.ComponentShowMode);
		loadComponentDataPromise.then(function (result) {
		    $scope.ComponentData = result;
		    $scope.CurrentPageIndex = $scope.ComponentData.GridDataRequestParamsObj.PageIndex + 1;
		    if($scope.ComponentShowMode == 'edit' && angular.isUndefined($scope.OriginalGridSourceData[$scope.CurrentPageIndex])){
		        $scope.OriginalGridSourceData[$scope.CurrentPageIndex] = angular.copy($scope.ComponentData.GridSourceData.CurrentItemsList);
		    }
		    $scope.SetComponentRTIs(result.ComponentRTIs);
		    InitComponentRTIs();
		});
		return loadComponentDataPromise;
	}
	function AddPerformComponentInitPromises(promisesList)
	{
		promisesList.Add($scope.DataTableInitCompleteDef.promise);
	}
	function InitComponentEntries(componentEntries)
	{
		InitGridEntries();
	}
	function DoBeforeLoadDone()
	{
		if ($scope.ComponentRTIs.ComponentRTI.CanRead === true) {
		$scope.SettingGridData = true;
		PerformDataTableInitComplete();
		InitComponentEntries();
		SetGridDataSource();
		SetFiltersDataSources();
		SetFiltersDefaultValues();
		SetSortDefaultValues();
		SetPagerDefaultValues();
		$scope.SettingGridData = false;
		}
	}
	function InitComponentRTIs()
	{
		InitColumnsRTIs();
		InitColumnsGroupsRTIs();
	}
	function InitGridEntries()
	{
		InitColumnsHeaderEntries();
		InitColumnsGroupsEntries();
		InitFiltersEntries();
		InitFiltersSuggestions();
	}
	function SetGridDataSource()
	{
		var dataTableRTI = $('#GTraduzioniGrid').DataTable();
		dataTableRTI.clear();
		if($scope.ComponentShowMode == 'edit' && angular.isUndefined($scope.OriginalGridSourceData[$scope.CurrentPageIndex])){
		    $scope.OriginalGridSourceData[$scope.CurrentPageIndex] = angular.copy($scope.ComponentData.GridSourceData.CurrentItemsList);
		}
		dataTableRTI.rows.add($scope.ComponentData.GridSourceData.CurrentItemsList);
		dataTableRTI.draw();
		$scope.ResponsiveKam4DatatableControl.InitInsertRows();
		$scope.ResponsiveKam4DatatableControl.ComputeResponsiveGrid();
		$scope.ITEMCurrent = null;
		if($scope.ComponentData.GridSourceData.CurrentItemsList.length != 0) {
		    $scope.ITEMCurrent = $scope.ComponentData.GridSourceData.CurrentItemsList[0];
		    if($scope.ComponentShowMode == 'insert'){
		        $scope.OriginalITEMCurrent = angular.copy($scope.ITEMCurrent);
		    }
		}
		UpdateGridSummaryData();
		TraduzioniPageBSNFactory.Page = $scope.GetPageForBsn($scope.ComponentRTIs.GridColumnsRTI);
		TraduzioniPageBSNFactory.On_AfterDatasetUpdate('CursorGTraduzioni');
		$scope.SafeApply();
		TraduzioniPageBSNFactory.Page = null;
	}
	function PerformDataTableInitComplete()
	{
		var dataTableRTI = $('#GTraduzioniGrid').DataTable();
		$scope.ResponsiveKam4DatatableControl.AfterTableCreated();
		PagesDataTableHelperService.HideHiddenColumns('GTraduzioniGrid', dataTableRTI, $scope.GridColumns);
		var footerRow = $('#GTraduzioniGrid tfoot tr');
		$('#GTraduzioniGrid thead').append(footerRow);
		PagesDataTableHelperService.CreateColumnsGroupsRow($scope.GridColumnsGroups, 'GTraduzioniGrid', $scope.GridColumns);
		dataTableRTI.on('order.dt', function (e) {
		    var order = dataTableRTI.order();
		    if(!$scope.SettingGridData && order.length > 0) {
		        $scope.CurrentSortInformation = {
		            SortColumn: $scope.GridColumns[order[0][0]].data,
		            SortDirection: order[0][1]
		        };
		        $scope.ShowLoaderComponent();
		        $scope.AddLoaderPromise(UpdateGridData());
		        $scope.HideLoaderComponent();
		    }
		} );
		$('input.GTraduzioniGrid_ColumnFilter').on( 'keyup', ComponentsNavigationHelperService.debounce(function() {
		    if(!$(this).is(':checkbox')) {
		        if(!$(this).hasClass('datepickerFilter') && !$(this).hasClass('datetimepickerFilter') && !$(this).hasClass('timepickerFilter')) {
		            DataTableOnFilter();
		        }
		    }
		}, 1000));
		$('input.GTraduzioniGrid_ColumnFilter').on('keydown', function (evt) {
		    if (evt.key == 'Tab' && evt.shiftKey) {
		        var idxCurrentColumn = $scope.GridColumns.findIndex((column) => column.filters && column.filters.findIndex((filter) => filter.name === evt.target.id) != -1);
		        var isFirst = $scope.GridColumns.filter((column) => !column.hidden && column.filters.length>0)[0].filters[0].name === evt.target.id;
		        var idxColumnFocus = -1;
		        if (isFirst) {
		            idxColumnFocus = $scope.GridColumns.slice(idxCurrentColumn+1).reverse().findIndex((column) => !column.hidden && column.filters.length>0);
		            idxColumnFocus = (idxColumnFocus!=-1) ? $scope.GridColumns.length-1 - idxColumnFocus : -1;
		        } else {
		            idxColumnFocus = $scope.GridColumns.slice(0, idxCurrentColumn).reverse().findIndex((column) => !column.hidden && column.filters.length>0);
		            idxColumnFocus = (idxColumnFocus!=-1) ? idxCurrentColumn-1 - idxColumnFocus : -1;
		        }
		        if (idxColumnFocus != -1) {
		            if (isFirst && $scope.GridColumns[idxColumnFocus].filters.length == 1) {
		                $timeout(() => $('#'+$scope.GridColumns[idxColumnFocus].filters[0].name).focus(), 0, false);
		            } else if ($scope.GridColumns[idxColumnFocus].filters.length > 1) {
		                $('#'+$scope.GridColumns[idxColumnFocus].name+'_MultipleFilterInput').attr('action-focus', 'focus-last');
		            }
		        }
		    }
		    else if (evt.key == 'Tab' && !evt.shiftKey) {
		        if ($scope.GridColumns.filter((column) => !column.hidden && column.filters.length>0).at(-1).filters[0].name === evt.target.id) {
		            idxColumnFocus = $scope.GridColumns.findIndex((column) => !column.hidden && column.filters.length>0);
		            if (idxColumnFocus != -1) {
		                if ($scope.GridColumns[idxColumnFocus].filters.length == 1) {
		                    $timeout(() => $('#'+$scope.GridColumns[idxColumnFocus].filters[0].name).focus(), 0, false);
		                } else {
		                    $timeout(() => $('#'+$scope.GridColumns[idxColumnFocus].name+'_MultipleFilterInput').focus(), 0, false);
		                }
		            }
		        }
		    }
		});
		$('input.GTraduzioniGrid_ColumnFilter:checkbox').on( 'click', function () {
		    var filter = $scope[$(this).parents('th').attr('filter-obj-name')];
		    if(filter.FilterValueModel == 'indeterminate'){
		        $('#' + filter.name).prop('checked', true);
		        filter.FilterValueModel = 'checked';
		    }
		    else if(filter.FilterValueModel == 'checked'){
		        $('#' + filter.name).prop('checked', false);
		        filter.FilterValueModel = 'unchecked';
		    }
		    else if(filter.FilterValueModel== 'unchecked'){
		        $('#' + filter.name).prop('indeterminate', true);
		        filter.FilterValueModel = 'indeterminate';
		    }
		    DataTableOnFilter();
		} );
		$('div.GTraduzioniGrid_MultipleColumnFilter').each(function(){
		    $compile(this)($scope);
		} );
	}
	function SetFixedColumns(nLeftFixedColumns,	nRightFixedColumns)
	{
		var wrapper = $('#GTraduzioniGrid_wrapper');
		$(wrapper).css('max-width', '100%');
		var table = $('#GTraduzioniGrid')
		var groups = table.children()[0].children[0].children;
		var headers = table.children()[0].children[1].children;
		var filters = table.children()[0].children[2].children;
		var rows = table.children()[1].children;
		var fixedCss = {
		    'position': 'sticky',
		    'z-index': '1',
		    'background' : 'white'
		};
		var unFixedCss = {
		    'position': 'relative',
		    'z-index': '0',
		    'background' : 'white',
		    'left': 'unset',
		    'right': 'unset'
		};
		var maxFixWidth = (nLeftFixedColumns==0 || nRightFixedColumns==0) ? 0.75 * $(window).innerWidth() : 0.5 * $(window).innerWidth();
		var overflow = false;
		// Left Fix
		if (nLeftFixedColumns>0 && groups.length>0) // Left Column Group
		{
		    $(groups[0]).css(fixedCss);
		    $(groups[0]).css('left', '0px');
		    var lSpan = parseInt($(groups[0]).attr('colspan'));
		    for (var ig=1; ig<groups.length && lSpan>nLeftFixedColumns && !overflow; ig++){
		        if (lSpan < nLeftFixedColumns) {
		            var left = parseFloat($(groups[ig-1]).css('left')) + $(groups[ig-1]).innerWidth();
		            if (left+$(groups[ig]).innerWidth() < maxFixWidth) {
		                var leftp = left/$(wrapper).innerWidth()*100
		                $(groups[ig]).css(fixedCss);
		                $(groups[ig]).css('left', leftp+'%');
		                lSpan += parseInt($(groups[ig]).attr('colspan'));
		            } else {
		                $(groups[ig]).css(unFixedCss);
		                overflow=true;
		            }
		        }
		    }
		}
		overflow = false;
		for (var ih=0; ih < headers.length && ih < nLeftFixedColumns && !overflow; ih++) // Left headers fix
		{
		    var left = (ih == 0) ? 0 : parseFloat($(headers[ih-1]).css('left')) + $(headers[ih-1]).innerWidth();
		    console.log(left)
		    if (left+$(headers[ih]).innerWidth() < maxFixWidth) {
		        var leftp = left/$(wrapper).innerWidth()*100
		        $(headers[ih]).css(fixedCss);
		        $(headers[ih]).css('left', leftp+'%');
		        $(filters[ih]).css(fixedCss);
		        $(filters[ih]).css('left', leftp+'%');
		    } else {
		        $(headers[ih]).css(unFixedCss);
		        $(filters[ih]).css(unFixedCss);
		        overflow=true;
		    }
		}
		for (var ir=0; ir < rows.length; ir++) // Left data fix
		{
		    overflow = false;
		    var row = rows[ir];
		    for (var id = 0; id < nLeftFixedColumns && !overflow; id++)
		    {
		        var left = (id == 0) ? 0 : parseFloat($(row.children[id-1]).css('left')) + $(row.children[id-1]).innerWidth();
		        if (left+$(row.children[id]).innerWidth() < maxFixWidth) {
		            var leftp = left/$(wrapper).innerWidth()*100
		            $(row.children[id]).css(fixedCss);
		            $(row.children[id]).css('left', leftp+'%');
		        } else {
		            $(row.children[id]).css(unFixedCss);
		            overflow=true;
		        }
		    }
		}
		// Right Fix
		overflow = false;
		if (nRightFixedColumns>0 && groups.length>0) // Right Column Group
		{
		    $(groups[groups.length-1]).css(fixedCss);
		    $(groups[groups.length-1]).css('right', '0px');
		    var rSpan = parseInt($(groups[groups.length-1]).attr('colspan'));
		    for (var ig=groups.length-2; ig>=0 && rSpan>nRightFixedColumns && !overflow; ig++){
		        if (rSpan < nRightFixedColumns) {
		            var right = parseFloat($(groups[ig+1]).css('right')) + $(groups[ig+1]).innerWidth();
		            if (right+$(groups[ig]).innerWidth() < maxFixWidth) {
		                var rightp = right/$(wrapper).innerWidth()*100
		                $(groups[ig]).css(fixedCss);
		                $(groups[ig]).css('right', rightp+'%');
		                lSpan += parseInt($(groups[ig]).attr('colspan'));
		            } else {
		                $(groups[ig]).css(unFixedCss);
		                overflow = true;
		            }
		        }
		    }
		}
		overflow = false;
		for (var ih=headers.length-1; ih >=0 && headers.length-1 - ih < nRightFixedColumns && !overflow; ih--) // Right headers fix
		{
		    var right = (ih == headers.length-1) ? 0 : parseFloat($(headers[ih+1]).css('right')) + $(headers[ih+1]).innerWidth();
		    if (right+$(headers[ih]).innerWidth() < maxFixWidth) {
		        var rightp = right/$(wrapper).innerWidth()*100
		        $(headers[ih]).css(fixedCss);
		        $(headers[ih]).css('right', rightp+'%');
		        $(filters[ih]).css(fixedCss);
		        $(filters[ih]).css('right', rightp+'%');
		    } else {
		        $(headers[ih]).css(unFixedCss);
		        $(filters[ih]).css(unFixedCss);
		        overflow = true;
		    }
		}
		for (var ir=0; ir < rows.length; ir++) // Right data fix
		{
		    overflow = false;
		    var row = rows[ir];
		    for (var id=row.children.length-1; row.children.length-1 - id < nRightFixedColumns && !overflow; id--)
		    {
		        var right = (id == headers.length-1) ? 0 : parseFloat($(row.children[id+1]).css('right')) + $(row.children[id+1]).innerWidth();
		        if (right+$(row.children[id]).innerWidth() < maxFixWidth) {
		            var rightp = right/$(wrapper).innerWidth()*100
		            $(row.children[id]).css(fixedCss);
		            $(row.children[id]).css('right', rightp+'%');
		        } else {
		            $(row.children[id]).css(unFixedCss);
		            overflow = true;
		        }
		    }
		}
	}
	function SetFiltersDefaultValues()
	{
		$scope.CurrentFilters = $scope.ComponentData.GridDataRequestParamsObj.Filters;
		if($scope.CurrentFilters != undefined && $scope.CurrentFilters != null && $scope.CurrentFilters.length>0){
		    $scope.IsFilterDefaultValue = true;
		}
		angular.forEach($scope.CurrentFilters, function(item, key){
		    for(var i = 0; i < item.FilterDetails.length; i++) {
		        var filter = $scope[item.FilterDetails[i].Name];
		        if(filter != undefined) {
		            switch(filter.filterType) {
		                case 'text':
		                    $('#' + filter.name).val(item.FilterDetails[i].FilterValue);
		                    break;
		                case 'dropdown':
		                    filter.FilterValueModel = { item: null };
		                    if(item.FilterDetails[i].FilterValue != null && item.FilterDetails[i].FilterValue != '') {
		                        filter.FilterValueModel.item = { key: item.FilterDetails[i].FilterValue, value: '...' };
		                    }
		                    for(var j = 0; filter.filterItems != undefined && j < filter.filterItems.length; j++) {
		                        if(filter.filterItems[j].key == item.FilterDetails[i].FilterValue) {
		                            filter.FilterValueModel.item = filter.filterItems[j];
		                        }
		                    }
		                    break;
		                case 'datetime':
		                    $('#' + filter.name).val($filter('date')(new Date(item.FilterDetails[i].FilterValue.Year, item.FilterDetails[i].FilterValue.Month - 1, item.FilterDetails[i].FilterValue.Day, item.FilterDetails[i].FilterValue.Hour, item.FilterDetails[i].FilterValue.Minute, item.FilterDetails[i].FilterValue.Second), 'dd/MM/yyyy HH:mm:ss'));
		                    break;
		                case 'date':
		                    $('#' + filter.name).val($filter('date')(new Date(item.FilterDetails[i].FilterValue.Year, item.FilterDetails[i].FilterValue.Month - 1, item.FilterDetails[i].FilterValue.Day), 'dd/MM/yyyy'));
		                    break;
		                case 'time':
		                    $('#' + filter.name).val($filter('date')(new Date(new Date().getFullYear(), new Date().getMonth()+1, new Date().getDate(), item.FilterDetails[i].FilterValue.Hour, item.FilterDetails[i].FilterValue.Minute, item.FilterDetails[i].FilterValue.Second), 'HH:mm:ss'));
		                    break;
		                case 'checkbox':
		                    $('#' + filter.name).prop('indeterminate', false);
		                    if(item.FilterDetails[i].FilterValue) {
		                        filter.FilterValueModel = 'checked';
		                        $('#' + filter.name).prop('checked', true);
		                    }
		                    else {
		                        item.FilterDetails[i].FilterValueModel = 'unchecked';
		                        $('#' + filter.name).prop('checked', false);
		                    }
		                    break;
		            }
		        }
		    }
		});
	}
	function SetSortDefaultValues()
	{
		$scope.CurrentSortInformation = $scope.ComponentData.GridDataRequestParamsObj.Sort;
		if($scope.ComponentData.GridDataRequestParamsObj.Sort != null && $scope.ComponentData.GridDataRequestParamsObj.Sort.SortColumn != null && $scope.ComponentData.GridDataRequestParamsObj.Sort.SortDirection != null)
		{
		    var order = [];
		    for(var i = 0; i < $scope.GridColumns.length; i++) {
		        if($scope.GridColumns[i].data == $scope.ComponentData.GridDataRequestParamsObj.Sort.SortColumn) {
		            order.push(i);
		            order.push($scope.ComponentData.GridDataRequestParamsObj.Sort.SortDirection);
		            $('#GTraduzioniGrid').dataTable().fnSort([order]);
		        }
		    }
		}
	}
	function SetPagerDefaultValues()
	{
		$scope.CurrentPageIndex = $scope.ComponentData.GridDataRequestParamsObj.PageIndex + 1;
		$scope.PageSize = $scope.ComponentData.GridDataRequestParamsObj.PageSize;
		for(var i = 0; i < $scope.ItemsPerPageOptions.length; i++) {
		    if($scope.ItemsPerPageOptions[i].number == $scope.PageSize) {
		        $scope.SelectedItemsPerPageObject.Value = $scope.ItemsPerPageOptions[i];
		        $scope.ItemsPerPageOptions.selected = $scope.SelectedItemsPerPageObject;
		    }
		}
		UpdateGridSummaryData();
	}
	function InitColumnsHeaderEntries()
	{
		for(var i = 0; i < $scope.GridColumns.length; i++) {
		$($('#GTraduzioniGrid').DataTable().columns(i).header()).html($scope.GridColumns[i].text);
		}
	}
	function UpdateGridSummaryData()
	{
		$scope.GridSummaryData.Begin = ((parseInt($scope.CurrentPageIndex) - 1) * $scope.PageSize);
		$scope.GridSummaryData.End = $scope.GridSummaryData.Begin + $scope.PageSize;
		if($scope.GridSummaryData.End > $scope.ComponentData.GridSourceData.TotalRowsCount) {
		    $scope.GridSummaryData.End = $scope.ComponentData.GridSourceData.TotalRowsCount;
		}
		$scope.PaginationTotalRowsCount = $scope.ComponentData.GridSourceData.TotalRowsCount;
		$scope.GridSummaryData.TotalRowsCountDescr = '' + $scope.PaginationTotalRowsCount;
		if($scope.ComponentData.GridSourceData.AreRowsLimited) {
		    $scope.GridSummaryData.TotalRowsCountDescr += '+';
		}
		$scope.PreviousPageIndex = $scope.CurrentPageIndex;
	}
	function DataTableOnFilter()
	{
		$scope.CurrentFilters = PagesDataTableHelperService.GetFiltersData($scope.GridColumns, 'GTraduzioniGrid');
		$scope.ShowLoaderComponent();
		$scope.AddLoaderPromise(UpdateGridData());
		$scope.HideLoaderComponent();
	}
	function UpdateGridData()
	{
		var updateGridDataPromise = ComponentsDataHelperService.getGridDataSource('api/CursorGTraduzioni', parseInt($scope.CurrentPageIndex) - 1, $scope.PageSize, $scope.CurrentSortInformation, $scope.CurrentFilters, $scope.ComponentData.GridSourceData.CurrentItemsList, $scope.ComponentShowMode);
		updateGridDataPromise.then(function (result) {
		    $scope.SettingGridData = true;
		    $scope.ComponentRTIs.CurrentRowsRTI = result.CurrentRowsRTI;
		    $scope.ComponentData.GridSourceData = result.GridSourceData;
		    $scope.CurrentPageIndex = result.PageIndex + 1;
		    $scope.ITEMCurrent = null;
		    if($scope.ComponentData.GridSourceData.CurrentItemsList.length != 0) {
		        $scope.ITEMCurrent = $scope.ComponentData.GridSourceData.CurrentItemsList[0];
		    }
		    SetGridDataSource();
		    $scope.SettingGridData = false;
		});
		return updateGridDataPromise;
	}
	function DataTableCellClickOnConfirm(eventArgs, column, commandName)
	{
		$scope.ShowLoaderComponent();
		var cellClickPromise = ComponentsNavigationHelperService.cellClick('api/CursorGTraduzioni', eventArgs.args.rowindex, column.name, commandName);
		$scope.AddLoaderPromise(cellClickPromise);
		cellClickPromise.then(function (result) {
		    if (result != undefined && result.status === 200 && result.data.ActionResultStr == 'UpdateComponent' && result.data.CursorName == 'CursorGTraduzioni') {
		        $scope.AddLoaderPromise(UpdateGridData());
		    }
		    $scope.LoaderPromisesList.InTheEndDoAction(function () {
		        TraduzioniPageBSNFactory.Page = $scope.GetPageForBsn($scope.ComponentRTIs.GridColumnsRTI);
		        TraduzioniPageBSNFactory.On_AfterCommand('CursorGTraduzioni', column.commandName, column.name, eventArgs.args.rowindex - $scope.GridSummaryData.Begin);
		        $scope.SafeApply();
		        TraduzioniPageBSNFactory.Page = null;
		    });
		});
		$scope.HideLoaderComponent();
	}
	function ChangePage()
	{
		$scope.PendingChangesPromisesList.InTheEndDoAction(function () {
		UpdateGridSummaryData();
		$scope.ShowLoaderComponent();
		$scope.AddLoaderPromise(UpdateGridData());
		$scope.HideLoaderComponent();
		})
	}
	function ResetGridData()
	{
		$('#GTraduzioniGrid').dataTable().fnSort([]);
		PagesDataTableHelperService.ResetFilterRow($scope.GridColumns, 'GTraduzioniGrid');
		$scope.CurrentPageIndex = 1;
		$scope.PageSize = $scope.DefaultPageSize;
		$scope.CurrentSortInformation = null;
		$scope.CurrentFilters = null;
		var resetGridDataPromise = ComponentsDataHelperService.resetGridDataSource('api/CursorGTraduzioni');
		resetGridDataPromise.then(function (result) {
		    $scope.SettingGridData = true;
		    $scope.ComponentRTIs.CurrentRowsRTI = result.CurrentRowsRTI;
		    $scope.ComponentData.GridSourceData = result.GridSourceData;
		    $scope.ComponentData.GridDataRequestParamsObj = result.GridDataRequestParamsObj;
		    SetGridDataSource();
		    SetFiltersDefaultValues();
		    SetSortDefaultValues();
		    SetPagerDefaultValues();
		    $scope.SettingGridData = false;
		});
		return resetGridDataPromise;
	}
	function RestoreGridData()
	{
		$('#GTraduzioniGrid').dataTable().fnSort([]);
		PagesDataTableHelperService.ResetFilterRow($scope.GridColumns, 'GTraduzioniGrid');
		$scope.CurrentPageIndex = 1;
		$scope.PageSize = $scope.DefaultPageSize;
		$scope.CurrentSortInformation = null;
		$scope.CurrentFilters = null;
		var restoreGridDataPromise = ComponentsDataHelperService.restoreGridDataSource('api/CursorGTraduzioni');
		restoreGridDataPromise.then(function (result) {
		    $scope.SettingGridData = true;
		    $scope.ComponentRTIs.CurrentRowsRTI = result.CurrentRowsRTI;
		    $scope.ComponentData.GridSourceData = result.GridSourceData;
		    $scope.ComponentData.GridDataRequestParamsObj = result.GridDataRequestParamsObj;
		    $scope.ComponentData.FiltersDataSources = result.FiltersDataSources;
		    SetGridDataSource();
		    SetFiltersDataSources();
		    SetFiltersDefaultValues();
		    SetSortDefaultValues();
		    SetPagerDefaultValues();
		    $scope.SettingGridData = false;
		});
		return restoreGridDataPromise;
	}
	function setFocus()
	{
		var trList = document.getElementsByTagName('tr');
		var tdFocused = false;
		for (var i = 2; i < trList.length; ++i) {
		    var tdList = trList[i].cells;
		    angular.forEach(tdList, function(td) {
		        if(td._DT_CellIndex && !tdFocused){
		            var gridColumn = $scope.GridColumns[td._DT_CellIndex.column];
		            if($scope.ComponentData.GridSourceData.CurrentItemsList[td._DT_CellIndex.row] != undefined &&
		                $scope.ResponsiveKam4DatatableControl.isCellEditable(gridColumn, $scope.ComponentData.GridSourceData.CurrentItemsList[td._DT_CellIndex.row].PrimaryKeyValue)) {
		                    $scope.ResponsiveKam4DatatableControl.ResetCurrentEditingCellIndexes();
		                    if(!td.firstElementChild.className.includes('checkbox') && !td.firstElementChild.className.includes('linkcell')){
		                        td.click();
		                    }
		                    tdFocused = true;
		            }
		        }
		    });
		    if(tdFocused)
		        break;
		}
	}
	$scope.IsButtonNewVisible = function ()
	{
		if ($scope.ComponentShowMode === 'browse' && $scope.ComponentRTIs != null && $scope.ComponentRTIs.ComponentRTI.CanRead === true && $scope.ComponentRTIs.ComponentRTI.CanInsert === true) {
		return true;
		}
		return false;
	}
	$scope.ButtonNewClick = function ()
	{
		ComponentsNavigationHelperService.buttonNewClick('api/CursorGTraduzioni');
	}
	$scope.IsButtonEditVisible = function ()
	{
		if ($scope.ComponentShowMode === 'browse' && $scope.ITEMCurrent != null && $scope.ComponentRTIs.ComponentRTI.CanRead === true && $scope.ComponentRTIs.ComponentRTI.CanEdit === true) {
		return true;
		}
		return false;
	}
	$scope.ButtonEditClick = function ()
	{
		ComponentsNavigationHelperService.buttonEditClick('api/CursorGTraduzioni');
	}
	$scope.IDSTRINGGetLookupItemsBySearchText = function (searchText, rowIndex)
	{
		$scope.ITEMCurrent = $scope.ComponentData.GridSourceData.CurrentItemsList[rowIndex];
		return ComponentsDataHelperService.getLookupItemsBySearchText('api/CursorGTraduzioni', 'IDSTRING', searchText, $scope.ITEMCurrent).then(function (result) {
		    return result;
		});
	}
	$scope.IDLANGUAGEGetLookupItemsBySearchText = function (searchText, rowIndex)
	{
		$scope.ITEMCurrent = $scope.ComponentData.GridSourceData.CurrentItemsList[rowIndex];
		return ComponentsDataHelperService.getLookupItemsBySearchText('api/CursorGTraduzioni', 'IDLANGUAGE', searchText, $scope.ITEMCurrent).then(function (result) {
		    return result;
		});
	}
	$scope.IsComponentReadonly = function ()
	{
		if ($scope.ComponentShowMode === 'browse') {
		return true;
		}
		return false;
	}
	$scope.IsButtonSaveVisible = function ()
	{
		if ($scope.ShowPageParams.CursorName == 'CursorGTraduzioni' &&
		$scope.ComponentRTIs != null &&
		$scope.ComponentRTIs.ComponentRTI.CanRead === true &&
		(
		    ($scope.ComponentShowMode === 'edit' && $scope.ComponentRTIs.ComponentRTI.CanEdit === true) ||
		    ($scope.ComponentShowMode === 'insert' && $scope.ComponentRTIs.ComponentRTI.CanInsert === true)
		)) {
		return true;
		}
		return false;
	}
	$scope.LazyLookupInsertNewItems = function ()
	{
	}
	$scope.ButtonSaveClick = function ()
	{
		if($scope.ResponsiveKam4DatatableControl.Validate()) {
		$scope.IsSaveEvent = true;
		$scope.ShowLoaderComponent();
		$scope.ITEMCurrent = PagesFormHelperService.EncodeHTMLText($scope.ITEMCurrent);
		$scope.PendingChangesPromisesList.InTheEndDoAction(function () {
		    var buttonSaveClickPromise = ComponentsNavigationHelperService.buttonSaveClick('api/CursorGTraduzioni', $scope.ComponentData.GridSourceData.CurrentItemsList);
		    $scope.AddLoaderPromise(buttonSaveClickPromise);
		    buttonSaveClickPromise.then(function (result) {
		        if (result != undefined && result.status === 200 && result.data.ActionResultStr == 'UpdateComponent' && result.data.CursorName == 'CursorGTraduzioni') {
		            $scope.AddLoaderPromise(LoadComponentData());
		            $scope.IsSaveEvent = false;
		    }
		    });
		    $scope.ClearPendingChangesPromisesList();
		    $scope.HideLoaderComponent();
		});
		}
	}
	$scope.IsButtonSaveAndNewVisible = function ()
	{
		if ($scope.ShowPageParams.CursorName == 'CursorGTraduzioni' &&
		$scope.ComponentRTIs != null &&
		$scope.ComponentRTIs.ComponentRTI.CanRead === true &&
		(
		    ($scope.ComponentShowMode === 'insert' && $scope.ComponentRTIs.ComponentRTI.CanInsert === true && $scope.ComponentRTIs.ComponentRTI.AllowSaveAndNew === true)
		)) {
		return true;
		}
		return false;
	}
	$scope.ButtonSaveAndNewClick = function ()
	{
		if($scope.ResponsiveKam4DatatableControl.Validate()) {
		$scope.IsSaveEvent = true;
		$scope.ShowLoaderComponent();
		$scope.ITEMCurrent = PagesFormHelperService.EncodeHTMLText($scope.ITEMCurrent);
		$scope.PendingChangesPromisesList.InTheEndDoAction(function () {
		    var buttonSaveClickPromise = ComponentsNavigationHelperService.buttonSaveAndNewClick('api/CursorGTraduzioni', $scope.ComponentData.GridSourceData.CurrentItemsList);
		    $scope.AddLoaderPromise(buttonSaveClickPromise);
		    buttonSaveClickPromise.then(function (result) {
		        if (result != undefined && result.status === 200 && result.data.ActionResultStr == 'UpdateComponent' && result.data.CursorName == 'CursorGTraduzioni') {
		            $scope.AddLoaderPromise(LoadComponentData());
		            $scope.IsSaveEvent = false;
		    }
		    });
		    $scope.ClearPendingChangesPromisesList();
		    $scope.HideLoaderComponent();
		});
		}
	}
	$scope.IsButtonCancelVisible = function ()
	{
		if ($scope.ShowPageParams.CursorName == 'CursorGTraduzioni' &&
		$scope.ComponentRTIs != null &&
		$scope.ComponentRTIs.ComponentRTI.CanRead === true &&
		(
		    ($scope.ComponentShowMode === 'edit' && $scope.ComponentRTIs.ComponentRTI.CanEdit === true) ||
		    ($scope.ComponentShowMode === 'insert' && $scope.ComponentRTIs.ComponentRTI.CanInsert === true)
		)) {
		return true;
		}
		return false;
	}
	$scope.ButtonCancelClick = function ()
	{
		if ($scope.CheckPendingChanges()) {
		$scope.OkCancelPopupFactory.Show(GlobalEntriesFactory.GlobalEntries.ApplicationEntries.WarningEntry, GlobalEntriesFactory.GlobalEntries.ApplicationEntries.PendingChangesEntry).then(function(resultCode) {
		    if (resultCode == 'OK') {
		        $scope.IsCancelEvent = true;
		        ComponentsNavigationHelperService.buttonCancelClick('api/CursorGTraduzioni');
		    }
		});
		} else {
		$scope.IsCancelEvent = true;
		ComponentsNavigationHelperService.buttonCancelClick('api/CursorGTraduzioni');
		}
	}
	$scope.Init = function ()
	{
		$scope.RegisterComponent(this);
	}
	$scope.PerformComponentInit = function ()
	{
		if ($scope.ShowPageParams.CursorName == 'CursorGTraduzioni') {
		$scope.ComponentShowMode = $scope.ShowPageParams.Action;
		}
		else {
		$scope.ComponentShowMode = 'browse';
		}
		var promisesList = new PromisesListFactory.PromisesList();
		promisesList.Add(LoadComponentData());
		AddPerformComponentInitPromises(promisesList);
		promisesList.InTheEndDoAction(function () {
		DoBeforeLoadDone();
		$scope.HideLoaderComponent();
		$scope.ComponentLoadDoneDef.resolve();
		if($scope.ComponentShowMode == 'edit' || $scope.ComponentShowMode == 'insert'){
		promisesList = new PromisesListFactory.PromisesList();
		promisesList.Add($scope.AllComponentsLoadedDef.promise);
		promisesList.InTheEndDoAction(function () {
		    setFocus();
		});
		}
		});
	}
	$scope.IsTitleVisible = function ()
	{
		if($scope.ComponentData != null && $scope.ComponentData.ComponentEntries.ComponentTitleEntry != undefined && $scope.ComponentData.ComponentEntries.ComponentTitleEntry != null && $scope.ComponentData.ComponentEntries.ComponentTitleEntry != '') {
		return true;
		}
		return false;
	}
	$scope.IsActionButtonDisabled = function ()
	{
		return false;
	}
	$scope.GetPageForBsn = function (componentRTI)
	{
		var pageObj = {};
		var componentRTISubcomponentsNames = Object.getOwnPropertyNames(componentRTI);
		for(var i = 0; i < componentRTISubcomponentsNames.length; i++) {
		    var componentRTISubcomponentName = componentRTISubcomponentsNames[i];
		    pageObj[componentRTISubcomponentName] = componentRTI[componentRTISubcomponentName];
		}
		pageObj.CursorGTraduzioni = $scope.ITEMCurrent;
		pageObj.CursorGTraduzioniCurrentItemsList = $scope.ComponentData.GridSourceData.CurrentItemsList;
		return pageObj;
	}
	$scope.CallDataTableOnFilter = function ()
	{
		DataTableOnFilter();
	}
	$scope.DataTableOnCellClick = function (eventArgs)
	{
		$scope.ITEMCurrent = $scope.ComponentData.GridSourceData.CurrentItemsList[eventArgs.args.rowindex];
		var column = $scope.GridColumns[eventArgs.args.columnindex];
		if ($scope.ComponentShowMode != 'edit' && $scope.ComponentShowMode != 'insert' && column.raiseOnClick === true) {
		    if (column.rtComponentCSClass == 'RTPopupColumn') {
		        CommandPopupFactory.Show('GTraduzioniGrid', column.name, column.popupDef !== null ? column.popupDef : $scope.ITEMCurrent.FieldsData[column.name+'RTIPopupDef']).then(function (commandName) {
		            if (commandName) {
		                DataTableCellClickOnConfirm(eventArgs, column, commandName);
		            }
		        });
		    }
		    else if (column.onClickConfirmRequired === undefined || column.onClickConfirmRequired == null || column.onClickConfirmRequired === false) {
		        DataTableCellClickOnConfirm(eventArgs, column, column.commandName);
		    }
		    else {
		        OkCancelPopupFactory.Show(null, column.onClickConfirmMessage).then(function (resultCode) {
		            if (resultCode == 'OK') {
		                DataTableCellClickOnConfirm(eventArgs, column, column.commandName);
		            }
		        });
		    }
		}
	}
	$scope.OnSelectItemsPerPage = function (itemsPerPageSelected)
	{
		$scope.PageSize = itemsPerPageSelected.number;
		var dataTableRTI = $('#GTraduzioniGrid').DataTable();
		dataTableRTI.page.len($scope.PageSize);
		ChangePage();
	}
	$scope.OnPagerIndexInputValueChanged = function ()
	{
		if($scope.ResponsiveKam4DatatableControl.Validate()) {
		var maxPageIndex = parseInt(($scope.ComponentData.GridSourceData.TotalRowsCount / $scope.PageSize) + 1);
		if(isNaN(parseInt($scope.CurrentPageIndex)) || parseInt($scope.CurrentPageIndex) > maxPageIndex || parseInt($scope.CurrentPageIndex) <= 0) {
		    $scope.CurrentPageIndex = $scope.PreviousPageIndex;
		    return;
		}
		ChangePage();
		}
		else {
		$scope.CurrentPageIndex = $scope.PreviousPageIndex;
		}
	}
	$scope.OnPaginationChange = function ()
	{
		if($scope.ResponsiveKam4DatatableControl.Validate()) {
		ChangePage();
		}
		else {
		$scope.CurrentPageIndex = $scope.PreviousPageIndex;
		}
	}
	$scope.ButtonExportXLSClick = function ()
	{
		$scope.ShowLoaderComponent();
		$scope.AddLoaderPromise(ComponentsNavigationHelperService.buttonExportXLSClick('api/CursorGTraduzioni'));
		$scope.HideLoaderComponent();
	}
	$scope.DataTableOnDetailCellClick = function (cellIndex, rowIndex)
	{
		var visibleColumnIndex = -1;
		var columnIndex = -1;
		for(var i = 0; i < $scope.GridColumns.length && columnIndex == -1; i++) {
		    if(!$scope.GridColumns[i].hidden) {
		        visibleColumnIndex++;
		        if(visibleColumnIndex == cellIndex) {
		            columnIndex = i;
		        }
		    }
		}
		$scope.DataTableOnCellClick({
		    args: {
		        columnindex: columnIndex,
		        rowindex: rowIndex
		    }
		});
	}
	$scope.DataTableOnTitleCellClick = function (columnIndex)
	{
		if(!$scope.SettingGridData) {
		var DtTitle =  $($('.grid-columns-col-idx-'+columnIndex)[0]);
		var dir = (DtTitle.hasClass('sorting') || DtTitle.hasClass('sorting_desc')) ? 'asc' : 'desc';
		$scope.CurrentSortInformation = {
		    SortColumn: $scope.GridColumns[columnIndex].data,
		    SortDirection: dir
		};
		$('#GTraduzioniGrid').DataTable().order([columnIndex, dir]);
		$scope.ShowLoaderComponent();
		$scope.AddLoaderPromise(UpdateGridData());
		$scope.HideLoaderComponent();
		}
	}
	$scope.IsButtonRestoreVisible = function ()
	{
		if ($scope.ComponentShowMode === 'browse' && $scope.ComponentData != null && $scope.ComponentData.HasDefaultFilters) {
		return true;
		}
		return false;
	}
	$scope.ButtonResetGridClick = function ()
	{
		$scope.ShowLoaderComponent();
		$scope.AddLoaderPromise(ResetGridData());
		$scope.HideLoaderComponent();
	}
	$scope.ButtonRestoreGridClick = function ()
	{
		$scope.ShowLoaderComponent();
		$scope.AddLoaderPromise(RestoreGridData());
		$scope.HideLoaderComponent();
	}
	$scope.IsPagerIndexInputDisabled = function ()
	{
		if(!$scope.ResponsiveKam4DatatableControl.IsValid()) {
		return true;
		}
		return false;
	}
	$scope.IsPaginationControlDisabled = function ()
	{
		if(!$scope.ResponsiveKam4DatatableControl.IsValid()) {
		return true;
		}
		return false;
	}
	$scope.FilterDatePickerOnChange = function (columnFilter)
	{
		$('#' + columnFilter.name).val(columnFilter.value)
		DataTableOnFilter();
	}
	$scope.FilterDateTimePickerOnChange = function (columnFilter)
	{
		$('#' + columnFilter.name).val(columnFilter.value)
		DataTableOnFilter();
	}
	$scope.FilterTimePickerOnChange = function (columnFilter)
	{
		$('#' + columnFilter.name).val(columnFilter.value)
		DataTableOnFilter();
	}
	$scope.FilterDatePickerOnFocus = function (columnFilter)
	{
		PagesHelperService.DataDateTimePickerOnFocus($('#'+columnFilter.name));
	}
	$scope.FilterDatePickerOnBlur = function (columnFilter)
	{
		PagesHelperService.DataDateTimePickerOnBlur($('#'+columnFilter.name));
	}
	$scope.FilterDateTimePickerOnFocus = function (columnFilter)
	{
		PagesHelperService.DataDateTimePickerOnFocus($('#'+columnFilter.name));
	}
	$scope.FilterDateTimePickerOnBlur = function (columnFilter)
	{
		PagesHelperService.DataDateTimePickerOnBlur($('#'+columnFilter.name));
	}
	$scope.FilterTimePickerOnFocus = function (columnFilter)
	{
		PagesHelperService.DataDateTimePickerOnFocus($('#'+columnFilter.name));
	}
	$scope.FilterTimePickerOnBlur = function (columnFilter)
	{
		PagesHelperService.DataDateTimePickerOnBlur($('#'+columnFilter.name));
	}
	$scope.MultiFilterDatePickerOnChange = function (columnFilter)
	{
		$('#' + columnFilter.name).val(columnFilter.value)
		DataTableOnFilter();
	}
	$scope.MultiFilterDateTimePickerOnChange = function (columnFilter)
	{
		$('#' + columnFilter.name).val(columnFilter.value)
		DataTableOnFilter();
	}
	$scope.MultiFilterTimePickerOnChange = function (columnFilter)
	{
		$('#' + columnFilter.name).val(columnFilter.value)
		DataTableOnFilter();
	}
	$scope.MultiFilterDatePickerOnFocus = function (columnFilter)
	{
		PagesHelperService.DataDateTimePickerOnFocus($('#'+columnFilter.name));
	}
	$scope.MultiFilterDatePickerOnBlur = function (columnFilter)
	{
		PagesHelperService.DataDateTimePickerOnBlur($('#'+columnFilter.name));
	}
	$scope.MultiFilterDateTimePickerOnFocus = function (columnFilter)
	{
		PagesHelperService.DataDateTimePickerOnFocus($('#'+columnFilter.name));
	}
	$scope.MultiFilterDateTimePickerOnBlur = function (columnFilter)
	{
		PagesHelperService.DataDateTimePickerOnBlur($('#'+columnFilter.name));
	}
	$scope.MultiFilterTimePickerOnFocus = function (columnFilter)
	{
		PagesHelperService.DataDateTimePickerOnFocus($('#'+columnFilter.name));
	}
	$scope.MultiFilterTimePickerOnBlur = function (columnFilter)
	{
		PagesHelperService.DataDateTimePickerOnBlur($('#'+columnFilter.name));
	}
	$scope.FilterComboBoxControlOnChange = function ()
	{
		DataTableOnFilter();
	}
	$scope.FilterComboBoxControlOnKeyDown = function (event, columnFilter)
	{
		if(event.originalEvent.code == 'ArrowDown' && $.trim($(event.currentTarget).find('input.form-control')[0].value) == '') {
		ComponentsDataHelperService.getFilterLookupItemsBySearchText('api/CursorGTraduzioni', columnFilter.name, '').then(function (result) {
		    columnFilter.filterItems = result;
		    columnFilter.FilterComboBoxShowNoChoice = columnFilter.filterItems.length == 0;
		});
		}
		if(event.originalEvent.code == 'Tab') {
		var inputControl = $('#' + columnFilter.name + ' input.form-control');
		if(columnFilter.filterItems.length == 0 && inputControl.val() != '') {
		    inputControl.val('');
		    columnFilter.FilterValueModel.item = null;
		    DataTableOnFilter();
		}
		columnFilter.FilterComboBoxShowNoChoice = false;
		}
	}
	$scope.FilterComboBoxControlOnSearch = function (searchText, columnFilter)
	{
		if(searchText == null || searchText == '') {
		columnFilter.filterItems = [];
		columnFilter.FilterComboBoxShowNoChoice = false;
		}
		else {
		ComponentsDataHelperService.getFilterLookupItemsBySearchText('api/CursorGTraduzioni', columnFilter.name, searchText).then(function (result) {
		    columnFilter.filterItems = result;
		    columnFilter.FilterComboBoxShowNoChoice = columnFilter.filterItems.length == 0;
		});
		}
	}
	$scope.FilterComboBoxControlOnOpenClose = function (isOpen, columnFilter)
	{
		if(!isOpen) {
		columnFilter.filterItems = [];
		columnFilter.FilterComboBoxShowNoChoice = false;
		}
	}
	$scope.FieldChangedManagedByImmediateFieldUpdate = function (fieldName, columnRTI, rowIndex)
	{
		var bsnOnComponentFieldChangeResult = {
		SendChangesToServer: true,
		ShowLoaderComponent: true
		};
		TraduzioniPageBSNFactory.Page = $scope.GetPageForBsn($scope.ComponentRTIs.GridColumnsRTI);
		TraduzioniPageBSNFactory.On_ComponentFieldChange('CursorGTraduzioni', fieldName, bsnOnComponentFieldChangeResult);
		$scope.SafeApply();
		TraduzioniPageBSNFactory.Page = null;
		if(columnRTI.ImmediateFieldUpdate &&
		(
		    bsnOnComponentFieldChangeResult == undefined ||
		       bsnOnComponentFieldChangeResult.SendChangesToServer == undefined ||
		       bsnOnComponentFieldChangeResult.SendChangesToServer
		)) {
		if(bsnOnComponentFieldChangeResult == undefined ||
		   bsnOnComponentFieldChangeResult.ShowLoaderComponent == undefined ||
		   bsnOnComponentFieldChangeResult.ShowLoaderComponent) {
		    $scope.ShowLoaderComponent();
		}
		ComponentsDataHelperService.fieldChanged('api/CursorGTraduzioni', fieldName, $scope.ITEMCurrent, $scope.ComponentRTIs).then(function(result) {
		    $scope.ComponentData.GridSourceData.CurrentItemsList[rowIndex] = result.CurrentItem;
		    $scope.ITEMCurrent = $scope.ComponentData.GridSourceData.CurrentItemsList[rowIndex];
		    $scope.ComponentRTIs = result.ComponentRTIs;
		    var dataTableRTI = $('#GTraduzioniGrid').DataTable();
		    dataTableRTI.rows().every( function ( ) {
		        if(this.index() == rowIndex) {
		            $(this.node()).find('input').each(function() {
		                $(this).unbind( 'blur' );
		            });
		            var oldDataRowState = this.data().DataRowState;
		            this.data($scope.ITEMCurrent);
		            this.data().DataRowState = oldDataRowState;
		            $scope.ResponsiveKam4DatatableControl.RedrawRow(this.node());
		        }
		    });
		    $scope.HideLoaderComponent();
		    var firstEditableTD = $scope.ResponsiveKam4DatatableControl.GetFirstEditableCell();
		    if(firstEditableTD != null) {
		        $scope.ResponsiveKam4DatatableControl.ResetCurrentEditingCellIndexes();
		        firstEditableTD.click();
		    }
		});
		return true;
		}
		return false;
	}
	$scope.CheckPendingChanges = function ()
	{
		if($scope.IsSaveEvent){
		return false;
		}
		if($scope.IsCancelEvent){
		return false;
		}
		if($scope.ComponentShowMode == 'insert'){
		if ($scope.AreEqualITEM($scope.ITEMCurrent, $scope.OriginalITEMCurrent)) {
		    return false;
		}
		else {
		    return true;
		}
		}
		if ($scope.AreEqualGridSourceData($scope.ModifiedGridSourceData, $scope.OriginalGridSourceData)) {
		return false;
		}
		else {
		return true;
		}
	}
	$scope.AreEqualGridSourceData = function (objectCurrent, objectOriginal)
	{
		for (var i in objectCurrent) {
		for(var j=0;j<objectCurrent[i].length;j++) {
		    for (var key in objectCurrent[i][j]) {
		        if (((objectCurrent[i][j][key] !== null && objectCurrent[i][j][key] !== '' && objectCurrent[i][j][key] !== undefined) ||
		            (objectOriginal[i][j][key] !== null && objectOriginal[i][j][key] !== '' && objectOriginal[i][j][key] !== undefined)) &&
		            !angular.equals(objectCurrent[i][j][key], objectOriginal[i][j][key])){
		                if(Object.prototype.toString.call(objectCurrent[i][j][key]) !== '[object Object]'){
		                    if(!objectCurrent[i][j][key]) objectCurrent[i][j][key] = '';
		                    if(!objectOriginal[i][j][key]) objectOriginal[i][j][key]= '';
		                    if(!angular.equals(objectCurrent[i][j][key].toString(), objectOriginal[i][j][key].toString())){
		                        return false
		                    }
		                    return true;
		                }
		                return false;
		        }
		    }
		}
		}
		return true;
	}
	$scope.AreEqualITEM = function (objectCurrent, objectOriginal)
	{
		for (var key in objectCurrent) {
		if (((objectCurrent[key] !== null && objectCurrent[key] !== '' && objectCurrent[key] !== undefined) ||
		    (objectOriginal[key] !== null && objectOriginal[key] !== '' && objectOriginal[key] !== undefined)) &&
		    !angular.equals(objectCurrent[key], objectOriginal[key])){
		        if(!angular.equals(objectCurrent[key], ComponentsDataHelperService.decodeHTMLText(objectOriginal[key]))){
		            if(Object.prototype.toString.call(objectCurrent[key]) !== '[object Object]'){
		                if(!objectCurrent[key]) objectCurrent[key] = '';
		                if(!objectOriginal[key]) objectOriginal[key] = '';
		                if(!angular.equals(objectCurrent[key].toString(), objectOriginal[key].toString())){
		                    return false
		                }
		                return true;
		            }
		            return false;
		        }
		}
		}
		return true;
	}
	PagesDataTableHelperService.SetColumnsWidth($scope.GridColumns);
	$scope.$watch('ComponentData.GridSourceData.CurrentItemsList', function() {
	    if ($scope.ComponentData != null && $scope.ComponentShowMode == 'edit'){
	        $scope.ModifiedGridSourceData[$scope.CurrentPageIndex] = angular.copy($scope.ComponentData.GridSourceData.CurrentItemsList);
	    }
	}, true);
	$('.page-container').on('scroll', () => {
	    PagesHelperService.PageContainerOnScroll();
	});
	$(window).on('resize', () => {
	    PagesHelperService.WindowOnResize();
	});
}
]);
