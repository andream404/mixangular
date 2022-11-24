'use strict'
var kamApp = angular.module('AngularJSApp');
kamApp.factory('PromisesListFactory',['$q',function($q)
{
	var PromisesListPrototipe = {
	    promises: [],
	    Add: function(promise) {
	        if (promise != null) {
	            this.promises.push(promise);
	        }
	    },
	    InTheEndDoAction: function (actionToDo, params) {
	        actionToDo.PromisesList = this;
	        $q.all(this.promises).then(function(resolvedPromises) {
	            if (actionToDo.PromisesList.promises.length == resolvedPromises.length) {
	                actionToDo(params);
	            }
	            else {
	                actionToDo.PromisesList.InTheEndDoAction(actionToDo, params);
	            }
	        });
	    }
	}
	function PromisesList() {
	    return angular.copy(PromisesListPrototipe);
	}
	return {
	    PromisesList: PromisesList
	}
}
]);
