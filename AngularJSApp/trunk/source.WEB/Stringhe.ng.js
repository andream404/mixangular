'use strict'
var kamApp = angular.module('AngularJSApp');
kamApp.controller('StringhePageController',['$scope','$controller','StringhePageBSNFactory',function($scope,$controller,StringhePageBSNFactory)
{
	$controller('AbstractPageController', { $scope: $scope });
	$scope.Init = function () {
	    $scope.PageWebServiceUrl = 'api/StringhePage';
	    $scope.DefinedComponentsCount = 1;
	    $scope.Base_Init();
	    StringhePageBSNFactory.PageScope = $scope;
	    StringhePageBSNFactory.Page = null;
	    StringhePageBSNFactory.On_PageInit();
	};
}
]);
kamApp.controller('CursorGStringheController',['$scope','$q','$controller','$compile','$window','$timeout','AngularExceptionsService','ComponentsDataHelperService','ComponentsNavigationHelperService','ValidationHelperService','MenusHelperService','PromisesListFactory','SpeechToTextFactory','StringhePageBSNFactory','PagesHelperService','PagesDataTableHelperService','OkCancelPopupFactory','$sce','$filter','PagesFormHelperService','CommandPopupFactory','GlobalEntriesFactory',function($scope,$q,$controller,$compile,$window,$timeout,AngularExceptionsService,ComponentsDataHelperService,ComponentsNavigationHelperService,ValidationHelperService,MenusHelperService,PromisesListFactory,SpeechToTextFactory,StringhePageBSNFactory,PagesHelperService,PagesDataTableHelperService,OkCancelPopupFactory,$sce,$filter,PagesFormHelperService,CommandPopupFactory,GlobalEntriesFactory)
{
	$controller('AbstractComponentController', { $scope: $scope });
	$scope.CursorGStringheIDSTRINGFilter01 = { name: 'CursorGStringheIDSTRINGFilter01', fieldName: 'idstring'
	, isFilterValued: function() {
	    if($scope.CurrentFilters != undefined && $scope.CurrentFilters != null) {
	        for(var i = 0; i < $scope.CurrentFilters.length; i++) {
	            var currentFilter = $scope.CurrentFilters[i];
	            if(currentFilter.ColumnName == 'IDSTRING') {
	                for(var j = 0; j < currentFilter.FilterDetails.length; j++) {
	                    var currentFilterDetail = currentFilter.FilterDetails[j];
	                    if(currentFilterDetail.Name == 'CursorGStringheIDSTRINGFilter01') {
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
	$scope.IDSTRINGColumn = { name: 'IDSTRING', text: '', widthType: 'auto', xmlWidth: 0.00, defaultWidth: 85, areFiltersValued: function() {
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
	if(!$scope.FieldChangedManagedByImmediateFieldUpdate('IDSTRING', $scope.ComponentRTIs.GridColumnsRTI.CursorGStringheIDSTRINGRTI, rowIndex) &&
	   ComponentsDataHelperService.hasChangedFieldDependentFieldsValued('CursorGStringhe', 'IDSTRING', $scope.ComponentRTIs.GridColumnsRTI, $scope.ITEMCurrent)) {
	    $scope.ShowLoaderComponent();
	    dependentFieldsUpdates = ComponentsDataHelperService.getItemDependentFieldsUpdated('api/CursorGStringhe', 'IDSTRING', $scope.ITEMCurrent).then(function(result) {
	        $scope.ComponentData.GridSourceData.CurrentItemsList[rowIndex] = result;
	        $scope.ITEMCurrent = $scope.ComponentData.GridSourceData.CurrentItemsList[rowIndex];
	        var dataTableRTI = $('#GStringheGrid').DataTable();
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
	, data: 'IDSTRING', dbColumnType: 'system.int32', className: 'td-text-right', editortype: 'text', orderable: true, cellsdatastyle: 'n', rtComponentCSClass: 'RTColumn', render: function ( data, type, row, meta ) {
	var cellRT = ComponentsDataHelperService.getCellRT(row.PrimaryKeyValue, 'IDSTRING', $scope.ComponentRTIs.CurrentRowsRTI);
	var cellRenderer = PagesDataTableHelperService.getBaseBrowseCellRenderer(data, cellRT, $scope.ComponentShowMode, $scope.IDSTRINGColumn.cellsdatastyle , null);
	return cellRenderer;
	}, isReadonly: function() {
	if ($scope.IsComponentReadonly() === false &&
	!$scope.ComponentRTIs.GridColumnsRTI.CursorGStringheIDSTRINGRTI.GlobalReadOnly &&
	(
	    ($scope.ComponentShowMode === 'edit' && $scope.ComponentRTIs.GridColumnsRTI.CursorGStringheIDSTRINGRTI.CanEdit === true) ||
	    ($scope.ComponentShowMode === 'insert' && $scope.ComponentRTIs.GridColumnsRTI.CursorGStringheIDSTRINGRTI.CanInsert === true)
	)) {
	return false;
	}
	return true;
	}, filters: [ $scope.CursorGStringheIDSTRINGFilter01
	] }
	;
	$scope.CursorGStringheLABELFilter01 = { name: 'CursorGStringheLABELFilter01', fieldName: 'label'
	, isFilterValued: function() {
	    if($scope.CurrentFilters != undefined && $scope.CurrentFilters != null) {
	        for(var i = 0; i < $scope.CurrentFilters.length; i++) {
	            var currentFilter = $scope.CurrentFilters[i];
	            if(currentFilter.ColumnName == 'LABEL') {
	                for(var j = 0; j < currentFilter.FilterDetails.length; j++) {
	                    var currentFilterDetail = currentFilter.FilterDetails[j];
	                    if(currentFilterDetail.Name == 'CursorGStringheLABELFilter01') {
	                        return true;
	                    }
	                }
	            }
	        }
	    }
	    return false;
	}
	, filterType: 'text', filterCondition: 'CONTAINS' }
	;
	$scope.LABELColumn = { name: 'LABEL', text: '', widthType: 'fixed', xmlWidth: 180.00, defaultWidth: 425, areFiltersValued: function() {
	if($scope.CurrentFilters != undefined && $scope.CurrentFilters != null) {
	    for(var i = 0; i < $scope.CurrentFilters.length; i++) {
	        var currentFilter = $scope.CurrentFilters[i];
	        if(currentFilter.ColumnName == 'LABEL') {
	            return true;
	        }
	    }
	}
	return false;
	}, onFieldChange: function(rowIndex, updatedValue=true) {
	let dependentFieldsUpdates = Promise.resolve(false);
	$scope.ITEMCurrent = $scope.ComponentData.GridSourceData.CurrentItemsList[rowIndex];
	if(!$scope.FieldChangedManagedByImmediateFieldUpdate('LABEL', $scope.ComponentRTIs.GridColumnsRTI.CursorGStringheLABELRTI, rowIndex) &&
	   ComponentsDataHelperService.hasChangedFieldDependentFieldsValued('CursorGStringhe', 'LABEL', $scope.ComponentRTIs.GridColumnsRTI, $scope.ITEMCurrent)) {
	    $scope.ShowLoaderComponent();
	    dependentFieldsUpdates = ComponentsDataHelperService.getItemDependentFieldsUpdated('api/CursorGStringhe', 'LABEL', $scope.ITEMCurrent).then(function(result) {
	        $scope.ComponentData.GridSourceData.CurrentItemsList[rowIndex] = result;
	        $scope.ITEMCurrent = $scope.ComponentData.GridSourceData.CurrentItemsList[rowIndex];
	        var dataTableRTI = $('#GStringheGrid').DataTable();
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
	, data: 'LABEL', dbColumnType: 'system.string', textSize: '100', cellsformat: 'n', className: 'td-text-left', editortype: 'text', orderable: true, cellsdatastyle: null, rtComponentCSClass: 'RTColumn', render: function ( data, type, row, meta ) {
	var cellRT = ComponentsDataHelperService.getCellRT(row.PrimaryKeyValue, 'LABEL', $scope.ComponentRTIs.CurrentRowsRTI);
	var cellRenderer = PagesDataTableHelperService.getBaseBrowseCellRenderer(data, cellRT, $scope.ComponentShowMode, $scope.LABELColumn.cellsdatastyle , null);
	return cellRenderer;
	}, isReadonly: function() {
	if ($scope.IsComponentReadonly() === false &&
	!$scope.ComponentRTIs.GridColumnsRTI.CursorGStringheLABELRTI.GlobalReadOnly &&
	(
	    ($scope.ComponentShowMode === 'edit' && $scope.ComponentRTIs.GridColumnsRTI.CursorGStringheLABELRTI.CanEdit === true) ||
	    ($scope.ComponentShowMode === 'insert' && $scope.ComponentRTIs.GridColumnsRTI.CursorGStringheLABELRTI.CanInsert === true)
	)) {
	return false;
	}
	return true;
	}, filters: [ $scope.CursorGStringheLABELFilter01
	] }
	;
	$scope.CursorGStringheREFERENCEFilter01 = { name: 'CursorGStringheREFERENCEFilter01', fieldName: 'reference'
	, isFilterValued: function() {
	    if($scope.CurrentFilters != undefined && $scope.CurrentFilters != null) {
	        for(var i = 0; i < $scope.CurrentFilters.length; i++) {
	            var currentFilter = $scope.CurrentFilters[i];
	            if(currentFilter.ColumnName == 'REFERENCE') {
	                for(var j = 0; j < currentFilter.FilterDetails.length; j++) {
	                    var currentFilterDetail = currentFilter.FilterDetails[j];
	                    if(currentFilterDetail.Name == 'CursorGStringheREFERENCEFilter01') {
	                        return true;
	                    }
	                }
	            }
	        }
	    }
	    return false;
	}
	, filterType: 'text', filterCondition: 'CONTAINS' }
	;
	$scope.REFERENCEColumn = { name: 'REFERENCE', text: '', widthType: 'fixed', xmlWidth: 270.00, defaultWidth: 425, areFiltersValued: function() {
	if($scope.CurrentFilters != undefined && $scope.CurrentFilters != null) {
	    for(var i = 0; i < $scope.CurrentFilters.length; i++) {
	        var currentFilter = $scope.CurrentFilters[i];
	        if(currentFilter.ColumnName == 'REFERENCE') {
	            return true;
	        }
	    }
	}
	return false;
	}, onFieldChange: function(rowIndex, updatedValue=true) {
	let dependentFieldsUpdates = Promise.resolve(false);
	$scope.ITEMCurrent = $scope.ComponentData.GridSourceData.CurrentItemsList[rowIndex];
	if(!$scope.FieldChangedManagedByImmediateFieldUpdate('REFERENCE', $scope.ComponentRTIs.GridColumnsRTI.CursorGStringheREFERENCERTI, rowIndex) &&
	   ComponentsDataHelperService.hasChangedFieldDependentFieldsValued('CursorGStringhe', 'REFERENCE', $scope.ComponentRTIs.GridColumnsRTI, $scope.ITEMCurrent)) {
	    $scope.ShowLoaderComponent();
	    dependentFieldsUpdates = ComponentsDataHelperService.getItemDependentFieldsUpdated('api/CursorGStringhe', 'REFERENCE', $scope.ITEMCurrent).then(function(result) {
	        $scope.ComponentData.GridSourceData.CurrentItemsList[rowIndex] = result;
	        $scope.ITEMCurrent = $scope.ComponentData.GridSourceData.CurrentItemsList[rowIndex];
	        var dataTableRTI = $('#GStringheGrid').DataTable();
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
	, data: 'REFERENCE', dbColumnType: 'system.string', textSize: '250', cellsformat: 'n', className: 'td-text-left', editortype: 'text', orderable: true, cellsdatastyle: null, rtComponentCSClass: 'RTColumn', render: function ( data, type, row, meta ) {
	var cellRT = ComponentsDataHelperService.getCellRT(row.PrimaryKeyValue, 'REFERENCE', $scope.ComponentRTIs.CurrentRowsRTI);
	var cellRenderer = PagesDataTableHelperService.getBaseBrowseCellRenderer(data, cellRT, $scope.ComponentShowMode, $scope.REFERENCEColumn.cellsdatastyle , null);
	return cellRenderer;
	}, isReadonly: function() {
	if ($scope.IsComponentReadonly() === false &&
	!$scope.ComponentRTIs.GridColumnsRTI.CursorGStringheREFERENCERTI.GlobalReadOnly &&
	(
	    ($scope.ComponentShowMode === 'edit' && $scope.ComponentRTIs.GridColumnsRTI.CursorGStringheREFERENCERTI.CanEdit === true) ||
	    ($scope.ComponentShowMode === 'insert' && $scope.ComponentRTIs.GridColumnsRTI.CursorGStringheREFERENCERTI.CanInsert === true)
	)) {
	return false;
	}
	return true;
	}, filters: [ $scope.CursorGStringheREFERENCEFilter01
	] }
	;
	$scope.ComponentData = null
	;
	$scope.SpeechToTextFactory = SpeechToTextFactory
	;
	$scope.CursorGStringheItemSortColumn = { name: 'CursorGStringheItemSort', text: '', widthType: 'fixed', xmlWidth: 0.00, defaultWidth: 0, data: 'CursorGStringheItemSort', filterType: '', orderable: true, hidden: true, isSystemColumn: true }
	;
	$scope.GridColumns = [
	$scope.CursorGStringheItemSortColumn,
	$scope.IDSTRINGColumn,
	$scope.LABELColumn,
	$scope.REFERENCEColumn
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
	    PagesDataTableHelperService.CreateFilterRow(this, $scope.GridColumns, 'GStringheGrid', $scope);
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
		$scope.CursorGStringheIDSTRINGFilter01.filterEntry = $scope.ComponentData.ComponentEntries.FiltersEntries.CursorGStringheIDSTRINGFilter01;
		$scope.CursorGStringheLABELFilter01.filterEntry = $scope.ComponentData.ComponentEntries.FiltersEntries.CursorGStringheLABELFilter01;
		$scope.CursorGStringheREFERENCEFilter01.filterEntry = $scope.ComponentData.ComponentEntries.FiltersEntries.CursorGStringheREFERENCEFilter01;
	}
	function InitFiltersSuggestions()
	{
		$scope.CursorGStringheIDSTRINGFilter01.filterSuggestion = $scope.ComponentData.ComponentEntries.FiltersSuggestions.CursorGStringheIDSTRINGFilter01;
		$scope.CursorGStringheLABELFilter01.filterSuggestion = $scope.ComponentData.ComponentEntries.FiltersSuggestions.CursorGStringheLABELFilter01;
		$scope.CursorGStringheREFERENCEFilter01.filterSuggestion = $scope.ComponentData.ComponentEntries.FiltersSuggestions.CursorGStringheREFERENCEFilter01;
	}
	function SetFiltersDataSources()
	{
	}
	function InitColumnsRTIs()
	{
		$scope.IDSTRINGColumn.text = $scope.ComponentData.ComponentEntries.ColumnsHeaderEntries.IDSTRINGColumnEntry;
		$scope.IDSTRINGColumn.hidden = ($scope.ComponentShowMode === 'browse' && !$scope.ComponentRTIs.GridColumnsRTI.CursorGStringheIDSTRINGRTI.CanRead) || !$scope.ComponentRTIs.GridColumnsRTI.CursorGStringheIDSTRINGRTI.GlobalVisible;
		$scope.LABELColumn.text = $scope.ComponentData.ComponentEntries.ColumnsHeaderEntries.LABELColumnEntry;
		$scope.LABELColumn.hidden = ($scope.ComponentShowMode === 'browse' && !$scope.ComponentRTIs.GridColumnsRTI.CursorGStringheLABELRTI.CanRead) || !$scope.ComponentRTIs.GridColumnsRTI.CursorGStringheLABELRTI.GlobalVisible;
		$scope.REFERENCEColumn.text = $scope.ComponentData.ComponentEntries.ColumnsHeaderEntries.REFERENCEColumnEntry;
		$scope.REFERENCEColumn.hidden = ($scope.ComponentShowMode === 'browse' && !$scope.ComponentRTIs.GridColumnsRTI.CursorGStringheREFERENCERTI.CanRead) || !$scope.ComponentRTIs.GridColumnsRTI.CursorGStringheREFERENCERTI.GlobalVisible;
	}
	function InitColumnsGroupsRTIs()
	{
	}
	function LoadComponentData()
	{
		var loadComponentDataPromise = ComponentsDataHelperService.getGridData('api/CursorGStringhe', $scope.PageSize, $scope.ComponentShowMode);
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
		var dataTableRTI = $('#GStringheGrid').DataTable();
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
		StringhePageBSNFactory.Page = $scope.GetPageForBsn($scope.ComponentRTIs.GridColumnsRTI);
		StringhePageBSNFactory.On_AfterDatasetUpdate('CursorGStringhe');
		$scope.SafeApply();
		StringhePageBSNFactory.Page = null;
	}
	function PerformDataTableInitComplete()
	{
		var dataTableRTI = $('#GStringheGrid').DataTable();
		$scope.ResponsiveKam4DatatableControl.AfterTableCreated();
		PagesDataTableHelperService.HideHiddenColumns('GStringheGrid', dataTableRTI, $scope.GridColumns);
		var footerRow = $('#GStringheGrid tfoot tr');
		$('#GStringheGrid thead').append(footerRow);
		PagesDataTableHelperService.CreateColumnsGroupsRow($scope.GridColumnsGroups, 'GStringheGrid', $scope.GridColumns);
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
		$('input.GStringheGrid_ColumnFilter').on( 'keyup', ComponentsNavigationHelperService.debounce(function() {
		    if(!$(this).is(':checkbox')) {
		        if(!$(this).hasClass('datepickerFilter') && !$(this).hasClass('datetimepickerFilter') && !$(this).hasClass('timepickerFilter')) {
		            DataTableOnFilter();
		        }
		    }
		}, 1000));
		$('input.GStringheGrid_ColumnFilter').on('keydown', function (evt) {
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
		$('input.GStringheGrid_ColumnFilter:checkbox').on( 'click', function () {
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
		$('div.GStringheGrid_MultipleColumnFilter').each(function(){
		    $compile(this)($scope);
		} );
	}
	function SetFixedColumns(nLeftFixedColumns,	nRightFixedColumns)
	{
		var wrapper = $('#GStringheGrid_wrapper');
		$(wrapper).css('max-width', '100%');
		var table = $('#GStringheGrid')
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
		            $('#GStringheGrid').dataTable().fnSort([order]);
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
		$($('#GStringheGrid').DataTable().columns(i).header()).html($scope.GridColumns[i].text);
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
		$scope.CurrentFilters = PagesDataTableHelperService.GetFiltersData($scope.GridColumns, 'GStringheGrid');
		$scope.ShowLoaderComponent();
		$scope.AddLoaderPromise(UpdateGridData());
		$scope.HideLoaderComponent();
	}
	function UpdateGridData()
	{
		var updateGridDataPromise = ComponentsDataHelperService.getGridDataSource('api/CursorGStringhe', parseInt($scope.CurrentPageIndex) - 1, $scope.PageSize, $scope.CurrentSortInformation, $scope.CurrentFilters, $scope.ComponentData.GridSourceData.CurrentItemsList, $scope.ComponentShowMode);
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
		var cellClickPromise = ComponentsNavigationHelperService.cellClick('api/CursorGStringhe', eventArgs.args.rowindex, column.name, commandName);
		$scope.AddLoaderPromise(cellClickPromise);
		cellClickPromise.then(function (result) {
		    if (result != undefined && result.status === 200 && result.data.ActionResultStr == 'UpdateComponent' && result.data.CursorName == 'CursorGStringhe') {
		        $scope.AddLoaderPromise(UpdateGridData());
		    }
		    $scope.LoaderPromisesList.InTheEndDoAction(function () {
		        StringhePageBSNFactory.Page = $scope.GetPageForBsn($scope.ComponentRTIs.GridColumnsRTI);
		        StringhePageBSNFactory.On_AfterCommand('CursorGStringhe', column.commandName, column.name, eventArgs.args.rowindex - $scope.GridSummaryData.Begin);
		        $scope.SafeApply();
		        StringhePageBSNFactory.Page = null;
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
		$('#GStringheGrid').dataTable().fnSort([]);
		PagesDataTableHelperService.ResetFilterRow($scope.GridColumns, 'GStringheGrid');
		$scope.CurrentPageIndex = 1;
		$scope.PageSize = $scope.DefaultPageSize;
		$scope.CurrentSortInformation = null;
		$scope.CurrentFilters = null;
		var resetGridDataPromise = ComponentsDataHelperService.resetGridDataSource('api/CursorGStringhe');
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
		$('#GStringheGrid').dataTable().fnSort([]);
		PagesDataTableHelperService.ResetFilterRow($scope.GridColumns, 'GStringheGrid');
		$scope.CurrentPageIndex = 1;
		$scope.PageSize = $scope.DefaultPageSize;
		$scope.CurrentSortInformation = null;
		$scope.CurrentFilters = null;
		var restoreGridDataPromise = ComponentsDataHelperService.restoreGridDataSource('api/CursorGStringhe');
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
		ComponentsNavigationHelperService.buttonNewClick('api/CursorGStringhe');
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
		ComponentsNavigationHelperService.buttonEditClick('api/CursorGStringhe');
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
		if ($scope.ShowPageParams.CursorName == 'CursorGStringhe' &&
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
		    var buttonSaveClickPromise = ComponentsNavigationHelperService.buttonSaveClick('api/CursorGStringhe', $scope.ComponentData.GridSourceData.CurrentItemsList);
		    $scope.AddLoaderPromise(buttonSaveClickPromise);
		    buttonSaveClickPromise.then(function (result) {
		        if (result != undefined && result.status === 200 && result.data.ActionResultStr == 'UpdateComponent' && result.data.CursorName == 'CursorGStringhe') {
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
		if ($scope.ShowPageParams.CursorName == 'CursorGStringhe' &&
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
		    var buttonSaveClickPromise = ComponentsNavigationHelperService.buttonSaveAndNewClick('api/CursorGStringhe', $scope.ComponentData.GridSourceData.CurrentItemsList);
		    $scope.AddLoaderPromise(buttonSaveClickPromise);
		    buttonSaveClickPromise.then(function (result) {
		        if (result != undefined && result.status === 200 && result.data.ActionResultStr == 'UpdateComponent' && result.data.CursorName == 'CursorGStringhe') {
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
		if ($scope.ShowPageParams.CursorName == 'CursorGStringhe' &&
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
		        ComponentsNavigationHelperService.buttonCancelClick('api/CursorGStringhe');
		    }
		});
		} else {
		$scope.IsCancelEvent = true;
		ComponentsNavigationHelperService.buttonCancelClick('api/CursorGStringhe');
		}
	}
	$scope.Init = function ()
	{
		$scope.RegisterComponent(this);
	}
	$scope.PerformComponentInit = function ()
	{
		if ($scope.ShowPageParams.CursorName == 'CursorGStringhe') {
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
		pageObj.CursorGStringhe = $scope.ITEMCurrent;
		pageObj.CursorGStringheCurrentItemsList = $scope.ComponentData.GridSourceData.CurrentItemsList;
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
		        CommandPopupFactory.Show('GStringheGrid', column.name, column.popupDef !== null ? column.popupDef : $scope.ITEMCurrent.FieldsData[column.name+'RTIPopupDef']).then(function (commandName) {
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
		var dataTableRTI = $('#GStringheGrid').DataTable();
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
		$scope.AddLoaderPromise(ComponentsNavigationHelperService.buttonExportXLSClick('api/CursorGStringhe'));
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
		$('#GStringheGrid').DataTable().order([columnIndex, dir]);
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
		ComponentsDataHelperService.getFilterLookupItemsBySearchText('api/CursorGStringhe', columnFilter.name, '').then(function (result) {
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
		ComponentsDataHelperService.getFilterLookupItemsBySearchText('api/CursorGStringhe', columnFilter.name, searchText).then(function (result) {
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
		StringhePageBSNFactory.Page = $scope.GetPageForBsn($scope.ComponentRTIs.GridColumnsRTI);
		StringhePageBSNFactory.On_ComponentFieldChange('CursorGStringhe', fieldName, bsnOnComponentFieldChangeResult);
		$scope.SafeApply();
		StringhePageBSNFactory.Page = null;
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
		ComponentsDataHelperService.fieldChanged('api/CursorGStringhe', fieldName, $scope.ITEMCurrent, $scope.ComponentRTIs).then(function(result) {
		    $scope.ComponentData.GridSourceData.CurrentItemsList[rowIndex] = result.CurrentItem;
		    $scope.ITEMCurrent = $scope.ComponentData.GridSourceData.CurrentItemsList[rowIndex];
		    $scope.ComponentRTIs = result.ComponentRTIs;
		    var dataTableRTI = $('#GStringheGrid').DataTable();
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
