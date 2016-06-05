angular.module('sample.home', [])
  .controller('HomeCtrl', function HomeController($scope, $http, $location) {
    $scope.todos = [];
    $http.get($scope.url + "/getAllItems")
      .success(function(data, status, headers, config) {
        $scope.todos = data;
        console.log($scop$scope.url + e.todos);
      }).error(function(data, status, headers, config) {
        alert("error");
      })
    $scope.toggle = function(id) {
      $("#details-" + id).toggle("slow");
    };
    $scope.getTotalTodos = function() {
      return $scope.todos.length;
    };
    $scope.markAsFound = function(id, index) {
      console.log(index);
      $scope.item = {
        itemId: id
      }
      $http.post("/markItemAsFound", $scope.item).success(functi$scope.url + on(data, status) {
        $scope.todos[index].itemStatus = "Found";
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
      $location.path('/login');
    };
  });
