'use strict'
var kamApp = angular.module('AngularJSApp', ['ngResource','ngRoute','ngCookies','angular-md5','ngAnimate','oc.lazyLoad','ui.router','ui.utils','ui.select','ui.bootstrap','ngSanitize','AngularJSAppModuleBsn','mentio']);
kamApp.directive('ngEnter',function()
{
	return function (scope, element, attrs) {
	    element.bind('keydown keypress', function (event) {
	        if (event.which === 13) {
	            scope.$apply(function () {
	                scope.$eval(attrs.ngEnter);
	            });
	            event.preventDefault();
	        }
	    });
	};
}
);
kamApp.directive('decimalKam4Input',function()
{
	return function (scope, element, attrs) {
	    element.bind('keydown keypress', function (event) {
	        if (event.which === 188) {
	            if(document.selection){
	                var range = document.selection.createRange();
	                range.text = '.';
	            }
	            else if(this.selectionStart || this.selectionStart == '0') {
	              var start = this.selectionStart;
	              var end = this.selectionEnd;
	              $(this).val($(this).val().substring(0, start) + '.' + $(this).val().substring(end, $(this).val().length));
	              this.selectionStart = start + 1;
	              this.selectionEnd = start + 1;
	            }
	            else {
	              $(this).val($(this).val() + '.');
	            }
	            event.preventDefault();
	            event.stopPropagation();
	        }
	    });
	};
}
);
kamApp.directive('kam4menu',function()
{
	return {
	    restrict: 'E',
	    replace: false,
	    scope: { name: '=kam4menuName' },
	    templateUrl: 'AbstractMenu.html?version=ebd7ac43-b02a-4a6d-8050-8567c9aa4754',
	    controller: 'MenuController',
	    controllerAs: 'MC'
	};
}
);
kamApp.directive('onKeyupFn',function()
{
	return function (scope, elm, attrs) {
	    //Evaluate the variable that was passed
	    //In this case we're just passing a variable that points
	    //to a function we'll call each keyup
	    var keyupFn = scope.$eval(attrs.onKeyupFn);
	    elm.bind('keyup', function (evt) {
	        //$apply makes sure that angular knows
	        //we're changing something
	        scope.$apply(function () {
	            keyupFn.call(scope, evt.which);
	        });
	    });
	};
}
);
kamApp.directive('kam4controlscontainer',['$route','$q',function($route,$q)
{
	return {
	    restrict: 'A',
	    templateUrl: 'ControlsContainer.html?version=ebd7ac43-b02a-4a6d-8050-8567c9aa4754',
	    link: function (scope, element, attrs) {
	        scope.routeChangedDef = $q.defer();
	        scope.$on('$routeChangeSuccess', function (event, nextRoute, currentRoute) {
	            if (nextRoute != undefined && nextRoute.loadedTemplateUrl != undefined) {
	                scope.pageLoadedDef = $q.defer();
	                switch (nextRoute.loadedTemplateUrl.toLowerCase()) {
	        case 'traduzioni.html?version=ebd7ac43-b02a-4a6d-8050-8567c9aa4754':
	            event.currentScope.menu.setMenuList([1], [{ name: 'MenuHeaderMain', contextLevel: 1, position: 'top' }
	         ]);
	         break;
	        case 'lingue.html?version=ebd7ac43-b02a-4a6d-8050-8567c9aa4754':
	            event.currentScope.menu.setMenuList([1], [{ name: 'MenuHeaderMain', contextLevel: 1, position: 'top' }
	         ]);
	         break;
	        case 'diario.html?version=ebd7ac43-b02a-4a6d-8050-8567c9aa4754':
	            event.currentScope.menu.setMenuList([1], [{ name: 'MenuHeaderMain', contextLevel: 1, position: 'top' }
	         ]);
	         break;
	        case 'logout.html?version=ebd7ac43-b02a-4a6d-8050-8567c9aa4754':
	            event.currentScope.menu.setMenuList([1], [{ name: 'MenuHeaderMain', contextLevel: 1, position: 'top' }
	         ]);
	         break;
	        case 'index.html?version=ebd7ac43-b02a-4a6d-8050-8567c9aa4754':
	            event.currentScope.menu.setMenuList([1], [{ name: 'MenuHeaderMain', contextLevel: 1, position: 'top' }
	         ]);
	         break;
	        case 'stringhe.html?version=ebd7ac43-b02a-4a6d-8050-8567c9aa4754':
	            event.currentScope.menu.setMenuList([1], [{ name: 'MenuHeaderMain', contextLevel: 1, position: 'top' }
	         ]);
	         break;
	                }
	                event.currentScope.routeChangedDef.resolve();
	            };
	        });
	    }
	};
}
]);
kamApp.directive('dateTimePicker',['$timeout','$filter','ValidationHelperService',function($timeout,$filter,ValidationHelperService)
{
	return {
	    require: '?ngModel',
	    restrict: 'AE',
	    scope: {
	        pick12HourFormat: '@',
	        language: '@',
	        useCurrent: '@',
	        location: '@',
	        format: '@',
	        sideBySide: '@',
	        onDatetimeChange: '&'
	    },
	    link: function (scope, elem, attrs, ngModelCtrl) {
	        elem.datetimepicker({
	            pick12HourFormat: scope.pick12HourFormat,
	            locale: scope.language,
	            useCurrent: (scope.useCurrent == 'true'),
	            format: scope.format
	        });
	        elem.on('dp.change', function (e) {
	            ngModelCtrl.$viewValue = e.target.value;
	        });
	        elem.on('blur', function (e) {
	            var parsedDate = null;
	            var filterFormat = null;
	            switch(scope.format) {
	                case 'DD/MM/YYYY HH:mm:ss':
	                    parsedDate = ValidationHelperService.TryParseDateTime(ngModelCtrl.$viewValue);
	                    filterFormat = 'dd/MM/yyyy HH:mm:ss';
	                    break;
	                case 'DD/MM/YYYY':
	                    parsedDate = ValidationHelperService.TryParseDate(ngModelCtrl.$viewValue);
	                    filterFormat = 'dd/MM/yyyy';
	                    break;
	                case 'HH:mm:ss':
	                    parsedDate = ValidationHelperService.TryParseDateTime(ngModelCtrl.$viewValue);
	                    filterFormat = 'HH:mm:ss';
	                    break;
	            }
	            var dateValue = '';
	            if(parsedDate != null) {
	                dateValue = $filter('date')(parsedDate, filterFormat);
	            }
	            scope.onDatetimeChange({value: dateValue});
	        });
	        elem.on('paste', function(e) {
	            $timeout(function() {
	                var parsedDate = null;
	                var filterFormat = null;
	                switch(scope.format) {
	                    case 'DD/MM/YYYY HH:mm:ss':
	                        parsedDate = ValidationHelperService.TryParseDateTime(ngModelCtrl.$viewValue);
	                        filterFormat = 'dd/MM/yyyy HH:mm:ss';
	                        break;
	                    case 'DD/MM/YYYY':
	                        parsedDate = ValidationHelperService.TryParseDate(ngModelCtrl.$viewValue);
	                        filterFormat = 'dd/MM/yyyy';
	                        break;
	                }
	                if(parsedDate != null) {
	                    elem.data('DateTimePicker').date($filter('date')(parsedDate, filterFormat));
	                }
	            }, 1);
	        });
	    }
	};
}
]);
kamApp.directive('checkboxIndeterminate',function()
{
	return {
	    require: '?ngModel',
	    restrict: 'A',
	    scope: {
	        onCheckboxChange: '&'
	    },
	    link: function(scope, el, attrs, ctrl) {
	        var truthy = true;
	        var falsy = false;
	        var nully = null;
	        ctrl.$formatters = [];
	        ctrl.$parsers = [];
	        ctrl.$render = function() {
	            var d = ctrl.$viewValue;
	            el.data('checked', d);
	            switch(d)
	            {
	                case truthy:
	                    el.prop('indeterminate', false);
	                    el.prop('checked', true);
	                    break;
	                case falsy:
	                    el.prop('indeterminate', false);
	                    el.prop('checked', false);
	                    break;
	                default:
	                    el.prop('indeterminate', true);
	            }
	        };
	        el.bind('click', function() {
	            var d;
	            switch(el.data('checked'))
	            {
	                case falsy:
	                    d = truthy;
	                    break;
	                case truthy:
	                     if(el[0].attributes['notnullable'].value == 'true')
	                        d = falsy;
	                    else
	                        d = nully;
	                    break;
	                default:
	                    d = falsy;
	                    break;
	            }
	            ctrl.$setViewValue(d);
	            scope.$apply(ctrl.$render);
	            if(scope.onCheckboxChange != null) {
	                scope.onCheckboxChange();
	            }
	        });
	    }
	};
}
);
kamApp.directive('checkboxRequired',function()
{
	return {
	    require: 'ngModel',
	    restrict: 'A',
	    link: function (scope, elem, attrs, ngModel) {
	        ngModel.$validators.required = function(modelValue, viewValue){
	            if(ngModel.$viewValue == null) {
	                return false;
	            }
	            return true;
	        };
	    }
	};
}
);
kamApp.directive('pgHorizontalMenu',function()
{
	return {
	    restrict: 'A',
	    scope: {
	        control : '='
	    },
	    link: function(scope, element, attrs) {
	        scope.internalControl = scope.control || {};
	        scope.control.callAutoHideLi = function(){
	            autoHideLi();
	            initChildLiDirection();
	        }
	        var animationTimer;
	        var hMenu = $(element);
	        $(document).on('click', '.menu-bar ul li', function(event){
	            event.stopPropagation();
	            if($(this).children('ul').length == 0){
	                $('body').toggleClass('horizontal-menu-open');
	                if(!$('.horizontal-menu-backdrop').length){
	                    $('.header').append('<div class="horizontal-menu-backdrop"/>');
	                    $('.horizontal-menu-backdrop').fadeToggle('fast');
	                } else {
	                    $('.horizontal-menu-backdrop').fadeToggle('fast', function(){
	                        $(this).remove();
	                    });
	                }
	                $('.menu-bar').removeClass('open');
	                return;
	            }
	            if($(window).width() < 992) {
	                var parent = $(this).parent();
	                var el = $(this);
	                var li = parent.find('li');
	                var sub = $(this).children('ul');
	                var a = $(this).children('a');
	                if(el.hasClass('open active')){
	                    el.find('.arrow').removeClass('open active');
	                    sub.slideUp(200, function() {
	                        el.removeClass('open active');
	                    });
	                }else{
	                    parent.find('li.open').find('ul').slideUp(200);
	                    parent.find('li.open').find('a').find('.arrow').removeClass('open active');
	                    parent.find('li.open').removeClass('open active');
	                    a.find('.arrow').addClass('open active');
	                    sub.slideDown(200, function() {
	                        el.addClass('open active');
	                    });
	                }
	            }
	            else {
	                var sub = $(this).children('ul');
	                if($(sub).hasClass('sub-menu') == false){
	                    if($(this).hasClass('opening')){
	                        _hideMenu($(this));
	                    }
	                    else{
	                        _showMenu($(this));
	                    }
	                }
	            }
	        });
	        var resizeTimer;
	        $(window).on('resize', function(e) {
	            var menubar = $('.menu-bar');
	            // rimuove style dalle ul
	            var ul = menubar.find('ul');
	            ul.each(function(ulElement){
	                $(this).removeAttr('style');
	            });
	            // rimuove l'open active da freccia e oggetto li aperto
	            menubar.find('li.open').find('a').find('arrow').removeClass('open active');
	            menubar.find('li.open').removeClass('open opening active');
	            clearTimeout(resizeTimer);
	            resizeTimer = setTimeout(function() {
	                clearMenuCustomStyle();
	                autoHideLi();
	                initChildLiDirection();
	            }, 250);
	        });
	        $(document).on('click', 'body', function() {
	            if($(window).width() > 991) {
	                $('.menu-bar ul li a .arrow').removeClass('open opening');
	                $('.menu-bar ul li').removeClass('open opening');
	                $('body').find('.ghost-nav-dropdown').remove();
	            }
	        });
	        function autoHideLi(){
	            var hMenu  = $(element);
	            if(hMenu.length == 0){
	                return
	            }
	            var hMenuRect = hMenu[0].getBoundingClientRect();
	            var liTotalWidth = 0;
	            var liCount = 0;
	            hMenu.children('ul').children('li.more').remove();
	            var lastPossibileLiIdx = -1;
	            var possibileLiCount = 0;
	            var maxWidestHiddenLiIdx = -1;
	            var menuLiList = [];
	            hMenu.children('ul').children('li').each(function( index ) {
	                $(this).removeAttr('style');
	                liTotalWidth = liTotalWidth + $(this).outerWidth(true);
	                menuLiList.push( {
	                    OuterWidth: $(this).outerWidth(true),
	                    ProgressiveWidth: liTotalWidth
	                });
	                if(hMenuRect.width >= liTotalWidth) {
	                    lastPossibileLiIdx++;
	                    possibileLiCount++;
	                }
	                else if(maxWidestHiddenLiIdx == -1 || $(this).outerWidth(true) > menuLiList[maxWidestHiddenLiIdx].OuterWidth) {
	                    maxWidestHiddenLiIdx = liCount;
	                }
	                liCount++;
	            });
	            if($(window).width() < 992 || menuLiList.length == 0 || possibileLiCount == liCount || possibileLiCount == 0) {
	                return;
	            }
	            while(menuLiList[lastPossibileLiIdx].ProgressiveWidth + menuLiList[maxWidestHiddenLiIdx].OuterWidth > hMenuRect.width) {
	                if(menuLiList[lastPossibileLiIdx].OuterWidth > menuLiList[maxWidestHiddenLiIdx].OuterWidth) {
	                    maxWidestHiddenLiIdx = lastPossibileLiIdx;
	                }
	                lastPossibileLiIdx--;
	                possibileLiCount--;
	            }
	            if(liCount > possibileLiCount){
	                var wrapper = createWrapperLI(hMenu);
	                for(var i = possibileLiCount; i < liCount; i++){
	                    var currentLi = hMenu.children('ul').children('li').eq(i);
	                    var clone = currentLi.clone();
	                    clone.children('ul').addClass('sub-menu');
	                    wrapper.children('ul').append(clone);
	                    currentLi.hide();
	                }
	            }
	        }
	        function createWrapperLI(hMenu){
	            var li =hMenu.children('ul').append('<li class="more"><a href="javascript:;"><span class="title"><i class="pg pg-more"></i></span></a><ul></ul></li>');
	            li = hMenu.children('ul').children('li.more');
	            return li;
	        }
	        function _hideMenu($el){
	            var ul  = $($el.children('ul')[0]);
	            var ghost = $('<div class="ghost-nav-dropdown"></div>');
	            if(ul.length == 0){
	                return;
	            }
	            var rect = ul[0].getBoundingClientRect();
	            ghost.css({
	                'width':rect.width+'px',
	                'height':rect.height+'px',
	                'z-index':2147483647
	            })
	            $el.append(ghost);
	            var timingSpeed = ul.children('li').css('transition-duration');
	            timingSpeed = parseInt(parseFloat(timingSpeed) * 1000);
	            $el.addClass('closing');
	            window.clearTimeout(animationTimer);
	            animationTimer = window.setTimeout(function(){
	                ghost.height(0);
	                $el.removeClass('open opening closing');
	            },timingSpeed - 80);
	        }
	        function _showMenu($el){
	            var ul  = $($el.children('ul')[0]);
	            var ghost = $('<div class="ghost-nav-dropdown"></div>');
	            $el.children('.ghost-nav-dropdown').remove();
	            $el.addClass('open').siblings().removeClass('open opening');
	            if(ul.length == 0){
	                return;
	            }
	            var rect = ul[0].getBoundingClientRect();
	            ghost.css({
	                'width':rect.width+'px',
	                'height':'0px'
	            });
	            $el.append(ghost);
	            ghost.height(rect.height);
	            var timingSpeed = ghost.css('transition-duration');
	            timingSpeed = parseInt(parseFloat(timingSpeed) * 1000)
	            window.clearTimeout(animationTimer);
	            animationTimer = window.setTimeout(function(){
	                $el.addClass('opening');
	                ghost.remove()
	            },timingSpeed);
	        }
	        function initChildLiDirection(){
	            if($(window).width() < 992) {
	                return;
	            }
	            hMenu.addClass('HorizontalMenuHidden');
	            hMenu.children('ul').children('li').each(function(){
	                $(this).addClass('open opening');
	            });
	            hMenu.find('ul.sub-menu').each(function(){
	                $(this).addClass('HorizontalSubMenuOpacity');
	            });
	            hMenu.children('ul').children('li').children('ul').children('li').each(function(){
	                calcWithInViewport($(this));
	            });
	            hMenu.children('ul').children('li').each(function(){
	                $(this).removeClass('open opening');
	            });
	            hMenu.find('ul.sub-menu').each(function(){
	                $(this).removeClass('HorizontalSubMenuOpacity');
	            });
	            hMenu.removeClass('HorizontalMenuHidden');
	        }
	        function calcWithInViewport($Li){
	            var $UlSubMenu = angular.element($Li).children('ul.sub-menu');
	            if($UlSubMenu.length > 0){
	                var Traslate3dTx = 0;
	                var RectThatLi = $Li[0].getBoundingClientRect();
	                var RectUlSubMenu = $UlSubMenu[0].getBoundingClientRect();
	                var Traslate3dString = 'translate3d(0, 0, 0)';
	                if($UlSubMenu.hasClass('open-left')){
	                    Traslate3dTx -= (RectUlSubMenu.width + RectThatLi.width + 5);
	                    Traslate3dString = 'translate3d('+Traslate3dTx+'px, 0, 0)';
	                    $UlSubMenu.css('transform', Traslate3dString);
	                    editArrowAndImgMarginUl($Li.parent("ul"));
	                    editArrowAndImgMarginUl($UlSubMenu);
	                }
	                else {
	                    var WidthInViewport = RectThatLi.left + RectThatLi.width + RectUlSubMenu.width;
	                    if(WidthInViewport > $(window).width()){
	                        Traslate3dTx -= (RectUlSubMenu.width + RectThatLi.width + 5);
	                        Traslate3dString = 'translate3d('+Traslate3dTx+'px, 0, 0)';
	                        $UlSubMenu.css('transform', Traslate3dString);
	                        editArrowAndImgMarginUl($Li.parent("ul"));
	                        editArrowAndImgMarginUl($UlSubMenu);
	                        $Li.find('ul.sub-menu').each(function(){
	                            angular.element(this).addClass('open-left');
	                        });
	                    }
	                }
	                $UlSubMenu.children('li').each(function(){
	                    calcWithInViewport($(this));
	                });
	            }
	            else {
	                return;
	            }
	        }
	        function editArrowAndImgMarginUl($Ul){
	            var CheckArrowExist = $Ul.children('li').children('a').children('div').children('span.arrow').length > 0;
	            if(CheckArrowExist){
	                $Ul.children('li').each(function(){
	                    if($(this).children('a').children('div').children('span.arrow').length > 0){
	                        $(this).children('a').children('div').children('span.arrow').addClass('arrow-left');
	                    }
	                    else if($(this).children('a').children('div').length > 0){
	                        $(this).children('a').children('div').addClass('DivMenuMarginLeft');
	                    }
	                });
	            }
	        }
	        function clearMenuCustomStyle(){
	            hMenu.find('ul.open-left').each(function(){
	                $(this).removeClass('open-left');
	            });
	            hMenu.find('ul.default-transform').each(function(){
	                $(this).removeClass('default-transform');
	            });
	            hMenu.find('span.arrow-left').each(function(){
	                $(this).removeClass('arrow-left');
	            });
	            hMenu.find('div.DivMenuMarginLeft').each(function(){
	                $(this).removeClass('DivMenuMarginLeft');
	            });
	        }
	        $(document).on('mouseenter', '.menu-bar > ul > li > ul > li', function() {
	            var $Li = $(this);
	            var $ParentUl = $Li.parent('ul');
	            var LiPositionInUl = $Li.index();
	            $ParentUl.children("li").slice(LiPositionInUl+1).each(function(){
	                $(this).css('z-index', '-1');
	            });
	        });
	        $(document).on('mouseleave', '.menu-bar > ul > li > ul > li', function() {
	            var $Li = $(this);
	            var $ParentUl = $Li.parent('ul');
	            var LiPositionInUl = $Li.index();
	            $ParentUl.children("li").slice(LiPositionInUl+1).each(function(){
	                $(this).css('z-index', '');
	            });
	        });
	    }
	};
}
);
kamApp.directive('pgHorizontalMenuToggle',function()
{
	return {
	    restrict: 'A',
	    link: function(scope, element, attrs) {
	        $(element).on('click touchstart', function(e) {
	            e.preventDefault();
	            $('body').toggleClass('horizontal-menu-open');
	            if(!$('.horizontal-menu-backdrop').length){
	                $('.header').append('<div class="horizontal-menu-backdrop"/>');
	                $('.horizontal-menu-backdrop').fadeToggle('fast');
	            } else {
	                $('.horizontal-menu-backdrop').fadeToggle('fast', function(){
	                    $(this).remove();
	                });
	            }
	            $('.menu-bar').toggleClass('open');
	        });
	    }
	}
}
);
kamApp.directive('pgSecondarySidebar',function()
{
	return {
	    restrict: 'A',
	    link: function(scope, element, attrs) {
	        $(element).on('click', '.main-menu li a', function(e) {
	             if ($(this).parent().children('.sub-menu') === false) {
	                return;
	             }
	            var el = $(this);
	            var parent = $(this).parent().parent();
	            var li = $(this).parent();
	            var sub = $(this).parent().children('.sub-menu');
	            if(li.hasClass('open active')){
	                   el.children('.arrow').removeClass('open active');
	                   // rimuove open active da tutti i figli
	                   li.find('li.open').children('.sub-menu').slideUp(200);
	                  li.find('li.open').children('a').children('.arrow').removeClass('open active');
	                  li.find('li.open').removeClass('open active');
	                   sub.slideUp(200, function() {
	                    li.removeClass('open active');
	                   });
	            }else{
	                   parent.children('li.open').children('.sub-menu').slideUp(200);
	                   parent.children('li.open').children('a').children('.arrow').removeClass('open active');
	                   parent.children('li.open').removeClass('open active');
	                   el.children('.arrow').addClass('open active');
	                   sub.slideDown(200, function() {
	                    li.addClass('open active');
	                   });
	            }
	            e.stopPropagation();
	        });
	    }
	}
}
);
kamApp.directive('pgSecondarySidebarToggle',function()
{
	return {
	    restrict: 'A',
	    link: function(scope, element, attrs) {
	        $(element).on('click', function(e) {
	            e.stopPropagation();
	            var toggleRect = $(this).get(0).getBoundingClientRect();
	            var menu  = $('div[pg-secondary-sidebar]');
	            if(menu.hasClass('open')){
	                menu.removeClass('open');
	                menu.removeAttr('style');
	            }
	            else{
	                menu.addClass('open')
	                var menuRect = menu.get(0).getBoundingClientRect();
	                menu.css({
	                    top : toggleRect.bottom,
	                    'max-height':  ($(window).height() - toggleRect.bottom),
	                    left: $(window).width() / 2 - menuRect.width/ 2,
	                    'visibility': 'visible',
	                });
	            }
	        });
	        $('body').on('click', function(e) {
	            var menu  = $('div[pg-secondary-sidebar]');
	            if(menu.hasClass('open')){
	                menu.removeClass('open');
	                menu.removeAttr('style');
	                // rimuove open active da tutti i figli
	                   menu.find('li.open').children('.sub-menu').slideUp(200);
	                  menu.find('li.open').children('a').children('.arrow').removeClass('open active');
	                  menu.find('li.open').removeClass('open active');
	            }
	        });
	        $(window).on('resize', function(e) {
	            var menu  = $('div[pg-secondary-sidebar]');
	            if(menu.hasClass('open')){
	                menu.removeClass('open');
	                menu.removeAttr('style');
	                // rimuove open active da tutti i figli
	                   menu.find('li.open').children('.sub-menu').slideUp(200);
	                  menu.find('li.open').children('a').children('.arrow').removeClass('open active');
	                  menu.find('li.open').removeClass('open active');
	            }
	        });
	    }
	}
}
);
kamApp.directive('pgTabs',['$compile','$window',function($compile,$window)
{
	return {
	    restrict: 'A',
	    link: function(scope, element, attrs) {
	        var drop = $(element);
	        drop.addClass('hidden-sm-down');
	        var content = '<select class="cs-select cs-skin-slide full-width pg-tab-mobile" data-init-plugin="cs-select">'
	        for(var i = 1; i <= drop.children('li').length; i++){
	            var li = drop.children('li:nth-child('+i+')');
	            var selected ='';
	            if(li.children('a').hasClass('active')){
	                selected='selected';
	            }
	            var tabRef = li.children('a').attr('href');
	            if(tabRef == '#' || ''){
	                tabRef = li.children('a').attr('data-target')
	            }
	            content +='<option value="'+ tabRef+'" '+selected+'>';
	            content += '{{' + li.children('a').attr('ng-bind') + '}}';
	            //content += li.children('a').text();
	            content += '</option>';
	        }
	        content +='</select>'
	        drop.after(content);
	        var select = drop.next()[0];
	        $(select).on('change', function (e) {
	            $window.location.replace(this.value);
	        })
	        $(select).wrap('<div class="nav-tab-dropdown cs-wrapper full-width hidden-md-up"></div>');
	        var select = new SelectFx(select);
	        $compile($(select))(scope);
	        $(select.selEl).find('span.cs-placeholder')[0].innerHTML = '{{SelectedItem.Caption}}';
	        $compile($(select.selEl))(scope);
	        $.each(select.selOpts, function(i){
	            $compile($(this))(scope);
	        });
	    }
	}
}
]);
kamApp.directive('pgCard',function()
{
	return {
	    restrict: 'A',
	    link: function(scope, element, attrs) {
	        scope.CenterScroll = function() {
	            var progressCircle = $(element).find('[class^="progress-circle"]');
	            if(progressCircle.length > 0){
	                var
	                w = $(window).height(), // window height
	                s = $(window).scrollTop(), // window scrollTop position
	                t = progressCircle.parent().parent().offset().top, // parent position in window
	                h = progressCircle.parent().parent().height(), // parent height
	                r = (w+s-t), // initial position
	                b = h-r, // parent bottom position
	                v=0;
	                if( t < s ){
	                    /* parent's top is above top of viewport */
	                    if( 0 < b ){
	                        /*
	                        parent bottom below viewport bottom
	                        child centered in window plus the amount scrolled, minus parent's offset
	                        */
	                        v = (w/2)+s-t;
	                   }else{
	                        /*
	                        parent bottom above viewport bottom
	                        scroll minus parent offset plus parent height
	                        */
	                        v = (s-t+h)/2;
	                   }
	                }else{
	                    /* parent's top is below top of viewport */
	                    if( 0 < b ){
	                        /*
	                        parent bottom below viewport bottom
	                        remainder of visible area
	                        */
	                        v = r/2;
	                    }else{
	                        /*
	                        parent bottom above viewport bottom
	                        height of parent
	                        */
	                        v = h/2;
	                    }
	                }
	                progressCircle.css("top", v);
	            }
	        }
	        $('.page-container').on('scroll resize', scope.CenterScroll);
	        scope.CenterScroll();
	    }
	}
}
);
kamApp.directive('pgDropzone',['$compile','GlobalSettingsFactory',function($compile,GlobalSettingsFactory)
{
	return {
	    require: '?ngModel',
	    restrict: 'AE',
	    scope: {
	        fileUploadUrl: '@',
	        onAfterInit: '&',
	        onChange: '&',
	        onDownloadClick: '&',
	        isEnable: '=',
	        onFileError: '&'
	    },
	    link: function(scope, element, attrs){
	        var config = {
	            url: scope.fileUploadUrl,
	            maxFilesize: GlobalSettingsFactory.GlobalSettings.MaxRequestLengthInMB,
	            parallelUploads: 1,
	            autoProcessQueue: false,
	            addRemoveLinks: true,
	            createImageThumbnails: false,
	            dictFileTooBig: scope.$parent.GlobalEntries.PageEntries.FormEntries.FileUploaderFileSizeExcedeedErrorEntry,
	            accept: function(file, done) {
	                if (file.size == 0) {
	                    done(scope.$parent.GlobalEntries.PageEntries.FormEntries.FileUploaderFileEmptyErrorEntry);
	                } else {
	                    done();
	                }
	            }
	        };
	        var eventHandlers = {
	            'addedfile': function(file) {
	                if (this.files[1]!=null) {
	                    this.removeFile(this.files[0]);
	                }
	                EditPreviewElement(file);
	                if(!file.remoteFile) {
	                    scope.onChange({'file': file});
	                    scope.$apply();
	                }
	                else {
	                    this.files.push(file);
	                }
	            },
	            'removedfile': function(file) {
	                scope.manageEnabledDropzone(scope.isEnable);
	                scope.onChange({'file': null});
	                scope.$apply();
	            },
	            'processing': function(file){
	                if(file._removeLink){
	                    var removeButton = $(file._removeLink);
	                    removeButton.html('<i class=\'fa fa-trash\'></i>');
	                }
	            },
	            'complete': function(file){
	                if(file._removeLink){
	                    var removeButton = $(file._removeLink);
	                    removeButton.html('<i class=\'fa fa-trash\'></i>');
	                }
	                scope.manageEnabledDropzone(scope.isEnable);
	            },
	            'error': function(file, errorMessage) {
	                scope.onFileError({'errorMessage': errorMessage} );
	                scope.$apply();
	            }
	        };
	        $(element).addClass('dropzone');
	        var dropzone = new Dropzone(element[0], config);
	        angular.forEach(eventHandlers, function(handler, event) {
	            dropzone.on(event, handler);
	        });
	        scope.onAfterInit();
	        var EditPreviewElement = function(file){
	            file.previewElement.querySelector('[data-dz-size]').remove();
	            var removeButton = $(file._removeLink);
	            removeButton.addClass('btn dz-btn dz-m-r');
	            removeButton.html('<i class=\'fa fa-trash\'></i>');
	            removeButton.attr('title', '{{GlobalEntries.PageEntries.FormEntries.FileUploaderRemoveEntry}}');
	            $compile(removeButton)(scope.$parent);
	            if(file.remoteFile) {
	                file._openLink = Dropzone.createElement('<a class=\'btn dz-btn dz-m-l\' href=\'javascript:undefined\' title=\'{{GlobalEntries.PageEntries.FormEntries.FileUploaderDownloadEntry}}\'><i class=\'fa fa-download\'></i></a>');
	                $compile(file._openLink)(scope.$parent);
	                file._openLink.addEventListener('click', function(e) {
	                    e.preventDefault();
	                    e.stopPropagation();
	                    scope.onDownloadClick();
	                });
	                file.previewElement.appendChild(file._openLink);
	            }
	            else {
	                removeButton.addClass('dz-btn-full-width');
	            }
	        }
	        scope.manageEnabledDropzone = function(isEnable) {
	            if(isEnable == true) {
	                dropzone.enable();
	                dropzone.files.forEach(function(element){
	                    if(element._removeLink){
	                        $(element._removeLink).show();
	                    }
	                    if(element._openLink){
	                        if($(element._openLink).hasClass('dz-btn-full-width')){
	                            $(element._openLink).removeClass('dz-btn-full-width');
	                        }
	                    }
	                });
	            }
	            else {
	                dropzone.disable();
	                dropzone.files.forEach(function(element){
	                    if(element._removeLink){
	                        $(element._removeLink).hide();
	                    }
	                    if(element._openLink){
	                        $(element._openLink).addClass('dz-btn-full-width');
	                    }
	                });
	            }
	        }
	        scope.$watch('isEnable', function(newValue, oldValue) {
	            scope.manageEnabledDropzone(newValue);
	        });
	    }
	}
}
]);
kamApp.directive('componentHeader',function()
{
	return {
	    restrict: 'A',
	    link: function(scope, element, attrs) {
	        function ChangeVisibility(element) {
	            if(element[0].querySelector('button') == null && element[0].querySelector('i') == null && element.find('div.card-title').length == 0) {
	                element.addClass('hide');
	            }
	            else {
	                element.removeClass('hide');
	                if(element.find('div.card-title').length != 0) {
	                    var cardTitleElement =  $(element.find('div.card-title')[0]);
	                    if(element.find('button.actionButton').length == 0) {
	                         element.addClass('ComponentHeaderFlex');
	                        cardTitleElement.removeClass('outline-card-title');
	                    }
	                    else {
	                         element.removeClass('ComponentHeaderFlex');
	                        cardTitleElement.addClass('outline-card-title');
	                    }
	                }
	            }
	        }
	        var observer = new MutationObserver(function(mutations) {
	            ChangeVisibility(element);
	        });
	        ChangeVisibility(element);
	        observer.observe(element[0], {
	            childList: true,
	            subtree: true
	        });
	    }
	}
}
);
kamApp.directive('formFieldsContainer',['$timeout',function($timeout)
{
	return {
	    require: '?ngModel',
	    restrict: 'AE',
	    scope: {
	        control: '='
	    },
	    link: function (scope, elem, attrs, ngModel) {
	        scope.control.Rearrange = function() {
	            $timeout(function() {
	                if(scope.$root.$$phase != '$apply' && scope.$root.$$phase != '$digest') {
	                    scope.$apply();
	                }
	                var cardBlockElemList = $(elem).find('.card-block');
	                cardBlockElemList.each(function(index, cardBlockElement) {
	                    var rowElemList = $(cardBlockElement).find('.row');
	                    var newRowsElemList = [];
	                    var fieldElemList = rowElemList.find('[class^=col-sm-]');
	                    var rowIndex = 0;
	                    rowElemList.each(function(index, rowElem) {
	                        newRowsElemList[rowIndex] = $('<div id="' + $(rowElem).attr('id') + '" class="row"><div>');
	                        $(cardBlockElement).append(newRowsElemList[rowIndex]);
	                        rowIndex = rowIndex + 1;
	                    });
	                    rowIndex = 0;
	                    var currentRowColumnsUsed = 0;
	                    fieldElemList.each(function(index, fieldElem) {
	                        var elemColumnsWidth = -1;
	                        var globalElemColumnsWidth = -1;
	                        var isNewline = index != 0 && $(fieldElem).attr('new-line') != undefined;
	                        var fieldName = $(fieldElem).attr('field-name');
	                        var isFillerField = $(fieldElem).attr('filler-field') != undefined;
	                        $(fieldElem.classList).each(function() {
	                            if(this.startsWith('col-sm-')) {
	                                elemColumnsWidth = parseInt(this.replace('col-sm-', ''));
	                            }
	                            if(this.startsWith('global-col-sm-')) {
	                                globalElemColumnsWidth = parseInt(this.replace('global-col-sm-', ''));
	                            }
	                        });
	                        var tempElemForEditClass = $('<div class = "' + $(fieldElem).attr('class') + '" />');
	                        if(isNewline) {
	                            tempElemForEditClass.attr('new-line', '');
	                        }
	                        if(isFillerField) {
	                            $(fieldElem).remove();
	                        }
	                        else if(elemColumnsWidth != -1) {
	                            if(globalElemColumnsWidth != -1) {
	                                tempElemForEditClass.removeClass('col-sm-' + elemColumnsWidth);
	                                tempElemForEditClass.removeClass('global-col-sm-' + globalElemColumnsWidth);
	                                elemColumnsWidth = globalElemColumnsWidth;
	                                tempElemForEditClass.addClass('col-sm-' + elemColumnsWidth);
	                            }
	                            var length0 = false;
	                            if($(fieldElem).children().length == 0) {
	                                length0 = true;
	                            }
	                            else {
	                                if(fieldName != undefined && !scope.$parent['IsField' + fieldName + 'Visible']()) {
	                                    length0 = true;
	                                }
	                            }
	                            if(length0) {
	                                tempElemForEditClass.removeClass('col-sm-' + elemColumnsWidth);
	                                tempElemForEditClass.addClass('col-sm-0');
	                                tempElemForEditClass.addClass('global-col-sm-'+ elemColumnsWidth);
	                                elemColumnsWidth = 0;
	                            }
	                            $(fieldElem).removeClass();
	                            $(fieldElem).addClass(tempElemForEditClass.attr('class'));
	                            if(currentRowColumnsUsed + elemColumnsWidth > 12 || isNewline) {
	                                var fillerElementWidth = 12 - currentRowColumnsUsed;
	                                if(fillerElementWidth != 0) {
	                                    $(newRowsElemList[rowIndex]).append($('<div class="col-sm-' + fillerElementWidth + ' filler-field"></div>'));
	                                }
	                                currentRowColumnsUsed = 0;
	                                rowIndex = rowIndex + 1;
	                            }
	                            currentRowColumnsUsed = currentRowColumnsUsed + elemColumnsWidth;
	                            $(fieldElem).appendTo(newRowsElemList[rowIndex]);
	                        }
	                    });
	                    if(currentRowColumnsUsed != 12) {
	                        var fillerElementWidth = 12 - currentRowColumnsUsed;
	                        $(newRowsElemList[rowIndex]).append($('<div class="col-sm-' + fillerElementWidth + ' filler-field"></div>'));
	                    }
	                    rowElemList.each(function(index, rowElem) {
	                        $(rowElem).remove();
	                    });
	                });
	            });
	        }
	    }
	}
}
]);
kamApp.directive('responsiveKam4Datatable',['$compile','$filter','$timeout','PromisesListFactory','ValidationHelperService','ComponentsNavigationHelperService','ComponentsDataHelperService',function($compile,$filter,$timeout,PromisesListFactory,ValidationHelperService,ComponentsNavigationHelperService,ComponentsDataHelperService)
{
	return {
	    require: '?ngModel',
	    restrict: 'AE',
	    scope: {
	        gridColumns: '=',
	        gridSummaryData: '=',
	        componentShowMode: '=',
	        onCellClick: '&',
	        onTitleCellClick: '@',
	        onDetailCellClick: '@',
	        control: '=',
	        componentData: '=',
	        neverShowInMobile: '='
	    },
	    link: function (scope, elem, attrs, ngModel) {
	        scope.DataTableRTI = null;
	        scope.control.IsValid = function() {
	            if($(elem).find('td.has-error').length != 0) {
	                return false;
	            }
	            return true;
	        }
	        scope.control.ResetCurrentEditingCellIndexes = function() {
	            scope.currentEditingCellRowIndex = -1;
	            scope.currentEditingCellColumnIndex = -1;
	        }
	        scope.control.GetFirstEditableCell = function() {
	            if(scope.currentEditingCellTableTD == null) {
	                return null;
	            }
	            var currentCellPosition = getCellPosition(scope.currentEditingCellTableTD);
	            var gridColumn = scope.gridColumns[currentCellPosition.ColumnIndex];
	            if(scope.componentData.GridSourceData.CurrentItemsList[currentCellPosition.RowIndex] != undefined &&
	                 scope.control.isCellEditable(gridColumn, scope.componentData.GridSourceData.CurrentItemsList[currentCellPosition.RowIndex].PrimaryKeyValue)) {
	                return $(scope.currentEditingCellTableTD);
	            }
	            return getNextEditableCell($(scope.currentEditingCellTableTD));
	        }
	        scope.control.RedrawRow = function(tr) {
	            $(tr).find('td').each(function() {
	                var cellPosition = getCellPosition(this);
	                var gridColumn = scope.gridColumns[cellPosition.ColumnIndex];
	                var sourceValue = scope.componentData.GridSourceData.CurrentItemsList[cellPosition.RowIndex][scope.gridColumns[cellPosition.ColumnIndex].data];
	                if(scope.componentData.GridSourceData.CurrentItemsList[cellPosition.RowIndex] != undefined) {
	                    $(this).empty();
	                    $(this).removeClass('currentEditingCell');
	                    var renderedCellHTML = scope.DataTableRTI.cell( this ).render( 'display' );
	                    $(this).append(renderedCellHTML);
	                    switch(gridColumn.editortype) {
	                        case 'boolean':
	                            if(sourceValue != null) {
	                                $('input.checkbox-circle', $(this)).prop( 'checked', sourceValue );
	                            }
	                            else {
	                                $('input.checkbox-circle', $(this)).prop('indeterminate', true);
	                            }
	                            break;
	                    }
	                }
	            });
	        }
	        scope.control.Validate = function() {
	            if(scope.componentShowMode === 'insert' || scope.componentShowMode === 'edit') {
	                $(elem).find('tbody').find('td').each(function() {
	                    if(!$(this).hasClass('row-details-field-data') && !$(this.parentElement).hasClass('child')) {
	                        var cellPosition = getCellPosition(this);
	                        var gridColumn = scope.gridColumns[cellPosition.ColumnIndex];
	                        var sourceValue = scope.componentData.GridSourceData.CurrentItemsList[cellPosition.RowIndex][scope.gridColumns[cellPosition.ColumnIndex].data];
	                        if(scope.componentData.GridSourceData.CurrentItemsList[cellPosition.RowIndex] != undefined &&
	                           scope.control.isCellEditable(gridColumn, scope.componentData.GridSourceData.CurrentItemsList[cellPosition.RowIndex].PrimaryKeyValue) &&
	                            (
	                                scope.componentShowMode === 'edit' ||
	                                (scope.componentShowMode === 'insert' && $(this).parent().hasClass('insertRow'))
	                            )) {
	                            switch(gridColumn.editortype) {
	                                case 'date':
	                                    ValidateDateCell(this, sourceValue, cellPosition.ColumnIndex);
	                                    break;
	                                case 'datetime':
	                                    ValidateDatetimeCell(this, sourceValue, cellPosition.ColumnIndex);
	                                    break;
	                                case 'boolean':
	                                    ValidateBooleanCell(this, sourceValue, cellPosition.ColumnIndex);
	                                    break;
	                                case 'lookup':
	                                    if(gridColumn.isDatabasedLookup) {
	                                        if(gridColumn.isMultichoiceLookup) {
	                                            ValidateDatabasedMultichoiceLookupCell(this, sourceValue, cellPosition.ColumnIndex);
	                                        }
	                                        else {
	                                            ValidateDatabasedSingleChoiceLookupCell(this, sourceValue, cellPosition.ColumnIndex);
	                                        }
	                                    }
	                                    else {
	                                        ValidateNonDatabasedSingleChoiceLookupCell(this, sourceValue, cellPosition.ColumnIndex);
	                                    }
	                                    break;
	                                case 'text':
	                                    ValidateTextCell(this, sourceValue, cellPosition.ColumnIndex);
	                                    break;
	                            }
	                        }
	                    }
	                });
	                if($(elem).find('td.has-error').length != 0) {
	                    var cellToFocus = $(elem).find('td.has-error')[0];
	                    var cellPosition = getCellPosition(cellToFocus);
	                    makeCellAsEditable(cellToFocus, cellPosition.RowIndex, cellPosition.ColumnIndex, event);
	                    return false;
	                }
	            }
	            return true;
	        }
	        function ValidateDateCell(tableTD, sourceValue, columnIndex) {
	            if(scope.gridColumns[columnIndex].required &&
	               (sourceValue === undefined || sourceValue === null || !sourceValue.HasValue)) {
	                SetCellValidationMessage(tableTD, scope.componentData.ComponentEntries.GridColumnsValidatorsEntries[scope.gridColumns[columnIndex].name + 'RequiredWebGridDataColumnValidatorEntry']);
	            }
	        }
	        function ValidateDatetimeCell(tableTD, sourceValue, columnIndex) {
	            if(scope.gridColumns[columnIndex].required &&
	               (sourceValue === undefined || sourceValue === null || !sourceValue.HasValue)) {
	                SetCellValidationMessage(tableTD, scope.componentData.ComponentEntries.GridColumnsValidatorsEntries[scope.gridColumns[columnIndex].name + 'RequiredWebGridDataColumnValidatorEntry']);
	            }
	        }
	        function ValidateBooleanCell(tableTD, sourceValue, columnIndex) {
	            if(scope.gridColumns[columnIndex].required &&
	               sourceValue === null) {
	                SetCellValidationMessage(tableTD, scope.componentData.ComponentEntries.GridColumnsValidatorsEntries[scope.gridColumns[columnIndex].name + 'RequiredWebGridDataColumnValidatorEntry']);
	            }
	        }
	        function ValidateDatabasedMultichoiceLookupCell(tableTD, sourceValue, columnIndex) {
	            if(scope.gridColumns[columnIndex].required &&
	               (sourceValue === null || sourceValue.length == 0)) {
	                SetCellValidationMessage(tableTD, scope.componentData.ComponentEntries.GridColumnsValidatorsEntries[scope.gridColumns[columnIndex].name + 'RequiredWebGridDataColumnValidatorEntry']);
	            }
	        }
	        function ValidateDatabasedSingleChoiceLookupCell(tableTD, sourceValue, columnIndex) {
	            if(scope.gridColumns[columnIndex].required &&
	               sourceValue === null) {
	                SetCellValidationMessage(tableTD, scope.componentData.ComponentEntries.GridColumnsValidatorsEntries[scope.gridColumns[columnIndex].name + 'RequiredWebGridDataColumnValidatorEntry']);
	            }
	        }
	        function ValidateNonDatabasedSingleChoiceLookupCell(tableTD, sourceValue, columnIndex) {
	            if(scope.gridColumns[columnIndex].required &&
	               sourceValue === null) {
	                SetCellValidationMessage(tableTD, scope.componentData.ComponentEntries.GridColumnsValidatorsEntries[scope.gridColumns[columnIndex].name + 'RequiredWebGridDataColumnValidatorEntry']);
	            }
	        }
	        function ValidateTextCell(tableTD, sourceValue, columnIndex) {
	            if (scope.gridColumns[columnIndex].textSize && sourceValue !== null && sourceValue.toString() != '' && scope.gridColumns[columnIndex].textSize > 0 && scope.gridColumns[columnIndex].textSize < 2147483647 && sourceValue.toString().length > scope.gridColumns[columnIndex].textSize) {
	                SetCellValidationMessage(tableTD, scope.componentData.ComponentEntries.GridColumnsValidatorsEntries[scope.gridColumns[columnIndex].name + 'TextSizeWebGridDataColumnValidatorEntry']);
	            }
	            if(scope.gridColumns[columnIndex].required &&
	               (sourceValue === null || sourceValue.toString() == '')) {
	                SetCellValidationMessage(tableTD, scope.componentData.ComponentEntries.GridColumnsValidatorsEntries[scope.gridColumns[columnIndex].name + 'RequiredWebGridDataColumnValidatorEntry']);
	            }
	        }
	        scope.control.AfterTableCreated = function() {
	            if(scope.DataTableRTI == null) {
	                scope.DataTableRTI = $(elem).DataTable();
	            }
	            $( scope.DataTableRTI.table().container() ).removeClass( 'form-inline' );
	        }
	        scope.control.InitInsertRows = function() {
	            if(scope.DataTableRTI == null) {
	                scope.DataTableRTI = $(elem).DataTable();
	            }
	            for(var i = 0; i < scope.DataTableRTI.rows().count(); i++) {
	                var row = scope.DataTableRTI.row(i);
	                // 4: DataRowState.Added
	                if(row.data().DataRowState == 4) {
	                    $(row.node()).addClass('insertRow');
	                }
	            }
	        }
	        /* Begin datatable */
	        elem.on('click', 'td', function (event) {
	            if(scope.DataTableRTI == null) {
	                scope.DataTableRTI = $(elem).DataTable();
	            }
	            if(!$(this).hasClass('row-details-field-data') && !$(this.parentElement).hasClass('child')) {
	                var cellPosition = getCellPosition(this);
	                var cellShowMode = 'browse';
	                if(scope.componentShowMode === 'edit') {
	                    cellShowMode = 'edit';
	                    makeCellAsEditable(this, cellPosition.RowIndex, cellPosition.ColumnIndex, event);
	                }
	                if(scope.componentShowMode === 'insert') {
	                    for(var i = 0; i < scope.DataTableRTI.rows().count(); i++) {
	                        var row = scope.DataTableRTI.row(i);
	                        // 4: DataRowState.Added
	                        if(row.data().DataRowState == 4) {
	                            if(row.node() === $(this).parent()[0]) {
	                                cellShowMode = 'insert';
	                                makeCellAsEditable(this, cellPosition.RowIndex, cellPosition.ColumnIndex, event);
	                            }
	                        }
	                    }
	                }
	                if(scope.componentShowMode === 'browse' || (scope.componentShowMode === 'insert' && cellShowMode === 'browse')) {
	                    scope.onCellClick({'eventArgs': {
	                            args: {
	                                columnindex: cellPosition.ColumnIndex,
	                                rowindex: cellPosition.RowIndex + scope.gridSummaryData.Begin,
	                                showndatarowindex: cellPosition.RowIndex
	                            }
	                        }
	                    });
	                }
	                scope.IsManagingCellClickEvent = false;
	            }
	        });
	        function getCellPosition(cell) {
	            var visibleColumnIndex = -1;
	            var columnIndex = -1;
	            for(var i = 0; i < scope.gridColumns.length && columnIndex == -1; i++) {
	                if(!scope.gridColumns[i].hidden) {
	                    visibleColumnIndex++;
	                    if(visibleColumnIndex == $(cell)[0].cellIndex) {
	                        columnIndex = i;
	                    }
	                }
	            }
	            var rowIndex = -1;
	            var mainRowIndex = -1;
	            var cellParentTR = cell.parentNode;
	            $(cell.parentElement.parentElement).children('tr').each(function() {
	                if(!$(this).hasClass('child')) {
	                    mainRowIndex++;
	                    if(this == cellParentTR) {
	                        rowIndex = mainRowIndex;
	                    }
	                }
	            });
	            return {
	                RowIndex: rowIndex,
	                ColumnIndex: columnIndex
	            }
	        }
	        scope.currentEditingCellRowIndex = -1;
	        scope.currentEditingCellColumnIndex = -1;
	        scope.TrustAsHtml = scope.$parent.TrustAsHtml;
	        //function isCellEditable(gridColumn, primaryKeyValue) {
	        scope.control.isCellEditable = function(gridColumn, primaryKeyValue) {
	            var cellRT = ComponentsDataHelperService.getCellRT(primaryKeyValue, gridColumn.data, scope.$parent.ComponentRTIs.CurrentRowsRTI);
	            if(gridColumn.isReadonly != undefined && !gridColumn.isReadonly() &&
	                (
	                    cellRT == null ||
	                    (cellRT.GlobalVisible &&
	                      !cellRT.GlobalReadOnly &&
	                        (
	                            (scope.componentShowMode === 'edit' && cellRT.CanEdit) ||
	                            (scope.componentShowMode === 'insert' && cellRT.CanInsert)
	                        )
	                    )
	               )) {
	                return true;
	            }
	            return false;
	        }
	        function makeCellAsEditable(tableTD, rowIndex, columnIndex, cellClickEvent) {
	            var gridColumn = scope.gridColumns[columnIndex];
	            if(scope.currentEditingCellRowIndex != rowIndex || scope.currentEditingCellColumnIndex != columnIndex) {
	                if(	scope.currentEditingCellRowIndex != -1 && scope.currentEditingCellColumnIndex != -1 && (scope.currentEditingCellRowIndex != rowIndex || scope.currentEditingCellColumnIndex != columnIndex)) {
	                    makeCurrentCellAsReadable();
	                }
	                scope.currentEditingCellRowIndex = rowIndex;
	                scope.currentEditingCellColumnIndex = columnIndex;
	                scope.currentEditingCellTableTD = tableTD;
	                scope.currentEditingCellTableTD.isEditing = true;
	                scope.onReadableCellCreated = null;
	                if(scope.componentData.GridSourceData.CurrentItemsList[rowIndex] != undefined &&
	                   scope.control.isCellEditable(gridColumn, scope.componentData.GridSourceData.CurrentItemsList[rowIndex].PrimaryKeyValue)){
	                    var editorControl = null;
	                    switch(gridColumn.editortype) {
	                        case 'date':
	                            CreateDateEditingControl(tableTD, rowIndex, columnIndex);
	                            break;
	                        case 'datetime':
	                            CreateDatetimeEditingControl(tableTD, rowIndex, columnIndex);
	                            break;
	                        case 'time':
	                            CreateTimeEditingControl(tableTD, rowIndex, columnIndex);
	                            break;
	                        case 'boolean':
	                            CreateBooleanEditingControl(tableTD, rowIndex, columnIndex, cellClickEvent);
	                            break;
	                        case 'lookup':
	                            if(gridColumn.isDatabasedLookup) {
	                                if(gridColumn.isMultichoiceLookup) {
	                                    CreateDatabasedMultichoiceLookupEditingControl(tableTD, rowIndex, columnIndex);
	                                }
	                                else {
	                                    CreateDatabasedSingleChoiceLookupEditingControl(tableTD, rowIndex, columnIndex);
	                                }
	                            }
	                            else {
	                                CreateNonDatabasedSingleChoiceLookupEditingControl(tableTD, rowIndex, columnIndex);
	                            }
	                            break;
	                        case 'text':
	                            CreateTextEditingControl(tableTD, rowIndex, columnIndex);
	                            break;
	                    }
	                }
	            }
	        }
	        function SetCellValidationMessage(tableTD, message) {
	            $(tableTD).addClass('has-error');
	            AddNoBorderClassHasErrorTdAbove(tableTD);
	            AddNoBorderClassHasErrorTdBelow(tableTD);
	            AddNoBorderClassHasErrorTdLeft(tableTD);
	            AddNoBorderClassHasErrorTdRight(tableTD);
	            tableTD.title = message;
	        }
	        function AddNoBorderClassHasErrorTdAbove(tableTD){
	            var childrenHasError = [];
	            var tableRow = $(tableTD).parent();
	            var prevTableRow = $(tableRow).prev();
	            if(prevTableRow.length > 0){
	                childrenHasError = $(prevTableRow).children('.has-error');
	                if(childrenHasError.length > 0){
	                    childrenHasError.each(function(){
	                        if(this.cellIndex == tableTD.cellIndex){
	                            $(tableTD).addClass('no-border-top');
	                        }
	                    });
	                }
	            }
	        }
	        function AddNoBorderClassHasErrorTdBelow(tableTD){
	            var childrenHasError = [];
	            var tableRow = $(tableTD).parent();
	            var nextTableRow = $(tableRow).next();
	            if(nextTableRow.length > 0){
	                childrenHasError = $(nextTableRow).children('.has-error');
	                if(childrenHasError.length > 0){
	                    childrenHasError.each(function(){
	                        if(this.cellIndex == tableTD.cellIndex){
	                            $(this).addClass('no-border-top');
	                        }
	                    });
	                }
	            }
	        }
	        function AddNoBorderClassHasErrorTdLeft(tableTD){
	            var prevTD = $(tableTD).prev();
	            if(prevTD.length > 0 && $(prevTD).hasClass('has-error')){
	                $(tableTD).addClass('no-border-left');
	            }
	        }
	        function AddNoBorderClassHasErrorTdRight(tableTD){
	            var nextTD = $(tableTD).next();
	            if(nextTD.length > 0 && $(nextTD).hasClass('has-error')){
	                $(nextTD).addClass('no-border-left');
	            }
	        }
	        function RemoveCellValidationMessage(tableTD) {
	            $(tableTD).removeClass('has-error');
	            RemoveNoBorderClassHasErrorTdBelow(tableTD);
	            RemoveNoBorderClassHasErrorTdRight(tableTD);
	            tableTD.title = '';
	        }
	        function RemoveNoBorderClassHasErrorTdBelow(tableTD){
	            var childrenHasError = [];
	            var tableRow = $(tableTD).parent();
	            var nextTableRow = $(tableRow).next();
	            if(nextTableRow.length > 0){
	                childrenHasError = $(nextTableRow).children('.no-border-top');
	                if(childrenHasError.length > 0){
	                    childrenHasError.each(function(){
	                        if(this.cellIndex == tableTD.cellIndex){
	                            $(this).removeClass('no-border-top');
	                        }
	                    });
	                }
	            }
	        }
	        function RemoveNoBorderClassHasErrorTdRight(tableTD){
	            var nextTD = $(tableTD).next();
	            if(nextTD.length > 0 && $(nextTD).hasClass('no-border-left')){
	                $(nextTD).removeClass('no-border-left');
	            }
	        }
	        function CreateDateEditingControl(tableTD, rowIndex, columnIndex) {
	            scope.onReadableCellCreated = null;
	            scope.EditingControlModel = { value: null };
	            scope.$parent.EditingControlModel = scope.EditingControlModel;
	            scope.datePickerOnDateChange = function(value) {
	                scope.EditingControlModel.value = value;
	                scope.datePickerOnChange();
	            }
	            scope.datePickerOnChange = function() {
	                if(scope.currentEditingCellRowIndex != -1 && scope.currentEditingCellColumnIndex != -1) {
	                    var parsedDate = ValidationHelperService.TryParseDate(scope.EditingControlModel.value);
	                    if(parsedDate == null) {
	                        scope.componentData.GridSourceData.CurrentItemsList[scope.currentEditingCellRowIndex][scope.gridColumns[scope.currentEditingCellColumnIndex].data] = {
	                            Year: null,
	                            Month: null,
	                            Day: null,
	                            Hour: null,
	                            Minute: null,
	                            Second: null,
	                            HasValue: false,
	                            DateStringValue: '',
	                            StringValue: ''
	                        };
	                        if(scope.gridColumns[scope.currentEditingCellColumnIndex].required) {
	                            SetCellValidationMessage(tableTD, scope.componentData.ComponentEntries.GridColumnsValidatorsEntries[scope.gridColumns[scope.currentEditingCellColumnIndex].name + 'RequiredWebGridDataColumnValidatorEntry']);
	                        }
	                    }
	                    else {
	                        parsedDate.setHours(0, 0, 0, 0);
	                        scope.componentData.GridSourceData.CurrentItemsList[scope.currentEditingCellRowIndex][scope.gridColumns[scope.currentEditingCellColumnIndex].data] = {
	                            Year: parsedDate.getFullYear(),
	                            Month: parsedDate.getMonth() + 1,
	                            Day: parsedDate.getDate(),
	                            Hour: 0,
	                            Minute: 0,
	                            Second: 0,
	                            HasValue: true,
	                            DateStringValue: moment(parsedDate).format('DD/MM/YYYY'),
	                            StringValue: moment(parsedDate).format('DD/MM/YYYY HH:mm:ss')
	                        };
	                        RemoveCellValidationMessage(tableTD);
	                    }
	                    makeCurrentCellAsReadable();
	                }
	            }
	            var sourceValue = scope.componentData.GridSourceData.CurrentItemsList[scope.currentEditingCellRowIndex][scope.gridColumns[scope.currentEditingCellColumnIndex].data];
	            var dateTimePickerSettings = {
	                locale: scope.$parent.GlobalEntries.PagesComponentsEntries.DateTimePicker.Language,
	                useCurrent: false,
	                format: 'DD/MM/YYYY'
	            }
	            if (sourceValue === undefined || sourceValue === null || !sourceValue.HasValue) {
	                scope.EditingControlModel.value = '';
	            }
	            else {
	                dateTimePickerSettings.date = new Date(sourceValue.Year, sourceValue.Month - 1, sourceValue.Day);
	                scope.EditingControlModel.value = $filter('date')(dateTimePickerSettings.date, 'dd/MM/yyyy');
	            }
	            var childrenWidth = $($(tableTD).children()).width();
	            var inputHeight = $(tableTD).height();
	            var divContainerEditorControl = $('<div class="CurrentEditingCellControlContainer" style="height: '+inputHeight+'px;"></div>');
	            var editorControl = $('<input class = "CurrentEditingCellInput grid-control" ng-model-options = "{ updateOn: \'blur\' }" on-Datetime-Change = "datePickerOnDateChange(value, ' + rowIndex + ', ' + columnIndex + ')" ng-change = "datePickerOnChange(' + rowIndex + ', ' + columnIndex + ')" data-format = "DD/MM/YYYY" data-language = "{{GlobalEntries.PagesComponentsEntries.DateTimePicker.Language}}" type = "text" data-date-time-picker data-pick12HourFormat = "false" ng-model = "EditingControlModel.value" data-use-current = "false"/>');
	            editorControl.datetimepicker(dateTimePickerSettings);
	            editorControl.bind('keydown keypress', function (event) {
	                if (event.key === 'Enter') {
	                    var cellToClick = getNextEditableCell(tableTD);
	                    if(cellToClick != null && cellToClick.length != 0) {
	                        cellToClick.click();
	                    }
	                }
	                if (event.key === 'Tab') {
	                    var parsedDate = ValidationHelperService.TryParseDate(event.target.value);
	                    if(parsedDate == null) {
	                        scope.componentData.GridSourceData.CurrentItemsList[scope.currentEditingCellRowIndex][scope.gridColumns[scope.currentEditingCellColumnIndex].data] = {
	                            Year: null,
	                            Month: null,
	                            Day: null,
	                            Hour: null,
	                            Minute: null,
	                            Second: null,
	                            HasValue: false,
	                            DateStringValue: '',
	                            StringValue: ''
	                        };
	                        if(scope.gridColumns[scope.currentEditingCellColumnIndex].required) {
	                            SetCellValidationMessage(tableTD, scope.componentData.ComponentEntries.GridColumnsValidatorsEntries[scope.gridColumns[scope.currentEditingCellColumnIndex].name + 'RequiredWebGridDataColumnValidatorEntry']);
	                        }
	                    }
	                    else {
	                        parsedDate.setHours(0, 0, 0, 0);
	                        scope.componentData.GridSourceData.CurrentItemsList[scope.currentEditingCellRowIndex][scope.gridColumns[scope.currentEditingCellColumnIndex].data] = {
	                            Year: parsedDate.getFullYear(),
	                            Month: parsedDate.getMonth() + 1,
	                            Day: parsedDate.getDate(),
	                            Hour: 0,
	                            Minute: 0,
	                            Second: 0,
	                            HasValue: true,
	                            DateStringValue: moment(parsedDate).format('DD/MM/YYYY'),
	                            StringValue: moment(parsedDate).format('DD/MM/YYYY HH:mm:ss')
	                        };
	                        RemoveCellValidationMessage(tableTD);
	                    }
	                    editingCellTabNavigation(event, tableTD);
	                }
	            });
	            $(tableTD).empty();
	            $compile(editorControl)(scope);
	            divContainerEditorControl.append(editorControl)
	            $(tableTD).append(divContainerEditorControl);
	            editorControl.focus();
	        }
	        function CreateDatetimeEditingControl(tableTD, rowIndex, columnIndex) {
	            scope.onReadableCellCreated = null;
	            scope.EditingControlModel = { value: null };
	            scope.$parent.EditingControlModel = scope.EditingControlModel;
	            scope.dateTimePickerOnDatetimeChange = function(value) {
	                scope.EditingControlModel.value = value;
	                scope.dateTimePickerOnChange();
	            }
	            scope.dateTimePickerOnChange = function() {
	                if(scope.currentEditingCellRowIndex != -1 && scope.currentEditingCellColumnIndex != -1) {
	                    var parsedDate = ValidationHelperService.TryParseDateTime(scope.EditingControlModel.value);
	                    if(parsedDate == null) {
	                        scope.componentData.GridSourceData.CurrentItemsList[scope.currentEditingCellRowIndex][scope.gridColumns[scope.currentEditingCellColumnIndex].data] = {
	                            Year: null,
	                            Month: null,
	                            Day: null,
	                            Hour: null,
	                            Minute: null,
	                            Second: null,
	                            HasValue: false,
	                            DateStringValue: '',
	                            StringValue: ''
	                        };
	                        if(scope.gridColumns[scope.currentEditingCellColumnIndex].required) {
	                            SetCellValidationMessage(tableTD, scope.componentData.ComponentEntries.GridColumnsValidatorsEntries[scope.gridColumns[scope.currentEditingCellColumnIndex].name + 'RequiredWebGridDataColumnValidatorEntry']);
	                        }
	                    }
	                    else {
	                        scope.componentData.GridSourceData.CurrentItemsList[scope.currentEditingCellRowIndex][scope.gridColumns[scope.currentEditingCellColumnIndex].data] = {
	                            Year: parsedDate.getFullYear(),
	                            Month: parsedDate.getMonth() + 1,
	                            Day: parsedDate.getDate(),
	                            Hour: parsedDate.getHours(),
	                            Minute: parsedDate.getMinutes(),
	                            Second: parsedDate.getSeconds(),
	                            HasValue: true,
	                            StringValue: moment(parsedDate).format('DD/MM/YYYY HH:mm:ss'),
	                            DateStringValue: moment(parsedDate).format('DD/MM/YYYY')
	                        };
	                        RemoveCellValidationMessage(tableTD);
	                    }
	                    makeCurrentCellAsReadable();
	                }
	            }
	            var sourceValue = scope.componentData.GridSourceData.CurrentItemsList[scope.currentEditingCellRowIndex][scope.gridColumns[scope.currentEditingCellColumnIndex].data];
	            var dateTimePickerSettings = {
	                locale: scope.$parent.GlobalEntries.PagesComponentsEntries.DateTimePicker.Language,
	                useCurrent: false,
	                format: 'DD/MM/YYYY HH:mm:ss',
	                widgetPositioning: { vertical: 'bottom' }
	            }
	            if (sourceValue === undefined || sourceValue === null || !sourceValue.HasValue) {
	                scope.EditingControlModel.value = '';
	            }
	            else {
	                dateTimePickerSettings.date = new Date(sourceValue.Year, sourceValue.Month - 1, sourceValue.Day, sourceValue.Hour, sourceValue.Minute, sourceValue.Second);
	                scope.EditingControlModel.value = $filter('date')(dateTimePickerSettings.date, 'dd/MM/yyyy HH:mm:ss');
	            }
	            var childrenWidth = $($(tableTD).children()).width();
	            var inputHeight = $(tableTD).height();
	            var divContainerEditorControl = $('<div class="CurrentEditingCellControlContainer" style="height: '+inputHeight+'px;"></div>');
	            var editorControl = $('<input class = "CurrentEditingCellInput grid-control" ng-model-options = "{ updateOn: \'blur\' }" on-Datetime-Change = "dateTimePickerOnDatetimeChange(value, ' + rowIndex + ', ' + columnIndex + ')" ng-change = "dateTimePickerOnChange(' + rowIndex + ', ' + columnIndex + ')" data-format = "DD/MM/YYYY HH:mm:ss" data-language = "{{GlobalEntries.PagesComponentsEntries.DateTimePicker.Language}}" type = "text" data-date-time-picker data-pick12HourFormat = "false" ng-model = "EditingControlModel.value" data-use-current = "false"/>');
	            editorControl.datetimepicker(dateTimePickerSettings);
	            editorControl.bind('keydown keypress', function (event) {
	                if (event.key === 'Enter') {
	                    var cellToClick = getNextEditableCell(tableTD);
	                    if(cellToClick != null && cellToClick.length != 0) {
	                        cellToClick.click();
	                    }
	                }
	                if (event.key === 'Tab') {
	                    var parsedDate = ValidationHelperService.TryParseDateTime(event.target.value);
	                    if(parsedDate == null) {
	                        scope.componentData.GridSourceData.CurrentItemsList[scope.currentEditingCellRowIndex][scope.gridColumns[scope.currentEditingCellColumnIndex].data] = {
	                            Year: null,
	                            Month: null,
	                            Day: null,
	                            Hour: null,
	                            Minute: null,
	                            Second: null,
	                            HasValue: false,
	                            DateStringValue: '',
	                            StringValue: ''
	                        };
	                        if(scope.gridColumns[scope.currentEditingCellColumnIndex].required) {
	                            SetCellValidationMessage(tableTD, scope.componentData.ComponentEntries.GridColumnsValidatorsEntries[scope.gridColumns[scope.currentEditingCellColumnIndex].name + 'RequiredWebGridDataColumnValidatorEntry']);
	                        }
	                    }
	                    else {
	                        scope.componentData.GridSourceData.CurrentItemsList[scope.currentEditingCellRowIndex][scope.gridColumns[scope.currentEditingCellColumnIndex].data] = {
	                            Year: parsedDate.getFullYear(),
	                            Month: parsedDate.getMonth() + 1,
	                            Day: parsedDate.getDate(),
	                            Hour: parsedDate.getHours(),
	                            Minute: parsedDate.getMinutes(),
	                            Second: parsedDate.getSeconds(),
	                            HasValue: true,
	                            StringValue: moment(parsedDate).format('DD/MM/YYYY HH:mm:ss'),
	                            DateStringValue: moment(parsedDate).format('DD/MM/YYYY')
	                        };
	                        RemoveCellValidationMessage(tableTD);
	                    }
	                    editingCellTabNavigation(event, tableTD);
	                }
	            });
	            $(tableTD).empty();
	            $compile(editorControl)(scope);
	            divContainerEditorControl.append(editorControl);
	            $(tableTD).append(divContainerEditorControl);
	            editorControl.focus();
	        }
	        function CreateTimeEditingControl(tableTD, rowIndex, columnIndex) {
	            scope.onReadableCellCreated = null;
	            scope.EditingControlModel = { value: null };
	            scope.$parent.EditingControlModel = scope.EditingControlModel;
	            scope.timePickerOnDatetimeChange = function(value) {
	                scope.EditingControlModel.value = value;
	                scope.timePickerOnChange();
	            }
	        scope.timePickerOnChange = function() {
	           if(scope.currentEditingCellRowIndex != -1 && scope.currentEditingCellColumnIndex != -1) {
	                var parsedDate = ValidationHelperService.TryParseDateTime(scope.EditingControlModel.value);
	                if(parsedDate == null) {
	                    scope.componentData.GridSourceData.CurrentItemsList[scope.currentEditingCellRowIndex][scope.gridColumns[scope.currentEditingCellColumnIndex].data] = {
	                        Hour: null,
	                        Minute: null,
	                        Second: null,
	                        HasValue: false,
	                        StringValue: ''
	                    };
	                    if(scope.gridColumns[scope.currentEditingCellColumnIndex].required) {
	                        SetCellValidationMessage(tableTD, scope.componentData.ComponentEntries.GridColumnsValidatorsEntries[scope.gridColumns[scope.currentEditingCellColumnIndex].name + 'RequiredWebGridDataColumnValidatorEntry']);
	                    }
	                }
	                else {
	                    scope.componentData.GridSourceData.CurrentItemsList[scope.currentEditingCellRowIndex][scope.gridColumns[scope.currentEditingCellColumnIndex].data] = {
	                        Hour: parsedDate.getHours(),
	                        Minute: parsedDate.getMinutes(),
	                        Second: parsedDate.getSeconds(),
	                        HasValue: true,
	                        StringValue: moment(parsedDate).format('HH:mm:ss'),
	                    };
	                    RemoveCellValidationMessage(tableTD);
	                }
	                makeCurrentCellAsReadable();
	            }
	        }
	        var sourceValue = scope.componentData.GridSourceData.CurrentItemsList[scope.currentEditingCellRowIndex][scope.gridColumns[scope.currentEditingCellColumnIndex].data];
	        var timePickerSettings = {
	            locale: scope.$parent.GlobalEntries.PagesComponentsEntries.DateTimePicker.Language,
	            useCurrent: false,
	            format: 'HH:mm:ss'
	        }
	        if (sourceValue === undefined || sourceValue === null || !sourceValue.HasValue) {
	            scope.EditingControlModel.value = '';
	        }
	        else {
	            timePickerSettings.date = new Date(new Date().getFullYear(), new Date().getMonth()+1, new Date().getDate(), sourceValue.Hour, sourceValue.Minute, sourceValue.Second);
	            scope.EditingControlModel.value = $filter('date')(timePickerSettings.date, 'HH:mm:ss');
	        }
	        var childrenWidth =$($(tableTD).children()).width();
	        var inputHeight = $(tableTD).height();
	        var divContainerEditorControl = $('<div class="CurrentEditingCellControlContainer" style="height: '+inputHeight+'px; "></div>');
	        var editorControl = $('<input class = "CurrentEditingCellInput grid-control" ng-model-options = "{ updateOn: \'blur\' }" on-Datetime-Change = "timePickerOnDatetimeChange(value, ' + rowIndex + ', ' + columnIndex + ')" ng -change = "timePickerOnChange(' + rowIndex + ', ' + columnIndex + ')" data-format = "HH:mm:ss" data-language = "{{GlobalEntries.PagesComponentsEntries.DateTimePicker.Language}}" type = "text" data-date-time-picker data-pick12HourFormat = "false" ng-model = "EditingControlModel.value" data-use-current = "false"/>');
	        editorControl.datetimepicker(timePickerSettings);
	        editorControl.bind('keydown keypress', function(event) {
	        if (event.key === 'Enter') {
	            var cellToClick = getNextEditableCell(tableTD);
	            if (cellToClick != null && cellToClick.length != 0)
	            {
	                cellToClick.click();
	            }
	        }
	        if (event.key === 'Tab') {
	            var parsedDate = ValidationHelperService.TryParseDateTime(event.target.value);
	                if(parsedDate == null) {
	                        scope.componentData.GridSourceData.CurrentItemsList[scope.currentEditingCellRowIndex][scope.gridColumns[scope.currentEditingCellColumnIndex].data] = {
	                            Hour: null,
	                            Minute: null,
	                            Second: null,
	                            HasValue: false,
	                            StringValue: ''
	                        };
	                        if(scope.gridColumns[scope.currentEditingCellColumnIndex].required) {
	                            SetCellValidationMessage(tableTD, scope.componentData.ComponentEntries.GridColumnsValidatorsEntries[scope.gridColumns[scope.currentEditingCellColumnIndex].name + 'RequiredWebGridDataColumnValidatorEntry']);
	                        }
	                    }
	                    else {
	                        scope.componentData.GridSourceData.CurrentItemsList[scope.currentEditingCellRowIndex][scope.gridColumns[scope.currentEditingCellColumnIndex].data] = {
	                            Hour: parsedDate.getHours(),
	                            Minute: parsedDate.getMinutes(),
	                            Second: parsedDate.getSeconds(),
	                            HasValue: true,
	                            StringValue: moment(parsedDate).format('HH:mm:ss'),
	                        };
	                        RemoveCellValidationMessage(tableTD);
	                    }
	                    editingCellTabNavigation(event, tableTD);
	                }
	            });
	            $(tableTD).empty();
	            $compile(editorControl)(scope);
	            divContainerEditorControl.append(editorControl);
	            $(tableTD).append(divContainerEditorControl);
	            editorControl.focus();
	        }
	        function CreateBooleanEditingControl(tableTD, rowIndex, columnIndex, cellClickEvent) {
	            var currentValue = scope.componentData.GridSourceData.CurrentItemsList[rowIndex][scope.gridColumns[columnIndex].data];
	            var editorControl = $('' +
	                '<div class="checkbox">' +
	                '<input id="GridEditingCheckBox" type="checkbox" class="checkbox-circle">' +
	                '<label for="GridEditingCheckBox">&nbsp;</label> ' +
	                '</div>');
	            var controlToFocus = editorControl.children('#GridEditingCheckBox');
	            if(cellClickEvent != undefined && cellClickEvent.originalEvent != undefined) {
	                if(currentValue == null){
	                    currentValue = true;
	                }
	                else if(currentValue == true){
	                    currentValue = false;
	                }
	                else if(currentValue == false){
	                    if(scope.gridColumns[scope.currentEditingCellColumnIndex].notnullable)
	                    {
	                        currentValue = true;
	                    }
	                    else
	                    {
	                        currentValue = null;
	                    }
	                }
	            }
	            if(currentValue == null){
	                controlToFocus.prop('indeterminate', true);
	                scope.componentData.GridSourceData.CurrentItemsList[rowIndex][scope.gridColumns[columnIndex].data] = null;
	                if(scope.gridColumns[scope.currentEditingCellColumnIndex].required) {
	                    SetCellValidationMessage(tableTD, scope.componentData.ComponentEntries.GridColumnsValidatorsEntries[scope.gridColumns[scope.currentEditingCellColumnIndex].name + 'RequiredWebGridDataColumnValidatorEntry']);
	                }
	            }
	            else if(currentValue == true){
	                $(controlToFocus).prop('indeterminate', false);
	                $(controlToFocus).prop('checked', true);
	                scope.componentData.GridSourceData.CurrentItemsList[rowIndex][scope.gridColumns[columnIndex].data] = true;
	            }
	            else if(currentValue == false){
	                $(controlToFocus).prop('indeterminate', false);
	                $(controlToFocus).prop('checked', false);
	                scope.componentData.GridSourceData.CurrentItemsList[rowIndex][scope.gridColumns[columnIndex].data] = false;
	            }
	            controlToFocus.bind('click', function(event) {
	                var currentValue = scope.componentData.GridSourceData.CurrentItemsList[rowIndex][scope.gridColumns[columnIndex].data];
	                if(currentValue == null){
	                    controlToFocus.prop('indeterminate', false);
	                    controlToFocus.prop('checked', true);
	                    scope.componentData.GridSourceData.CurrentItemsList[rowIndex][scope.gridColumns[columnIndex].data] = true;
	                    RemoveCellValidationMessage(tableTD);
	                }
	                else if(currentValue == true){
	                    controlToFocus.prop('indeterminate', false);
	                    controlToFocus.prop('checked', false);
	                    scope.componentData.GridSourceData.CurrentItemsList[rowIndex][scope.gridColumns[columnIndex].data] = false;
	                    RemoveCellValidationMessage(tableTD);
	                }
	                else if(currentValue == false){
	                    if(scope.gridColumns[scope.currentEditingCellColumnIndex].notnullable)
	                    {
	                        controlToFocus.prop('indeterminate', false);
	                        controlToFocus.prop('checked', true);
	                        scope.componentData.GridSourceData.CurrentItemsList[rowIndex][scope.gridColumns[columnIndex].data] = true;
	                        RemoveCellValidationMessage(tableTD);
	                    }
	                    else{
	                        controlToFocus.prop('indeterminate', true);
	                        scope.componentData.GridSourceData.CurrentItemsList[rowIndex][scope.gridColumns[columnIndex].data] = null;
	                        if(scope.gridColumns[scope.currentEditingCellColumnIndex].required) {
	                            SetCellValidationMessage(tableTD, scope.componentData.ComponentEntries.GridColumnsValidatorsEntries[scope.gridColumns[scope.currentEditingCellColumnIndex].name + 'RequiredWebGridDataColumnValidatorEntry']);
	                        }
	                    }
	                }
	            });
	            controlToFocus.bind('keydown keypress', function (event) {
	                editingCellTabNavigation(event, tableTD);
	            });
	            scope.onReadableCellCreated = function(cell) {
	                var cellData = scope.componentData.GridSourceData.CurrentItemsList[scope.currentEditingCellRowIndex][scope.gridColumns[scope.currentEditingCellColumnIndex].data];
	                if(cellData != null) {
	                    $('input.checkbox-circle', cell).prop( 'checked', cellData );
	                }
	                else {
	                    $('input.checkbox-circle', cell).prop('indeterminate', true);
	                }
	            }
	            $(tableTD).empty();
	            $compile(editorControl)(scope);
	            $(tableTD).append(editorControl);
	            controlToFocus.focus();
	        }
	        function CreateDatabasedMultichoiceLookupEditingControl(tableTD, rowIndex, columnIndex) {
	            scope.onReadableCellCreated = null;
	            if(scope.databasedMultichoiceScope != undefined) {
	                scope.databasedMultichoiceScope.$destroy();
	            }
	            scope.databasedMultichoiceScope = scope.$new();
	            scope.databasedMultichoiceScope.DatabasedMultichoiceLookupEditingControlModel = { items: null };
	            scope.databasedMultichoiceScope.DatabasedMultichoiceLookupComboBoxDataSource = [];
	            scope.databasedMultichoiceScope.DatabasedMultichoiceLookupComboBoxControlOnOpenClose = function(isOpen) {
	                if(!isOpen) {
	                    scope.databasedMultichoiceScope.DatabasedMultichoiceLookupComboBoxDataSource = [];
	                }
	            };
	            scope.databasedMultichoiceScope.DatabasedMultichoiceLookupComboBoxControlOnSearch = function(searchText) {
	                if(searchText == null || searchText == '') {
	                    scope.databasedMultichoiceScope.DatabasedMultichoiceLookupComboBoxDataSource = [];
	                }
	                else {
	                    scope.$parent[scope.gridColumns[columnIndex].data + 'GetLookupItemsBySearchText'](searchText, rowIndex).then(function (result) {
	                        scope.databasedMultichoiceScope.DatabasedMultichoiceLookupComboBoxDataSource = result;
	                    });
	                }
	            }
	            scope.databasedMultichoiceScope.DatabasedMultichoiceLookupComboBoxControlOnKeyDown = function(event) {
	                if (event.key === 'Tab') {
	                    scope.databasedMultichoiceScope.$$postDigest(function () {
	                        editingCellTabNavigation(event, tableTD);
	                    });
	                }
	                if(event.originalEvent.code == 'ArrowDown' && $.trim($(event.currentTarget).find('input')[0].value) == '') {
	                    scope.$parent[scope.gridColumns[columnIndex].data + 'GetLookupItemsBySearchText']('', rowIndex).then(function (result, rowIndex) {
	                        scope.databasedMultichoiceScope.DatabasedMultichoiceLookupComboBoxDataSource = result;
	                    });
	                }
	            }
	            scope.databasedMultichoiceScope.DatabasedMultichoiceLookupComboBoxControlOnChange = function(event) {
	                scope.databasedMultichoiceScope.$$postDigest(function () {
	                    scope.componentData.GridSourceData.CurrentItemsList[rowIndex].FieldsData[scope.gridColumns[columnIndex].data + 'Items'] = [];
	                    scope.componentData.GridSourceData.CurrentItemsList[rowIndex][scope.gridColumns[columnIndex].data] = [];
	                    for(var i = 0; i < scope.databasedMultichoiceScope.DatabasedMultichoiceLookupEditingControlModel.items.length; i++) {
	                        scope.componentData.GridSourceData.CurrentItemsList[rowIndex][scope.gridColumns[columnIndex].data].push(scope.databasedMultichoiceScope.DatabasedMultichoiceLookupEditingControlModel.items[i].key);
	                        scope.componentData.GridSourceData.CurrentItemsList[rowIndex].FieldsData[scope.gridColumns[columnIndex].data + 'Items'].push(scope.databasedMultichoiceScope.DatabasedMultichoiceLookupEditingControlModel.items[i]);
	                    }
	                    if(scope.gridColumns[scope.currentEditingCellColumnIndex].required && scope.componentData.GridSourceData.CurrentItemsList[rowIndex][scope.gridColumns[columnIndex].data].length == 0) {
	                        SetCellValidationMessage(tableTD, scope.componentData.ComponentEntries.GridColumnsValidatorsEntries[scope.gridColumns[scope.currentEditingCellColumnIndex].name + 'RequiredWebGridDataColumnValidatorEntry']);
	                    }
	                    else {
	                        RemoveCellValidationMessage(tableTD);
	                    }
	                });
	            }
	            var childrenWidth = $($(tableTD).children()).outerWidth(true);
	            var inputHeight = $(tableTD).height();
	            var divContainerEditorControl = $('<div class="CurrentEditingCellControlContainer" style="min-width: ' + childrenWidth + 'px; height: '+inputHeight+'px;"></div>');
	            scope.databasedMultichoiceScope.DatabasedMultichoiceLookupControl = angular.element('' +
	                '<ui-select append-to-body = "false" ' +
	                ' class = "CurrentEditingCellInput" ' +
	                '	uis-open-close = "DatabasedMultichoiceLookupComboBoxControlOnOpenClose(isOpen)" ' +
	                '	ng-change = "DatabasedMultichoiceLookupComboBoxControlOnChange()" ' +
	                '	theme = "bootstrap" ' +
	                '	multiple ' +
	                '	ng-model = "DatabasedMultichoiceLookupEditingControlModel.items" ' +
	                '	ng-keydown = "DatabasedMultichoiceLookupComboBoxControlOnKeyDown($event)" ' +
	                '	autofocus > ' +
	                '	<ui-select-match placeholder="{{GlobalEntries.PageEntries.FormEntries.DatabasedDropDownPlaceHolderEntry}}" allow-clear="true">{{$item.value}}</ui-select-match> ' +
	                '	<ui-select-choices refresh-delay="300" refresh="DatabasedMultichoiceLookupComboBoxControlOnSearch($select.search)" repeat="item in DatabasedMultichoiceLookupComboBoxDataSource"> ' +
	                '		<div ng-bind-html="TrustAsHtml((item.value | highlight: $select.search))"></div> ' +
	                '	</ui-select-choices> ' +
	                '</ui-select> ');
	            var currentValue = scope.componentData.GridSourceData.CurrentItemsList[rowIndex][scope.gridColumns[columnIndex].data];
	            if (currentValue != null) {
	                scope.databasedMultichoiceScope.DatabasedMultichoiceLookupComboBoxDataSource = scope.componentData.GridSourceData.CurrentItemsList[rowIndex].FieldsData[scope.gridColumns[columnIndex].data + 'Items'];
	                scope.databasedMultichoiceScope.DatabasedMultichoiceLookupEditingControlModel.items = scope.databasedMultichoiceScope.DatabasedMultichoiceLookupComboBoxDataSource;
	            }
	            else {
	                scope.databasedMultichoiceScope.DatabasedMultichoiceLookupComboBoxDataSource = [];
	                scope.databasedMultichoiceScope.DatabasedMultichoiceLookupEditingControlModel.items = null;
	            }
	            $(tableTD).empty();
	            divContainerEditorControl.append(scope.databasedMultichoiceScope.DatabasedMultichoiceLookupControl)
	            $(tableTD).append(divContainerEditorControl);
	            $compile(scope.databasedMultichoiceScope.DatabasedMultichoiceLookupControl)(scope.databasedMultichoiceScope);
	            if(scope.$root.$$phase != '$apply' && scope.$root.$$phase != '$digest') {
	                scope.$apply();
	            }
	            scope.databasedMultichoiceScope.DatabasedMultichoiceLookupControl.focus();
	        }
	        function CreateDatabasedSingleChoiceLookupEditingControl(tableTD, rowIndex, columnIndex) {
	            scope.onReadableCellCreated = null;
	            var currentValue = scope.componentData.GridSourceData.CurrentItemsList[rowIndex][scope.gridColumns[columnIndex].data];
	            scope.EditingControlModel = { item: null };
	            scope.ComboBoxDataSource = [];
	            scope.ComboBoxControlOnOpenClose = function(isOpen) {
	                if(!isOpen) {
	                    scope.ComboBoxDataSource = [];
	                }
	            };
	            scope.ComboBoxControlOnSearch = function(searchText) {
	                if(searchText == null || searchText == '') {
	                    scope.ComboBoxDataSource = [];
	                }
	                else {
	                    scope.$parent[scope.gridColumns[columnIndex].data + 'GetLookupItemsBySearchText'](searchText, rowIndex).then(function (result) {
	                        scope.ComboBoxDataSource = result;
	                    });
	                }
	            }
	            scope.ComboBoxControlOnKeyDown = function(event) {
	                if (event.key === 'Tab') {
	                    scope.$$postDigest(function () {
	                        editingCellTabNavigation(event, tableTD);
	                    });
	                }
	                if(event.originalEvent.code == 'ArrowDown' && $.trim($(event.currentTarget).find('input.form-control')[0].value) == '') {
	                    scope.$parent[scope.gridColumns[columnIndex].data + 'GetLookupItemsBySearchText']('', rowIndex).then(function (result) {
	                        scope.ComboBoxDataSource = result;
	                    });
	                }
	            }
	            scope.ComboBoxControlOnKeyUp = function(event) {
	                if (event.keyCode === 13) {
	                    event.key = 'Tab';
	                    scope.$$postDigest(function () {
	                        editingCellTabNavigation(event, tableTD);
	                    });
	                }
	            }
	            scope.ComboBoxControlOnChange = function(event) {
	                scope.componentData.GridSourceData.CurrentItemsList[rowIndex].FieldsData[scope.gridColumns[columnIndex].data + 'Items'] = [];
	                if(scope.EditingControlModel.item == null || scope.EditingControlModel.item == undefined) {
	                    scope.componentData.GridSourceData.CurrentItemsList[rowIndex][scope.gridColumns[columnIndex].data] = null;
	                    if(scope.gridColumns[scope.currentEditingCellColumnIndex].required) {
	                        SetCellValidationMessage(tableTD, scope.componentData.ComponentEntries.GridColumnsValidatorsEntries[scope.gridColumns[scope.currentEditingCellColumnIndex].name + 'RequiredWebGridDataColumnValidatorEntry']);
	                    }
	                }
	                else {
	                    scope.componentData.GridSourceData.CurrentItemsList[rowIndex][scope.gridColumns[columnIndex].data] = scope.EditingControlModel.item.key;
	                    scope.componentData.GridSourceData.CurrentItemsList[rowIndex].FieldsData[scope.gridColumns[columnIndex].data + 'Items'].push(scope.EditingControlModel.item);
	                    RemoveCellValidationMessage(tableTD);
	                }
	            }
	            if (currentValue != null) {
	                scope.ComboBoxDataSource = scope.componentData.GridSourceData.CurrentItemsList[rowIndex].FieldsData[scope.gridColumns[columnIndex].data + 'Items'];
	                scope.EditingControlModel.item = scope.ComboBoxDataSource[0];
	            }
	            else {
	                scope.EditingControlModel.item = null;
	            }
	            var childrenWidth = $($(tableTD).children()).outerWidth(true);
	            var inputHeight = $(tableTD).height();
	            var divContainerEditorControl = $('<div class="CurrentEditingCellControlContainer" style="min-width: ' + childrenWidth + 'px; height: '+inputHeight+'px;"></div>');
	            var editorControl = $('' +
	            '<ui-select append-to-body = "false" ' +
	            '	class = "CurrentEditingCellInput grid-default-select auto-width-select-choices" ' +
	            '	uis-open-close = "ComboBoxControlOnOpenClose(isOpen)" ' +
	            '	ng-change = "ComboBoxControlOnChange()" ' +
	            '	theme = "bootstrap" ' +
	            '	ng-model = "EditingControlModel.item" ' +
	            '	ng-keydown = "ComboBoxControlOnKeyDown($event)" ' +
	            '	ng-keyup = "ComboBoxControlOnKeyUp($event)" ' +
	            '	autofocus > ' +
	            '	<ui-select-match placeholder="{{GlobalEntries.PageEntries.FormEntries.DatabasedDropDownPlaceHolderEntry}}" allow-clear="true">{{$select.selected.value}}</ui-select-match> ' +
	            '	<ui-select-choices refresh-delay="300" refresh="ComboBoxControlOnSearch($select.search)" repeat="item in ComboBoxDataSource"> ' +
	            '		<div ng-bind-html="TrustAsHtml((item.value | highlight: $select.search))"></div> ' +
	            '	</ui-select-choices> ' +
	            '</ui-select> ');
	            $(tableTD).empty();
	            $compile(editorControl)(scope);
	            if(scope.$root.$$phase != '$apply' && scope.$root.$$phase != '$digest') {
	                scope.$apply();
	            }
	            divContainerEditorControl.append(editorControl)
	            $(tableTD).append(divContainerEditorControl);
	            editorControl.focus();
	        }
	        function CreateNonDatabasedSingleChoiceLookupEditingControl(tableTD, rowIndex, columnIndex) {
	            scope.onReadableCellCreated = null;
	            var currentValue = scope.componentData.GridSourceData.CurrentItemsList[rowIndex][scope.gridColumns[columnIndex].data];
	            scope.EditingControlModel = { item: null };
	            scope.ComboBoxDataSource = [];
	            scope.ComboBoxControlOnOpenClose = function(isOpen) {
	                if(!isOpen) {
	                    scope.ComboBoxDataSource = [];
	                }
	            };
	            scope.ComboBoxControlOnKeyDown = function(event) {
	                if (event.key === 'Tab') {
	                    scope.$$postDigest(function () {
	                        editingCellTabNavigation(event, tableTD);
	                    });
	                }
	            }
	            scope.ComboBoxControlOnChange = function(event) {
	                scope.componentData.GridSourceData.CurrentItemsList[rowIndex].FieldsData[scope.gridColumns[columnIndex].data + 'Items'] = [];
	                if(scope.EditingControlModel.item == null || scope.EditingControlModel.item == undefined) {
	                    scope.componentData.GridSourceData.CurrentItemsList[rowIndex][scope.gridColumns[columnIndex].data] = null;
	                    if(scope.gridColumns[scope.currentEditingCellColumnIndex].required) {
	                        SetCellValidationMessage(tableTD, scope.componentData.ComponentEntries.GridColumnsValidatorsEntries[scope.gridColumns[scope.currentEditingCellColumnIndex].name + 'RequiredWebGridDataColumnValidatorEntry']);
	                    }
	                }
	                else {
	                    scope.componentData.GridSourceData.CurrentItemsList[rowIndex][scope.gridColumns[columnIndex].data] = scope.EditingControlModel.item.key;
	                    scope.componentData.GridSourceData.CurrentItemsList[rowIndex].FieldsData[scope.gridColumns[columnIndex].data + 'Items'].push(scope.EditingControlModel.item);
	                    RemoveCellValidationMessage(tableTD);
	                }
	            }
	            scope.ComboBoxDataSource = scope.componentData.FieldsData[scope.gridColumns[columnIndex].data + 'Items'];
	            if (currentValue != null) {
	                scope.EditingControlModel.item = scope.componentData.GridSourceData.CurrentItemsList[rowIndex].FieldsData[scope.gridColumns[columnIndex].data + 'Items'][0];
	            }
	            else {
	                scope.EditingControlModel.item = null;
	            }
	            var childrenWidth = $($(tableTD).children()).outerWidth(true);
	            var inputHeight = $(tableTD).height();
	            var divContainerEditorControl = $('<div class="CurrentEditingCellControlContainer" style="min-width: ' + childrenWidth + 'px; height: '+inputHeight+'px;"></div>');
	            var editorControl = $('' +
	            '<ui-select append-to-body = "false" ' +
	            '	class = "CurrentEditingCellInput auto-width-select-choices" ' +
	            '	ng-change = "ComboBoxControlOnChange()" ' +
	            '	theme = "bootstrap" ' +
	            '	ng-model = "EditingControlModel.item" ' +
	            '	ng-keydown = "ComboBoxControlOnKeyDown($event)" ' +
	            '	search-enabled = "false" ' +
	            '	autofocus > ' +
	            '	<ui-select-match placeholder="{{GlobalEntries.PageEntries.FormEntries.NonDatabasedDropDownPlaceHolderEntry}}" allow-clear="true">{{$select.selected.value}}</ui-select-match> ' +
	            '	<ui-select-choices repeat="item in ComboBoxDataSource | filter : $select.search"> ' +
	            '		<div ng-bind-html="TrustAsHtml((item.value | highlight: $select.search))"></div> ' +
	            '	</ui-select-choices> ' +
	            '</ui-select> ');
	            $(tableTD).empty();
	            $compile(editorControl)(scope);
	            if(scope.$root.$$phase != '$apply' && scope.$root.$$phase != '$digest') {
	                scope.$apply();
	            }
	            divContainerEditorControl.append(editorControl)
	            $(tableTD).append(divContainerEditorControl);
	            editorControl.focus();
	        }
	        function CreateTextEditingControl(tableTD, rowIndex, columnIndex) {
	            scope.onReadableCellCreated = null;
	            var gridColumn = scope.gridColumns[columnIndex];
	            scope.EditingControlModel = (scope.componentData.GridSourceData.CurrentItemsList[rowIndex][gridColumn.data] != null ? ComponentsDataHelperService.decodeHTMLText(scope.componentData.GridSourceData.CurrentItemsList[rowIndex][gridColumn.data]) : scope.componentData.GridSourceData.CurrentItemsList[rowIndex][gridColumn.data]);
	            var childrenWidth = $($(tableTD).children()).width();
	            var inputHeight = $(tableTD).height();
	            var divContainerEditorControl = $('<div class="CurrentEditingCellControlContainer" style="min-width: ' + childrenWidth + 'px; height: '+inputHeight+'px;"></div>');
	            var editorControlAttributes = '';
	            if(gridColumn.dbColumnType != undefined) {
	                switch(gridColumn.dbColumnType) {
	                    case 'system.int16':
	                    case 'system.int32':
	                    case 'system.int64':
	                        editorControlAttributes = editorControlAttributes + ' data-a-dec = "," data-a-sep = "" data-v-min = "-99999999999999999999.99" data-v-max = "99999999999999999999.99" data-m-dec = "0" ui-jq = "autoNumeric" ';
	                        break;
	                    case 'system.decimal':
	                    case 'system.float':
	                        editorControlAttributes = editorControlAttributes + ' decimal-kam4-input ';
	                        break;
	                }
	            }
	            var editorControl = $('<input type="text" class="CurrentEditingCellInput grid-control" ng-model="EditingControlModel" ' +editorControlAttributes+ ' />');
	            editorControl.bind('keydown keypress', function (event) {
	                if (event.key === 'Tab') {
	                    if(scope.gridColumns[scope.currentEditingCellColumnIndex].required && (scope.EditingControlModel == null || scope.EditingControlModel == '')) {
	                        SetCellValidationMessage(tableTD, scope.componentData.ComponentEntries.GridColumnsValidatorsEntries[scope.gridColumns[scope.currentEditingCellColumnIndex].name + 'RequiredWebGridDataColumnValidatorEntry']);
	                    }
	                    else {
	                        RemoveCellValidationMessage(tableTD);
	                    }
	                    editorCellOnBlur();
	                    editingCellTabNavigation(event, tableTD);
	                }
	            });
	            editorControl.on('blur', function() {
	                if(scope.gridColumns[scope.currentEditingCellColumnIndex].required && (scope.EditingControlModel == null || scope.EditingControlModel == '')) {
	                    SetCellValidationMessage(tableTD, scope.componentData.ComponentEntries.GridColumnsValidatorsEntries[scope.gridColumns[scope.currentEditingCellColumnIndex].name + 'RequiredWebGridDataColumnValidatorEntry']);
	                }
	                else {
	                    RemoveCellValidationMessage(tableTD);
	                }
	                editorCellOnBlur();
	            });
	            $(tableTD).empty();
	            $(tableTD).addClass('currentEditingCell');
	            $compile(editorControl)(scope);
	            divContainerEditorControl.append(editorControl);
	            $(tableTD).append(divContainerEditorControl);
	            editorControl.focus();
	        }
	        function editingCellTabNavigation(event, tableTD) {
	            if (event.key === 'Tab') {
	                var cellToClick;
	                if(!event.shiftKey) {
	                    cellToClick = getNextEditableCell(tableTD);
	                }
	                else {
	                    cellToClick = getPreviousEditableCell(tableTD);
	                }
	                if(cellToClick != null && cellToClick.length != 0) {
	                    event.preventDefault();
	                    cellToClick.click();
	                }
	            }
	        }
	        function getNextEditableCell(tableTD, sourceTD) {
	            var nextTD = $(tableTD).next();
	            if(sourceTD == undefined) {
	                sourceTD = tableTD;
	            }
	            else if(nextTD == sourceTD) {
	                return null;
	            }
	            if(nextTD.length == 0) {
	                var nextRow = $(tableTD).parent().next();
	                while(scope.$parent.ComponentShowMode == 'insert' && nextRow.length != 0 && !nextRow.hasClass('insertRow')) {
	                    nextRow = nextRow.next();
	                }
	                if(nextRow.length == 0) {
	                    nextRow = $(tableTD).parent().parent().children().first();
	                }
	                nextTD = nextRow.children().first();
	            }
	            if(nextTD.length == 0) {
	                return null;
	            }
	            var nextCellPosition = getCellPosition(nextTD[0]);
	            var gridColumn = scope.gridColumns[nextCellPosition.ColumnIndex];
	            if(scope.componentData.GridSourceData.CurrentItemsList[nextCellPosition.RowIndex] != undefined &&
	               scope.control.isCellEditable(gridColumn, scope.componentData.GridSourceData.CurrentItemsList[nextCellPosition.RowIndex].PrimaryKeyValue)) {
	                return nextTD;
	            }
	            return getNextEditableCell(nextTD, sourceTD);
	        }
	        function getPreviousEditableCell(tableTD, sourceTD) {
	            var prevTD = $(tableTD).prev();
	            if(sourceTD == undefined) {
	                sourceTD = tableTD;
	            }
	            else if(prevTD == sourceTD) {
	                return null;
	            }
	            if(prevTD.length == 0) {
	                var prevRow = $(tableTD).parent().prev();
	                if(prevRow.length == 0) {
	                    prevRow = $(tableTD).parent().parent().children().last();
	                }
	                while(scope.$parent.ComponentShowMode == 'insert' && prevRow.length != 0 && !prevRow.hasClass('insertRow')) {
	                    prevRow = prevRow.prev();
	                }
	                prevTD = prevRow.children().last();
	            }
	            if(prevTD.length == 0) {
	                return null;
	            }
	            var nextCellPosition = getCellPosition(prevTD[0]);
	            var gridColumn = scope.gridColumns[nextCellPosition.ColumnIndex];
	            if(scope.componentData.GridSourceData.CurrentItemsList[nextCellPosition.RowIndex] != undefined &&
	               scope.control.isCellEditable(gridColumn, scope.componentData.GridSourceData.CurrentItemsList[nextCellPosition.RowIndex].PrimaryKeyValue)) {
	                return prevTD;
	            }
	            return getPreviousEditableCell(prevTD, sourceTD);
	        }
	        function makeCurrentCellAsReadable(updatedValue=true) {
	            if(scope.currentEditingCellTableTD != null && scope.currentEditingCellTableTD.isEditing) {
	                scope.gridColumns[scope.currentEditingCellColumnIndex].onFieldChange(scope.currentEditingCellRowIndex, updatedValue);
	                if(scope.gridColumns[scope.currentEditingCellColumnIndex].editortype == 'text' &&
	                    (
	                        scope.gridColumns[scope.currentEditingCellColumnIndex].dbColumnType == 'system.int16' ||
	                        scope.gridColumns[scope.currentEditingCellColumnIndex].dbColumnType == 'system.int32' ||
	                        scope.gridColumns[scope.currentEditingCellColumnIndex].dbColumnType == 'system.int64'
	                    )) {
	                    var currentEditingCellInput = angular.element('.CurrentEditingCellInput');
	                    $(currentEditingCellInput).removeClass('CurrentEditingCellInput');
	                    $(currentEditingCellInput).parent().detach();
	                }
	                else {
	                    $(scope.currentEditingCellTableTD).empty();
	                }
	                $(scope.currentEditingCellTableTD).removeClass('currentEditingCell');
	                var renderedCellHTML = scope.DataTableRTI.cell( scope.currentEditingCellTableTD ).render( 'display' );
	                $(scope.currentEditingCellTableTD).append(renderedCellHTML);
	                if(scope.onReadableCellCreated != null) {
	                    scope.onReadableCellCreated($(scope.currentEditingCellTableTD));
	                }
	                scope.currentEditingCellTableTD = null;
	                scope.currentEditingCellRowIndex = -1;
	                scope.currentEditingCellColumnIndex = -1;
	            }
	        }
	        function editorCellOnBlur() {
	            if(scope.gridColumns[scope.currentEditingCellColumnIndex] != undefined && scope.gridColumns[scope.currentEditingCellColumnIndex].data != undefined) {
	                var gridColumn = scope.gridColumns[scope.currentEditingCellColumnIndex];
	                var updatedValue = true;
	                switch(gridColumn.editortype) {
	                    case 'text':
	                        if(ComponentsDataHelperService.checkIsHTMLText(scope.EditingControlModel)){
	                            scope.EditingControlModel = ComponentsDataHelperService.encodeHTMLText(scope.EditingControlModel);
	                        }
	                        updatedValue = scope.componentData.GridSourceData.CurrentItemsList[scope.currentEditingCellRowIndex][scope.gridColumns[scope.currentEditingCellColumnIndex].data] != scope.EditingControlModel;
	                        scope.componentData.GridSourceData.CurrentItemsList[scope.currentEditingCellRowIndex][scope.gridColumns[scope.currentEditingCellColumnIndex].data] = scope.EditingControlModel;
	                        break;
	                }
	                makeCurrentCellAsReadable(updatedValue);
	            }
	        }
	        /* Begin responsive */
	        scope.internalControl = scope.control || {};
	        scope.control.ShowInMobile = false;
	        var AllComponentsLoadedPromisesArray = new PromisesListFactory.PromisesList();
	        AllComponentsLoadedPromisesArray.Add(scope.$parent.$parent.AllComponentsLoadedDef.promise);
	        AllComponentsLoadedPromisesArray.InTheEndDoAction(function() {
	            scope.control.ComputeResponsiveGrid();
	        });
	        scope.watchingResize = false;
	        scope.PreventComputeResponsiveGrid = false;
	        scope.ResponsiveFiltersFirstLoadDone = false;
	        scope.control.ComputeResponsiveGrid = function() {
	            scope.control.ShowInMobile = false;
	            var elementID = elem[0].id;
	            var tableContainerRTI = $('#' + elementID + '_wrapper').children('div.table-responsive');
	            var hasHiddenColumns = false;
	            if(scope.$parent.$parent.AllComponentsLoadedDef.promise.$$state.status == 1 && tableContainerRTI[0] != undefined && tableContainerRTI[0].scrollWidth != 0) {
	                $(elem).children('tbody').children('tr.child').each(function() {
	                    $(this).remove();
	                });
	                if(scope.DataTableRTI == null) {
	                    scope.DataTableRTI = $(elem).DataTable();
	                }
	                for(var i = 0; i < scope.DataTableRTI.settings()[0].aoColumns.length; i++) {
	                    if(!scope.gridColumns[i].hidden) {
	                        scope.DataTableRTI.column(i).visible(true, false);
	                    }
	                }
	                scope.GridClonedBody = $(elem).children('tbody').clone();
	                if(scope.$parent.ComponentShowMode == 'browse' && !scope.neverShowInMobile && $(window).width() < 992 && tableContainerRTI[0].scrollWidth > tableContainerRTI.width()) {
	                    var maxWidth = tableContainerRTI.width();
	                    var progressiveWidth = 0;
	                    var visibleColIdx = 0;
	                    var headerColIdx = 0;
	                    var visibleColCount = 0;
	                    var gridColumnsHiddenColIdxArray = [];
	                    var htmlHiddenColIdxArray = [];
	                    var headerRowRTI = null;
	                    $(elem).children('thead').children('tr').each(function() {
	                        if(this.attributes['role'] != undefined && this.attributes['role'].value == 'row') {
	                            headerRowRTI = this;
	                        }
	                    });
	                    for(var i = 0; i < scope.DataTableRTI.settings()[0].aoColumns.length; i++) {
	                        if(!scope.gridColumns[i].hidden) {
	                            var headerThClientWidth = $(headerRowRTI).children('th')[headerColIdx].clientWidth;
	                            if(progressiveWidth + headerThClientWidth > maxWidth && visibleColIdx != 0) {
	                                scope.DataTableRTI.column(i).visible(false, true);
	                                hasHiddenColumns = true;
	                                gridColumnsHiddenColIdxArray.push(i);
	                                htmlHiddenColIdxArray.push(visibleColIdx);
	                            }
	                            else {
	                                visibleColCount++;
	                                headerColIdx++;
	                            }
	                            progressiveWidth = progressiveWidth + headerThClientWidth;
	                            visibleColIdx++;
	                        }
	                    }
	                    if(hasHiddenColumns) {
	                        scope.control.ShowInMobile = true;
	                        $('#' + elementID + 'ColumnsGroups').hide();
	                        $('#' + elementID + 'FilterRow').hide();
	                        $(elem).children('tbody').children('tr').each(function() {
	                            $(this).addClass('parent');
	                        });
	                        $(elem).children('tbody').children('tr.parent').each(function(rowIdx) {
	                            var currentTR = $(this);
	                            var asyncFn = function() {
	                                var mainTR = $('<tr class="child"></tr>');
	                                var mainTD = $('<td colspan="' + visibleColCount + '"></td>');
	                                var mainTABLE = $('<table class = "row-details"></table>');
	                                for(var i = 0; i < gridColumnsHiddenColIdxArray.length; i++) {
	                                    var hiddenColIdx = htmlHiddenColIdxArray[i];
	                                    if($(scope.GridClonedBody.children('tr')[rowIdx]).children('td')[hiddenColIdx] != undefined) {
	                                        var gridColumnsColIdx = gridColumnsHiddenColIdxArray[i]
	                                        var globalRowIndex = rowIdx + scope.gridSummaryData.Begin;
	                                        var globalCellIdx = visibleColCount + i;
	                                        var fieldTR = $('<tr></tr>');
	                                        var fieldTDTitle = null;
	                                        var order = scope.DataTableRTI.order()[0]
	                                        var fieldTDSortingClass = (order===undefined || order[0]!=gridColumnsColIdx) ? 'sorting' : 'sorting_' + order[1]
	                                        if (scope.gridColumns[gridColumnsColIdx].orderable) {
	                                            fieldTDTitle = $('<td class="row-details-field-title grid-columns-col-idx-' + gridColumnsColIdx + ' ' + fieldTDSortingClass +'" ng-click="' + scope.onTitleCellClick + '('+gridColumnsColIdx+')">' + scope.gridColumns[gridColumnsColIdx].text + '</td>');
	                                        } else {
	                                            fieldTDTitle = $('<td class="row-details-field-title">' + scope.gridColumns[gridColumnsColIdx].text + '</td>');
	                                        }
	                                        var fieldTDData = $('<td class="row-details-field-data"><span ng-click="' + scope.onDetailCellClick + '(' + globalCellIdx + ',' + globalRowIndex + ')">' + $(scope.GridClonedBody.children('tr')[rowIdx]).children('td')[hiddenColIdx].innerHTML + '</span></td>');
	                                        fieldTR.append(fieldTDTitle);
	                                        fieldTR.append(fieldTDData);
	                                        $compile(fieldTDTitle)(scope.$parent);
	                                        $compile(fieldTDData)(scope.$parent);
	                                        mainTABLE.append(fieldTR);
	                                    }
	                                }
	                                mainTD.append(mainTABLE);
	                                mainTR.append(mainTD);
	                                for(var i = 0; i < visibleColCount - 1; i++) {
	                                    mainTR.append($('<td style="display: none;"></td>'));
	                                }
	                                currentTR.after(mainTR);
	                            }
	                            setTimeout(asyncFn, 0);
	                        });
	                        if(!scope.ResponsiveFiltersFirstLoadDone) {
	                            $('#' + elementID + 'ResponsiveFiltersContainer').children().each(function() {
	                                $(this).detach();
	                                $(this).remove();
	                            });
	                            $('#' + elementID + 'ResponsiveFiltersContainer').empty();
	                            scope.ResponsiveFiltersFirstLoadDone = true;
	                            scope.uiSelectModelItems = [];
	                            $('#' + elementID + 'FilterRow').children('th').each(function() {
	                                var column = scope.$parent.GridColumns[$(this)[0].attributes['data-column-idx'].value];
	                                if(column.filters != undefined && column.filters != null) {
	                                    for(var i = 0; i < column.filters.length; i++) {
	                                        var filter = column.filters[i];
	                                        var uiSelectModelItem = {
	                                            Filter: filter,
	                                            Text: filter.filterEntry,
	                                            DataColumnIdx: $(this)[0].attributes['data-column-idx'].value,
	                                            IsFilterValued: filter.isFilterValued
	                                        };
	                                        scope.uiSelectModelItems.push(uiSelectModelItem);
	                                    }
	                                }
	                            });
	                            if(scope.uiSelectModelItems.length > 0) {
	                                $('#' + elementID + 'ResponsiveFiltersContainer').show();
	                                var fieldFilterDiv = $('<div class="col-sm-12"></div>');
	                                var fieldFilterFormGroup = $('<div class="form-group"></div>');
	                                var fieldFilterUiSelectText = $('' +
	                                '<ui-select append-to-body="false" search-enabled="false" ng-model="uiSelectModel" on-select="selectControlFilter($select.selected)" theme="bootstrap" append-to-body="true">' +
	                                '	<ui-select-match ><span class="ResponsiveFilterUiSelectMatchPlaceholder">' + scope.$parent.$parent.GlobalEntries.PageEntries.GridEntries.ResponsiveFilterUiSelectMatchPlaceholderFilterForString + '</span><span class="ResponsiveFilterUiSelectMatchValue">{{$select.selected.Text}}</span></ui-select-match>' +
	                                '	<ui-select-choices repeat="item in uiSelectModelItems"><span class="ResponsiveFilterUiSelectChoice">{{item.Text}}</span><span ng-if="item.IsFilterValued()" class="ResponsiveFilterUiSelectChoiceFilterIsSet fa fa-filter"></span></ui-select-choices>' +
	                                '</ui-select>');
	                                var controlFilterDiv = $('<div class="col-sm-12"></div>');
	                                var controlFilterFormGroup = $('<div class="form-group ControlFilterFormGroup"></div>');
	                                $compile(fieldFilterUiSelectText)(scope);
	                                $timeout(function() {
	                                    fieldFilterFormGroup.append(fieldFilterUiSelectText);
	                                    fieldFilterDiv.append(fieldFilterFormGroup);
	                                    $('#' + elementID + 'ResponsiveFiltersContainer').append(fieldFilterDiv);
	                                    if(scope.uiSelectModel == undefined) {
	                                        scope.uiSelectModel = scope.uiSelectModelItems[0];
	                                    }
	                                    scope.selectControlFilter(scope.uiSelectModel);
	                                });
	                                scope.selectControlFilter = function(selectedModelItem) {
	                                    controlFilterFormGroup.children().each(function() {
	                                        $(this).detach();
	                                        $(this).remove();
	                                    });
	                                    controlFilterFormGroup.empty();
	                                    scope.uiSelectModel = selectedModelItem;
	                                    var filter = scope.uiSelectModel.Filter;
	                                    scope[filter.name] = scope.$parent[filter.name];
	                                    var filterElem = null;
	                                    switch(filter.filterType) {
	                                        case 'text':
	                                            filterElem = $('<input type="text" class="form-control" name="' + filter.name + '" style="width:100%"/>');
	                                            filterElem.val($('#' + filter.name).val());
	                                            filterElem.on( 'keyup', ComponentsNavigationHelperService.debounce(function() {
	                                                $('#' + filter.name).val(filterElem.val());
	                                                scope.$parent.CallDataTableOnFilter();
	                                            }, 1000));
	                                            break;
	                                        case 'date':
	                                            filterElem = $('<input type="text" class="datepickerFilter"></input>');
	                                            filterElem.val($('#' + filter.name).val());
	                                            filterElem.on( 'blur', function () {
	                                                $('#' + filter.name).val(filterElem.val());
	                                                scope.$parent.CallDataTableOnFilter();
	                                            } );
	                                            filterElem.datetimepicker({
	                                                locale: scope.$parent.$parent.GlobalEntries.PagesComponentsEntries.DateTimePicker.Language,
	                                                useCurrent: false,
	                                                format: 'DD/MM/YYYY',
	                                                widgetPositioning: { vertical: 'bottom' }
	                                            });
	                                            break;
	                                        case 'datetime':
	                                            filterElem = $('<input type="text" class="datetimepickerFilter"></input>');
	                                            filterElem.val($('#' + filter.name).val());
	                                            filterElem.on( 'blur', function () {
	                                                $('#' + filter.name).val(filterElem.val());
	                                                scope.$parent.CallDataTableOnFilter();
	                                            } );
	                                            filterElem.datetimepicker({
	                                                locale: scope.$parent.$parent.GlobalEntries.PagesComponentsEntries.DateTimePicker.Language,
	                                                useCurrent: false,
	                                                format: 'DD/MM/YYYY HH:mm:ss',
	                                                widgetPositioning: { vertical: 'bottom' }
	                                            });
	                                            break;
	                                        case 'time':
	                                            filterElem = $('<input type="text" class="datetimepickerFilter"></input>');
	                                            filterElem.val($('#' + filter.name).val());
	                                            filterElem.on( 'blur', function () {
	                                                $('#' + filter.name).val(filterElem.val());
	                                                scope.$parent.CallDataTableOnFilter();
	                                            } );
	                                            filterElem.datetimepicker({
	                                                locale: scope.$parent.$parent.GlobalEntries.PagesComponentsEntries.DateTimePicker.Language,
	                                                useCurrent: false,
	                                                format: 'HH:mm:ss',
	                                                widgetPositioning: { vertical: 'bottom' }
	                                            });
	                                            break;
	                                        case 'checkbox':
	                                            filterElem = $('<div class="checkbox" style="text-align:center"><input type="checkbox" id="' + filter.name + '_ResponsiveFilter" /><label for="' + filter.name + '_ResponsiveFilter">&nbsp;</label></div>');
	                                            var inputElem = filterElem.find('#' + filter.name + '_ResponsiveFilter');
	                                            if(filter.FilterValueModel == 'indeterminate') {
	                                                inputElem.prop('indeterminate', true);
	                                                inputElem.prop('checked', false);
	                                            }
	                                            else {
	                                                inputElem.prop('indeterminate', false);
	                                                inputElem.prop('checked', filter.FilterValueModel == 'checked');
	                                            }
	                                            inputElem.on( 'click', function () {
	                                                if(filter.FilterValueModel == 'indeterminate'){
	                                                    inputElem.prop('indeterminate', false);
	                                                    $('#' + filter.name).prop('indeterminate', false);
	                                                    inputElem.prop('checked', true);
	                                                    $('#' + filter.name).prop('checked', true);
	                                                    filter.FilterValueModel = 'checked';
	                                                }
	                                                else if(filter.FilterValueModel == 'checked'){
	                                                    inputElem.prop('checked', false);
	                                                    $('#' + filter.name).prop('checked', false);
	                                                    filter.FilterValueModel = 'unchecked';
	                                                }
	                                                else if(filter.FilterValueModel== 'unchecked'){
	                                                    inputElem.prop('indeterminate', true);
	                                                    $('#' + filter.name).prop('indeterminate', true);
	                                                    filter.FilterValueModel = 'indeterminate';
	                                                }
	                                                scope.$parent.CallDataTableOnFilter();
	                                            } );
	                                            break;
	                                        case 'dropdown':
	                                            var filterSelectElemText;
	                                            if(filter.filterIsDatabasedLookup) {
	                                                var filterSelectElemID = filter.name + 'ResponsiveFilterComboBoxInput';
	                                                filterSelectElemText = '' +
	                                                    '<ui-select class="' + elementID + '_ColumnFilter" id="' + filterSelectElemID + '" append-to-body = "false" uis-open-close = "FilterComboBoxControlOnOpenClose(isOpen, ' + filter.name + ')" ng-change = "FilterComboBoxControlOnChange()" theme = "bootstrap" ng-required = "true" ng-model = "' + filter.name + '.FilterValueModel.item" name = "' + filter.name + 'Filter" ng-keydown = "FilterComboBoxControlOnKeyDown($event, ' + filter.name + ')"> ' +
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
	                                                scope.FilterComboBoxControlOnKeyDown = function (event, columnFilter)
	                                                {
	                                                    scope.$parent.FilterComboBoxControlOnKeyDown(event, columnFilter);
	                                                };
	                                                scope.FilterComboBoxControlOnSearch = function (searchText, columnFilter)
	                                                {
	                                                    scope.$parent.FilterComboBoxControlOnSearch(searchText, columnFilter);
	                                                };
	                                                scope.FilterComboBoxControlOnOpenClose = function (isOpen, columnFilter)
	                                                {
	                                                    scope.$parent.FilterComboBoxControlOnOpenClose(isOpen, columnFilter);
	                                                };
	                                            }
	                                            else {
	                                                filterSelectElemText = '' +
	                                                '<ui-select class="' + elementID + '_ColumnFilter" append-to-body = "false" ng-change = "FilterComboBoxControlOnChange()" theme = "bootstrap" ng-model = "' + filter.name + '.FilterValueModel.item" name = "' + filter.name + 'Filter" search-enabled = "false"> ' +
	                                                '	<ui-select-match allow-clear="true">{{$select.selected.value}}</ui-select-match> ' +
	                                                '	<ui-select-choices repeat="item in ' + filter.name + '.filterItems | filter : $select.search"> ' +
	                                                '		<div ng-bind-html="TrustAsHtml((item.value | highlight: $select.search))"/> ' +
	                                                '	</ui-select-choices> ' +
	                                                '</ui-select>';
	                                            }
	                                            scope.FilterComboBoxControlOnChange = function ()
	                                            {
	                                                scope.$parent.FilterComboBoxControlOnChange();
	                                            }
	                                            filterElem = $(filterSelectElemText);
	                                            break;
	                                    }
	                                    if(filterElem != null) {
	                                        $compile(filterElem)(scope);
	                                        $timeout(function() {
	                                            controlFilterFormGroup.append(filterElem);
	                                            controlFilterDiv.append(controlFilterFormGroup);
	                                            $('#' + elementID + 'ResponsiveFiltersContainer').append(controlFilterDiv);
	                                        });
	                                    }
	                                }
	                            }
	                            else {
	                                $('#' + elementID + 'ResponsiveFiltersContainer').hide();
	                            }
	                        }
	                    }
	                    else {
	                        $('#' + elementID + 'ColumnsGroups').show();
	                        $('#' + elementID + 'FilterRow').show();
	                        $('#' + elementID + 'ResponsiveFiltersContainer').hide();
	                        $(elem).children('tbody').children('tr.parent').each(function() {
	                            $(this).removeClass('parent');
	                        });
	                    }
	                }
	                else {
	                    $('#' + elementID + 'ColumnsGroups').show();
	                    $('#' + elementID + 'FilterRow').show();
	                    $('#' + elementID + 'ResponsiveFiltersContainer').hide();
	                    $(elem).children('tbody').children('tr.parent').each(function() {
	                        $(this).removeClass('parent');
	                    });
	                }
	            }
	            if(!scope.watchingResize) {
	                scope.watchingResize = true;
	                $(window).resize(function() {
	                    if(!scope.PreventComputeResponsiveGrid) {
	                        scope.control.ComputeResponsiveGrid();
	                    }
	                    scope.PreventComputeResponsiveGrid = false;
	                });
	            }
	        }
	        scope.control.RefreshFilters = function() {
	            scope.ResponsiveFiltersFirstLoadDone = false;
	            scope.control.ComputeResponsiveGrid();
	        }
	    }
	};
}
]);
kamApp.directive('uiSelectKam4NoChoice',['$window','$document',function($window,$document)
{
	return {
	    restrict: 'A',
	    scope: {
	        'kam4Show': '='
	    },
	    link: function (scope, elem, attrs){
	        var splittedElemClass = [],
	            uiSelectContainer = null,
	            directionUpClassName = 'direction-up',
	            uiSelectContainerOffset = {},
	            uiSelectKam4NoChoiceOffset = {};
	        scope.$watch('kam4Show',
	            function(newValue)
	            {
	                uiSelectContainer = elem.parent();
	                if(newValue){
	                    elem.removeClass('ng-hide');
	                    uiSelectContainerOffset = getOffset(uiSelectContainer);
	                    uiSelectKam4NoChoiceOffset = getOffset(elem);
	                    if(noChoiceOffsetBiggerPageHeight(uiSelectContainerOffset, uiSelectKam4NoChoiceOffset) || uiSelectContainer.hasClass(directionUpClassName)){
	                        setKam4NoChoiceDropdownPosUp(uiSelectKam4NoChoiceOffset);
	                    }
	                }
	                else {
	                    setKam4NoChoiceDropdownPosDown();
	                    elem.addClass('ng-hide');
	                }
	            }
	        );
	        function getOffset(element){
	            var boundingClientRect = element[0].getBoundingClientRect();
	            return {
	                 width: boundingClientRect.width || element.prop('offsetWidth'),
	                  height: boundingClientRect.height || element.prop('offsetHeight'),
	                  top: boundingClientRect.top + ($window.pageYOffset || $document[0].documentElement.scrollTop),
	                  left: boundingClientRect.left + ($window.pageXOffset || $document[0].documentElement.scrollLeft)
	            };
	        }
	        function noChoiceOffsetBiggerPageHeight (uiSelectContainerOffset, uiSelectKam4NoChoiceOffset){
	            var scrollTop = $document[0].documentElement.scrollTop || $document[0].body.scrollTop;
	            var totalUiSelectOffset = uiSelectContainerOffset.top + uiSelectContainerOffset.height + uiSelectKam4NoChoiceOffset.height;
	            var pageHeight = scrollTop + $document[0].documentElement.clientHeight;
	            if (totalUiSelectOffset > pageHeight)
	                return true;
	            else
	                return false;
	        }
	        function setKam4NoChoiceDropdownPosUp (uiSelectKam4NoChoiceOffset = getOffset(elem)){
	              elem[0].style.position = 'absolute';
	              elem[0].style.top = (uiSelectKam4NoChoiceOffset.height * -1) + 'px';
	              uiSelectContainer.addClass(directionUpClassName);
	        }
	        function setKam4NoChoiceDropdownPosDown (){
	              elem[0].style.position = '';
	              elem[0].style.top = '';
	        }
	    }
	};
}
]);
kamApp.directive('clickOutside',['$window','$parse',function($window,$parse)
{
	return {
	    link: function(scope, el, attr) {
	        function contains(parentElement, event) {
	            var xLeft = $(parentElement).offset().left;
	            var xRight = xLeft + $(parentElement).outerWidth();
	            var yTop = $(parentElement).offset().top;
	            var yBottom = yTop + $(parentElement).outerHeight();
	            if(event.x >= xLeft && event.x <= xRight && event.y >= yTop && event.y <= yBottom) {
	                return true;
	            }
	            return false;
	        }
	        if (!attr.clickOutside) {
	            return;
	        }
	        var ignore;
	        if (attr.ignoreIf) {
	            ignore = $parse(attr.ignoreIf);
	        }
	        var nakedEl = el[0];
	        var fn = $parse(attr.clickOutside);
	        var handler = function(e) {
	        if (nakedEl === e.target || contains($(nakedEl), e) || nakedEl.contains(e.target) || (ignore && ignore(scope))) {
	            return;
	        }
	        scope.$apply(fn);
	        };
	        $window.addEventListener('click', handler, true);
	        scope.$on('$destroy', function(e) {
	            $window.removeEventListener('click', handler);
	        });
	    }
	};
}
]);
kamApp.directive('multipleFiltersKam4Datacolumn',['$compile','$filter','$timeout','$document','$window','ComponentsNavigationHelperService',function($compile,$filter,$timeout,$document,$window,ComponentsNavigationHelperService)
{
	return {
	    restrict: 'A',
	    scope: {
	    },
	    link: function(scope, element, attrs) {
	        function calcMultipleDivPosition(){
	            multifilterOpenDiv.addClass('kam4InvisibleBlock');
	            var a = getOffset(multifilterOpenDiv);
	            if(checkMultipleDivInWindow(a)){
	                var rightOffsetMultipleInput = calcPageContainerWidthWithScroll() - getOffset(multifilterTableInput).left - getOffset(multifilterTableInput).width;
	                multifilterOpenDiv.css('right', rightOffsetMultipleInput+'px');
	            }
	        }
	        function getOffset(myelement){
	            var boundingClientRect = myelement[0].getBoundingClientRect();
	            return {
	                width: boundingClientRect.width || myelement.prop('offsetWidth'),
	                height: boundingClientRect.height || myelement.prop('offsetHeight'),
	                top: boundingClientRect.top + ($window.pageYOffset || $document[0].documentElement.scrollTop),
	                left: boundingClientRect.left + ($window.pageXOffset || $document[0].documentElement.scrollLeft)
	            };
	        }
	        function checkMultipleDivInWindow(myElement){
	            var pageWidth = calcPageContainerWidthWithScroll();
	            var totalMyElementOffset = myElement.left + myElement.width;
	            if(totalMyElementOffset > pageWidth)
	                return true;
	            else
	                return false;
	        }
	        function calcPageContainerWidthWithScroll(){
	            var scrollLeft = angular.element('.page-container')[0].scrollLeft || $document[0].body.scrollLeft;
	            var clientWidth = angular.element('.page-container')[0].clientWidth;
	            return clientWidth + scrollLeft;
	        }
	        scope.GridColumns = scope.$parent.GridColumns;
	        scope.GlobalEntries = scope.$parent.GlobalEntries;
	        scope.TrustAsHtml = scope.$parent.TrustAsHtml;
	        var dataColumnIdx = $(element).parent()[0].attributes['data-column-idx'].value;
	        scope.gridColumn = scope.GridColumns[dataColumnIdx];
	        scope.gridColumn.showMultifilterPanel = false;
	        scope.onMultifilterChange = function($event) {
	            $(event.target).val('');
	            scope.multifilterControlValue = null;
	        }
	        scope.onMultifilterPanelFocus = function() {
	            if(scope.$parent.currentMultifilterColumn != undefined && scope.$parent.currentMultifilterColumn != scope.gridColumn) {
	                scope.$parent.currentMultifilterColumn.showMultifilterPanel = false;
	            }
	            scope.$parent.currentMultifilterColumn = scope.gridColumn;
	            var newMinWidth = multifilterMainContainerDiv.width();
	            if(newMinWidth < globalCssMinWidth) {
	                newMinWidth = globalCssMinWidth;
	            }
	            multifilterOpenDiv.css('min-width', newMinWidth + 'px');
	            scope.gridColumn.showMultifilterPanel = true;
	            calcMultipleDivPosition();
	            $timeout(function () {
	                var actionFocus = multifilterTableInput.attr('action-focus') === undefined ? 'default-focus-first' : multifilterTableInput.attr('action-focus');
	                multifilterTableInput.removeAttr('action-focus');
	                if (actionFocus == 'default-focus-first' || actionFocus == 'focus-last') {
	                    var filterToFocus = (actionFocus == 'default-focus-first') ? scope.$parent.currentMultifilterColumn.filters[0] : scope.$parent.currentMultifilterColumn.filters.at(-1);
	                    switch(filterToFocus.filterType) {
	                        case 'text':
	                        case 'checkbox':
	                        case 'date':
	                        case 'datetime':
	                            filterToFocus.multifilterOpenFormFilterElem.find('input').focus();
	                            break;
	                        case 'dropdown':
	                            filterToFocus.multifilterOpenFormFilterElem.find('input.ui-select-focusser').focus();
	                            break;
	                    }
	                } else if (actionFocus == 'shift-tab') {
	                    var filterToFocus = $(multifilterTableInput.attr('focus-element'));
	                    multifilterTableInput.removeAttr('focus-element');
	                    $('body').click();
	                    $(filterToFocus).focus();
	                }
	            }, 20, false);
	        }
	        scope.onMultifilterKeydown = function(evt) {
	            if (evt.key == 'Tab' && evt.shiftKey) {
	                if (evt.target.id === scope.$parent.currentMultifilterColumn.filters[0].name ||
	                    evt.target.id === scope.$parent.currentMultifilterColumn.filters[0].multifilterOpenFormFilterElem.find('input.ui-select-focusser').attr('id')) {
	                    var idxCurrentColumn = scope.GridColumns.findIndex((column) => column.name === scope.gridColumn.name);
	                    var isFirst = scope.GridColumns.filter((column) => !column.hidden && column.filters.length>0)[0].name === scope.gridColumn.name;
	                    var idxColumnFocus = -1;
	                    if (isFirst) {
	                        idxColumnFocus = scope.GridColumns.slice(idxCurrentColumn+1).reverse().findIndex((column) => !column.hidden && column.filters.length>0);
	                        idxColumnFocus = (idxColumnFocus!=-1) ? scope.GridColumns.length-1 - idxColumnFocus : -1;
	                    } else {
	                        idxColumnFocus = scope.GridColumns.slice(0, idxCurrentColumn).reverse().findIndex((column) => !column.hidden && column.filters.length>0);
	                        idxColumnFocus = (idxColumnFocus!=-1) ? idxCurrentColumn-1 - idxColumnFocus : -1;
	                    }
	                    $('#'+scope.GridColumns[idxCurrentColumn].name+'_MultipleFilterInput').attr('action-focus', 'shift-tab');
	                    if (idxColumnFocus != -1) {
	                        if (scope.GridColumns[idxColumnFocus].filters.length == 1) {
	                            $('#'+scope.GridColumns[idxCurrentColumn].name+'_MultipleFilterInput').attr('focus-element', '#'+scope.GridColumns[idxColumnFocus].filters[0].name);
	                        } else {
	                            $('#'+scope.GridColumns[idxCurrentColumn].name+'_MultipleFilterInput').attr('focus-element', '#'+scope.GridColumns[idxColumnFocus].name+'_MultipleFilterInput');
	                            $('#'+scope.GridColumns[idxColumnFocus].name+'_MultipleFilterInput').attr('action-focus', 'focus-last');
	                        }
	                    }
	                }
	            }
	            else if (evt.key == 'Tab' && !evt.shiftKey) {
	                if (scope.GridColumns.filter((column) => !column.hidden && column.filters.length>0).at(-1).name === scope.gridColumn.name &&
	                    (evt.target.id === scope.$parent.currentMultifilterColumn.filters.at(-1).name ||
	                    evt.target.id === scope.$parent.currentMultifilterColumn.filters[0].multifilterOpenFormFilterElem.find('input.ui-select-focusser').attr('id'))) {
	                    var idxCurrentColumn = scope.GridColumns.findIndex((column) => column.name === scope.gridColumn.name);
	                    var idxColumnFocus = idxColumnFocus = scope.GridColumns.findIndex((column) => !column.hidden && column.filters.length>0);
	                    if (idxColumnFocus != -1) {
	                        if (scope.GridColumns[idxColumnFocus].filters.length == 1) {
	                            $timeout(() => $('#'+scope.GridColumns[idxColumnFocus].filters[0].name).focus(), 0, false);
	                        } else {
	                            $timeout(() => $('#'+scope.GridColumns[idxColumnFocus].name+'_MultipleFilterInput').focus(), 0, false);
	                        }
	                    }
	                }
	            }
	        }
	        var multifilterMainContainerDiv = $('<div class="MultipleFilterDiv" click-outside="GridColumns[' + dataColumnIdx + '].showMultifilterPanel = false"></div>');
	        var multifilterTableInput = $('<input id="' + scope.gridColumn.name +'_MultipleFilterInput" placeholder="{{gridColumn.areFiltersValued() ? \'&#xf0b0;\': \'\'}}" class="MultipleFilterInput" style="font-family: FontAwesome;" type="text" ng-focus="onMultifilterPanelFocus()" ng-model="multifilterControlValue" ng-change="onMultifilterChange($event)">');
	        var multifilterOpenDiv = $('<div style="opacity: 0" ng-show="GridColumns[' + dataColumnIdx + '].showMultifilterPanel" class="MultipleFilterWrapper"></div>');
	        var multifilterOpenLoader = $('<div class="MultipleFilterWrapperLoader" ng-if="$parent.ShowComponentLoader"></div>');
	        var multifilterOpenForm = $('<form name="' + scope.gridColumn.name + 'Form" role="form" novalidate ></form>');
	        var firstFilter = null;
	        var lastFilterElem = null;
	        for(var i = 0; i < scope.gridColumn.filters.length; i++) {
	            var filter = scope.gridColumn.filters[i];
	            scope[filter.name] = scope.$parent[filter.name];
	            scope[filter.name].multifilterOpenFormFilterElem = null;
	            switch(filter.filterType) {
	                case 'date':
	                    scope[filter.name].multifilterOpenFormFilterElem = $('' +
	                    '<div class="form-group form-group-default form-group-forced" pg-form-group style="overflow: visible;">' +
	                    '	<label>{{' + filter.name + '.filterEntry }}</label>' +
	                    '	<input id="' + filter.name + '" type="text" class="form-control datepickerFilter" name="' + filter.name + '" ng-keydown="onMultifilterKeydown($event)" ng-model ="'+filter.name+'.value" ng-model-options="{ updateOn: \'blur\' }" ng-change ="MultiFilterDatePickerOnChange('+filter.name+')" ng-focus="MultiFilterDatePickerOnFocus('+filter.name+')" ng-blur="MultiFilterDatePickerOnBlur('+filter.name+')" data-format = "DD/MM/YYYY" data-language = "{{GlobalEntries.PagesComponentsEntries.DateTimePicker.Language}}" type = "text" data-date-time-picker data-use-current = "false"></input> '+
	                    '</div>');
	                    scope.MultiFilterDatePickerOnFocus = function(columnFilter) {
	                        scope.$parent.MultiFilterDatePickerOnFocus(columnFilter);
	                    }
	                    scope.MultiFilterDatePickerOnBlur = function(columnFilter) {
	                        scope.$parent.MultiFilterDatePickerOnBlur(columnFilter);
	                    }
	                    scope.MultiFilterDatePickerOnChange = function(columnFilter) {
	                        scope.$parent.MultiFilterDatePickerOnChange(columnFilter);
	                    }
	                    break;
	                case 'datetime':
	                    scope[filter.name].multifilterOpenFormFilterElem = $('' +
	                    '<div class="form-group form-group-default form-group-forced" pg-form-group style="overflow: visible;">' +
	                    '	<label>{{' + filter.name + '.filterEntry }}</label>' +
	                    '	<input id="' + filter.name + '" type="text" class="form-control datetimepickerFilter" name="' + filter.name + '" ng-keydown="onMultifilterKeydown($event)" ng-model ="'+filter.name+'.value" ng-model-options="{ updateOn: \'blur\' }" ng-change ="MultiFilterDateTimePickerOnChange('+filter.name+')" ng-focus="MultiFilterDateTimePickerOnFocus('+filter.name+')" ng-blur="MultiFilterDateTimePickerOnBlur('+filter.name+')" data-format = "DD/MM/YYYY HH:mm:ss" data-language = "{{GlobalEntries.PagesComponentsEntries.DateTimePicker.Language}}" type = "text" data-date-time-picker data-use-current = "false"></input> '+
	                    '</div>');
	                    scope.MultiFilterDateTimePickerOnFocus = function(columnFilter) {
	                        scope.$parent.MultiFilterDateTimePickerOnFocus(columnFilter);
	                    }
	                    scope.MultiFilterDateTimePickerOnBlur = function(columnFilter) {
	                        scope.$parent.MultiFilterDateTimePickerOnBlur(columnFilter);
	                    }
	                    scope.MultiFilterDateTimePickerOnChange = function(columnFilter) {
	                        scope.$parent.MultiFilterDateTimePickerOnChange(columnFilter);
	                    }
	                    break;
	                case 'time':
	                    scope[filter.name].multifilterOpenFormFilterElem = $('' +
	                    '<div class="form-group form-group-default form-group-forced" pg-form-group style="overflow: visible;">' +
	                    '	<label>{{' + filter.name + '.filterEntry }}</label>' +
	                    '	<input id="' + filter.name + '" type="text" class="form-control timepickerFilter" name="' + filter.name + '" ng-keydown="onMultifilterKeydown($event)" ng-model ="'+filter.name+'.value" ng-model-options="{ updateOn: \'blur\' }" ng-change ="MultiFilterTimePickerOnChange('+filter.name+')" ng-focus="MultiFilterTimePickerOnFocus('+filter.name+')" ng-blur="MultiFilterTimePickerOnBlur('+filter.name+')" data-format = "HH:mm:ss" data-language = "{{GlobalEntries.PagesComponentsEntries.DateTimePicker.Language}}" type = "text" data-date-time-picker data-use-current = "false"></input> '+
	                    '</div>');
	                    scope.MultiFilterTimePickerOnFocus = function(columnFilter) {
	                        scope.$parent.MultiFilterTimePickerOnFocus(columnFilter);
	                    }
	                    scope.MultiFilterTimePickerOnBlur = function(columnFilter) {
	                        scope.$parent.MultiFilterTimePickerOnBlur(columnFilter);
	                    }
	                    scope.MultiFilterTimePickerOnChange = function(columnFilter) {
	                        scope.$parent.MultiFilterTimePickerOnChange(columnFilter);
	                    }
	                    break;
	                case 'checkbox':
	                    scope[filter.name].multifilterOpenFormFilterElem = $('' +
	                    '<div class="form-group form-group-default form-group-forced" pg-form-group style="overflow: visible;">' +
	                    '	<label>{{' + filter.name + '.filterEntry }}</label>' +
	                    '	<div class="checkbox" style="text-align:center">' +
	                    '		<input type="checkbox" id="' + filter.name + '" name="' + filter.name + '" ng-keydown="onMultifilterKeydown($event)"/>' +
	                    '		<label for="' + filter.name + '">&nbsp;</label>' +
	                    '	</div>' +
	                    '</div>');
	                    scope[filter.name].FilterValueModel = 'indeterminate';
	                    scope[filter.name].multifilterOpenFormFilterElem.find('input').prop("indeterminate", true);
	                    break;
	                case 'text':
	                    scope[filter.name].multifilterOpenFormFilterElem = $('' +
	                    '<div class="form-group form-group-default form-group-forced" pg-form-group style="overflow: visible;">' +
	                    '	<label style="float: left; ">{{' + filter.name + '.filterEntry }}</label>' +
	                        (filter.filterHasSuggestion ? '<span class="linkcell fa fa-question-circle-o fa-2x fa-fw" style="float: right;" data-toggle="tooltip" data-placement="top" title="{{' + filter.name + '.filterSuggestion}}"></span>' : '') +
	                    '	<input id="' + filter.name + '" type="text" class="form-control" name="' + filter.name + '" ng-keydown="onMultifilterKeydown($event)"/>' +
	                    '</div>');
	                    break;
	                case 'dropdown':
	                    var filterSelectElemText;
	                    if(filter.filterIsDatabasedLookup) {
	                        scope[filter.name].FilterValueModel = {item: null};
	                        scope[filter.name].filterItems = [];
	                        filterSelectElemText = '' +
	                        '<ui-select class="auto-width-select-choices" id="' + filter.name + '" name="' + filter.name + '" append-to-body = "false" uis-open-close = "FilterComboBoxControlOnOpenClose(isOpen, ' + filter.name + ')" ng-change = "FilterComboBoxControlOnChange()" theme = "bootstrap" ng-required = "true" ng-model = "' + filter.name + '.FilterValueModel.item" name = "' + filter.name + 'Filter" ng-keydown = "FilterComboBoxControlOnKeyDown($event, ' + filter.name + ')" on-select="FilterFormCloseOnSelect(' + filter.name + ')"> ' +
	                        '	<ui-select-match allow-clear="true">{{$select.selected.value}}</ui-select-match> ' +
	                        '	<ui-select-choices refresh-delay="300" refresh="FilterComboBoxControlOnSearch($select.search, ' + filter.name + ')" repeat="item in ' + filter.name + '.filterItems" ng-keydown="onMultifilterKeydown($event)"> ' +
	                        '		<div ng-bind-html="TrustAsHtml((item.value | highlight: $select.search))"/> ' +
	                        '	</ui-select-choices> ' +
	                        '	<ul ui-select-kam4-no-choice class="ui-select-no-choice ui-select-dropdown dropdown-menu" kam4-show="' + filter.name + '.FilterComboBoxShowNoChoice && $select.items.length == 0"> ' +
	                        '		<li> ' +
	                        '			<div>{{GlobalEntries.PageEntries.FormEntries.DatabasedDropDownNoResultEntry}}</div> ' +
	                        '		</li> ' +
	                        '	</ul> ' +
	                        '</ui-select> ';
	                        scope.FilterComboBoxControlOnKeyDown = function (event, columnFilter)
	                        {
	                            scope.$parent.FilterComboBoxControlOnKeyDown(event, columnFilter);
	                        };
	                        scope.FilterComboBoxControlOnSearch = function (searchText, columnFilter)
	                        {
	                            scope.$parent.FilterComboBoxControlOnSearch(searchText, columnFilter);
	                        };
	                        scope.FilterComboBoxControlOnOpenClose = function (isOpen, columnFilter)
	                        {
	                            scope.$parent.FilterComboBoxControlOnOpenClose(isOpen, columnFilter);
	                        };
	                    }
	                    else {
	                        filterSelectElemText = '' +
	                        '<ui-select class="auto-width-select-choices" append-to-body = "false" ng-change = "FilterComboBoxControlOnChange()" theme = "bootstrap" ng-model = "' + filter.name + '.FilterValueModel.item" name = "' + filter.name + '" search-enabled = "false" on-select="FilterFormCloseOnSelect(' + filter.name + ')" ng-keydown="onMultifilterKeydown($event)"> ' +
	                        '	<ui-select-match allow-clear="true">{{$select.selected.value}}</ui-select-match> ' +
	                        '	<ui-select-choices repeat="item in ' + filter.name + '.filterItems | filter : $select.search"> ' +
	                        '		<div ng-bind-html="TrustAsHtml((item.value | highlight: $select.search))"/> ' +
	                        '	</ui-select-choices> ' +
	                        '</ui-select>';
	                    }
	                    scope.FilterComboBoxControlOnChange = function ()
	                    {
	                        scope.$parent.FilterComboBoxControlOnChange();
	                    }
	                    scope.FilterFormCloseOnSelect = function(columnFilter)
	                    {
	                        scope.gridColumn.showMultifilterPanel = false;
	                        scope.$apply();
	                    };
	                    scope[filter.name].multifilterOpenFormFilterElem = $('' +
	                    '<div class="form-group form-group-default form-group-forced" pg-form-group style="overflow: visible;">' +
	                    '	<label>{{' + filter.name + '.filterEntry }}</label>' +
	                    '	' + filterSelectElemText +
	                    '</div>');
	                    break;
	            }
	            if(scope[filter.name].multifilterOpenFormFilterElem != null) {
	                if(firstFilter == null) {
	                    firstFilter = scope[filter.name];
	                }
	                lastFilterElem = scope[filter.name].multifilterOpenFormFilterElem;
	                multifilterOpenForm.append(scope[filter.name].multifilterOpenFormFilterElem);
	            }
	        }
	        multifilterOpenForm.find('input').on( 'keyup', ComponentsNavigationHelperService.debounce(function() {
	            if(scope[this.id].filterType == 'text') {
	                scope.$parent.CallDataTableOnFilter();
	            }
	        }, 1000));
	        multifilterOpenForm.find('input:checkbox').on( 'click', function () {
	            var filter = scope[this.id];
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
	            scope.$parent.CallDataTableOnFilter();
	            scope.gridColumn.showMultifilterPanel = false;
	            scope.$apply();
	        } );
	        lastFilterElem.on('keydown', function(e) {
	            if(e.originalEvent != undefined && e.originalEvent.code == 'Tab' && !e.originalEvent.shiftKey) {
	                scope.gridColumn.showMultifilterPanel = false;
	                scope.$apply();
	            }
	        });
	        multifilterOpenForm.on('keydown', function(e) {
	            if(e.originalEvent != undefined && (e.originalEvent.code == 'Escape' || e.originalEvent.code == 'Enter') && !e.originalEvent.shiftKey) {
	                scope.gridColumn.showMultifilterPanel = false;
	                scope.$apply();
	            }
	        });
	        multifilterMainContainerDiv.append(multifilterTableInput);
	        multifilterOpenDiv.append(multifilterOpenLoader);
	        multifilterOpenDiv.append(multifilterOpenForm);
	        multifilterMainContainerDiv.append(multifilterOpenDiv);
	        $compile(multifilterMainContainerDiv)(scope);
	        $(element).append(multifilterMainContainerDiv);
	        var globalCssMinWidth = parseFloat(multifilterOpenDiv.css('min-width'));
	        $timeout(function() {
	            multifilterOpenDiv.css('opacity', '');
	        }, 500);
	    }
	}
}
]);
kamApp.directive('preventUnload',['$window','OkCancelPopupFactory','GlobalEntriesFactory','$q','$location','$route',function($window,OkCancelPopupFactory,GlobalEntriesFactory,$q,$location,$route)
{
	return {
	    restrict: 'A',
	    link: function (scope, element, attrs) {
	        var preventTabBrowserClose = function() {
	            if(!scope.promptInProgress){
	                if (scope.CheckPendingChanges()) {
	                    event.returnValue = GlobalEntriesFactory.GlobalEntries.ApplicationEntries.PendingChangesEntry;
	                }
	            }
	            else{
	                scope.promptInProgress = false;
	            }
	        }
	        $window.addEventListener('beforeunload', preventTabBrowserClose, true);
	        element.bind('$destroy', function () {
	            $window.removeEventListener('beforeunload', preventTabBrowserClose, true);
	        });
	        function provideWarning() {
	            var defer = $q.defer();
	            OkCancelPopupFactory.Show(GlobalEntriesFactory.GlobalEntries.ApplicationEntries.WarningEntry, GlobalEntriesFactory.GlobalEntries.ApplicationEntries.PendingChangesEntry).then(function (resultCode) {
	                if (resultCode == 'OK') {
	                    defer.resolve(true);
	                }
	                else{
	                    defer.resolve(false);
	                }
	            });
	            return defer.promise;
	        }
	        scope.$on('$routeChangeStart', function (event, next, current) {
	            if(!scope.promptInProgress){
	                var a = scope[element.attr('name')];
	                if (scope.CheckPendingChanges()) {
	                    event.preventDefault();
	                    var promiseArray = provideWarning();
	                    promiseArray.then(result =>{
	                        if(result){
	                            scope.promptInProgress = true;
	                            if($location.path() == next.originalPath){
	                                $route.reload();
	                            }
	                            else{
	                                $window.location.replace('#' + next.originalPath);
	                            }
	                        }
	                    });
	                }
	            }
	            else{
	                scope.promptInProgress = false;
	            }
	        });
	    }
	}
}
]);
kamApp.directive('commandPopup',function()
{
	return {
	    restrict: 'E',
	    replace: false,
	    templateUrl: 'CommandPopup.html?version=ebd7ac43-b02a-4a6d-8050-8567c9aa4754'
	};
}
);
kamApp.value('privateKey', 'cfe403b6-afbe-46fd-bc16-a2021dbea50e');
kamApp.config(function ($stateProvider, $routeProvider, $ocLazyLoadProvider) {
    $routeProvider
.when('/ErrorPage', {
    templateUrl: 'ErrorPage.html?version=ebd7ac43-b02a-4a6d-8050-8567c9aa4754',
    resolve: {
        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            return $ocLazyLoad.load({ files: ['ErrorPageController.ng.js?version=ebd7ac43-b02a-4a6d-8050-8567c9aa4754'] });
        }]
    }
})
.when('/Traduzioni', {
    templateUrl: 'Traduzioni.html?version=ebd7ac43-b02a-4a6d-8050-8567c9aa4754',
    resolve: {
        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            return $ocLazyLoad.load({ files: ['Traduzioni.ng.js?version=ebd7ac43-b02a-4a6d-8050-8567c9aa4754','BusinessPages/Traduzioni.bsn.ng.js?version=ebd7ac43-b02a-4a6d-8050-8567c9aa4754','MenuHeaderMain.ng.js?version=ebd7ac43-b02a-4a6d-8050-8567c9aa4754'] });
        }],
        loadGlobalData: function(GlobalEntriesFactory, GlobalSettingsFactory, LoggedUserSettingsFactory, LoginService) {
            if(!GlobalEntriesFactory.LoadedFromServer || !GlobalSettingsFactory.LoadedFromServer || !LoggedUserSettingsFactory.LoadedFromServer) {
                return LoginService.getGlobalData().then(function (result){
                    GlobalEntriesFactory.LoadedFromServer = true;
                    GlobalEntriesFactory.GlobalEntries = result.data.GlobalEntries;
                    GlobalSettingsFactory.LoadedFromServer = true;
                    GlobalSettingsFactory.GlobalSettings = result.data.GlobalSettings;
                    LoggedUserSettingsFactory.LoadedFromServer = true;
                    LoggedUserSettingsFactory.UserInfo = result.data.UserInfo;
                    LoggedUserSettingsFactory.UserSettings = result.data.UserSettings;
                });
            }
        }
    }
})
.when('/Index', {
    templateUrl: 'Index.html?version=ebd7ac43-b02a-4a6d-8050-8567c9aa4754',
    resolve: {
        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            return $ocLazyLoad.load({ files: ['Index.ng.js?version=ebd7ac43-b02a-4a6d-8050-8567c9aa4754','BusinessPages/Index.bsn.ng.js?version=ebd7ac43-b02a-4a6d-8050-8567c9aa4754','MenuHeaderMain.ng.js?version=ebd7ac43-b02a-4a6d-8050-8567c9aa4754'] });
        }],
        loadGlobalData: function(GlobalEntriesFactory, GlobalSettingsFactory, LoggedUserSettingsFactory, LoginService) {
            if(!GlobalEntriesFactory.LoadedFromServer || !GlobalSettingsFactory.LoadedFromServer || !LoggedUserSettingsFactory.LoadedFromServer) {
                return LoginService.getGlobalData().then(function (result){
                    GlobalEntriesFactory.LoadedFromServer = true;
                    GlobalEntriesFactory.GlobalEntries = result.data.GlobalEntries;
                    GlobalSettingsFactory.LoadedFromServer = true;
                    GlobalSettingsFactory.GlobalSettings = result.data.GlobalSettings;
                    LoggedUserSettingsFactory.LoadedFromServer = true;
                    LoggedUserSettingsFactory.UserInfo = result.data.UserInfo;
                    LoggedUserSettingsFactory.UserSettings = result.data.UserSettings;
                });
            }
        }
    }
})
.when('/Diario', {
    templateUrl: 'Diario.html?version=ebd7ac43-b02a-4a6d-8050-8567c9aa4754',
    resolve: {
        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            return $ocLazyLoad.load({ files: ['Diario.ng.js?version=ebd7ac43-b02a-4a6d-8050-8567c9aa4754','BusinessPages/Diario.bsn.ng.js?version=ebd7ac43-b02a-4a6d-8050-8567c9aa4754','MenuHeaderMain.ng.js?version=ebd7ac43-b02a-4a6d-8050-8567c9aa4754'] });
        }],
        loadGlobalData: function(GlobalEntriesFactory, GlobalSettingsFactory, LoggedUserSettingsFactory, LoginService) {
            if(!GlobalEntriesFactory.LoadedFromServer || !GlobalSettingsFactory.LoadedFromServer || !LoggedUserSettingsFactory.LoadedFromServer) {
                return LoginService.getGlobalData().then(function (result){
                    GlobalEntriesFactory.LoadedFromServer = true;
                    GlobalEntriesFactory.GlobalEntries = result.data.GlobalEntries;
                    GlobalSettingsFactory.LoadedFromServer = true;
                    GlobalSettingsFactory.GlobalSettings = result.data.GlobalSettings;
                    LoggedUserSettingsFactory.LoadedFromServer = true;
                    LoggedUserSettingsFactory.UserInfo = result.data.UserInfo;
                    LoggedUserSettingsFactory.UserSettings = result.data.UserSettings;
                });
            }
        }
    }
})
.when('/Lingue', {
    templateUrl: 'Lingue.html?version=ebd7ac43-b02a-4a6d-8050-8567c9aa4754',
    resolve: {
        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            return $ocLazyLoad.load({ files: ['Lingue.ng.js?version=ebd7ac43-b02a-4a6d-8050-8567c9aa4754','BusinessPages/Lingue.bsn.ng.js?version=ebd7ac43-b02a-4a6d-8050-8567c9aa4754','MenuHeaderMain.ng.js?version=ebd7ac43-b02a-4a6d-8050-8567c9aa4754'] });
        }],
        loadGlobalData: function(GlobalEntriesFactory, GlobalSettingsFactory, LoggedUserSettingsFactory, LoginService) {
            if(!GlobalEntriesFactory.LoadedFromServer || !GlobalSettingsFactory.LoadedFromServer || !LoggedUserSettingsFactory.LoadedFromServer) {
                return LoginService.getGlobalData().then(function (result){
                    GlobalEntriesFactory.LoadedFromServer = true;
                    GlobalEntriesFactory.GlobalEntries = result.data.GlobalEntries;
                    GlobalSettingsFactory.LoadedFromServer = true;
                    GlobalSettingsFactory.GlobalSettings = result.data.GlobalSettings;
                    LoggedUserSettingsFactory.LoadedFromServer = true;
                    LoggedUserSettingsFactory.UserInfo = result.data.UserInfo;
                    LoggedUserSettingsFactory.UserSettings = result.data.UserSettings;
                });
            }
        }
    }
})
.when('/LogOut', {
    templateUrl: 'LogOut.html?version=ebd7ac43-b02a-4a6d-8050-8567c9aa4754',
    resolve: {
        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            return $ocLazyLoad.load({ files: ['LogOut.ng.js?version=ebd7ac43-b02a-4a6d-8050-8567c9aa4754','BusinessPages/LogOut.bsn.ng.js?version=ebd7ac43-b02a-4a6d-8050-8567c9aa4754','MenuHeaderMain.ng.js?version=ebd7ac43-b02a-4a6d-8050-8567c9aa4754'] });
        }],
        loadGlobalData: function(GlobalEntriesFactory, GlobalSettingsFactory, LoggedUserSettingsFactory, LoginService) {
            if(!GlobalEntriesFactory.LoadedFromServer || !GlobalSettingsFactory.LoadedFromServer || !LoggedUserSettingsFactory.LoadedFromServer) {
                return LoginService.getGlobalData().then(function (result){
                    GlobalEntriesFactory.LoadedFromServer = true;
                    GlobalEntriesFactory.GlobalEntries = result.data.GlobalEntries;
                    GlobalSettingsFactory.LoadedFromServer = true;
                    GlobalSettingsFactory.GlobalSettings = result.data.GlobalSettings;
                    LoggedUserSettingsFactory.LoadedFromServer = true;
                    LoggedUserSettingsFactory.UserInfo = result.data.UserInfo;
                    LoggedUserSettingsFactory.UserSettings = result.data.UserSettings;
                });
            }
        }
    }
})
.when('/Stringhe', {
    templateUrl: 'Stringhe.html?version=ebd7ac43-b02a-4a6d-8050-8567c9aa4754',
    resolve: {
        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            return $ocLazyLoad.load({ files: ['Stringhe.ng.js?version=ebd7ac43-b02a-4a6d-8050-8567c9aa4754','BusinessPages/Stringhe.bsn.ng.js?version=ebd7ac43-b02a-4a6d-8050-8567c9aa4754','MenuHeaderMain.ng.js?version=ebd7ac43-b02a-4a6d-8050-8567c9aa4754'] });
        }],
        loadGlobalData: function(GlobalEntriesFactory, GlobalSettingsFactory, LoggedUserSettingsFactory, LoginService) {
            if(!GlobalEntriesFactory.LoadedFromServer || !GlobalSettingsFactory.LoadedFromServer || !LoggedUserSettingsFactory.LoadedFromServer) {
                return LoginService.getGlobalData().then(function (result){
                    GlobalEntriesFactory.LoadedFromServer = true;
                    GlobalEntriesFactory.GlobalEntries = result.data.GlobalEntries;
                    GlobalSettingsFactory.LoadedFromServer = true;
                    GlobalSettingsFactory.GlobalSettings = result.data.GlobalSettings;
                    LoggedUserSettingsFactory.LoadedFromServer = true;
                    LoggedUserSettingsFactory.UserInfo = result.data.UserInfo;
                    LoggedUserSettingsFactory.UserSettings = result.data.UserSettings;
                });
            }
        }
    }
})
.when('/NavigationLandingPage', {
    templateUrl: 'NavigationLandingPage.html?version=ebd7ac43-b02a-4a6d-8050-8567c9aa4754',
    resolve: {
        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
            return $ocLazyLoad.load({ files: ['NavigationLandingPage.ng.js?version=ebd7ac43-b02a-4a6d-8050-8567c9aa4754'] });
        }],
        loadGlobalData: function(GlobalEntriesFactory, GlobalSettingsFactory, LoggedUserSettingsFactory, LoginService) {
            if(!GlobalEntriesFactory.LoadedFromServer || !GlobalSettingsFactory.LoadedFromServer || !LoggedUserSettingsFactory.LoadedFromServer) {
                return LoginService.getGlobalData().then(function (result){
                    GlobalEntriesFactory.LoadedFromServer = true;
                    GlobalEntriesFactory.GlobalEntries = result.data.GlobalEntries;
                    GlobalSettingsFactory.LoadedFromServer = true;
                    GlobalSettingsFactory.GlobalSettings = result.data.GlobalSettings;
                    LoggedUserSettingsFactory.LoadedFromServer = true;
                    LoggedUserSettingsFactory.UserInfo = result.data.UserInfo;
                    LoggedUserSettingsFactory.UserSettings = result.data.UserSettings;
                });
            }
        }
    }
})
.otherwise(
{
    resolve: {
        load: [
            '$location', '$q', 'GlobalEntriesFactory', 'GlobalSettingsFactory', 'LoggedUserSettingsFactory', 'LoginService','PromisesListFactory', function ($location, $q, GlobalEntriesFactory, GlobalSettingsFactory, LoggedUserSettingsFactory, LoginService, PromisesListFactory) {
                var globalDataLoaded = $q.defer();
                if(!GlobalEntriesFactory.LoadedFromServer || !GlobalSettingsFactory.LoadedFromServer || !LoggedUserSettingsFactory.LoadedFromServer) {
                    LoginService.getGlobalData().then(function (result) {
                        GlobalEntriesFactory.LoadedFromServer = true;
                        GlobalEntriesFactory.GlobalEntries = result.data.GlobalEntries;
                        GlobalSettingsFactory.LoadedFromServer = true;
                        GlobalSettingsFactory.GlobalSettings = result.data.GlobalSettings;
                        LoggedUserSettingsFactory.LoadedFromServer = true;
                        LoggedUserSettingsFactory.UserInfo = result.data.UserInfo;
                        LoggedUserSettingsFactory.UserSettings = result.data.UserSettings;
                        globalDataLoaded.resolve();
                    });
                }
                else {
                    globalDataLoaded.resolve();
                }
                var globalDataLoadedPromisesArray = new PromisesListFactory.PromisesList();
                globalDataLoadedPromisesArray.Add(globalDataLoaded.promise);
                globalDataLoadedPromisesArray.InTheEndDoAction(function() {
                    var startPage = 'Index';
                    if(LoggedUserSettingsFactory.UserInfo.StartPage != undefined && LoggedUserSettingsFactory.UserInfo.StartPage != null && LoggedUserSettingsFactory.UserInfo.StartPage != '') {
                        startPage = LoggedUserSettingsFactory.UserInfo.StartPage;
                    }
                    $location.path('/' + startPage);
                });
            }
        ]
    }
});
});
