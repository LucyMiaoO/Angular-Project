var app = angular.module('CoffeemateWebApp');


app.controller('mainController', ['$scope','$location', function($scope,$location) {
    // create a message to display in our view
    $scope.message = 'Welcome to Coffeemate!!';
    var val = localStorage.getItem("current_user");
    if(val == null) {
        $scope.msg = 'Hi! Guest! ';
    }else{
        var name = JSON.parse(localStorage.getItem('current_user')).name;
        $scope.msg = 'Hi! '+ name+"!";
    };
    $scope.logout = function(){
        localStorage.removeItem('current_user');
        confirm("Log out successfully!");
        $location.path('/');
        location.reload('');

    };


    $scope.display_login = function() {
        var check = localStorage.getItem("current_user");
        if ( check == null)
        {
            return { display : 'inline-block' };
        }
        return {display : 'none'};
    };

    $scope.display_register = function() {
        var check = localStorage.getItem("current_user");
        if ( check == null)
        {
            return { display : 'inline-block' };
        }
        return {display : 'none'};
    };

    $scope.display_logout = function() {
        var check = localStorage.getItem("current_user");
        if ( check != null)
        {
            return { display : 'inline-block' };
        }
        return {display : 'none'};
    };

     }
  ]);
