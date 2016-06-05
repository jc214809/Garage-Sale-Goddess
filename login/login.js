angular.module('sample')
  .controller('LoginCtrl', function($scope, $http, $location) {
    // create a blank object to handle form data.
    $scope.item = {};
    // calling our submit function.
    $scope.submitForm = function() {
      // Posting data to php file
      $http({
          method: 'POST',
          url: "http://localhost:8080/Garage-Sale-Goddess-API/addItem",
          data: $scope.item //forms user object
        })
        .success(function(data) {
          alert("added")
          $location.path('/');
        });
    };

  });
