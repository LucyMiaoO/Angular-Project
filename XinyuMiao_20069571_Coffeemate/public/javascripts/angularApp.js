var app = angular.module('CoffeemateWebApp', ['ngRoute']);

app.config(function($routeProvider) {
        $routeProvider

            // route for the home page
            .when('/', {
                templateUrl : 'pages/home.ejs',
                controller  : 'mainController'
            })
            //route for the about page
            .when('/about', {
                templateUrl : 'pages/about.ejs',
                controller  : 'aboutController'
            })
            //route for the contact page
            .when('/contact', {
                templateUrl : 'pages/contact.ejs',
                controller  : 'contactController'
            })
             // route for the add page
            .when('/coffeemate', {
                templateUrl : 'pages/coffeemate.ejs',
                controller  : 'coffeemateController'
            })

             // route for the list page
            .when('/coffeemates', {
                templateUrl : 'pages/coffeemates.ejs',
                controller  : 'coffeematesController'
            })
            // route for the edit page
            .when('/update/:id', {
                templateUrl : 'pages/edit.ejs',
                controller  : 'editController'
            })
            // route for the register
            .when('/register', {
                templateUrl: '/pages/register.ejs',
                controller : 'registerController'
            })

            // route for the login
            .when('/login', {
                templateUrl: '/pages/login.ejs',
                controller : 'loginController'
            })

            .when('/comments/:id',{
                templateUrl : 'pages/addcomment.ejs',
                controller  : 'addcomController'

            })

            .when('/comments',{
                templateUrl : 'pages/comments.ejs',
                controller  : 'commentController'

            });
    });


  
  


