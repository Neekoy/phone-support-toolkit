console.log("Greetings from the main controller.");

var socket = io();

var app = angular.module('toolsApp', [], function($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});

app.filter("sanitize", ['$sce', function($sce) {
  return function(htmlCode){
    return $sce.trustAsHtml(htmlCode);
  }
}]);

app.controller('mainController', function($scope, $http) {
    this.helperActive = false;
    this.expandHelperActive = false;
    this.dnsActive = false;
    this.blacklistsActive = false;
    
    this.domainName = "Domain...";
    this.funcSwitch = function(data) {
        if ( data === 'helperActive') {
            this.helperActive = !this.helperActive;
        } else if ( data === 'dnsActive') {
            this.dnsActive = !this.dnsActive;
        } else if ( data === 'blacklistsActive') {
            this.blacklistsActive = !this.blacklistsActive;
        }
    }
    
    this.expandHelper = function() {
        this.expandHelperActive = !this.expandHelperActive;
    } 
    
    socket.emit('getAllArticles', "getArticles"); 
    socket.on('pushAllArticles', function (data) {
       this.allArticles = data; 
       console.log(this.allArticles);
       $scope.$apply();
    }.bind(this));
    
    this.articleHeadClicked = function (data) {
        for ( var i in this.allArticles ) {
            if ( this.allArticles[i].name === data ) {
                this.allArticles[i].clicked = true;
                console.log(this.allArticles[i].content);
            } else {
                this.allArticles[i].clicked = false;
            }
        }
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