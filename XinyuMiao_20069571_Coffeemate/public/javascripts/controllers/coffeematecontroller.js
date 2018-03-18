var app = angular.module('CoffeemateWebApp');

app.controller('coffeemateController', ['$scope','$location','$http', function($scope,$location,$http) {


    $scope.message = 'Add Coffeemate!';


    $scope.addCoffeemate=function(coffeename,coffeeshop,coffeeamount){
        var user_id = JSON.parse(localStorage.getItem('current_user'))._id;
        var coffeepost = {
            'name': coffeename,
            'coffeeshop': coffeeshop,
            'amount': coffeeamount,
            'poster': user_id,
        }
        $http.post('/coffeemates/' ,coffeepost)
        .success(function(data){

          $location.path('/coffeemates');
            console.log(data);
        })
            .error(function(data){
            console.log('Error:'+data);
        });
    };

  }

  ]);
