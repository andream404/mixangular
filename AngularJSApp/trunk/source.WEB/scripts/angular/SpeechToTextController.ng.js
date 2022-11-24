'use strict'
var kamApp = angular.module('AngularJSApp');
kamApp.controller('SpeechToTextController',['$scope','SpeechToTextFactory',function($scope,SpeechToTextFactory)
{
	$scope.micactive = false;
	$scope.SpeechToTextFactory = SpeechToTextFactory;
	if ('webkitSpeechRecognition' in window) {
	    var recognition = new webkitSpeechRecognition();
	    recognition.lang = 'it-IT';
	    recognition.continuous = true;
	    recognition.interimResults = true;
	    var finalTranscript = '';
	    var interimTranscript  = '';
	    var originalField = '';
	    recognition.onresult = (event) => {
	        let interimTranscript = '';
	        for (let i = event.resultIndex, len = event.results.length; i < len; i++) {
	            let transcript = event.results[i][0].transcript;
	            if (event.results[i].isFinal) {
	                finalTranscript += transcript;
	            } else {
	                interimTranscript += transcript;
	            }
	        }
	        if(!finalTranscript){
	            $scope.field = originalField + (originalField.length>0 ? ' ' : '') + interimTranscript;
	        }
	        else{
	            $scope.field = originalField + (originalField.length>0 ? ' ' : '') + finalTranscript;
	        }
	        $scope.$apply();
	    }
	    recognition.onstart = (event) => {
	        originalField = $scope.field;
	    }
	}else{
	    console.log('Speech recognition API not supported.');
	}
	$scope.startstt= function()
	{
	    SpeechToTextFactory.StartRecording($scope);
	    $scope.micactive = true;
	    if($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
	        $scope.$apply();
	    }
	    try
	    {
	        clearOldStt();
	        recognition.start();
	    }
	    catch (ex)
	    {
	        console.log('ERROR STT API - ' + ex.message);
	    }
	}
	$scope.stopstt = function()
	{
	    recognition.stop();
	    SpeechToTextFactory.StopRecording();
	    $scope.micactive = false;
	    if($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
	        $scope.$apply();
	    }
	}
	function clearOldStt()
	{
	    if(!$scope.field){
	        $scope.field = '';
	    }
	    finalTranscript = '';
	    interimTranscript = '';
	}
	$scope.isSupportedBrowser = function()
	{
	    if(navigator.sayswho == 'Chrome')
	        return true;
	    else
	        return false;
	}
	navigator.sayswho= (function(){
	    let userAgent = navigator.userAgent, tem,
	    browser = userAgent.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
	    if(/trident/i.test(browser[1])){
	        tem=  /\brv[ :]+(\d+)/g.exec(userAgent) || [];
	        return 'IE '+(tem[1] || '');
	    }
	    if(browser[1]=== 'Chrome'){
	        tem = userAgent.match(/\b(OPR|Edg)\/(\d+)/);
	        if(tem!= null)
	            browser[1] = tem[1].replace('OPR', 'Opera').replace('Edg', 'Edge');
	    }
	    return browser[1];
	})();
}
]);
