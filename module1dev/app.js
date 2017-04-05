(function() {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope){
  $scope.finalMessage = "";
  $scope.lunchData = "";
  $scope.checkLunch = function(){
    $scope.messageColor = "green";
    var data = $scope.lunchData;
    var items = data.split(',');
    var cleanList = new Array();
    // clean from ', ,''
    for (var i = 0; i < items.length; i++) {
      if (!items[i].trim() == "")
        cleanList.push(items[i]);
    }
    if (cleanList.length < 1){
      $scope.finalMessage = "Please enter data first";
      $scope.messageColor = "red";
    }
    else if (cleanList.length < 4)
      $scope.finalMessage = "Enjoy!";
    else
      $scope.finalMessage = "Too much!";
  }
}

})();
