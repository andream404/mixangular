'use strict'
var kamApp = angular.module('AngularJSApp');
kamApp.factory('NavigationDataFactory',['$q',function($q)
{
	return {
	    LoginCheckedDef: $q.defer(),
	    ShowPageParams: {
	        ShowPageParamsObj: null,
	        Expires: null,
	        Get: function() {
	            if(this.Expires == null || new Date() > this.Expires) {
	                this.ShowPageParamsObj = null;
	                return null;
	            }
	            return this.ShowPageParamsObj;
	        },
	        Remove: function() {
	            this.ShowPageParamsObj = null;
	        },
	        Set: function(showPageParams) {
	            this.ShowPageParamsObj = showPageParams;
	            this.Expires = new Date();
	            this.Expires.setSeconds(this.Expires.getSeconds() + 5);
	        }
	    }
	};
}
]);
