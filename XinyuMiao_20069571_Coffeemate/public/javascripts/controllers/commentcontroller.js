var app = angular.module('CoffeemateWebApp');

app.controller('commentController', ['$scope', '$location','$http', function($scope, $location, $http){
    $http.get('/comments/')
        .success(function(data){
            $scope.comments = data;
            console.log(data);
        })
        .error(function(data){
            console.log('Error' + data);
        })


    $scope.del = function(comment) {
        var user_name = JSON.parse(localStorage.getItem('current_user')).name;
        var username =  comment.postername
        if( user_name != username ) {
            confirm("This comment does not belong to you!");
        }else{
            if (confirm("Are you sure to delete this comment?")) {
                console.log('Deleting id : ' + comment._id);
                $http.delete('/comments/delcom/' + comment._id)
                    .success(function (data) {
                        location.reload();
                    })
                    .error(function (data) {
                        console.log('Error' + data);
                    })
            }
        }
    }


}]);