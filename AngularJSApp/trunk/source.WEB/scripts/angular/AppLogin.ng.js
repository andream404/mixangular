'use strict'
//    , ['ngResource','ngRoute','ngCookies','angular-md5','ngAnimate','oc.lazyLoad','ui.router','ui.utils','ui.select','ui.bootstrap','ngSanitize']
var kamApp = angular.module('AngularJSApp'

    , ['ngResource', 'ngRoute', 'ngCookies', 'angular-md5', 'ngAnimate', 'oc.lazyLoad', 'ui.router']
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
        .when('/', {
            templateUrl: 'LoginForm.html?version=ebd7ac43-b02a-4a6d-8050-8567c9aa4754',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({ files: ['LoginController.ng.js?version=ebd7ac43-b02a-4a6d-8050-8567c9aa4754'] });
                }]
            }
        })
        .otherwise({ redirectTo: '/' });
});
kamApp.directive('loginPic', ['$route', function ($route) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var backgroundImageCss = $(element).css('background-image');
            // if (backgroundImageCss != undefined && backgroundImageCss != 'none') {
            //     var backgroundImageUrl = backgroundImageCss.replace('url(', '').replace(')', '').replace(/\"/gi, "")
            //     $(element).attr('src', backgroundImageUrl);
            //     $(element).attr('data-src', backgroundImageUrl);
            //     $(element).attr('data-src-retina', backgroundImageUrl);
            // }
        }
    }
}]);
kamApp.directive('languageNamespaceSelector', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var animationTimer;
            $(document).on('click', '.LanguageNamespaceContainer > ul > li', function (event) {
                event.stopPropagation();
                if ($('.LanguageNamespaceContainer > ul > li').hasClass('opening')) {
                    _hideMenu($(this));
                }
                else {
                    _showMenu($(this));
                }
            });
            function _hideMenu($el) {
                var ul = $($el.children('ul')[0]);
                var ghost = $('<div class="ghost-LanguageNamespace-dropdown"></div>');
                if (ul.length == 0) {
                    return;
                }
                var rect = ul[0].getBoundingClientRect();
                ghost.css({
                    'width': rect.width + 'px',
                    'height': rect.height + 'px',
                    'z-index': 2147483647
                })
                $el.append(ghost);
                var timingSpeed = ul.children('li').css('transition-duration');
                timingSpeed = parseInt(parseFloat(timingSpeed) * 1000);
                $el.addClass('closing');
                window.clearTimeout(animationTimer);
                animationTimer = window.setTimeout(function () {
                    ghost.height(0);
                    $el.removeClass('open opening closing');
                }, timingSpeed - 80);
            }
            function _showMenu($el) {
                var ul = $($el.children('ul')[0]);
                var ghost = $('<div class="ghost-LanguageNamespace-dropdown"></div>');
                $el.children('.ghost-LanguageNamespace-dropdown').remove();
                $el.addClass('open').siblings().removeClass('open opening');
                if (ul.length == 0) {
                    return;
                }
                var rect = ul[0].getBoundingClientRect();
                ghost.css({
                    'width': rect.width + 'px',
                    'height': '0px'
                });
                $el.append(ghost);
                ghost.height(rect.height);
                var timingSpeed = ghost.css('transition-duration');
                timingSpeed = parseInt(parseFloat(timingSpeed) * 1000)
                window.clearTimeout(animationTimer);
                animationTimer = window.setTimeout(function () {
                    $el.addClass('opening');
                    ghost.remove()
                }, timingSpeed);
            }
            $(document).on('click', 'body', function () {
                $('.LanguageNamespaceContainer ul li.open').removeClass('open opening');
            });
        }
    }
});
