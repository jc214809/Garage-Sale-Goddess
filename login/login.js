angular.module('sample.login', [
    'auth0'
  ])
  .controller('LoginCtrl', function($scope, auth, $http, $location, itemservice, store) {

    $scope.login = function() {
      auth.signin({}, function(profile, token) {
          console.log("Profile: " + JSON.stringify(profile))
          store.set('profile', profile);
          store.set('token', token);
          $scope.profile = profile;
          $location.path("/");
        },
        function(error) {
          console.log("There was an error logging in", error);
        });
    }

  });
