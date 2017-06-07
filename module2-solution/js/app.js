(function() {
  'use strict';

  angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];

  function ToBuyController(ShoppingListCheckOffService) {
    var toBuyList = this;
    toBuyList.items = ShoppingListCheckOffService.getToBuyItems();
    toBuyList.message = "Everything is bought!";

    toBuyList.checkOffItem = function(itemIndex) {
      ShoppingListCheckOffService.checkOff(itemIndex);
    }
  }

  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var alreadyBoughtList = this;
    alreadyBoughtList.items = ShoppingListCheckOffService.getBoughtItems();
    alreadyBoughtList.message = "Nothing bought yet.";
  }

  function ShoppingListCheckOffService() {
    var service = this;

    // list of items to buy
    var toBuyItems = [
      {name: "cookies", quantity: "12"},
      {name: "cats", quantity: "2"},
      {name: "milk", quantity: "1"},
      {name: "coffees", quantity: "3"},
      {name: "juice", quantity: "1"}
    ];

    // list of already bought items
    var boughtItems = [];

    service.removeFromToBuy = function(itemIndex) {
      toBuyItems.splice(itemIndex, 1);
    }

    service.addToBought = function(item) {
      boughtItems.push(item);
    }

    service.checkOff = function(itemIndex) {
      var item = toBuyItems[itemIndex];
      service.removeFromToBuy(itemIndex);
      service.addToBought(item);
    }

    service.getToBuyItems = function() {
      return toBuyItems;
    }

    service.getBoughtItems = function() {
      return boughtItems;
    }
  }

})();
