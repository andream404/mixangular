'use strict'
var kamApp = angular.module('AngularJSApp');
kamApp.service('PagesFormHelperService',['ComponentsDataHelperService',function(ComponentsDataHelperService)
{
	this.IsFormValid = function (form) {
	    var firstErrorElementName = null;
	    if (!this.AreAllFieldsValid(form)) {
	        var field = null, firstErrorElementName = null, firstErrorElementIndexInPage;
	        for (field in form) {
	            if (field[0] != '$') {
	                if (!form[field].$valid) {
	                    var fieldContainerElement = document.getElementById(form.$name + form[field].$name + 'Container');
	                    var fieldIndexInPage = $(fieldContainerElement).attr('field-index-in-page');
	                    if(firstErrorElementName === null || (fieldIndexInPage < firstErrorElementIndexInPage)) {
	                        firstErrorElementName = form[field].$name;
	                        firstErrorElementIndexInPage = fieldIndexInPage;
	                    }
	                }
	                if (form[field].$pristine) {
	                    form[field].$pristine = false;
	                }
	            }
	        }
	        angular.element('.ng-invalid[name=' + firstErrorElementName + ']').focus();
	        var firstErrorElement = document.getElementById(form.$name + firstErrorElementName + 'Container')
	        var firstErrorElementBoundaries = firstErrorElement.getBoundingClientRect();
	        if (!(firstErrorElementBoundaries.top >= 0 &&
	            firstErrorElementBoundaries.left >= 0 &&
	            firstErrorElementBoundaries.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
	            firstErrorElementBoundaries.right <= (window.innerWidth || document.documentElement.clientWidth))) {
	                firstErrorElement.scrollIntoView({'behavior':'smooth'})
	        }
	        return false;
	    }
	    return true;
	}
	 this.AreAllFieldsValid = function (form) {
	    return !Object.keys(form).filter(key => key[0]!='$').map(field => form[field].$invalid).includes(true);
	}
	this.IsTextFieldInTextSizeLimits = function(form, field, maxTextSize) {
	    var isInTextSizeLimits = (form[field].$viewValue && maxTextSize > 0 && maxTextSize < 2147483647) ? form[field].$viewValue.length <= maxTextSize : true;
	    form.$invalid = !isInTextSizeLimits;
	    form.$valid = isInTextSizeLimits;
	    form[field].$invalid = !isInTextSizeLimits;
	    form[field].$valid = isInTextSizeLimits;
	    form[field].$pristine = isInTextSizeLimits;
	    if (!isInTextSizeLimits) {
	        form[field].$error.textSize = true;
	    } else {
	        delete form[field].$error.textSize;
	    }
	    return isInTextSizeLimits;
	}
	this.SetLazyLookupNewItemValidity = function (form, field, isLazyLookupNewItemValid) {
	    form.$invalid = !isLazyLookupNewItemValid;
	    form.$valid = isLazyLookupNewItemValid;
	    form[field].$invalid = !isLazyLookupNewItemValid;
	    form[field].$valid = isLazyLookupNewItemValid;
	    form[field].$pristine = isLazyLookupNewItemValid;
	    if (!isLazyLookupNewItemValid) {
	        form[field].$error.lazyInsert = true;
	    } else {
	        delete form[field].$error.lazyInsert;
	    }
	}
	this.EncodeHTMLText = function (item) {
	    angular.forEach(item, function(value, key) {
	        if(value != null && angular.isString(value) && ComponentsDataHelperService.checkIsHTMLText(value)){
	            item[key] = ComponentsDataHelperService.encodeHTMLText(value);
	        }
	    });
	    return item;
	}
	this.DecodeHTMLText = function (item) {
	    angular.forEach(item, function(value, key) {
	        if(value != null && angular.isString(value)){
	            item[key] = ComponentsDataHelperService.decodeHTMLText(value);
	        }
	    });
	    return item;
	}
}
]);
kamApp.service('PagesDataTableHelperService',['$compile','ValidationHelperService','ComponentsDataHelperService',function($compile,ValidationHelperService,ComponentsDataHelperService)
{
	this.CreateFilterRow = function (tableElement, gridColumns, gridHTMLID, scope) {
	    var footerExist = $(tableElement).children("tfoot").length > 0;
	    if(footerExist == false) {
	        scope.FiltersCount = 0;
	        $(tableElement).append('<tfoot><tr id="' + gridHTMLID + 'FilterRow" ng-show="ComponentShowMode === \'browse\' && FiltersCount > 0"></tr></tfoot>');
	        $compile($('#' + gridHTMLID + 'FilterRow'))(scope);
	        tableElement.api().columns().every(function () {
	            var column = this;
	            var colHeader = this.header();
	            var gridColumn = gridColumns[column[0][0]];
	            if(angular.isDefined(gridColumn.filters) && gridColumn.filters.length > 0) {
	                if(gridColumn.filters.length == 1) {
	                    var filter = gridColumn.filters[0];
	                    scope.FiltersCount++;
	                    switch(filter.filterType) {
	                        case 'date':
	                            var filterDateHTML = '<th class="column_filter_cell" filter-obj-name="' + filter.name + '" data-column-idx="' + column[0][0] + '" style="text-align:center" ><input type="text" class="' + gridHTMLID + '_ColumnFilter datepickerFilter" id="' + filter.name + '" ng-model = "' + filter.name + '.value" ng-model-options = "{ updateOn: \'blur\' }" ng-change = "FilterDatePickerOnChange('+filter.name+')" ng-focus="FilterDatePickerOnFocus('+filter.name+')" ng-blur="FilterDatePickerOnBlur('+filter.name+')" data-format = "DD/MM/YYYY" data-language = "{{GlobalEntries.PagesComponentsEntries.DateTimePicker.Language}}" type = "text" data-date-time-picker data-use-current = "false"></input></th>';
	                            var compiledFilterDateHTML = $compile(filterDateHTML)(scope);
	                            $('#' + gridHTMLID + ' tfoot tr').append(compiledFilterDateHTML);
	                            break;
	                        case 'datetime':
	                            var filterDateTimeHTML = '<th class="column_filter_cell" filter-obj-name="' + filter.name + '" data-column-idx="' + column[0][0] + '" style="text-align:center" ><input type="text" class="' + gridHTMLID + '_ColumnFilter datetimepickerFilter" id="' + filter.name + '" ng-model = "' + filter.name + '.value" ng-model-options = "{ updateOn: \'blur\' }" ng-change = "FilterDateTimePickerOnChange('+filter.name+')" ng-focus="FilterDateTimePickerOnFocus('+filter.name+')" ng-blur="FilterDateTimePickerOnBlur('+filter.name+')" data-format = "DD/MM/YYYY HH:mm:ss" data-language = "{{GlobalEntries.PagesComponentsEntries.DateTimePicker.Language}}" type = "text" data-date-time-picker data-use-current = "false"></input></th>'
	                            var compiledFilterDateTimeHTML = $compile(filterDateTimeHTML)(scope);
	                            $('#' + gridHTMLID + ' tfoot tr').append(compiledFilterDateTimeHTML);
	                            break;
	                        case 'time':
	                            var filterTimeHTML = '<th class="column_filter_cell" filter-obj-name="' + filter.name + '" data-column-idx="' + column[0][0] + '" style="text-align:center" ><input type="text" class="' + gridHTMLID + '_ColumnFilter timepickerFilter" id="' + filter.name + '" ng-model = "' + filter.name + '.value" ng-model-options = "{ updateOn: \'blur\' }" ng-change = "FilterTimePickerOnChange('+filter.name+')" ng-focus="FilterTimePickerOnFocus('+filter.name+')" ng-blur="FilterTimePickerOnBlur('+filter.name+')" data-format = "HH:mm:ss" data-language = "{{GlobalEntries.PagesComponentsEntries.DateTimePicker.Language}}" type = "text" data-date-time-picker data-use-current = "false"></input></th>'
	                            var compiledFilterTimeHTML = $compile(filterTimeHTML)(scope);
	                            $('#' + gridHTMLID + ' tfoot tr').append(compiledFilterTimeHTML);
	                            break;
	                        case 'checkbox':
	                            $('#' + gridHTMLID + ' tfoot tr').append('<th class="column_filter_cell" filter-obj-name="' + filter.name + '" data-column-idx="' + column[0][0] + '" style="text-align:center" ><div class="checkbox" style="text-align:center"><input class="' + gridHTMLID + '_ColumnFilter" type="checkbox" id="' + filter.name + '" /><label for="' + filter.name + '">&nbsp;</label></div></th>');
	                            $('#' + filter.name).prop("indeterminate", true);
	                            break;
	                        case 'text':
	                            $('#' + gridHTMLID + ' tfoot tr').append('<th class="column_filter_cell" filter-obj-name="' + filter.name + '" data-column-idx="' + column[0][0] + '"><input class="' + gridHTMLID + '_ColumnFilter" id="' + filter.name + '" type="text" style="width:100%" /></th>');
	                            break;
	                        case 'dropdown':
	                            var filterSelectElemText;
	                            if(filter.filterIsDatabasedLookup) {
	                                filterSelectElemText = '' +
	                                    '<ui-select class="' + gridHTMLID + '_ColumnFilter" id="' + filter.name + '" append-to-body = "false" uis-open-close = "FilterComboBoxControlOnOpenClose(isOpen, ' + filter.name + ')" ng-change = "FilterComboBoxControlOnChange()" theme = "bootstrap" ng-required = "true" ng-model = "' + filter.name + '.FilterValueModel.item" name = "' + filter.name + 'Filter" ng-keydown = "FilterComboBoxControlOnKeyDown($event, ' + filter.name + ')"> ' +
	                                    '	<ui-select-match allow-clear="true">{{$select.selected.value}}</ui-select-match> ' +
	                                    '	<ui-select-choices refresh-delay="300" refresh="FilterComboBoxControlOnSearch($select.search, ' + filter.name + ')" repeat="item in ' + filter.name + '.filterItems"> ' +
	                                    '		<div ng-bind-html="TrustAsHtml((item.value | highlight: $select.search))"/> ' +
	                                    '	</ui-select-choices> ' +
	                                    '	<ul ui-select-kam4-no-choice class="ui-select-no-choice ui-select-dropdown dropdown-menu" kam4-show="' + filter.name + '.FilterComboBoxShowNoChoice && $select.items.length == 0"> ' +
	                                    '		<li> ' +
	                                    '			<div>{{GlobalEntries.PageEntries.FormEntries.DatabasedDropDownNoResultEntry}}</div> ' +
	                                    '		</li> ' +
	                                    '	</ul> ' +
	                                    '</ui-select> ';
	                            }
	                            else {
	                                filterSelectElemText = '' +
	                                '<ui-select class="' + gridHTMLID + '_ColumnFilter" append-to-body = "false" ng-change = "FilterComboBoxControlOnChange()" theme = "bootstrap" ng-model = "' + filter.name + '.FilterValueModel.item" name = "' + filter.name + 'Filter" search-enabled = "false"> ' +
	                                '	<ui-select-match allow-clear="true">{{$select.selected.value}}</ui-select-match> ' +
	                                '	<ui-select-choices repeat="item in ' + filter.name + '.filterItems | filter : $select.search"> ' +
	                                '		<div ng-bind-html="TrustAsHtml((item.value | highlight: $select.search))"/> ' +
	                                '	</ui-select-choices> ' +
	                                '</ui-select>';
	                            }
	                            var compiledDropdownElement = $compile(filterSelectElemText)(scope);
	                            var thDropdownContiner = $('<th class="column_filter_cell" data-column-idx="' + column[0][0] + '"></th>');
	                            thDropdownContiner.append(compiledDropdownElement);
	                            $('#' + gridHTMLID + ' tfoot tr').append(thDropdownContiner);
	                            break;
	                        default:
	                            $('#' + gridHTMLID + ' tfoot tr').append('<th class="column_filter_cell" filter-obj-name="' + filter.name + '" data-column-idx="' + column[0][0] + '"></th>');
	                            break;
	                    }
	                }
	                else {
	                    $('#' + gridHTMLID + ' tfoot tr').append('<th class="column_filter_cell" data-column-idx="' + column[0][0] + '"><div multiple-filters-kam4-datacolumn style="width:100%" class="' + gridHTMLID + '_MultipleColumnFilter"></div></th>');
	                }
	            }
	            else {
	                $('#' + gridHTMLID + ' tfoot tr').append('<th class="column_filter_cell" data-column-idx="' + column[0][0] + '"></th>');
	            }
	        });
	    }
	}
	this.ResetFilterRow = function(gridColumns, gridHTMLID) {
	    for(var i = 0; i < gridColumns.length; i++) {
	        var gridColumn = gridColumns[i];
	        if(angular.isDefined(gridColumn.filters)) {
	            for(var j = 0; j < gridColumn.filters.length; j++) {
	                var filter = gridColumn.filters[j];
	                switch(filter.filterType) {
	                    case 'text':
	                    case 'date':
	                    case 'datetime':
	                    case 'time':
	                        if($('#' + filter.name).length != 0) {
	                            $('#' + filter.name).val('');
	                        }
	                        break;
	                    case 'dropdown':
	                        if(filter.FilterValueModel != null && filter.FilterValueModel.item != null) {
	                            filter.FilterValueModel.item = null;
	                        }
	                        break;
	                    case 'checkbox':
	                        if($('#' + filter.name).length != 0) {
	                            filter.FilterValueModel = 'indeterminate';
	                            $('#' + filter.name).prop('checked', false);
	                            $('#' + filter.name).prop('indeterminate', true);
	                        }
	                        break;
	                }
	            }
	        }
	    }
	}
	this.CreateColumnsGroupsRow = function (gridColumnsGroups, gridHTMLID, gridColumns) {
	    if(gridColumnsGroups.length != 0) {
	        var fullGridColumnsGroups = [];
	        var prevColumnGroup = null;
	        for(var i = 0; i < gridColumns.length; i++){
	            var gridColumn = gridColumns[i];
	            if(!gridColumn.hidden && !gridColumn.isSystemColumn) {
	                var currentColumnGroup = null;
	                for(var j = 0; j < gridColumnsGroups.length && currentColumnGroup == null; j++ ) {
	                    var columnGroup = gridColumnsGroups[j];
	                    if(columnGroup.name == gridColumn.columngroup) {
	                        currentColumnGroup = columnGroup;
	                    }
	                }
	                if(currentColumnGroup == null) {
	                    if(prevColumnGroup.name == null) {
	                        currentColumnGroup = prevColumnGroup;
	                        currentColumnGroup.colspan += 1;
	                    }
	                    else {
	                        currentColumnGroup = {name: null, colspan: 1};
	                    }
	                }
	                if(prevColumnGroup != null && currentColumnGroup.name != prevColumnGroup.name) {
	                    fullGridColumnsGroups.push(prevColumnGroup);
	                }
	                prevColumnGroup = currentColumnGroup;
	            }
	        }
	        if(prevColumnGroup != null) {
	            fullGridColumnsGroups.push(prevColumnGroup);
	        }
	        if(fullGridColumnsGroups.length != 0) {
	            $('<tr id="'+ gridHTMLID + 'ColumnsGroups" class="ColumnsGroupsStyle"></tr>').insertBefore($('#' + gridHTMLID + ' thead tr:first'));
	            var totalColumnSpan = 0;
	            for(var i = 0; i < fullGridColumnsGroups.length; i++ ) {
	                var item = fullGridColumnsGroups[i];
	                item.htmlElement = $('<th class="column_group_cell"></th>');
	                item.htmlElement.attr('colspan', item.colspan);
	                totalColumnSpan += item.colspan;
	                $('#' + gridHTMLID + ' thead tr[role="row"]').children('th').each(function(index) {
	                        if(index == totalColumnSpan-1 && i < fullGridColumnsGroups.length - 1){
	                            $(this).addClass('border-rigth-th');
	                        }
	                    });
	                $('#' + gridHTMLID + 'FilterRow').children('th').each(function(index) {
	                    if(index == totalColumnSpan-1 && i < fullGridColumnsGroups.length - 1){
	                        $(this).addClass('border-rigth-th');
	                    }
	                });
	                $('#' + gridHTMLID + 'ColumnsGroups').append(item.htmlElement);
	            }
	        }
	    }
	}
	this.SetColumnsWidth = function(gridColumns) {
	    angular.forEach(gridColumns, function(item, key){
	        if(item.widthType == 'fixed') {
	            item.width = item.xmlWidth;
	        }
	        else {
	            item.width = item.defaultWidth;
	        }
	    });
	}
	this.SetColumnGroupColSpan = function(columnGroup, gridColumns) {
	    var colSpan = 0;
	    angular.forEach(gridColumns, function(item, key){
	        if(columnGroup.name == item.columngroup && !item.hidden) {
	            colSpan = colSpan + 1;
	        }
	    });
	    columnGroup.colspan = colSpan;
	}
	this.HideHiddenColumns = function(gridHTMLID, dataTableRTI, gridColumns) {
	    angular.forEach($('#' + gridHTMLID + 'FilterRow th'), function(item, key){
	        if(gridColumns[item.getAttribute("data-column-idx")].hidden) {
	            dataTableRTI.column(item.getAttribute("data-column-idx")).visible( false );
	            $(item).remove();
	        }
	    });
	}
	this.GetFiltersData = function(gridColumns, gridHTMLID) {
	    var gridFilters = [];
	    for(var i = 0; i < gridColumns.length; i++) {
	        var gridColumn = gridColumns[i];
	        var filterDetails = [];
	        if(angular.isDefined(gridColumn.filters)) {
	            for(var j = 0; j < gridColumn.filters.length; j++) {
	                var filterValue = null;
	                var filter = gridColumn.filters[j];
	                switch(filter.filterType) {
	                    case 'text':
	                        filterValue = $('#' + filter.name).val();
	                        break;
	                    case 'dropdown':
	                        if(filter.FilterValueModel != null && filter.FilterValueModel.item != null && filter.FilterValueModel.item.key != null) {
	                            filterValue = filter.FilterValueModel.item.key;
	                        }
	                        break;
	                    case 'date':
	                        filterValue = $('#' + filter.name).val();
	                        var parsedDate = ValidationHelperService.TryParseDateTime(filterValue);
	                        if(parsedDate != null) {
	                            filterValue = {
	                                Year: parsedDate.getFullYear(),
	                                Month: parsedDate.getMonth() + 1,
	                                Day: parsedDate.getDate(),
	                                Hour: 0,
	                                Minute: 0,
	                                Second: 0,
	                                HasValue: true
	                            };
	                            $('#' + filter.name).val(moment(parsedDate).format('DD/MM/YYYY'))
	                        } else {
	                            filterValue = ''
	                            $('#' + filter.name).val('')
	                        }
	                        break;
	                    case 'datetime':
	                        filterValue = $('#' + filter.name).val();
	                        var parsedDate = ValidationHelperService.TryParseDateTime(filterValue);
	                        if(parsedDate != null) {
	                            filterValue = {
	                                Year: parsedDate.getFullYear(),
	                                Month: parsedDate.getMonth() + 1,
	                                Day: parsedDate.getDate(),
	                                Hour: parsedDate.getHours(),
	                                Minute: parsedDate.getMinutes(),
	                                Second: parsedDate.getSeconds(),
	                                HasValue: true
	                            };
	                            $('#' + filter.name).val(moment(parsedDate).format('DD/MM/YYYY HH:mm:ss'))
	                        } else {
	                            filterValue = ''
	                            $('#' + filter.name).val('')
	                        }
	                        break;
	                    case 'time':
	                        filterValue = $('#' + filter.name).val();
	                        var parsedDate = ValidationHelperService.TryParseDateTime(filterValue);
	                        if(parsedDate != null) {
	                            filterValue = {
	                                Hour: parsedDate.getHours(),
	                                Minute: parsedDate.getMinutes(),
	                                Second: parsedDate.getSeconds(),
	                                HasValue: true
	                            };
	                            $('#' + filter.name).val(moment(parsedDate).format('HH:mm:ss'))
	                        } else {
	                            filterValue = ''
	                            $('#' + filter.name).val('')
	                        }
	                        break;
	                    case 'checkbox':
	                        if(filter.FilterValueModel != 'indeterminate') {
	                            filterValue = filter.FilterValueModel == 'checked';
	                        }
	                        break;
	                }
	                if(filterValue != null && filterValue !== '') {
	                    filterDetails.push({
	                        Name: filter.name,
	                        FieldName: filter.fieldName,
	                        FilterValue: filterValue,
	                        FilterOperator: 0,
	                        FilterCondition: filter.filterCondition,
	                        FilterType: null
	                    });
	                }
	            }
	        }
	        if(filterDetails.length != 0) {
	            gridFilters.push({
	                ColumnName: gridColumn.name,
	                FilterDetails: filterDetails
	            });
	        }
	    }
	    return gridFilters;
	}
	this.getEmptyCellRenderer = function()
	{
	    return '<span></span>';
	}
	this.getBaseBrowseCellRenderer = function(data, cellRT, componentShowMode, cellDataStyle = null, localization = null)
	{
	    if(cellRT != undefined && cellRT != null &&
	      (!cellRT.GlobalVisible || (componentShowMode === 'browse' && !cellRT.CanRead))) {
	        return this.getEmptyCellRenderer();
	    }
	    var cellRenderer = null;
	    if(data == null) {
	        cellRenderer = '<span></span>';
	    }
	    else {
	        if(cellDataStyle != null){
	            data = ComponentsDataHelperService.convertToDataStyle(cellDataStyle, data, localization);
	        }
	         cellRenderer = '<span>' + data + '</span>';
	    }
	    return cellRenderer;
	}
	this.getLookupCellRenderer = function(lookupItems, cellRT, componentShowMode)
	{
	    if(cellRT != undefined && cellRT != null &&
	      (!cellRT.GlobalVisible || (componentShowMode === 'browse' && !cellRT.CanRead))) {
	        return this.getEmptyCellRenderer();
	    }
	    var cellRenderer = null;
	    if(lookupItems == null || lookupItems.length == 0) {
	        cellRenderer = '<span></span>';
	    }
	    else {
	        var spanText = '';
	        for(var i = 0; i < lookupItems.length; i++) {
	            spanText += lookupItems[i].value;
	            if(i + 1 < lookupItems.length) {
	                spanText += ', ';
	            }
	        }
	        cellRenderer = '<span class="lookupcell">' + spanText + '</span>';
	    }
	    return cellRenderer;
	}
	this.getLinkCellRenderer = function (cellText, cellRT, componentShowMode)
	{
	    if(cellRT != undefined && cellRT != null &&
	      (!cellRT.GlobalVisible || (componentShowMode === 'browse' && !cellRT.CanRead))) {
	        return this.getEmptyCellRenderer();
	    }
	    return "<div class='linkcell' style='margin-top: 6px; cursor: pointer; cursor: hand;'>" + cellText + "</div>"
	}
	this.getDateCellRenderer = function (wsDateTime, cellRT, componentShowMode)
	{
	    if(cellRT != undefined && cellRT != null &&
	      (!cellRT.GlobalVisible || (componentShowMode === 'browse' && !cellRT.CanRead))) {
	        return this.getEmptyCellRenderer();
	    }
	    var stringValue = '';
	    if (wsDateTime != null && wsDateTime != undefined && wsDateTime.DateStringValue != '')
	    {
	        stringValue = wsDateTime.DateStringValue;
	    }
	    return "<div class='datecell'>" + stringValue + "</div>";
	}
	this.getDateTimeCellRenderer = function (wsDateTime, cellRT, componentShowMode)
	{
	    if(cellRT != undefined && cellRT != null &&
	      (!cellRT.GlobalVisible || (componentShowMode === 'browse' && !cellRT.CanRead))) {
	        return this.getEmptyCellRenderer();
	    }
	    var stringValue = '';
	    if (wsDateTime != null && wsDateTime != undefined && wsDateTime.StringValue != '')
	    {
	        stringValue = wsDateTime.StringValue;
	    }
	    return "<div class='datetimecell'>" + stringValue + "</div>";
	}
	this.getTimeCellRenderer = function (wsTime, cellRT, componentShowMode)
	{
	    if(cellRT != undefined && cellRT != null &&
	        (!cellRT.GlobalVisible || (componentShowMode === 'browse' && !cellRT.CanRead))) {
	        return this.getEmptyCellRenderer();
	    }
	    var stringValue = '';
	    if (wsTime != null && wsTime != undefined && wsTime.StringValue != '')
	    {
	        stringValue = wsTime.StringValue;
	    }
	    return "<div class='datetimecell'>" + stringValue + "</div>";
	}
	this.getCheckboxCellRenderer = function(fieldName, meta, cellRT, componentShowMode)
	{
	    if(cellRT != undefined && cellRT != null &&
	      (!cellRT.GlobalVisible || (componentShowMode === 'browse' && !cellRT.CanRead))) {
	        return this.getEmptyCellRenderer();
	    }
	    return '<div class="checkboxcell checkbox" readonly>' +
	           '<input disabled="disabled" id="' + fieldName + 'ColumnCheckBoxItem' + meta.row + '" type="checkbox" class="checkbox-circle">' +
	           '<label for="' + fieldName + 'ColumnCheckBoxItem' + meta.row + '">&nbsp;</label> ' +
	           '</div>';
	}
	this.addCellRendererHtmlCssClass = function (cellHtml, cssClass)
	{
	    if (cssClass == null || cssClass == '') {
	    return cellHtml;
	    }
	    var cellRenderObj = $(cellHtml);
	    cellRenderObj.addClass(cssClass);
	    return cellRenderObj[0].outerHTML;
	}
	this.addCellRendererHtmlCssStyle = function (cellHtml, cssStyle)
	{
	    if (cssStyle == null || cssStyle == '') {
	    return cellHtml;
	    }
	    var cellRenderObj = $(cellHtml);
	    var currentStyle = cellRenderObj.attr('style');
	    cellRenderObj.attr('style', currentStyle + cssStyle);
	    return cellRenderObj[0].outerHTML;
	}
	this.addCellRendererHtmlTitle = function (cellHtml, tooltip)
	{
	    if (tooltip == null || tooltip == '') {
	    return cellHtml;
	    }
	    var cellRenderObj = $(cellHtml);
	    cellRenderObj.attr('title', tooltip);
	    return cellRenderObj[0].outerHTML;
	}
}
]);
kamApp.service('PagesHelperService',function()
{
	this.DataDateTimePickerOnFocus = function (elementInput) {
	    elementInput.datetimepicker('show');
	    $('.bootstrap-datetimepicker-widget').attr('id', elementInput.attr('id') + 'DataDateTimePicker');
	    this.DataDateTimePickerAdjustPosition(elementInput);
	}
	this.DataDateTimePickerOnBlur = function (elementInput) {
	    $( '#' + elementInput.attr('id') + 'DataDateTimePicker').css({ position: '', top: '', bottom: '', left: '', right: '' });
	}
	this.PageContainerOnScroll = function() {
	    if ($(document.activeElement).attr('data-date-time-picker') !== undefined) {
	        this.DataDateTimePickerAdjustPosition($(document.activeElement));
	    }
	}
	this.WindowOnResize = function() {
	    if ($(document.activeElement).attr('data-date-time-picker') !== undefined) {
	        $(document.activeElement).trigger('blur');
	    }
	}
	this.DataDateTimePickerAdjustPosition = function(elementInput) {
	    var elementPickerId = elementInput.attr('id') + 'DataDateTimePicker';
	    $('#'+elementPickerId).css({
	        position: 'fixed',
	        top: $('#'+elementPickerId).get(0).style['top'] === 'auto' ? 'auto' : elementInput.get(0).getBoundingClientRect()['top'] + elementInput.outerHeight(),
	        bottom: $('#'+elementPickerId).get(0).style['bottom'] === 'auto' ? 'auto' : $(window).innerHeight() - elementInput.offset()['top'],
	        left: $('#'+elementPickerId).get(0).style['left'] === 'auto' ? 'auto' : elementInput.get(0).getBoundingClientRect()['left'],
	        right: $('#'+elementPickerId).get(0).style['right'] === 'auto' ? 'auto' : elementInput.get(0).getBoundingClientRect()['right']
	    });
	}
}
);
