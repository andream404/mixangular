'use strict'
var kamApp = angular.module('AngularJSApp');
kamApp.controller('DiarioPageController',['$scope','$controller','DiarioPageBSNFactory',function($scope,$controller,DiarioPageBSNFactory)
{
	$controller('AbstractPageController', { $scope: $scope });
	$scope.Init = function () {
	    $scope.PageWebServiceUrl = 'api/DiarioPage';
	    $scope.DefinedComponentsCount = 1;
	    $scope.Base_Init();
	    DiarioPageBSNFactory.PageScope = $scope;
	    DiarioPageBSNFactory.Page = null;
	    DiarioPageBSNFactory.On_PageInit();
	};
}
]);
kamApp.controller('CursorGDiarioController',['$scope','$q','$controller','$compile','$window','$timeout','AngularExceptionsService','ComponentsDataHelperService','ComponentsNavigationHelperService','ValidationHelperService','MenusHelperService','PromisesListFactory','SpeechToTextFactory','DiarioPageBSNFactory','PagesHelperService','PagesDataTableHelperService','OkCancelPopupFactory','$sce','$filter','PagesFormHelperService','CommandPopupFactory','GlobalEntriesFactory',function($scope,$q,$controller,$compile,$window,$timeout,AngularExceptionsService,ComponentsDataHelperService,ComponentsNavigationHelperService,ValidationHelperService,MenusHelperService,PromisesListFactory,SpeechToTextFactory,DiarioPageBSNFactory,PagesHelperService,PagesDataTableHelperService,OkCancelPopupFactory,$sce,$filter,PagesFormHelperService,CommandPopupFactory,GlobalEntriesFactory)
{
	$controller('AbstractComponentController', { $scope: $scope });
	$scope.CursorGDiarioELEMENTOFilter01 = { name: 'CursorGDiarioELEMENTOFilter01', fieldName: 'diario.elemento'
	, isFilterValued: function() {
	    if($scope.CurrentFilters != undefined && $scope.CurrentFilters != null) {
	        for(var i = 0; i < $scope.CurrentFilters.length; i++) {
	            var currentFilter = $scope.CurrentFilters[i];
	            if(currentFilter.ColumnName == 'ELEMENTO') {
	                for(var j = 0; j < currentFilter.FilterDetails.length; j++) {
	                    var currentFilterDetail = currentFilter.FilterDetails[j];
	                    if(currentFilterDetail.Name == 'CursorGDiarioELEMENTOFilter01') {
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
	$scope.ELEMENTOColumn = { name: 'ELEMENTO', text: '', widthType: 'auto', xmlWidth: 0.00, defaultWidth: 85, areFiltersValued: function() {
	if($scope.CurrentFilters != undefined && $scope.CurrentFilters != null) {
	    for(var i = 0; i < $scope.CurrentFilters.length; i++) {
	        var currentFilter = $scope.CurrentFilters[i];
	        if(currentFilter.ColumnName == 'ELEMENTO') {
	            return true;
	        }
	    }
	}
	return false;
	}, onFieldChange: function(rowIndex, updatedValue=true) {
	let dependentFieldsUpdates = Promise.resolve(false);
	$scope.ITEMCurrent = $scope.ComponentData.GridSourceData.CurrentItemsList[rowIndex];
	if(!$scope.FieldChangedManagedByImmediateFieldUpdate('ELEMENTO', $scope.ComponentRTIs.GridColumnsRTI.CursorGDiarioELEMENTORTI, rowIndex) &&
	   ComponentsDataHelperService.hasChangedFieldDependentFieldsValued('CursorGDiario', 'ELEMENTO', $scope.ComponentRTIs.GridColumnsRTI, $scope.ITEMCurrent)) {
	    $scope.ShowLoaderComponent();
	    dependentFieldsUpdates = ComponentsDataHelperService.getItemDependentFieldsUpdated('api/CursorGDiario', 'ELEMENTO', $scope.ITEMCurrent).then(function(result) {
	        $scope.ComponentData.GridSourceData.CurrentItemsList[rowIndex] = result;
	        $scope.ITEMCurrent = $scope.ComponentData.GridSourceData.CurrentItemsList[rowIndex];
	        var dataTableRTI = $('#GDiarioGrid').DataTable();
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
	, data: 'ELEMENTO', dbColumnType: 'system.int32', commandName: 'SelectRow', className: 'td-text-right', raiseOnClick: true, editortype: 'text', orderable: true, cellsdatastyle: 'n', rtComponentCSClass: 'RTLinkColumn', render: function ( data, type, row, meta ) {
	var cellRT = ComponentsDataHelperService.getCellRT(row.PrimaryKeyValue, 'ELEMENTO', $scope.ComponentRTIs.CurrentRowsRTI);
	var cellRenderer = PagesDataTableHelperService.getBaseBrowseCellRenderer(data, cellRT, $scope.ComponentShowMode, $scope.ELEMENTOColumn.cellsdatastyle , null);
	cellRenderer = PagesDataTableHelperService.getLinkCellRenderer(cellRenderer, cellRT, $scope.ComponentShowMode);
	return cellRenderer;
	}, isReadonly: function() {
	if ($scope.IsComponentReadonly() === false &&
	!$scope.ComponentRTIs.GridColumnsRTI.CursorGDiarioELEMENTORTI.GlobalReadOnly &&
	(
	    ($scope.ComponentShowMode === 'edit' && $scope.ComponentRTIs.GridColumnsRTI.CursorGDiarioELEMENTORTI.CanEdit === true) ||
	    ($scope.ComponentShowMode === 'insert' && $scope.ComponentRTIs.GridColumnsRTI.CursorGDiarioELEMENTORTI.CanInsert === true)
	)) {
	return false;
	}
	return true;
	}, filters: [ $scope.CursorGDiarioELEMENTOFilter01
	] }
	;
	$scope.CursorGDiarioTIPOATTIVITAFilter01 = { name: 'CursorGDiarioTIPOATTIVITAFilter01', fieldName: 'diario.tipoattivita'
	, isFilterValued: function() {
	    if($scope.CurrentFilters != undefined && $scope.CurrentFilters != null) {
	        for(var i = 0; i < $scope.CurrentFilters.length; i++) {
	            var currentFilter = $scope.CurrentFilters[i];
	            if(currentFilter.ColumnName == 'TIPOATTIVITA') {
	                for(var j = 0; j < currentFilter.FilterDetails.length; j++) {
	                    var currentFilterDetail = currentFilter.FilterDetails[j];
	                    if(currentFilterDetail.Name == 'CursorGDiarioTIPOATTIVITAFilter01') {
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
	$scope.TIPOATTIVITAColumn = { name: 'TIPOATTIVITA', text: '', widthType: 'auto', xmlWidth: 0.00, defaultWidth: 425, areFiltersValued: function() {
	if($scope.CurrentFilters != undefined && $scope.CurrentFilters != null) {
	    for(var i = 0; i < $scope.CurrentFilters.length; i++) {
	        var currentFilter = $scope.CurrentFilters[i];
	        if(currentFilter.ColumnName == 'TIPOATTIVITA') {
	            return true;
	        }
	    }
	}
	return false;
	}, onFieldChange: function(rowIndex, updatedValue=true) {
	let dependentFieldsUpdates = Promise.resolve(false);
	$scope.ITEMCurrent = $scope.ComponentData.GridSourceData.CurrentItemsList[rowIndex];
	if(!$scope.FieldChangedManagedByImmediateFieldUpdate('TIPOATTIVITA', $scope.ComponentRTIs.GridColumnsRTI.CursorGDiarioTIPOATTIVITARTI, rowIndex) &&
	   ComponentsDataHelperService.hasChangedFieldDependentFieldsValued('CursorGDiario', 'TIPOATTIVITA', $scope.ComponentRTIs.GridColumnsRTI, $scope.ITEMCurrent)) {
	    $scope.ShowLoaderComponent();
	    dependentFieldsUpdates = ComponentsDataHelperService.getItemDependentFieldsUpdated('api/CursorGDiario', 'TIPOATTIVITA', $scope.ITEMCurrent).then(function(result) {
	        $scope.ComponentData.GridSourceData.CurrentItemsList[rowIndex] = result;
	        $scope.ITEMCurrent = $scope.ComponentData.GridSourceData.CurrentItemsList[rowIndex];
	        var dataTableRTI = $('#GDiarioGrid').DataTable();
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
	, data: 'TIPOATTIVITA', dbColumnType: 'system.string', textSize: '50', cellsformat: 'n', className: 'td-text-left', editortype: 'text', orderable: true, cellsdatastyle: null, rtComponentCSClass: 'RTColumn', render: function ( data, type, row, meta ) {
	var cellRT = ComponentsDataHelperService.getCellRT(row.PrimaryKeyValue, 'TIPOATTIVITA', $scope.ComponentRTIs.CurrentRowsRTI);
	var cellRenderer = PagesDataTableHelperService.getBaseBrowseCellRenderer(data, cellRT, $scope.ComponentShowMode, $scope.TIPOATTIVITAColumn.cellsdatastyle , null);
	return cellRenderer;
	}, isReadonly: function() {
	if ($scope.IsComponentReadonly() === false &&
	!$scope.ComponentRTIs.GridColumnsRTI.CursorGDiarioTIPOATTIVITARTI.GlobalReadOnly &&
	(
	    ($scope.ComponentShowMode === 'edit' && $scope.ComponentRTIs.GridColumnsRTI.CursorGDiarioTIPOATTIVITARTI.CanEdit === true) ||
	    ($scope.ComponentShowMode === 'insert' && $scope.ComponentRTIs.GridColumnsRTI.CursorGDiarioTIPOATTIVITARTI.CanInsert === true)
	)) {
	return false;
	}
	return true;
	}, filters: [ $scope.CursorGDiarioTIPOATTIVITAFilter01
	] }
	;
	$scope.CursorGDiarioATTIVITAFilter01 = { name: 'CursorGDiarioATTIVITAFilter01', fieldName: 'diario.attivita'
	, isFilterValued: function() {
	    if($scope.CurrentFilters != undefined && $scope.CurrentFilters != null) {
	        for(var i = 0; i < $scope.CurrentFilters.length; i++) {
	            var currentFilter = $scope.CurrentFilters[i];
	            if(currentFilter.ColumnName == 'ATTIVITA') {
	                for(var j = 0; j < currentFilter.FilterDetails.length; j++) {
	                    var currentFilterDetail = currentFilter.FilterDetails[j];
	                    if(currentFilterDetail.Name == 'CursorGDiarioATTIVITAFilter01') {
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
	$scope.ATTIVITAColumn = { name: 'ATTIVITA', text: '', widthType: 'fixed', xmlWidth: 250.00, defaultWidth: 425, areFiltersValued: function() {
	if($scope.CurrentFilters != undefined && $scope.CurrentFilters != null) {
	    for(var i = 0; i < $scope.CurrentFilters.length; i++) {
	        var currentFilter = $scope.CurrentFilters[i];
	        if(currentFilter.ColumnName == 'ATTIVITA') {
	            return true;
	        }
	    }
	}
	return false;
	}, onFieldChange: function(rowIndex, updatedValue=true) {
	let dependentFieldsUpdates = Promise.resolve(false);
	$scope.ITEMCurrent = $scope.ComponentData.GridSourceData.CurrentItemsList[rowIndex];
	if(!$scope.FieldChangedManagedByImmediateFieldUpdate('ATTIVITA', $scope.ComponentRTIs.GridColumnsRTI.CursorGDiarioATTIVITARTI, rowIndex) &&
	   ComponentsDataHelperService.hasChangedFieldDependentFieldsValued('CursorGDiario', 'ATTIVITA', $scope.ComponentRTIs.GridColumnsRTI, $scope.ITEMCurrent)) {
	    $scope.ShowLoaderComponent();
	    dependentFieldsUpdates = ComponentsDataHelperService.getItemDependentFieldsUpdated('api/CursorGDiario', 'ATTIVITA', $scope.ITEMCurrent).then(function(result) {
	        $scope.ComponentData.GridSourceData.CurrentItemsList[rowIndex] = result;
	        $scope.ITEMCurrent = $scope.ComponentData.GridSourceData.CurrentItemsList[rowIndex];
	        var dataTableRTI = $('#GDiarioGrid').DataTable();
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
	, data: 'ATTIVITA', dbColumnType: 'system.string', textSize: '100', commandName: 'SelectRow', cellsformat: 'n', className: 'td-text-left', raiseOnClick: true, editortype: 'text', orderable: true, cellsdatastyle: null, rtComponentCSClass: 'RTLinkColumn', render: function ( data, type, row, meta ) {
	var cellRT = ComponentsDataHelperService.getCellRT(row.PrimaryKeyValue, 'ATTIVITA', $scope.ComponentRTIs.CurrentRowsRTI);
	var cellRenderer = PagesDataTableHelperService.getBaseBrowseCellRenderer(data, cellRT, $scope.ComponentShowMode, $scope.ATTIVITAColumn.cellsdatastyle , null);
	cellRenderer = PagesDataTableHelperService.getLinkCellRenderer(cellRenderer, cellRT, $scope.ComponentShowMode);
	return cellRenderer;
	}, isReadonly: function() {
	if ($scope.IsComponentReadonly() === false &&
	!$scope.ComponentRTIs.GridColumnsRTI.CursorGDiarioATTIVITARTI.GlobalReadOnly &&
	(
	    ($scope.ComponentShowMode === 'edit' && $scope.ComponentRTIs.GridColumnsRTI.CursorGDiarioATTIVITARTI.CanEdit === true) ||
	    ($scope.ComponentShowMode === 'insert' && $scope.ComponentRTIs.GridColumnsRTI.CursorGDiarioATTIVITARTI.CanInsert === true)
	)) {
	return false;
	}
	return true;
	}, filters: [ $scope.CursorGDiarioATTIVITAFilter01
	] }
	;
	$scope.CursorGDiarioDATAFilter01 = { name: 'CursorGDiarioDATAFilter01', fieldName: 'diario.data'
	, isFilterValued: function() {
	    if($scope.CurrentFilters != undefined && $scope.CurrentFilters != null) {
	        for(var i = 0; i < $scope.CurrentFilters.length; i++) {
	            var currentFilter = $scope.CurrentFilters[i];
	            if(currentFilter.ColumnName == 'DATA') {
	                for(var j = 0; j < currentFilter.FilterDetails.length; j++) {
	                    var currentFilterDetail = currentFilter.FilterDetails[j];
	                    if(currentFilterDetail.Name == 'CursorGDiarioDATAFilter01') {
	                        return true;
	                    }
	                }
	            }
	        }
	    }
	    return false;
	}
	, filterType: 'date', filterCondition: 'GREATER_THAN' }
	;
	$scope.CursorGDiarioDATAFilter02 = { name: 'CursorGDiarioDATAFilter02', fieldName: 'diario.data'
	, isFilterValued: function() {
	    if($scope.CurrentFilters != undefined && $scope.CurrentFilters != null) {
	        for(var i = 0; i < $scope.CurrentFilters.length; i++) {
	            var currentFilter = $scope.CurrentFilters[i];
	            if(currentFilter.ColumnName == 'DATA') {
	                for(var j = 0; j < currentFilter.FilterDetails.length; j++) {
	                    var currentFilterDetail = currentFilter.FilterDetails[j];
	                    if(currentFilterDetail.Name == 'CursorGDiarioDATAFilter02') {
	                        return true;
	                    }
	                }
	            }
	        }
	    }
	    return false;
	}
	, filterType: 'date', filterCondition: 'LESS_THAN' }
	;
	$scope.DATAColumn = { name: 'DATA', text: '', widthType: 'auto', xmlWidth: 0.00, defaultWidth: 100, areFiltersValued: function() {
	if($scope.CurrentFilters != undefined && $scope.CurrentFilters != null) {
	    for(var i = 0; i < $scope.CurrentFilters.length; i++) {
	        var currentFilter = $scope.CurrentFilters[i];
	        if(currentFilter.ColumnName == 'DATA') {
	            return true;
	        }
	    }
	}
	return false;
	}, onFieldChange: function(rowIndex, updatedValue=true) {
	let dependentFieldsUpdates = Promise.resolve(false);
	$scope.ITEMCurrent = $scope.ComponentData.GridSourceData.CurrentItemsList[rowIndex];
	if(!$scope.FieldChangedManagedByImmediateFieldUpdate('DATA', $scope.ComponentRTIs.GridColumnsRTI.CursorGDiarioDATARTI, rowIndex) &&
	   ComponentsDataHelperService.hasChangedFieldDependentFieldsValued('CursorGDiario', 'DATA', $scope.ComponentRTIs.GridColumnsRTI, $scope.ITEMCurrent)) {
	    $scope.ShowLoaderComponent();
	    dependentFieldsUpdates = ComponentsDataHelperService.getItemDependentFieldsUpdated('api/CursorGDiario', 'DATA', $scope.ITEMCurrent).then(function(result) {
	        $scope.ComponentData.GridSourceData.CurrentItemsList[rowIndex] = result;
	        $scope.ITEMCurrent = $scope.ComponentData.GridSourceData.CurrentItemsList[rowIndex];
	        var dataTableRTI = $('#GDiarioGrid').DataTable();
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
	, data: 'DATA', dbColumnType: 'system.datetime', cellsformat: 'dd/MM/yyyy', className: 'td-text-left', editortype: 'date', orderable: true, cellsdatastyle: null, rtComponentCSClass: 'RTColumn', render: function ( data, type, row, meta ) {
	var cellRT = ComponentsDataHelperService.getCellRT(row.PrimaryKeyValue, 'DATA', $scope.ComponentRTIs.CurrentRowsRTI);
	var cellRenderer = PagesDataTableHelperService.getBaseBrowseCellRenderer(data, cellRT, $scope.ComponentShowMode, $scope.DATAColumn.cellsdatastyle , null);
	cellRenderer = PagesDataTableHelperService.getDateCellRenderer(data, cellRT, $scope.ComponentShowMode);
	return cellRenderer;
	}, isReadonly: function() {
	if ($scope.IsComponentReadonly() === false &&
	!$scope.ComponentRTIs.GridColumnsRTI.CursorGDiarioDATARTI.GlobalReadOnly &&
	(
	    ($scope.ComponentShowMode === 'edit' && $scope.ComponentRTIs.GridColumnsRTI.CursorGDiarioDATARTI.CanEdit === true) ||
	    ($scope.ComponentShowMode === 'insert' && $scope.ComponentRTIs.GridColumnsRTI.CursorGDiarioDATARTI.CanInsert === true)
	)) {
	return false;
	}
	return true;
	}, filters: [ $scope.CursorGDiarioDATAFilter01
	,
	$scope.CursorGDiarioDATAFilter02
	] }
	;
	$scope.CursorGDiarioUTENTEFilter01 = { name: 'CursorGDiarioUTENTEFilter01', fieldName: 'diario.utente'
	, isFilterValued: function() {
	    if($scope.CurrentFilters != undefined && $scope.CurrentFilters != null) {
	        for(var i = 0; i < $scope.CurrentFilters.length; i++) {
	            var currentFilter = $scope.CurrentFilters[i];
	            if(currentFilter.ColumnName == 'UTENTE') {
	                for(var j = 0; j < currentFilter.FilterDetails.length; j++) {
	                    var currentFilterDetail = currentFilter.FilterDetails[j];
	                    if(currentFilterDetail.Name == 'CursorGDiarioUTENTEFilter01') {
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
	$scope.UTENTEColumn = { name: 'UTENTE', text: '', widthType: 'auto', xmlWidth: 0.00, defaultWidth: 425, areFiltersValued: function() {
	if($scope.CurrentFilters != undefined && $scope.CurrentFilters != null) {
	    for(var i = 0; i < $scope.CurrentFilters.length; i++) {
	        var currentFilter = $scope.CurrentFilters[i];
	        if(currentFilter.ColumnName == 'UTENTE') {
	            return true;
	        }
	    }
	}
	return false;
	}, onFieldChange: function(rowIndex, updatedValue=true) {
	let dependentFieldsUpdates = Promise.resolve(false);
	$scope.ITEMCurrent = $scope.ComponentData.GridSourceData.CurrentItemsList[rowIndex];
	if(!$scope.FieldChangedManagedByImmediateFieldUpdate('UTENTE', $scope.ComponentRTIs.GridColumnsRTI.CursorGDiarioUTENTERTI, rowIndex) &&
	   ComponentsDataHelperService.hasChangedFieldDependentFieldsValued('CursorGDiario', 'UTENTE', $scope.ComponentRTIs.GridColumnsRTI, $scope.ITEMCurrent)) {
	    $scope.ShowLoaderComponent();
	    dependentFieldsUpdates = ComponentsDataHelperService.getItemDependentFieldsUpdated('api/CursorGDiario', 'UTENTE', $scope.ITEMCurrent).then(function(result) {
	        $scope.ComponentData.GridSourceData.CurrentItemsList[rowIndex] = result;
	        $scope.ITEMCurrent = $scope.ComponentData.GridSourceData.CurrentItemsList[rowIndex];
	        var dataTableRTI = $('#GDiarioGrid').DataTable();
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
	, data: 'UTENTE', dbColumnType: 'system.string', textSize: '50', cellsformat: 'n', className: 'td-text-left', editortype: 'text', orderable: true, cellsdatastyle: null, rtComponentCSClass: 'RTColumn', render: function ( data, type, row, meta ) {
	var cellRT = ComponentsDataHelperService.getCellRT(row.PrimaryKeyValue, 'UTENTE', $scope.ComponentRTIs.CurrentRowsRTI);
	var cellRenderer = PagesDataTableHelperService.getBaseBrowseCellRenderer(data, cellRT, $scope.ComponentShowMode, $scope.UTENTEColumn.cellsdatastyle , null);
	return cellRenderer;
	}, isReadonly: function() {
	if ($scope.IsComponentReadonly() === false &&
	!$scope.ComponentRTIs.GridColumnsRTI.CursorGDiarioUTENTERTI.GlobalReadOnly &&
	(
	    ($scope.ComponentShowMode === 'edit' && $scope.ComponentRTIs.GridColumnsRTI.CursorGDiarioUTENTERTI.CanEdit === true) ||
	    ($scope.ComponentShowMode === 'insert' && $scope.ComponentRTIs.GridColumnsRTI.CursorGDiarioUTENTERTI.CanInsert === true)
	)) {
	return false;
	}
	return true;
	}, filters: [ $scope.CursorGDiarioUTENTEFilter01
	] }
	;
	$scope.CursorGDiarioNOTEATTIVITAFilter01 = { name: 'CursorGDiarioNOTEATTIVITAFilter01', fieldName: 'diario.noteattivita'
	, isFilterValued: function() {
	    if($scope.CurrentFilters != undefined && $scope.CurrentFilters != null) {
	        for(var i = 0; i < $scope.CurrentFilters.length; i++) {
	            var currentFilter = $scope.CurrentFilters[i];
	            if(currentFilter.ColumnName == 'NOTEATTIVITA') {
	                for(var j = 0; j < currentFilter.FilterDetails.length; j++) {
	                    var currentFilterDetail = currentFilter.FilterDetails[j];
	                    if(currentFilterDetail.Name == 'CursorGDiarioNOTEATTIVITAFilter01') {
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
	$scope.NOTEATTIVITAColumn = { name: 'NOTEATTIVITA', text: '', widthType: 'auto', xmlWidth: 0.00, defaultWidth: 425, areFiltersValued: function() {
	if($scope.CurrentFilters != undefined && $scope.CurrentFilters != null) {
	    for(var i = 0; i < $scope.CurrentFilters.length; i++) {
	        var currentFilter = $scope.CurrentFilters[i];
	        if(currentFilter.ColumnName == 'NOTEATTIVITA') {
	            return true;
	        }
	    }
	}
	return false;
	}, onFieldChange: function(rowIndex, updatedValue=true) {
	let dependentFieldsUpdates = Promise.resolve(false);
	$scope.ITEMCurrent = $scope.ComponentData.GridSourceData.CurrentItemsList[rowIndex];
	if(!$scope.FieldChangedManagedByImmediateFieldUpdate('NOTEATTIVITA', $scope.ComponentRTIs.GridColumnsRTI.CursorGDiarioNOTEATTIVITARTI, rowIndex) &&
	   ComponentsDataHelperService.hasChangedFieldDependentFieldsValued('CursorGDiario', 'NOTEATTIVITA', $scope.ComponentRTIs.GridColumnsRTI, $scope.ITEMCurrent)) {
	    $scope.ShowLoaderComponent();
	    dependentFieldsUpdates = ComponentsDataHelperService.getItemDependentFieldsUpdated('api/CursorGDiario', 'NOTEATTIVITA', $scope.ITEMCurrent).then(function(result) {
	        $scope.ComponentData.GridSourceData.CurrentItemsList[rowIndex] = result;
	        $scope.ITEMCurrent = $scope.ComponentData.GridSourceData.CurrentItemsList[rowIndex];
	        var dataTableRTI = $('#GDiarioGrid').DataTable();
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
	, data: 'NOTEATTIVITA', dbColumnType: 'system.string', cellsformat: 'n', className: 'td-text-left', editortype: 'text', orderable: true, cellsdatastyle: null, rtComponentCSClass: 'RTColumn', render: function ( data, type, row, meta ) {
	var cellRT = ComponentsDataHelperService.getCellRT(row.PrimaryKeyValue, 'NOTEATTIVITA', $scope.ComponentRTIs.CurrentRowsRTI);
	var cellRenderer = PagesDataTableHelperService.getBaseBrowseCellRenderer(data, cellRT, $scope.ComponentShowMode, $scope.NOTEATTIVITAColumn.cellsdatastyle , null);
	return cellRenderer;
	}, isReadonly: function() {
	if ($scope.IsComponentReadonly() === false &&
	!$scope.ComponentRTIs.GridColumnsRTI.CursorGDiarioNOTEATTIVITARTI.GlobalReadOnly &&
	(
	    ($scope.ComponentShowMode === 'edit' && $scope.ComponentRTIs.GridColumnsRTI.CursorGDiarioNOTEATTIVITARTI.CanEdit === true) ||
	    ($scope.ComponentShowMode === 'insert' && $scope.ComponentRTIs.GridColumnsRTI.CursorGDiarioNOTEATTIVITARTI.CanInsert === true)
	)) {
	return false;
	}
	return true;
	}, filters: [ $scope.CursorGDiarioNOTEATTIVITAFilter01
	] }
	;
	$scope.ComponentData = null
	;
	$scope.SpeechToTextFactory = SpeechToTextFactory
	;
	$scope.CursorGDiarioItemSortColumn = { name: 'CursorGDiarioItemSort', text: '', widthType: 'fixed', xmlWidth: 0.00, defaultWidth: 0, data: 'CursorGDiarioItemSort', filterType: '', orderable: true, hidden: true, isSystemColumn: true }
	;
	$scope.GridColumns = [
	$scope.CursorGDiarioItemSortColumn,
	$scope.ELEMENTOColumn,
	$scope.TIPOATTIVITAColumn,
	$scope.ATTIVITAColumn,
	$scope.DATAColumn,
	$scope.UTENTEColumn,
	$scope.NOTEATTIVITAColumn
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
	    PagesDataTableHelperService.CreateFilterRow(this, $scope.GridColumns, 'GDiarioGrid', $scope);
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
		$scope.CursorGDiarioELEMENTOFilter01.filterEntry = $scope.ComponentData.ComponentEntries.FiltersEntries.CursorGDiarioELEMENTOFilter01;
		$scope.CursorGDiarioTIPOATTIVITAFilter01.filterEntry = $scope.ComponentData.ComponentEntries.FiltersEntries.CursorGDiarioTIPOATTIVITAFilter01;
		$scope.CursorGDiarioATTIVITAFilter01.filterEntry = $scope.ComponentData.ComponentEntries.FiltersEntries.CursorGDiarioATTIVITAFilter01;
		$scope.CursorGDiarioDATAFilter01.filterEntry = $scope.ComponentData.ComponentEntries.FiltersEntries.CursorGDiarioDATAFilter01;
		$scope.CursorGDiarioDATAFilter02.filterEntry = $scope.ComponentData.ComponentEntries.FiltersEntries.CursorGDiarioDATAFilter02;
		$scope.CursorGDiarioUTENTEFilter01.filterEntry = $scope.ComponentData.ComponentEntries.FiltersEntries.CursorGDiarioUTENTEFilter01;
		$scope.CursorGDiarioNOTEATTIVITAFilter01.filterEntry = $scope.ComponentData.ComponentEntries.FiltersEntries.CursorGDiarioNOTEATTIVITAFilter01;
	}
	function InitFiltersSuggestions()
	{
		$scope.CursorGDiarioELEMENTOFilter01.filterSuggestion = $scope.ComponentData.ComponentEntries.FiltersSuggestions.CursorGDiarioELEMENTOFilter01;
		$scope.CursorGDiarioTIPOATTIVITAFilter01.filterSuggestion = $scope.ComponentData.ComponentEntries.FiltersSuggestions.CursorGDiarioTIPOATTIVITAFilter01;
		$scope.CursorGDiarioATTIVITAFilter01.filterSuggestion = $scope.ComponentData.ComponentEntries.FiltersSuggestions.CursorGDiarioATTIVITAFilter01;
		$scope.CursorGDiarioDATAFilter01.filterSuggestion = $scope.ComponentData.ComponentEntries.FiltersSuggestions.CursorGDiarioDATAFilter01;
		$scope.CursorGDiarioDATAFilter02.filterSuggestion = $scope.ComponentData.ComponentEntries.FiltersSuggestions.CursorGDiarioDATAFilter02;
		$scope.CursorGDiarioUTENTEFilter01.filterSuggestion = $scope.ComponentData.ComponentEntries.FiltersSuggestions.CursorGDiarioUTENTEFilter01;
		$scope.CursorGDiarioNOTEATTIVITAFilter01.filterSuggestion = $scope.ComponentData.ComponentEntries.FiltersSuggestions.CursorGDiarioNOTEATTIVITAFilter01;
	}
	function SetFiltersDataSources()
	{
	}
	function InitColumnsRTIs()
	{
		$scope.ELEMENTOColumn.text = $scope.ComponentData.ComponentEntries.ColumnsHeaderEntries.ELEMENTOColumnEntry;
		$scope.ELEMENTOColumn.hidden = ($scope.ComponentShowMode === 'browse' && !$scope.ComponentRTIs.GridColumnsRTI.CursorGDiarioELEMENTORTI.CanRead) || !$scope.ComponentRTIs.GridColumnsRTI.CursorGDiarioELEMENTORTI.GlobalVisible;
		$scope.TIPOATTIVITAColumn.text = $scope.ComponentData.ComponentEntries.ColumnsHeaderEntries.TIPOATTIVITAColumnEntry;
		$scope.TIPOATTIVITAColumn.hidden = ($scope.ComponentShowMode === 'browse' && !$scope.ComponentRTIs.GridColumnsRTI.CursorGDiarioTIPOATTIVITARTI.CanRead) || !$scope.ComponentRTIs.GridColumnsRTI.CursorGDiarioTIPOATTIVITARTI.GlobalVisible;
		$scope.ATTIVITAColumn.text = $scope.ComponentData.ComponentEntries.ColumnsHeaderEntries.ATTIVITAColumnEntry;
		$scope.ATTIVITAColumn.hidden = ($scope.ComponentShowMode === 'browse' && !$scope.ComponentRTIs.GridColumnsRTI.CursorGDiarioATTIVITARTI.CanRead) || !$scope.ComponentRTIs.GridColumnsRTI.CursorGDiarioATTIVITARTI.GlobalVisible;
		$scope.DATAColumn.text = $scope.ComponentData.ComponentEntries.ColumnsHeaderEntries.DATAColumnEntry;
		$scope.DATAColumn.hidden = ($scope.ComponentShowMode === 'browse' && !$scope.ComponentRTIs.GridColumnsRTI.CursorGDiarioDATARTI.CanRead) || !$scope.ComponentRTIs.GridColumnsRTI.CursorGDiarioDATARTI.GlobalVisible;
		$scope.UTENTEColumn.text = $scope.ComponentData.ComponentEntries.ColumnsHeaderEntries.UTENTEColumnEntry;
		$scope.UTENTEColumn.hidden = ($scope.ComponentShowMode === 'browse' && !$scope.ComponentRTIs.GridColumnsRTI.CursorGDiarioUTENTERTI.CanRead) || !$scope.ComponentRTIs.GridColumnsRTI.CursorGDiarioUTENTERTI.GlobalVisible;
		$scope.NOTEATTIVITAColumn.text = $scope.ComponentData.ComponentEntries.ColumnsHeaderEntries.NOTEATTIVITAColumnEntry;
		$scope.NOTEATTIVITAColumn.hidden = ($scope.ComponentShowMode === 'browse' && !$scope.ComponentRTIs.GridColumnsRTI.CursorGDiarioNOTEATTIVITARTI.CanRead) || !$scope.ComponentRTIs.GridColumnsRTI.CursorGDiarioNOTEATTIVITARTI.GlobalVisible;
	}
	function InitColumnsGroupsRTIs()
	{
	}
	function LoadComponentData()
	{
		var loadComponentDataPromise = ComponentsDataHelperService.getGridData('api/CursorGDiario', $scope.PageSize, $scope.ComponentShowMode);
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
		var dataTableRTI = $('#GDiarioGrid').DataTable();
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
		DiarioPageBSNFactory.Page = $scope.GetPageForBsn($scope.ComponentRTIs.GridColumnsRTI);
		DiarioPageBSNFactory.On_AfterDatasetUpdate('CursorGDiario');
		$scope.SafeApply();
		DiarioPageBSNFactory.Page = null;
	}
	function PerformDataTableInitComplete()
	{
		var dataTableRTI = $('#GDiarioGrid').DataTable();
		$scope.ResponsiveKam4DatatableControl.AfterTableCreated();
		PagesDataTableHelperService.HideHiddenColumns('GDiarioGrid', dataTableRTI, $scope.GridColumns);
		var footerRow = $('#GDiarioGrid tfoot tr');
		$('#GDiarioGrid thead').append(footerRow);
		PagesDataTableHelperService.CreateColumnsGroupsRow($scope.GridColumnsGroups, 'GDiarioGrid', $scope.GridColumns);
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
		$('input.GDiarioGrid_ColumnFilter').on( 'keyup', ComponentsNavigationHelperService.debounce(function() {
		    if(!$(this).is(':checkbox')) {
		        if(!$(this).hasClass('datepickerFilter') && !$(this).hasClass('datetimepickerFilter') && !$(this).hasClass('timepickerFilter')) {
		            DataTableOnFilter();
		        }
		    }
		}, 1000));
		$('input.GDiarioGrid_ColumnFilter').on('keydown', function (evt) {
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
		$('input.GDiarioGrid_ColumnFilter:checkbox').on( 'click', function () {
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
		$('div.GDiarioGrid_MultipleColumnFilter').each(function(){
		    $compile(this)($scope);
		} );
	}
	function SetFixedColumns(nLeftFixedColumns,	nRightFixedColumns)
	{
		var wrapper = $('#GDiarioGrid_wrapper');
		$(wrapper).css('max-width', '100%');
		var table = $('#GDiarioGrid')
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
		            $('#GDiarioGrid').dataTable().fnSort([order]);
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
		$($('#GDiarioGrid').DataTable().columns(i).header()).html($scope.GridColumns[i].text);
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
		$scope.CurrentFilters = PagesDataTableHelperService.GetFiltersData($scope.GridColumns, 'GDiarioGrid');
		$scope.ShowLoaderComponent();
		$scope.AddLoaderPromise(UpdateGridData());
		$scope.HideLoaderComponent();
	}
	function UpdateGridData()
	{
		var updateGridDataPromise = ComponentsDataHelperService.getGridDataSource('api/CursorGDiario', parseInt($scope.CurrentPageIndex) - 1, $scope.PageSize, $scope.CurrentSortInformation, $scope.CurrentFilters, $scope.ComponentData.GridSourceData.CurrentItemsList, $scope.ComponentShowMode);
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
		var cellClickPromise = ComponentsNavigationHelperService.cellClick('api/CursorGDiario', eventArgs.args.rowindex, column.name, commandName);
		$scope.AddLoaderPromise(cellClickPromise);
		cellClickPromise.then(function (result) {
		    if (result != undefined && result.status === 200 && result.data.ActionResultStr == 'UpdateComponent' && result.data.CursorName == 'CursorGDiario') {
		        $scope.AddLoaderPromise(UpdateGridData());
		    }
		    $scope.LoaderPromisesList.InTheEndDoAction(function () {
		        DiarioPageBSNFactory.Page = $scope.GetPageForBsn($scope.ComponentRTIs.GridColumnsRTI);
		        DiarioPageBSNFactory.On_AfterCommand('CursorGDiario', column.commandName, column.name, eventArgs.args.rowindex - $scope.GridSummaryData.Begin);
		        $scope.SafeApply();
		        DiarioPageBSNFactory.Page = null;
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
		$('#GDiarioGrid').dataTable().fnSort([]);
		PagesDataTableHelperService.ResetFilterRow($scope.GridColumns, 'GDiarioGrid');
		$scope.CurrentPageIndex = 1;
		$scope.PageSize = $scope.DefaultPageSize;
		$scope.CurrentSortInformation = null;
		$scope.CurrentFilters = null;
		var resetGridDataPromise = ComponentsDataHelperService.resetGridDataSource('api/CursorGDiario');
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
		$('#GDiarioGrid').dataTable().fnSort([]);
		PagesDataTableHelperService.ResetFilterRow($scope.GridColumns, 'GDiarioGrid');
		$scope.CurrentPageIndex = 1;
		$scope.PageSize = $scope.DefaultPageSize;
		$scope.CurrentSortInformation = null;
		$scope.CurrentFilters = null;
		var restoreGridDataPromise = ComponentsDataHelperService.restoreGridDataSource('api/CursorGDiario');
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
	$scope.IsComponentReadonly = function ()
	{
		if ($scope.ComponentShowMode === 'browse') {
		return true;
		}
		return false;
	}
	$scope.IsButtonSaveVisible = function ()
	{
		if ($scope.ShowPageParams.CursorName == 'CursorGDiario' &&
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
		    var buttonSaveClickPromise = ComponentsNavigationHelperService.buttonSaveClick('api/CursorGDiario', $scope.ComponentData.GridSourceData.CurrentItemsList);
		    $scope.AddLoaderPromise(buttonSaveClickPromise);
		    buttonSaveClickPromise.then(function (result) {
		        if (result != undefined && result.status === 200 && result.data.ActionResultStr == 'UpdateComponent' && result.data.CursorName == 'CursorGDiario') {
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
		if ($scope.ShowPageParams.CursorName == 'CursorGDiario' &&
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
		    var buttonSaveClickPromise = ComponentsNavigationHelperService.buttonSaveAndNewClick('api/CursorGDiario', $scope.ComponentData.GridSourceData.CurrentItemsList);
		    $scope.AddLoaderPromise(buttonSaveClickPromise);
		    buttonSaveClickPromise.then(function (result) {
		        if (result != undefined && result.status === 200 && result.data.ActionResultStr == 'UpdateComponent' && result.data.CursorName == 'CursorGDiario') {
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
		if ($scope.ShowPageParams.CursorName == 'CursorGDiario' &&
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
		        ComponentsNavigationHelperService.buttonCancelClick('api/CursorGDiario');
		    }
		});
		} else {
		$scope.IsCancelEvent = true;
		ComponentsNavigationHelperService.buttonCancelClick('api/CursorGDiario');
		}
	}
	$scope.Init = function ()
	{
		$scope.RegisterComponent(this);
	}
	$scope.PerformComponentInit = function ()
	{
		if ($scope.ShowPageParams.CursorName == 'CursorGDiario') {
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
		pageObj.CursorGDiario = $scope.ITEMCurrent;
		pageObj.CursorGDiarioCurrentItemsList = $scope.ComponentData.GridSourceData.CurrentItemsList;
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
		        CommandPopupFactory.Show('GDiarioGrid', column.name, column.popupDef !== null ? column.popupDef : $scope.ITEMCurrent.FieldsData[column.name+'RTIPopupDef']).then(function (commandName) {
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
		var dataTableRTI = $('#GDiarioGrid').DataTable();
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
		$scope.AddLoaderPromise(ComponentsNavigationHelperService.buttonExportXLSClick('api/CursorGDiario'));
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
		$('#GDiarioGrid').DataTable().order([columnIndex, dir]);
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
		ComponentsDataHelperService.getFilterLookupItemsBySearchText('api/CursorGDiario', columnFilter.name, '').then(function (result) {
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
		ComponentsDataHelperService.getFilterLookupItemsBySearchText('api/CursorGDiario', columnFilter.name, searchText).then(function (result) {
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
		DiarioPageBSNFactory.Page = $scope.GetPageForBsn($scope.ComponentRTIs.GridColumnsRTI);
		DiarioPageBSNFactory.On_ComponentFieldChange('CursorGDiario', fieldName, bsnOnComponentFieldChangeResult);
		$scope.SafeApply();
		DiarioPageBSNFactory.Page = null;
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
		ComponentsDataHelperService.fieldChanged('api/CursorGDiario', fieldName, $scope.ITEMCurrent, $scope.ComponentRTIs).then(function(result) {
		    $scope.ComponentData.GridSourceData.CurrentItemsList[rowIndex] = result.CurrentItem;
		    $scope.ITEMCurrent = $scope.ComponentData.GridSourceData.CurrentItemsList[rowIndex];
		    $scope.ComponentRTIs = result.ComponentRTIs;
		    var dataTableRTI = $('#GDiarioGrid').DataTable();
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
