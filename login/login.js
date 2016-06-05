angular.module('sample')
  .controller('LoginCtrl', function($scope, $http, $location, itemservice) {
    // create a blank object to handle form data.
    $scope.item = itemservice.item;
    if ($scope.item.itemId == null) {
      $scope.buttonText = "Add"
      $scope.header = "Add Item";
      $scope.successMessage = "The item was successfully added to the list";
      $scope.instructions = "Here you an add items for the Garage Sale Goddess to look for by filling out the form below!!";
      $('#icon').addClass('glyphicon-plus');
      $('#submit').addClass('btn-primary');
      $scope.path = "/addItem";
    } else {
      $scope.header = "Update Item";
      $scope.successMessage = "The item was successfully updated";
      $scope.instructions = "Here you can edit the item if you were not specific enough the first time or you just happen to accidently mess up.";
      $scope.buttonText = "Update"
      $('#icon').addClass('glyphicon-pencil');
      $('#submit').addClass('btn-info');
      $scope.path = "/editItem";
    }
    $scope.cancel = function() {
      $location.path('/');
    };
    // calling our submit function.
    $scope.submitForm = function(id) {
      console.log($scope.item);
      // Posting data to php file
      $http({
        method: 'POST',
        url: $scope.url + $scope.path,
        data: $scope.item //forms user object
      }).success(function(data) {
        alert($scope.successMessage);
        $location.path('/');
      });
    };

  });
