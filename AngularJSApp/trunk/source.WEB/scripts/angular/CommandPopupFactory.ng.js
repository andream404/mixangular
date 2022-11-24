'use strict'
var kamApp = angular.module('AngularJSApp');
kamApp.factory('CommandPopupFactory',['$q','GlobalEntriesFactory',function($q,GlobalEntriesFactory)
{
	return {
	    ActionDeferred: null,
	    Buttons: [],
	    Show: function (componentName, columnName, commandPopup) {
	        this.Buttons.forEach(button => {
	            $(`#${button.buttonID}`).unbind('click');
	        });
	        this.Buttons = [];
	        $('#CommandPopupTitle').text(commandPopup.title);
	        $('#CommandPopupMessage').text(commandPopup.message);
	        $('#CommandPopupButtonsRow').empty();
	        if(commandPopup.buttons){
	            let divs = '';
	            var idx = 0;
	            commandPopup.buttons.forEach((button) => {
	                let commandName = button.commandName;
	                let buttonID = componentName+columnName+idx+'CommandPopupButton';
	                this.Buttons.push({
	                    buttonID: buttonID,
	                    commandName: commandName
	                });
	                let div = `
	                    <div class=\'m-t-10 sm-m-t-10 ${button.divCssClassName}\'>
	                        <button id='${buttonID}' type='button' class='btn btn-complete btn-block m-t-5' ng-click='this.ButtonClicked('${commandName}')'>${button.label}</button>
	                    </div>
	                `
	                divs += div;
	                idx++;
	            });
	            $('#CommandPopupButtonsRow').append(divs);
	            var factory = this;
	            this.Buttons.forEach(button => {
	                $( `#${button.buttonID}` ).click(function() {
	                    factory.ButtonClicked(button.commandName);
	                });
	            });
	            $( '#CloseCommandPopup' ).click(function() {
	                factory.ButtonClicked(null);
	            });
	        }
	        $('#CommandPopup').modal({
	            backdrop: 'static',
	            keyboard: false
	        });
	        this.ActionDeferred = $q.defer();
	        return this.ActionDeferred.promise;
	    },
	    ButtonClicked: function (commandName) {
	        $('#CommandPopup').modal('hide');
	        this.Buttons.forEach(button => {
	            $( `#${button.buttonID}` ).unbind( 'click' );
	        });
	        this.Buttons = [];
	        this.ActionDeferred.resolve(commandName);
	    }
	};
}
]);
