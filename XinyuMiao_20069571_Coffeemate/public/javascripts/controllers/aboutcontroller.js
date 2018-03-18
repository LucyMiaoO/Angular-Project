var app = angular.module('CoffeemateWebApp');

app.controller('aboutController', ['$scope', function($scope) {
    // create a message to display in our view
    $scope.message = 'Do you like our website?';
    $scope.rating = 5;
}
]);

app.directive('starRating',

    function() {
        return {

            //This template is used to display the star UX in repeted form.
            template: '<ul class="starRating">' + '   <li ng-repeat="star in stars" ng-class="star" ng-click="toggleFunck($index)">' + '\u2605' + '</li>' + '</ul>',
            scope: {
                ratingValue: '=',
                max: '=',
                onStarRating: '&'
            },

            link: function(scope, elem, attrs) {

                //This method is used to update the rating run time.
                var updateRating = function() {
                    //This is global level collection.
                    scope.stars = [];
                    //Loop called with the help of data-max directive input and push the stars count.
                    for (var i = 0; i < scope.max; i++) {
                        scope.stars.push({
                            filled: i < scope.ratingValue
                        });
                    }
                };

                //This is used to toggle the rating stars.
                scope.toggleFunck = function(index) {
                    //This is used to count the default start rating and sum the number of imput index.
                    scope.ratingValue = index + 1;

                    scope.onStarRating({
                        rating: index + 1
                    });
                };

                //This is used to watch activity on scope, if any changes on star rating is call autometically and update the stars.
                scope.$watch('ratingValue',
                    function(oldV, newV) {
                        if (newV) {
                            updateRating();
                        }
                    }
                );
            }
        };
    }
);