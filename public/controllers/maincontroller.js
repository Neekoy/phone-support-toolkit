console.log("Greetings from the main controller.");
var socket = io();

var app = angular.module('toolsApp', [], function($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});

app.controller('mainController', function($scope, $http) {

});