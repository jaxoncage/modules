(function() {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['$scope','ShoppingListCheckOffService'];
AlreadyBoughtController.$inject = ['$scope', 'ShoppingListCheckOffService'];

function ToBuyController($scope, ShoppingListCheckOffService){
  var leftCtrl = this;
  //$scope.ShoppingListCheckOffService = ShoppingListCheckOffService;
  leftCtrl.toBuyArray = ShoppingListCheckOffService.initializer();
  leftCtrl.removeToBuy = function(index){
    ShoppingListCheckOffService.checkItem(index);
  }
  leftCtrl.countLfArray = function() {
    return ShoppingListCheckOffService.countToBuyItems();
  }
}

function AlreadyBoughtController($scope, ShoppingListCheckOffService){
  var rightCtrl = this;
  rightCtrl.boughtArray = ShoppingListCheckOffService.showBoughtItem();
  rightCtrl.countRgArray = function() {
    return ShoppingListCheckOffService.countBoughtItems();
  }
}

function ShoppingListCheckOffService() {
  var service = this;
  var lfArray = [];
  var rgArray = [];
  service.initializer = function(){
    lfArray = [
      { name: "eggs", quantity: 20 },
      { name: "nuts", quantity: 15 },
      { name: "potatoes", quantity: 10 },
      { name: "onions", quantity: 5 },
      { name: "avocados", quantity: 2 }
    ];
    return lfArray;
  };

  service.checkItem = function(index) {
    rgArray.push(lfArray[index]);
    lfArray.splice(index, 1);
  }

  service.showBoughtItem = function() {
    return rgArray;
  }

  service.countBoughtItems = function() {
    if (rgArray.length > 0)
      return false;
    else
      return true;
  }

  service.countToBuyItems = function() {
    if (lfArray.length == 0)
      return true;
    else
      return false;
  }
}

})();
