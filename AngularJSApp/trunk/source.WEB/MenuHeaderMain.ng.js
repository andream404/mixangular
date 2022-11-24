'use strict'
var kamApp = angular.module('AngularJSApp');
kamApp.controller('MenuHeaderMainController',['$scope','$location','$controller','MenusHelperService',function($scope,$location,$controller,MenusHelperService)
{
	$controller('AbstractMenuController', { $scope: $scope });
	$scope.menuItems = [{ Name: 'Index', Visible: false, Selected: false, Href: '#/Index', Caption: '' },
	{ Name: 'Dizionario', Visible: false, Selected: false, Href: '#/Lingue', Caption: '', menuItems: [{ Name: 'Lingue', Visible: false, Selected: false, Href: '#/Lingue', Caption: '' },
	{ Name: 'Stringhe', Visible: false, Selected: false, Href: '#/Stringhe', Caption: '' },
	{ Name: 'Traduzioni', Visible: false, Selected: false, Href: '#/Traduzioni', Caption: '' }] }]
	;
	$scope.MenuRTI = {}
	;
	function InitRTI(menuRTIs)
	{
		$scope.MenuRTIs = menuRTIs;
		InitMenuItemsRTI(menuRTIs.ItemsRTIs);
	}
	function InitMenuItemsRTI(itemsRTIs)
	{
		$scope.menuItems[0].Visible = itemsRTIs.MenuItem0RTIs.ItemRTI.CanRead && itemsRTIs.MenuItem0RTIs.ItemRTI.GlobalVisible;
		$scope.menuItems[1].Visible = itemsRTIs.MenuItem1RTIs.ItemRTI.CanRead && itemsRTIs.MenuItem1RTIs.ItemRTI.GlobalVisible && MenusHelperService.hasSubItemsVisible(itemsRTIs.MenuItem1RTIs);
		$scope.menuItems[1].menuItems[0].Visible = itemsRTIs.MenuItem1RTIs.ItemsRTIs.MenuItem0RTIs.ItemRTI.CanRead && itemsRTIs.MenuItem1RTIs.ItemsRTIs.MenuItem0RTIs.ItemRTI.GlobalVisible;
		$scope.menuItems[1].menuItems[1].Visible = itemsRTIs.MenuItem1RTIs.ItemsRTIs.MenuItem1RTIs.ItemRTI.CanRead && itemsRTIs.MenuItem1RTIs.ItemsRTIs.MenuItem1RTIs.ItemRTI.GlobalVisible;
		$scope.menuItems[1].menuItems[2].Visible = itemsRTIs.MenuItem1RTIs.ItemsRTIs.MenuItem2RTIs.ItemRTI.CanRead && itemsRTIs.MenuItem1RTIs.ItemsRTIs.MenuItem2RTIs.ItemRTI.GlobalVisible;
	}
	function InitEntries(menuEntries)
	{
		$scope.menuItems[0].Caption = menuEntries.MenuEntry0Entries.Entry;
		$scope.menuItems[1].Caption = menuEntries.MenuEntry1Entries.Entry;
		$scope.menuItems[1].menuItems[0].Caption = menuEntries.MenuEntry1Entries.Entries.MenuEntry0Entries.Entry;
		$scope.menuItems[1].menuItems[1].Caption = menuEntries.MenuEntry1Entries.Entries.MenuEntry1Entries.Entry;
		$scope.menuItems[1].menuItems[2].Caption = menuEntries.MenuEntry1Entries.Entries.MenuEntry2Entries.Entry;
	}
	$scope.OnPageLoaded = function ()
	{
		MenusHelperService.getMenuSettings('api/MenuHeaderMain').then(function (result) {
		InitRTI(result.MenuRTIs);
		InitEntries(result.MenuEntries);
		MenusHelperService.selectItem($scope.menuItems, '#/' + $location.path().substring(1));
		$scope.SetMenuAsLoaded();
		});
	}
	$scope.AfterSetMenuAsLoaded = function ()
	{
		$scope.MenuRTI.callAutoHideLi();
	}
}
]);
