angular.module('sample.home', [])
  .controller('HomeCtrl', function HomeController($scope, $http, $location, itemservice) {
    $scope.items = [];
    $scope.users = [];
    $scope.item = {};
    $http.get($scope.url + "/getNotFoundItems")
      .success(function(data, status, headers, config) {
        $scope.items = data;
      }).error(function(data, status, headers, config) {
        alert("error");
      })
    $http.get($scope.url + "/getUsers")
      .success(function(data, status, headers, config) {
        $scope.users = data;
      }).error(function(data, status, headers, config) {
        alert("error");
      })
    $scope.edit = function(item) {
      $scope.itemservice = itemservice;
      $scope.itemservice.item = item;
      $location.path('/item');
    };

    $scope.pastFinds = function() {
      $location.path('/past');
    };

    $scope.getTotalItems = function() {
      if ($scope.items != null) {
        return $scope.items.length;
      } else {
        return 0;
      }
    };

    $scope.markAsFound = function(id, index) {
      console.log(index);
      $scope.item = {
        itemId: id,
        itemFinderID: $scope.profile.identities[0].user_id,
        itemFindersName: $scope.profile.given_name + ' ' + $scope.profile.family_name,
        itemFinderImageURL: $scope.auth.profile.picture
      }
      $http.post($scope.url + "/markItemAsFound", $scope.item).success(function(data, status) {
        $scope.items[index].itemStatus = "FOUND";
      })

    };
    $scope.removeTask = function(id, index) {
      $scope.item = {
        itemId: id
      }
      $http.post($scope.url + "/deleteItem", $scope.item).success(function(data, status) {
        $scope.items.remove(index);
      })
    }
  });