angular.module('sample.home', [])
  .controller('HomeCtrl', function HomeController($scope, $http, $location) {
    $scope.todos = [];
    $http.get("http://localhost:8080/Garage-Sale-Goddess-API/getAllItems")
      .success(function(data, status, headers, config) {
        $scope.todos = data;
        console.log($scope.todos);
      }).error(function(data, status, headers, config) {
        alert("error");
      })
    $scope.toggle = function(id) {
      $("#details-" + id).toggle("slow");
    };
    $scope.getTotalTodos = function() {
      return $scope.todos.length;
    };
    $scope.removeTask = function(id, index) {
      $scope.item = {
        itemId: id
      }
      $http.post("http://localhost:8080/Garage-Sale-Goddess-API/deleteItem", $scope.item).success(function(data, status) {
        $scope.todos.remove(index);
      })
    }
    $scope.addTodo = function() {
      $location.path('/login');
    };
  });
