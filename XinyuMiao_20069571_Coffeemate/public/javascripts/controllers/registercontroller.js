var app = angular.module('CoffeemateWebApp');

app.controller('registerController', ['$scope','$location','$http', function($scope,$location,$http) {

    $scope.message = 'Register Page!';


    $scope.addUser=function(){
        {
            $http.post('/register', $scope.formData)
                .success(function (data) {

                    $location.path('/login');
                    console.log(data);
                })
                .error(function (data) {
                    console.log('Error:' + data);
                });
        }
    };

}
]);