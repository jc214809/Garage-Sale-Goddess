angular.module('sample.home', [])
  .controller('HomeCtrl', function HomeController($scope, $http, $location, itemservice) {
    $scope.todos = [];
    $http.get($scope.url + "/getAllItems")
      .success(function(data, status, headers, config) {
        $scope.todos = data;
      }).error(function(data, status, headers, config) {
        alert("error");
      })
    $scope.edit = function(item) {
      $scope.itemservice = itemservice;
      $scope.itemservice.item = item;
      $location.path('/login');
    };

    $scope.toggle = function(id) {
      $("#details-" + id).toggle("slow", $scope.toggleArrows(id));
    };

    $scope.toggleArrows = function(id) {
      if ($("#details-" + id).is(':hidden')) {
        $("#detailsToggle-" + id).removeClass('glyphicon-triangle-bottom');
        $("#detailsToggle-" + id).addClass('glyphicon-triangle-top');
      } else {
        $("#detailsToggle-" + id).removeClass('glyphicon-triangle-top');
        $("#detailsToggle-" + id).addClass('glyphicon-triangle-bottom');
      }
    };
    $scope.getTotalTodos = function() {
      return $scope.todos.length;
    };
    $scope.markAsFound = function(id, index) {
      console.log(index);
      $scope.item = {
        itemId: id
      }
      $http.post($scope.url + "/markItemAsFound", $scope.item).success(function(data, status) {
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
      $scope.itemservice = itemservice;
      $scope.itemservice.item = [];
      $location.path('/login');
    };
  });
