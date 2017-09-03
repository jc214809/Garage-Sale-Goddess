angular.module('sample.home', [])
  .controller('HomeCtrl', function HomeController($scope, $http, $location, itemservice) {
    $scope.todos = [];
    $scope.users = [];
    $http.get($scope.url + "/getNotFoundItems")
      .success(function(data, status, headers, config) {
        $scope.todos = data;
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

    $scope.getTotalTodos = function() {
      return $scope.todos.length;
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
        $scope.todos[index].itemStatus = "FOUND";
      })

    };
    $scope.removeTask = function(id, index) {
      $scope.item = {
        itemId: id
      }
      $http.post($scope.url + "/deleteItem", $scope.item).success(function(data, status) {
        $scope.todos.remove(index);
      })
    }
    $scope.addTodo = function() {
      $scope.itemservice = itemservice;
      $scope.itemservice.item = {};
      $location.path('/item');
    };
  });