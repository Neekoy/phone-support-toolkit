console.log("Greetings from the main controller.");

var socket = io();

var app = angular.module('toolsApp', [], function($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});

app.controller('mainController', function($scope, $http) {
    this.dnscheck = false;
    this.domainName = "Domain...";
    this.funcSwitch = function(appModule) {
        
    }
    
    this.submitDomain = function() {
        socket.emit('initialise', this.domainName);
        console.log(this.domainName);
    }
    
    socket.on('initResp', function(data) {
        console.log(data);
    });
    
    this.clearDomain = function () {
        this.domainName = "";
    }
});