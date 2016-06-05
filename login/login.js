angular.module('sample')
  .controller('LoginCtrl', function($scope, $http, $location, itemservice) {
    // create a blank object to handle form data.
    $scope.item = itemservice.item;
    // calling our submit function.
    $scope.submitForm = function(id) {
      // Posting data to php file
      if ($('itemId').val() == '') {
        $http({
            method: 'POST',
            url: $scope.url + "/addItem",
            data: $scope.item //forms user object
          })
          .success(function(data) {
            alert("added");
            $location.path('/');
          });
      }
      if ($('itemId').val() != '') {
        $http({
            method: 'POST',
            url: $scope.url + "/editItem",
            data: $scope.item //forms user object
          })
          .success(function(data) {
            alert("Item Updated")
            $location.path('/');
          });
      }
    };

  });
