Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

angular.module('sample', [
    'ngRoute',
    'sample.home'
  ])
  .config(function myAppConfig($routeProvider, $httpProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        controller: 'HomeCtrl',
        templateUrl: 'home/home.html',
        pageTitle: 'Homepage'
      })
      .when('/login', {
        controller: 'LoginCtrl',
        templateUrl: 'login/login.html',
        pageTitle: 'Login'
      });
  })
  .service('itemservice', function() {
    this.item = [];
  })
  .controller('AppCtrl', function AppCtrl($scope, $location) {
    // $scope.url = "http://localhost:8080/Garage-Sale-Goddess-API";
    $scope.url = "http://75.118.135.179:7080/Garage-Sale-Goddess-API";
    $scope.$on('$routeChangeSuccess', function(e, nextRoute) {
      if (nextRoute.$$route && angular.isDefined(nextRoute.$$route.pageTitle)) {
        $scope.pageTitle = nextRoute.$$route.pageTitle + ' | Auth0 Sample';
      }
    });
  });
