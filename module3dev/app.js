(function() {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective);

NarrowItDownController.$inject = ['$scope','MenuSearchService'];
function NarrowItDownController($scope, MenuSearchService){
  var menuCtrl = this;
  menuCtrl.searchTerm = '';
  menuCtrl.narrowIt = function(){
    menuCtrl.foundItemsArray = MenuSearchService.getMatchedMenuItems(menuCtrl.searchTerm);
  }

 // getItems handled by service instead of assigning it in the main narrowIt
 //menuCtrl.foundItemsArray = MenuSearchService.getAllItems();

// remove handled by CONTROLLER
// menuCtrl.removeItemCtrl = function(index) {
//   console.log('_ctrl remove_' + index);
//   menuCtrl.foundItemsArray.splice(index,1);
// }

 // remove handled by MANAGER
  menuCtrl.removeItemCtrl = function(index) {
    console.log('_ctrl remove_' + index);
    MenuSearchService.removeItem(index);
  }
}

function FoundItemsDirective(){
  var ddo = {
	  restrict: 'EA',
    templateUrl: 'foundItems.html',
    scope: {
      myTitle: '@title',
      foundItemsArray: '<',
      onRemove: '&htmlOnRemove'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'found',
    bindToController: true
  };
  return ddo;
}

function FoundItemsDirectiveController() {
  var found = this;
}

MenuSearchService.inject = ['$http'];
function MenuSearchService($http) {
  var service = this;
  var foundItems = [];
  service.getMatchedMenuItems = function(searchTerm){
      foundItems = [];
      $http.get('https://davids-restaurant.herokuapp.com/menu_items.json').success(function (data) {
      console.log(data);
      console.log('num_' + data.menu_items.length);
      // process result and only keep items that match
      for (var i = 0; i < data.menu_items.length; i++) {
        var name = data.menu_items[i].name;
        if (name.toLowerCase().indexOf(searchTerm) !== -1) {
          foundItems.push(data.menu_items[i]);
        }
      }
      return data;
    });
    return foundItems;
  };

 // not used anymore, assignment directly in the matcheditems method
  // service.getAllItems = function() {
  //   return;
  // }

  service.removeItem = function (itemIndex) {
    foundItems.splice(itemIndex, 1);
  };
}
})();
