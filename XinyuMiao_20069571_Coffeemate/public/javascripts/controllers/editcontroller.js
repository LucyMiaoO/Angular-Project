var app = angular.module('CoffeemateWebApp');

app.controller('editController', ['$scope','$location','$http','$routeParams', function($scope,$location,$http,$routeParams) {


    var id  = $routeParams.id;
    $scope.formData = {};

    $scope.message = 'Update Page!';

    $scope.updateCoffeemate=function(){
        $http.put('coffeemates/'+ id ,$scope.formData)
            .success(function(data){

                $location.path('coffeemates');
                console.log(data);
            })
            .error(function(data){
                console.log('Error:'+data);
            });
    };

}
]);
