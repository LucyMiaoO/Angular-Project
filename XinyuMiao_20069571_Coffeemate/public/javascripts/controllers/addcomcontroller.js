var app = angular.module('CoffeemateWebApp');

app.controller('addcomController', ['$scope','$http','$location', function($scope,$http,$location) {
    var user_name = JSON.parse(localStorage.getItem('current_user')).name;
    var date = new Date();
    var current_h = date.getHours();
    var current_m = date.getMinutes();

    $scope.addcom = function(content){
        var comment = {
            'content': content,
            'postername': user_name,
            'time': current_h + ":" + current_m
        }
        $http.post('/comments', comment).success(function (data) {
                $scope.messages = data;
                $location.path('/comments');
                console.log(data);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            })

    };

}
]);