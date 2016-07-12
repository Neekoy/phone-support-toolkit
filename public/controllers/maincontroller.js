console.log("Greetings from the main controller.");

var socket = io();

var app = angular.module('toolsApp', [], function($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});

app.controller('mainController', function($scope, $http) {
    this.helperActive = false;
    this.dnsActive = false;
    
    this.domainName = "Domain...";
    this.funcSwitch = function(data) {
        if ( data === 'helperActive') {
            this.helperActive = !this.helperActive;
        }
    }
    
    socket.emit('getAllArticles', "getArticles"); 
    socket.on('pushAllArticles', function (data) {
       this.allArticles = data; 
       console.log(this.allArticles);
       $scope.$apply();
    }.bind(this));
    
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