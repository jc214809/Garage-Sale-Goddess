angular.module('sample.pastFinds', [])
  .controller('PastFindsCtrl', function($scope, $http, $location) {
    $http.get($scope.url + "/getFoundItems")
      .success(function(data, status, headers, config) {
        $scope.todos = data;
      }).error(function(data, status, headers, config) {
        alert("error");
      })

    $scope.getTotalTodos = function() {
      return $scope.todos.length;
    };

    $scope.addBackToNotFound = function(id, index) {
      console.log(index);
      $scope.item = {
        itemId: id
      }
      $http.post($scope.url + "/markItemAsNotFound", $scope.item).success(function(data, status) {
        $scope.todos[index].itemStatus = "NOT FOUND";
      })
      $location.path('/');

    };
  });