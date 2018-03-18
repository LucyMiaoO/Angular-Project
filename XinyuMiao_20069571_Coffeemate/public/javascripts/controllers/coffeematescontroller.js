var app = angular.module('CoffeemateWebApp');

app.controller('coffeematesController', ['$scope','$http','$location', function($scope,$http,$location) {
    // create a message to display in our view
    $scope.message = 'Coffeemate Page!';

    findAll();
    function findAll() {
        $http.get('/coffeemates/')
            .success(function (data) {
                $scope.coffeemates = data;
                console.log(data);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };
    $scope.incrementUpvotes=function(id){
         $http.put('/coffeemates/'+id+'/votes/')
             .success(function(data){
             console.log(data);
            findAll();
        })
             .error(function(data){
              console.log('Error:'+data);

        });
    }
    $scope.update = function(coffeemate){
        console.log(coffeemate);
        $location.path('/update/'+ coffeemate._id);
    }
    $scope.delete=function(id){
        if(confirm("Are you sure want to delete this Coffeemate")){
            console.log('Deleting id: '+id);
            $http.delete('/coffeemates/'+id)
                .success(function(data){
                console.log(data);
                    findAll();
            })
                .error(function(data){
                    console.log('Error :'+data);
            });

        }
    }

    $scope.comment = function(coffeemate){
        console.log(coffeemate);
        $location.path('/comments/' + coffeemate._id);

    }

    $scope.nouser = function (coffeemate) {
        var user_id = JSON.parse(localStorage.getItem('current_user'))._id;
        if( user_id != coffeemate.poster ) {
            return true
        }else{
            return false
        }

    };


    $scope.display = function() {
        var check = localStorage.getItem("current_user");
        if ( check == null)
        {
            return { display : 'none' };
        }
        return {display : 'inline-block'};
    };

  }
  ]);
