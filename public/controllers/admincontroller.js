console.log("Greetings from the admin controller.");
var socket = io();

var app = angular.module('adminApp', ['textAngular'], function($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});

app.controller('adminController', function($scope, $http) {
    this.htmlVariable = "lala";
    this.creatingArt = false;
    this.createNewArticle = function (data) {
        this.creatingArt = true;
    };
    
});