var app = angular.module('CoffeemateWebApp');

app.controller('loginController', ['$http','$scope','$location',
    function($http,$scope,$location) {
        $scope.message =  'Log in Page!';
        $scope.isSuccess = false;
        $scope.login = function(useremail,userpassword){
            if(userpassword == undefined || useremail == undefined ||
                (useremail == undefined && userpassword == undefined) ){
                confirm("Please fill in all the informations!")
            }else{
                var login_post = {
                    'email': useremail,
                    'password': userpassword,
                }
                $http.post('/login',login_post).success(function(data){
                        if(data.obj instanceof Object){
                            localStorage.setItem('current_user',JSON.stringify(data.obj));
                            $scope.isSuccess = true;
                            confirm("Log in successfully!")
                            $location.path('/');

                        }else if(data.message == "Password wrong!"){
                            confirm("Please check your password!")
                        }else{
                            if( confirm("The account is not existing, please go sign up!")){
                                $location.path('/register');
                            }
                        }
                    })
                    .error(function(data){
                        console.log('Error: ' + data);
                    })
            }
        };
    }

]);