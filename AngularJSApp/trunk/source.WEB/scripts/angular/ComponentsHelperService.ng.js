'use strict'
var kamApp = angular.module('AngularJSApp');
kamApp.service('ComponentsDataHelperService',['SecureWSService',function(SecureWSService)
{
	function isFieldOrDependentValued(cursorName, fieldName, subComponentsRTI, itemCurrent)
	{
		if(itemCurrent[fieldName] != undefined && itemCurrent[fieldName] !== null && itemCurrent[fieldName] != '' && itemCurrent[fieldName].length != 0) {
		return true;
		}
		var currentFieldRTI = subComponentsRTI[cursorName + fieldName + 'RTI'];
		for(var i = 0; i < currentFieldRTI.DependentFieldNameList.length; i++) {
		var dependentFieldName = currentFieldRTI.DependentFieldNameList[i];
		if(isFieldOrDependentValued(cursorName, dependentFieldName, subComponentsRTI, itemCurrent)) {
		    return true;
		}
		}
		return false;
	}
	this.getGridData = function (serviceUrl, pageSize, componentShowMode)
	{
		var gridDataRequestParamsObj = {
		'ComponentShowMode' : componentShowMode,
		'PageIndex': 0,
		'PageSize': pageSize,
		'Sort': null,
		'Filters': null
		};
		return SecureWSService.computePost(serviceUrl, gridDataRequestParamsObj, 'get', true).then(function (result) {
		if (result != undefined && result.status === 200) {
		    return result.data;
		}
		return {
		    ComponentRTIs: {
		        ComponentRTI: {
		            CanRead: true
		        }
		    },
		    ComponentEntries: {},
		    GridSourceData: {
		        CurrentItemsList: [],
		        TotalRowsCount: 0
		    },
		    FiltersDataSources: {}
		};
		})
	}
	this.getGridDataSource = function (serviceUrl, pageIndex, pageSize, sort, filters, currentItemsList, componentShowMode)
	{
		var gridDataRequestParamsObj = {
		'ComponentShowMode' : componentShowMode,
		'PageIndex': pageIndex,
		'PageSize': pageSize,
		'Sort': sort,
		'Filters': filters,
		'CurrentItemsList': currentItemsList
		};
		return SecureWSService.computePost(serviceUrl, gridDataRequestParamsObj, 'GetGridDataSource', true).then(function (result) {
		if (result != undefined && result.status === 200) {
		    return result.data;
		}
		return {
		    CurrentItemsList: [],
		    TotalRowsCount: 0
		};
		})
	}
	this.resetGridDataSource = function (serviceUrl)
	{
		var gridDataRequestParamsObj = {
		'ComponentShowMode' : 'browse',
		'PageIndex': -1,
		'PageSize': -1,
		'Sort': null,
		'Filters': null
		};
		return SecureWSService.computePost(serviceUrl, gridDataRequestParamsObj, 'ResetGridDataSource', true).then(function (result) {
		if (result != undefined && result.status === 200) {
		return result.data;
		}
		return {
		CurrentItemsList: [],
		TotalRowsCount: 0
		};
		})
	}
	this.restoreGridDataSource = function (serviceUrl)
	{
		var gridDataRequestParamsObj = {
		'ComponentShowMode' : 'browse',
		'PageIndex': -1,
		'PageSize': -1,
		'Sort': null,
		'Filters': null
		};
		return SecureWSService.computePost(serviceUrl, gridDataRequestParamsObj, 'RestoreGridDataSource', true).then(function (result) {
		if (result != undefined && result.status === 200) {
		return result.data;
		}
		return {
		CurrentItemsList: [],
		TotalRowsCount: 0
		};
		})
	}
	this.getFormData = function (serviceUrl, componentShowMode)
	{
		var formDataRequestParamsObj = {
		'ComponentShowMode': componentShowMode
		};
		return SecureWSService.computePost(serviceUrl, formDataRequestParamsObj, 'get', true).then(function (result) {
		if (result != undefined && result.status === 200) {
		    return result.data;
		}
		return {
		    CurrentItem: [],
		    ComponentEntries: [],
		    FieldsData: []
		};
		})
	}
	this.getData = function (serviceUrl, dataName)
	{
		return secureWSService.computePost(serviceUrl, editData, 'post', true).then(function (result) {
		return result;
		});
	}
	this.getLookupItemsByKey = function (serviceUrl, fieldName, fieldKey)
	{
		var itemsByKeyRequestParamsObj = {
		'Key': fieldKey
		};
		return SecureWSService.computePost(serviceUrl, itemsByKeyRequestParamsObj, 'GetLookup' + fieldName + 'ByKey', true).then(function (result) {
		if (result != undefined && result.status === 200) {
		    return result.data;
		}
		return [];
		});
	}
	this.getLookupItemsBySearchText = function (serviceUrl, fieldName, searchText, itemCurrent)
	{
		var searchTextRequestParamsObj = {
		'ItemCurrent': itemCurrent,
		'SearchText': searchText
		};
		return SecureWSService.computePost(serviceUrl, searchTextRequestParamsObj, 'GetLookup' + fieldName + 'BySearchText', true).then(function (result) {
		if (result != undefined && result.status === 200) {
		    return result.data;
		}
		return [];
		});
	}
	this.getFilterLookupItemsBySearchText = function (serviceUrl, filterName, searchText)
	{
		var searchTextRequestParamsObj = {
		'SearchText': searchText
		};
		return SecureWSService.computePost(serviceUrl, searchTextRequestParamsObj, 'GetFilterLookup' + filterName + 'BySearchText', true).then(function (result) {
		if (result != undefined && result.status === 200) {
		    return result.data;
		}
		return [];
		});
	}
	this.getLookupItemsAll = function (serviceUrl, fieldName)
	{
		return SecureWSService.computeGet(serviceUrl, 'GetLookup' + fieldName + 'All', true).then(function (result) {
		if (result != undefined && result.status === 200) {
		    return result.data;
		}
		return [];
		});
	}
	this.lazyLookupGetNewItemKey = function (serviceUrl, fieldName, fieldValue)
	{
		let lazyGetNewItemKeyRequestParamObj =  {
		'FieldName': fieldName,
		'FieldValue': fieldValue
		}
		return SecureWSService.computePost(serviceUrl, lazyGetNewItemKeyRequestParamObj, 'LazyLookup' + lazyGetNewItemKeyRequestParamObj.FieldName + 'GetNewItemKey', true).then(function(result) {
		if (result != undefined && result.status === 200) {
		    return result.data;
		}
		return [];
		});
	}
	this.lazyLookupInsertNewItems = function (serviceUrl, lazyInsertItemsRequestParamObjs)
	{
		return SecureWSService.computePost(serviceUrl, {'InsertRequestParamObjs': lazyInsertItemsRequestParamObjs}, 'LazyLookupInsertNewItems', true);
	}
	this.itemsListToString = function (items)
	{
		if (items === undefined || items === null || items.length == 0) {
		return '';
		}
		var stringValue = '';
		for (var i = 0; i < items.length; i++) {
		stringValue += items[i].value;
		if (i + 1 < items.length) {
		    stringValue += ', ';
		}
		}
		return stringValue;
	}
	this.computeCustomGetRequest = function (serviceUrl, methodName)
	{
		return SecureWSService.computeGet(serviceUrl, methodName, true).then(function (result) {
		if (result != undefined && result.status === 200) {
		    return result.data;
		}
		return [];
		});
	}
	this.computeCustomPostRequest = function (serviceUrl, methodName, dataToPost)
	{
		return SecureWSService.computePost(serviceUrl, dataToPost, methodName, true).then(function (result) {
		if (result != undefined && result.status === 200) {
		    return result.data;
		}
		return [];
		});
	}
	this.computeCustomDownloadRequest = function (serviceUrl, methodName, clientFileName)
	{
		return SecureWSService.downloadFile(serviceUrl, methodName).then(function(result) {
		if(result != undefined) {
		    var blob = new Blob([result.data], {type: 'application/octet-stream'});
		    var objectUrl = URL.createObjectURL(blob);
		    var anchor = document.createElement('a');
		    anchor.download = clientFileName;
		    anchor.href = objectUrl;
		    document.body.appendChild(anchor);
		    anchor.click();
		    document.body.removeChild(anchor);
		}
		});
	}
	this.hasChangedFieldDependentFieldsValued = function (cursorName, fieldName, subComponentsRTI, itemCurrent)
	{
		var currentFieldRTI = subComponentsRTI[cursorName + fieldName + 'RTI'];
		for(var i = 0; i < currentFieldRTI.DependentFieldNameList.length; i++) {
		    var dependentFieldName = currentFieldRTI.DependentFieldNameList[i];
		    if(isFieldOrDependentValued(cursorName, dependentFieldName, subComponentsRTI, itemCurrent)) {
		        return true;
		    }
		}
		return false;
	}
	this.getItemDependentFieldsUpdated = function (serviceUrl, fieldName, itemCurrent)
	{
		var getItemDependentFieldsUpdatedObj = {
		'ItemCurrent': itemCurrent,
		'FieldName': fieldName
		};
		return SecureWSService.computePost(serviceUrl, getItemDependentFieldsUpdatedObj, 'GetItemDependentFieldsUpdated', true).then(function (result) {
		if (result != undefined && result.status === 200) {
		return result.data;
		}
		return [];
		});
	}
	this.fieldChanged = function (serviceUrl, fieldName, itemCurrent, componentRTIs)
	{
		var fieldChangedRequestObj = {
		'ItemCurrent': itemCurrent,
		'FieldName': fieldName,
		'ComponentRTIs': componentRTIs
		};
		return SecureWSService.computePost(serviceUrl, fieldChangedRequestObj, 'FieldChanged', true).then(function (result) {
		if (result != undefined && result.status === 200) {
		return result.data;
		}
		return [];
		});
	}
	this.getCellRT = function (primaryKeyValue, columnName, currentRowsRTI)
	{
		for(var i = 0; i < currentRowsRTI.length; i++) {
		var currentRowRTI = currentRowsRTI[i];
		if(currentRowRTI.PrimaryKeyValue == primaryKeyValue) {
		    for(var j = 0; j < currentRowRTI.RTCells.length; j++) {
		        var currentCellRTI = currentRowRTI.RTCells[j];
		        if(currentCellRTI.ColumnName == columnName) {
		            return currentCellRTI;
		        }
		    }
		}
		}
		return null;
	}
	this.decodeHTMLText = function (text)
	{
		var entities = [
		['amp', '&'],
		['apos', '\''],
		['#x27', '\''],
		['#x2F', '/'],
		['#39', '\''],
		['#47', '/'],
		['lt', '<'],
		['gt', '>'],
		['nbsp', ' '],
		['quot', '"']
		];
		for (var i = 0; i < entities.length; ++i)
		{
		text = String(text).replace(new RegExp('&' + entities[i][0] + ';', 'g'), entities[i][1]);
		}
		return text;
	}
	this.encodeHTMLText = function (text)
	{
		var entities = [
		['&', 'amp'],
		['\'', 'apos'],
		['\'', '#x27'],
		['/', '#x2F'],
		['\'', '#39'],
		['/', '#47'],
		['<', 'lt'],
		['>', 'gt'],
		[' ', 'nbsp'],
		['"', 'quot']
		];
		for (var i = 0; i < entities.length; ++i)
		{
		text = String(text).replace(new RegExp(entities[i][0], 'g'), '&' + entities[i][1] + ';');
		}
		return text;
	}
	this.checkIsHTMLText = function (text)
	{
		var div = document.createElement('div');
		div.innerHTML = text;
		for (var child = div.childNodes, i = child.length; i--; ) {
		    if (child[i].nodeType == 1){
		        return true;
		    }
		}
		return false;
	}
	this.convertToDataStyle = function (dataStyle, data, localization)
	{
		localization='it-IT';
		if(!isNaN(data) && (dataStyle.includes('.') || dataStyle.includes(','))){
		    var firstZero = dataStyle.indexOf('0');
		    var firstHash = dataStyle.indexOf('#');
		    var firstZeroHash = (firstZero > firstHash ? firstHash : firstZero)
		    var lastComma = dataStyle.lastIndexOf(',');
		    var lastPoint = dataStyle.lastIndexOf('.');
		    var lastCP = (lastComma > lastPoint ? lastComma : lastPoint)
		    var lastZero = dataStyle.lastIndexOf('0');
		    var lastHash = dataStyle.lastIndexOf('#');
		    var lastZeroHash = (lastZero > lastHash ? lastZero : lastHash)
		    var precision = dataStyle.substring(lastCP, lastZeroHash).length;
		    var options = {
		        minimumFractionDigits: precision,
		        maximumFractionDigits: precision,
		        style: 'decimal'
		    };
		    var before = dataStyle.substring(0, firstZeroHash);
		    var after = dataStyle.substring(lastZeroHash + 1);
		    data = Number(data).toLocaleString(localization, options);
		    if(lastPoint>lastComma){
		        data = data.toString().replace(/[,.]/g, function (char) {
		                  return char === ',' ? '.' : ',';
		        });
		    }
		    return before + data.toString() + after;
		}
		return data;
	}
}
]);
kamApp.service('PagesNavigationHelperService',['$window','$cookies','SecureWSService','AngularExceptionsService','NavigationDataFactory','$location','$route',function($window,$cookies,SecureWSService,AngularExceptionsService,NavigationDataFactory,$location,$route)
{
	function showPage(pageUrl, action, cursorName)
	{
		NavigationDataFactory.ShowPageParams.Set({ 'PageURL': pageUrl, 'Action': action, 'CursorName': cursorName });
		if($location.path() == pageUrl.replace('#', '/')){
		    $route.reload();
		}
		else{
		    $window.location.replace(pageUrl);
		}
	}
	this.loadNewPage = function (serviceUrl)
	{
		var currService = this;
		return SecureWSService.computeGet(serviceUrl, 'get', true).then(function (result) {
		    if (result.data == undefined || result.data == null ||
		        result.data.ActionResult == undefined || result.data.ActionResult == null ||
		        result.data.PageRTI == undefined || result.data.PageRTI == null) {
		        AngularExceptionsService.throwBadRequestException();
		    }
		    currService.manageActionResult(result.data.ActionResult);
		    if (result.data.PageRTI.CanRead === false) {
		        AngularExceptionsService.throwForbiddenException();
		    }
		    return result.data;
		});
	}
	this.manageActionResult = function (result)
	{
		if (result != undefined && result.status === 200) {
		switch (result.data.ActionResultStr) {
		    case 'GoToPageForBrowse':
		        this.showPageForBrowse(result.data.PageUrl, result.data.CursorName);
		        break;
		    case 'GoToPageForInsert':
		        this.showPageForInsert(result.data.PageUrl, result.data.CursorName);
		        break;
		    case 'GoToPageForEdit':
		        this.showPageForEdit(result.data.PageUrl, result.data.CursorName);
		        break;
		}
		}
	}
	this.showPageForBrowse = function (pageUrl, cursorName)
	{
		showPage(pageUrl, 'browse', cursorName);
	}
	this.showPageForInsert = function (pageUrl, cursorName)
	{
		showPage(pageUrl, 'insert', cursorName);
	}
	this.showPageForEdit = function (pageUrl, cursorName)
	{
		showPage(pageUrl, 'edit', cursorName);
	}
	this.getShowPageParams = function ()
	{
		var showPageParams = NavigationDataFactory.ShowPageParams.Get('ShowPageParams');
		NavigationDataFactory.ShowPageParams.Remove();
		if (showPageParams == null) {
		    showPageParams = { 'PageURL': null, 'Action': 'browse', 'CursorName': null };
		}
		return showPageParams;
	}
}
]);
kamApp.service('ComponentsNavigationHelperService',['SecureWSService','PagesNavigationHelperService','AppNotificationsFactory',function(SecureWSService,PagesNavigationHelperService,AppNotificationsFactory)
{
	this.pageClick = function ()
	{
		AppNotificationsFactory.CloseAllApplicationErrorNotifies();
	}
	this.cellClick = function (serviceUrl, rowIndex, fieldName, commandName)
	{
		AppNotificationsFactory.CloseAllApplicationErrorNotifies();
		var gridCellClickRequest = {
		    RowIndex: rowIndex,
		    CommandName: commandName
		}
		return SecureWSService.computePost(serviceUrl, gridCellClickRequest, fieldName + 'Click', true).then(function (result) {
		    PagesNavigationHelperService.manageActionResult(result);
		    return result;
		});
	}
	this.buttonNewClick = function (serviceUrl)
	{
		AppNotificationsFactory.CloseAllApplicationErrorNotifies();
		return SecureWSService.computeGet(serviceUrl, 'ButtonNewClick', true).then(function (result) {
		    PagesNavigationHelperService.manageActionResult(result);
		    return result;
		});
	}
	this.buttonEditClick = function (serviceUrl)
	{
		AppNotificationsFactory.CloseAllApplicationErrorNotifies();
		return SecureWSService.computeGet(serviceUrl, 'ButtonEditClick', true).then(function (result) {
		     PagesNavigationHelperService.manageActionResult(result);
		    return result;
		});
	}
	this.buttonCancelClick = function (serviceUrl)
	{
		AppNotificationsFactory.CloseAllApplicationErrorNotifies();
		return SecureWSService.computeGet(serviceUrl, 'ButtonCancelClick', true).then(function (result) {
		    PagesNavigationHelperService.manageActionResult(result);
		    return result;
		});
	}
	this.buttonDeleteClick = function (serviceUrl)
	{
		AppNotificationsFactory.CloseAllApplicationErrorNotifies();
		return SecureWSService.computeGet(serviceUrl, 'ButtonDeleteClick', true).then(function (result) {
		    PagesNavigationHelperService.manageActionResult(result);
		    return result;
		});
	}
	this.buttonSaveClick = function (serviceUrl, items)
	{
		AppNotificationsFactory.CloseAllApplicationErrorNotifies();
		return SecureWSService.computePost(serviceUrl, items, 'ButtonSaveClick', true).then(function (result) {
		    PagesNavigationHelperService.manageActionResult(result);
		    return result;
		});
	}
	this.buttonSaveAndNewClick = function (serviceUrl, items)
	{
		AppNotificationsFactory.CloseAllApplicationErrorNotifies();
		return SecureWSService.computePost(serviceUrl, items, 'ButtonSaveAndNewClick', true).then(function (result) {
		    PagesNavigationHelperService.manageActionResult(result);
		    return result;
		});
	}
	this.buttonDiaryClick = function (serviceUrl, items)
	{
		AppNotificationsFactory.CloseAllApplicationErrorNotifies();
		return SecureWSService.computePost(serviceUrl, items, 'ButtonDiaryClick', true).then(function (result) {
		    PagesNavigationHelperService.manageActionResult(result);
		    return result;
		});
	}
	this.debounce = function (func, wait, immediate)
	{
		var timeout;
		return function(e) {
		    if(e.originalEvent == undefined ||
		      (
		        e.originalEvent.code != 'Tab' &&
		        e.originalEvent.key != 'Shift' &&
		        e.originalEvent.key != 'ArrowUp' &&
		        e.originalEvent.key != 'ArrowDown' &&
		        e.originalEvent.key != 'ArrowLeft' &&
		        e.originalEvent.key != 'ArrowRight' &&
		        e.originalEvent.key != 'End' &&
		        e.originalEvent.key != 'Home'
		      )) {
		        var context = this, args = arguments;
		        var later = function() {
		            timeout = null;
		            if (!immediate) func.apply(context, args);
		        };
		        var callNow = immediate && !timeout;
		        clearTimeout(timeout);
		        timeout = setTimeout(later, wait);
		        if (callNow) func.apply(context, args);
		    }
		};
	}
	this.buttonExportXLSClick = function (serviceUrl)
	{
		AppNotificationsFactory.CloseAllApplicationErrorNotifies();
		return SecureWSService.computeGet(serviceUrl, 'ButtonExportXLSClick', true).then(function (result) {
		    var blob = new Blob(['\ufeff', result.data], {type: 'application/vnd.xls'});
		    var objectUrl = URL.createObjectURL(blob);
		    var anchor = document.createElement('a');
		    anchor.download = result.headers('Content-Disposition').split(';')[1].trim().split('=')[1];
		    anchor.href = objectUrl;
		    document.body.appendChild(anchor);
		    anchor.click();
		    document.body.removeChild(anchor);
		});
	}
	this.hashField = function (serviceUrl, basicItemFieldRequestParamObj)
	{
		AppNotificationsFactory.CloseAllApplicationErrorNotifies();
		return SecureWSService.computePost(serviceUrl, basicItemFieldRequestParamObj, 'Hash'+basicItemFieldRequestParamObj.FieldName, true).then(result => {
		    if (result!=null) {
		        return result.data;
		    }
		});
	}
	this.uploadFile = function (serviceUrl, uploaderElement)
	{
		AppNotificationsFactory.CloseAllApplicationErrorNotifies();
		return SecureWSService.uploadFile(serviceUrl, uploaderElement);
	}
	this.downloadFile = function (serviceUrl, fieldName, clientFileName)
	{
		AppNotificationsFactory.CloseAllApplicationErrorNotifies();
		return SecureWSService.downloadFile(serviceUrl, 'Download' + fieldName).then(function(result) {
		    if(result != undefined) {
		        var blob = new Blob([result.data], {type: 'application/octet-stream'});
		        var objectUrl = URL.createObjectURL(blob);
		        var anchor = document.createElement('a');
		        anchor.download = clientFileName;
		        anchor.href = objectUrl;
		        document.body.appendChild(anchor);
		        anchor.click();
		        document.body.removeChild(anchor);
		    }
		});
	}
}
]);
kamApp.service('ValidationHelperService',function()
{
	function MatchRegex(textValue, regex)
	{
		if (textValue.match(regex)) {
		return true;
		}
		return false;
	}
	function TryParseDateTimeByFormats(dateValue, acceptedFormats)
	{
		for(var i = 0; i < acceptedFormats.length; i++) {
		var parsedDate = moment(dateValue, acceptedFormats[i], true);
		if(parsedDate.isValid())
		{
		    var currentDate = new Date();
		    switch(acceptedFormats[i]) {
		        case 'D/M/YYYY H:m:s':
		        case 'D/M/YYYY H:m:ss':
		        case 'D/M/YYYY H:mm:s':
		        case 'D/M/YYYY H:mm:ss':
		        case 'D/M/YYYY HH:m:s':
		        case 'D/M/YYYY HH:m:ss':
		        case 'D/M/YYYY HH:mm:s':
		        case 'D/M/YYYY HH:mm:ss':
		        case 'D/MM/YYYY H:m:s':
		        case 'D/MM/YYYY H:m:ss':
		        case 'D/MM/YYYY H:mm:s':
		        case 'D/MM/YYYY H:mm:ss':
		        case 'D/MM/YYYY HH:m:s':
		        case 'D/MM/YYYY HH:m:ss':
		        case 'D/MM/YYYY HH:mm:s':
		        case 'D/MM/YYYY HH:mm:ss':
		        case 'DD/M/YYYY H:m:s':
		        case 'DD/M/YYYY H:m:ss':
		        case 'DD/M/YYYY H:mm:s':
		        case 'DD/M/YYYY H:mm:ss':
		        case 'DD/M/YYYY HH:m:s':
		        case 'DD/M/YYYY HH:m:ss':
		        case 'DD/M/YYYY HH:mm:s':
		        case 'DD/M/YYYY HH:mm:ss':
		        case 'DD/MM/YYYY H:m:s':
		        case 'DD/MM/YYYY H:m:ss':
		        case 'DD/MM/YYYY H:mm:s':
		        case 'DD/MM/YYYY H:mm:ss':
		        case 'DD/MM/YYYY HH:m:s':
		        case 'DD/MM/YYYY HH:m:ss':
		        case 'DD/MM/YYYY HH:mm:s':
		        case 'DD/MM/YYYY HH:mm:ss':
		            break;
		        case 'D/M/YYYY H:m':
		        case 'D/M/YYYY H:mm':
		        case 'D/M/YYYY HH:m':
		        case 'D/M/YYYY HH:mm':
		        case 'D/MM/YYYY H:m':
		        case 'D/MM/YYYY H:mm':
		        case 'D/MM/YYYY HH:m':
		        case 'D/MM/YYYY HH:mm':
		        case 'DD/M/YYYY H:m':
		        case 'DD/M/YYYY H:mm':
		        case 'DD/M/YYYY HH:m':
		        case 'DD/M/YYYY HH:mm':
		        case 'DD/MM/YYYY H:m':
		        case 'DD/MM/YYYY H:mm':
		        case 'DD/MM/YYYY HH:m':
		        case 'DD/MM/YYYY HH:mm':
		            parsedDate._d.setSeconds(0);
		            break;
		        case 'D/M/YYYY':
		        case 'D/MM/YYYY':
		        case 'DD/M/YYYY':
		        case 'DD/MM/YYYY':
		            parsedDate._d.setHours(currentDate.getHours());
		            parsedDate._d.setMinutes(currentDate.getMinutes());
		            parsedDate._d.setSeconds(currentDate.getSeconds());
		            break;
		        case 'H:m:s':
		        case 'H:m:ss':
		        case 'H:mm:s':
		        case 'H:mm:ss':
		        case 'HH:m:s':
		        case 'HH:m:ss':
		        case 'HH:mm:s':
		        case 'HH:mm:ss':
		            parsedDate._d.setDate(currentDate.getDate());
		            parsedDate._d.setMonth(currentDate.getMonth());
		            parsedDate._d.setFullYear(currentDate.getFullYear());
		            break;
		        case 'H:m':
		        case 'H:mm':
		        case 'HH:m':
		        case 'HH:mm':
		            parsedDate._d.setDate(currentDate.getDate());
		            parsedDate._d.setMonth(currentDate.getMonth());
		            parsedDate._d.setFullYear(currentDate.getFullYear());
		            parsedDate._d.setSeconds(0);
		            break;
		    }
		    return parsedDate._d;
		}
		}
		return null;
	}
	this.RequiredDateValidation = function (wSDateTime)
	{
		if (wSDateTime.HasValue) {
		return true;
		}
		return false;
	}
	this.IsIntegerValidation = function (textValue)
	{
		return MatchRegex(textValue, /^[0-9]*$/);
	}
	this.TryParseDateTime = function (dateValue)
	{
		var acceptedFormats = [
		'D/M/YYYY H:m:s',
		'D/M/YYYY H:m:ss',
		'D/M/YYYY H:mm:s',
		'D/M/YYYY H:mm:ss',
		'D/M/YYYY HH:m:s',
		'D/M/YYYY HH:m:ss',
		'D/M/YYYY HH:mm:s',
		'D/M/YYYY HH:mm:ss',
		'D/MM/YYYY H:m:s',
		'D/MM/YYYY H:m:ss',
		'D/MM/YYYY H:mm:s',
		'D/MM/YYYY H:mm:ss',
		'D/MM/YYYY HH:m:s',
		'D/MM/YYYY HH:m:ss',
		'D/MM/YYYY HH:mm:s',
		'D/MM/YYYY HH:mm:ss',
		'DD/M/YYYY H:m:s',
		'DD/M/YYYY H:m:ss',
		'DD/M/YYYY H:mm:s',
		'DD/M/YYYY H:mm:ss',
		'DD/M/YYYY HH:m:s',
		'DD/M/YYYY HH:m:ss',
		'DD/M/YYYY HH:mm:s',
		'DD/M/YYYY HH:mm:ss',
		'DD/MM/YYYY H:m:s',
		'DD/MM/YYYY H:m:ss',
		'DD/MM/YYYY H:mm:s',
		'DD/MM/YYYY H:mm:ss',
		'DD/MM/YYYY HH:m:s',
		'DD/MM/YYYY HH:m:ss',
		'DD/MM/YYYY HH:mm:s',
		'DD/MM/YYYY HH:mm:ss',
		'D/M/YYYY H:m',
		'D/M/YYYY H:mm',
		'D/M/YYYY HH:m',
		'D/M/YYYY HH:mm',
		'D/MM/YYYY H:m',
		'D/MM/YYYY H:mm',
		'D/MM/YYYY HH:m',
		'D/MM/YYYY HH:mm',
		'DD/M/YYYY H:m',
		'DD/M/YYYY H:mm',
		'DD/M/YYYY HH:m',
		'DD/M/YYYY HH:mm',
		'DD/MM/YYYY H:m',
		'DD/MM/YYYY H:mm',
		'DD/MM/YYYY HH:m',
		'DD/MM/YYYY HH:mm',
		'D/M/YYYY',
		'D/MM/YYYY',
		'DD/M/YYYY',
		'DD/MM/YYYY',
		'D/M/YY H:m:s',
		'D/M/YY H:m:ss',
		'D/M/YY H:mm:s',
		'D/M/YY H:mm:ss',
		'D/M/YY HH:m:s',
		'D/M/YY HH:m:ss',
		'D/M/YY HH:mm:s',
		'D/M/YY HH:mm:ss',
		'D/MM/YY H:m:s',
		'D/MM/YY H:m:ss',
		'D/MM/YY H:mm:s',
		'D/MM/YY H:mm:ss',
		'D/MM/YY HH:m:s',
		'D/MM/YY HH:m:ss',
		'D/MM/YY HH:mm:s',
		'D/MM/YY HH:mm:ss',
		'DD/M/YY H:m:s',
		'DD/M/YY H:m:ss',
		'DD/M/YY H:mm:s',
		'DD/M/YY H:mm:ss',
		'DD/M/YY HH:m:s',
		'DD/M/YY HH:m:ss',
		'DD/M/YY HH:mm:s',
		'DD/M/YY HH:mm:ss',
		'DD/MM/YY H:m:s',
		'DD/MM/YY H:m:ss',
		'DD/MM/YY H:mm:s',
		'DD/MM/YY H:mm:ss',
		'DD/MM/YY HH:m:s',
		'DD/MM/YY HH:m:ss',
		'DD/MM/YY HH:mm:s',
		'DD/MM/YY HH:mm:ss',
		'D/M/YY H:m',
		'D/M/YY H:mm',
		'D/M/YY HH:m',
		'D/M/YY HH:mm',
		'D/MM/YY H:m',
		'D/MM/YY H:mm',
		'D/MM/YY HH:m',
		'D/MM/YY HH:mm',
		'DD/M/YY H:m',
		'DD/M/YY H:mm',
		'DD/M/YY HH:m',
		'DD/M/YY HH:mm',
		'DD/MM/YY H:m',
		'DD/MM/YY H:mm',
		'DD/MM/YY HH:m',
		'DD/MM/YY HH:mm',
		'D/M/YY',
		'D/MM/YY',
		'DD/M/YY',
		'DD/MM/YY',
		'H:m:s',
		'H:m:ss',
		'H:mm:s',
		'H:mm:ss',
		'HH:m:s',
		'HH:m:ss',
		'HH:mm:s',
		'HH:mm:ss',
		'H:m',
		'H:mm',
		'HH:m',
		'HH:mm'
		];
		return TryParseDateTimeByFormats(dateValue, acceptedFormats);
	}
	this.TryParseDate = function (dateValue)
	{
		var acceptedFormats = [
		'D/M/YYYY',
		'D/MM/YYYY',
		'DD/M/YYYY',
		'DD/MM/YYYY'
		];
		return TryParseDateTimeByFormats(dateValue, acceptedFormats);
	}
}
);
kamApp.service('MenusHelperService',['SecureWSService',function(SecureWSService)
{
	this.getMenuSettings = function (serviceUrl)
	{
		return SecureWSService.computeGet(serviceUrl, 'Get', true).then(function (result) {
		return result.data;
		});
	}
	this.setItems = function (menuItems, menuRTI)
	{
		if (menuItems != null && menuRTI != null) {
		for (var i = 0; i < menuRTI.length; i++) {
		    for (var j = 0; j < menuItems.length; j++) {
		        if (menuRTI[i].Name === menuItems[j].Name) {
		            menuItems[j].Visible = menuRTI[i].Visible;
		            menuItems[j].Caption = menuRTI[i].Caption;
		        }
		    }
		}
		}
	}
	this.selectItem = function (menuItems, selectedEntryHref)
	{
		var selectedItems = [];
		if (menuItems != null) {
		    for (var i = 0; i < menuItems.length; i++) {
		        if (menuItems[i].Href === selectedEntryHref || this.subMenuContainsItem(menuItems[i], selectedEntryHref)) {
		            selectedItems.push(menuItems[i]);
		            menuItems[i].Selected = true;
		        }
		        else {
		            menuItems[i].Selected = false;
		        }
		    }
		}
		return selectedItems;
	}
	this.subMenuContainsItem = function (menuItem, selectedEntryHref)
	{
		if (menuItem.Href === selectedEntryHref) {
		return true;
		} else {
		if (menuItem.menuItems === undefined) {
		    return false;
		} else {
		    return menuItem.menuItems.some(subItem => this.subMenuContainsItem(subItem, selectedEntryHref));
		}
		}
	}
	this.isItemVisible = function (menuItemRTI)
	{
		return menuItemRTI.CanRead && menuItemRTI.GlobalVisible;
	}
	this.hasSubItemsVisible = function (menuItemRTI)
	{
		return this.hasOneVisible(this, menuItemRTI);
	}
	this.hasOneVisible = function (menuHelperServiceIstance, menuItemRTI)
	{
		if(Object.keys(menuItemRTI.ItemsRTIs).length === 0) {
		return menuHelperServiceIstance.isItemVisible(menuItemRTI.ItemRTI);
		} else {
		if(menuHelperServiceIstance.isItemVisible(menuItemRTI.ItemRTI)) {
		    return Object.values(menuItemRTI.ItemsRTIs).some(itemRTI => this.hasOneVisible(menuHelperServiceIstance, itemRTI));
		}
		return false;
		}
	}
}
]);
