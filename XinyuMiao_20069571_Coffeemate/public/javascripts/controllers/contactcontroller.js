var app = angular.module('CoffeemateWebApp');

app.controller('contactController', ['$scope','$http', function($scope,$http) {
    
    $scope.message = 'Send your review to us!';
    $scope.formData = {};

    $scope.send = function() {


        var data = {
            'author' : $scope.formData.email,
            'review' : $scope.formData.review
        };

        $http({
            method: 'POST',
            url: '/contact',
            data: data
        }).success(data)
    };

    $scope.sendReview = function () {
        $scope.send();
        confirm("Send your review successfully!")
    };

}
]);