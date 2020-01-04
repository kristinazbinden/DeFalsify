var app = angular.module('defalsifyApp', ['ui.router']);


app.config(function ($stateProvider,$urlRouterProvider) {
        this.appname = "Cats";

    var homeState = {
        name: 'home',
        url: '/',
        template: '<h1>Trending Topics:</h1><p>This is a placeholder for topics brought in from API</p>'
    }

    var portfolioState = {
        name: 'portfolio',
        url: '/portfolio',
        templateUrl: '/views/portfolio.html'
    }
    var contactState = {
        name: 'contact',
        url: '/contact',
        templateUrl: '/views/contact.html'
    }


    var aboutState = {
        name: 'about',
        url: '/about',
        template: "<h1>About Me</h1><p>Here for the crab rangoons.</p>"
    }

    $stateProvider.state(homeState);
    $stateProvider.state(portfolioState);
    $stateProvider.state(contactState);
    $stateProvider.state(aboutState);
    $urlRouterProvider.otherwise('/');

});
