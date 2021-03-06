(function() {
  'use strict';

  angular.module('LunchChecker', [])
  .controller('LunchCheckerController', LunchCheckerController);

  LunchCheckerController.$inject = ['$scope'];

  function LunchCheckerController($scope) {
    $scope.message = "";
    $scope.lunch = "";
    $scope.msgClass = "";

    $scope.checkLunch = function() {
      if ($scope.lunch === "") {
        $scope.message = "Please enter data first";
        $scope.msgClass = "message-warn";
      } else {
        var lunchDishes = $scope.lunch
                        .split(',')                 // splits input string
                        .filter(function(value) {   // filters out empty values
                          return value.trim().length > 0;
                        })
                        .length;
        $scope.msgClass = "message-ok";

        if (lunchDishes >= 0 && lunchDishes <= 3) {
          console.debug(lunchDishes);
          $scope.message = "Enjoy!";
        } else {
          console.debug(lunchDishes);
          $scope.message = "Too much!";
        }
      }
    }
  }

})();
