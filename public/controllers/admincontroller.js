console.log("Greetings from the admin controller.");
var socket = io();

var app = angular.module('adminApp', ['textAngular'], function($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});

app.config(function($provide) {
    $provide.decorator('taOptions', ['taRegisterTool', '$delegate', function(taRegisterTool, taOptions) { // $delegate is the taOptions we are decorating
    taOptions.toolbar = [
        ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
        ['bold', 'italics', 'underline', 'strikeThrough', 'ul', 'ol', 'redo', 'undo', 'clear'],
        ['justifyLeft', 'justifyCenter', 'justifyRight', 'indent', 'outdent'],
        ['html', 'insertImage','insertLink', 'insertVideo'],
    ];
    return taOptions;
    }]);
});

app.controller('adminController', function($scope, $http) {
    this.allArticles = "";
    
    socket.emit('getAllArticles', "getArticles"); 
    socket.on('pushAllArticles', function (data) {
       this.allArticles = data; 
       console.log(this.allArticles);
    });
    
    this.currentPage = "none";
    this.changePage = function (data) {
        this.currentPage = data;
    };
    
    this.checkCurrentPage = function(data) {
        return this.currentPage === data;
    }
    
    // CREATE ARTICLE
    
    this.articleContent = "";
    this.articleName = "";
    this.articleKeywords = [];
    
    this.saveArticle = function () {
        console.log("Save button has been clicked.");
        keywordArray = this.articleKeywords.split(" ");
        
        saveArticleData = {
            id: "new",
            name: this.articleName,
            keywords: keywordArray,
            content: this.articleContent
        }
        
        socket.emit("saveArticle", saveArticleData);
    };
    
    // LIST ARTICLES
});