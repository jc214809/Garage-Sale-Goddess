angular.module('sample.pastFinds', [])
  .controller('PastFindsCtrl', function($scope, $http, $location) {
    $scope.finds = {};
    $http.get($scope.url + "/getFoundItems")
      .success(function(data, status, headers, config) {
        $scope.finds = data;
      }).error(function(data, status, headers, config) {
        alert("error");
      })

    $scope.getTotalFinds = function() {
      if ($scope.finds != null) {
        return $scope.finds.length;
      } else {
        return 0;
      }
    };

    $scope.addBackToNotFound = function(id, index) {
      console.log(index);
      $scope.item = {
        itemId: id
      }
      $http.post($scope.url + "/markItemAsNotFound", $scope.item).success(function(data, status) {
        $scope.finds[index].itemStatus = "NOT FOUND";
      })
      $location.path('/');

    };
  });