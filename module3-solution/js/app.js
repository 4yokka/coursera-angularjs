(function() {
  'use strict';

  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .directive('foundItems', FoundItemsDirective)
  .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

  NarrowItDownController.$inject = ['MenuSearchService'];

  // Controller function
  function NarrowItDownController(MenuSearchService) {
    var result = this;
    result.searchTerm = "";
    result.loader = false;

    result.narrowDown = function() {
      result.found = [];
      result.loader = true;
      
      var promise = MenuSearchService.getMatchedMenuItems(result.searchTerm);
      promise.then(function(response) {
        result.loader = false;
        result.found = response;
      })
      .catch(function(error) {
        console.log("Something went terribly wrong.");
        // console.log(error);
      });
    }

    result.removeItem = function (itemIndex) {
      MenuSearchService.removeItem(itemIndex);
    };

  }

  // Service function
  MenuSearchService.$inject = ['$http', 'ApiBasePath'];
  function MenuSearchService($http, ApiBasePath) {
    var service = this;
    var items = [];

    service.getMatchedMenuItems = function(searchTerm) {
      return $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json")
      })
      .then(function(result) {
        var foundItems = [];
        result.data.menu_items.forEach(function(element) {
          if (element.description.indexOf(searchTerm) !== -1) {
            foundItems.push(element);
          }
        });
        items = foundItems;
        return foundItems;
      });
    }

    service.removeItem = function (itemIndex) {
      items.splice(itemIndex, 1);
    };
  }

  // Directive function
  function FoundItemsDirective() {
    var ddo = {
      templateUrl: 'foundItems.html',
      scope: {
        found: '<',
        onRemove: '&'
      }
    };

    return ddo;
  }

})();
