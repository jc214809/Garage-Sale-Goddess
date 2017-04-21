try {
  // try to use localStorage
  localStorage.test = 2;
} catch (e) {
  // there was an error so...
  alert('You are in Privacy Mode\nPlease deactivate Privacy Mode and then reload the page.');
}

$(document).on('click', '.navbar-collapse.in', function(e) {
  if ($(e.target).is('a')) {
    $(this).collapse('hide');
  }
});

$(document).on('click', '.navbar-brand', function(e) {
  if ($(e.target).is('a')) {
    $('.navbar-collapse').collapse('hide');
  }
});

// $(document).on('click', , function(e) {
// $('.navbar-collapse.in a, .navbar-brand, .details-button, .add-item').on('click', function(e) {
//   // if ($(e.target).is('a')) {
//   $(this).collapse('hide');
// });

Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

angular.module('sample', [
  'ngRoute',
  'sample.home',
  'sample.pastFinds',
  'sample.item',
  'sample.login',
  'angular-storage',
  'angular-jwt'
]).config(function myAppConfig($routeProvider, authProvider, $httpProvider, $locationProvider,
  jwtInterceptorProvider, jwtOptionsProvider) {
  jwtOptionsProvider.config({
    whiteListedDomains: ['localhost', 'jc214809.github.io']
  });
  // .config(function myAppConfig($routeProvider, authProvider, $httpProvider, $locationProvider,
  //   jwtInterceptorProvider) {
  $routeProvider
    .when('/', {
      controller: 'HomeCtrl',
      templateUrl: 'home/home.html',
      pageTitle: 'Homepage',
      requiresLogin: true
    })
    .when('/item', {
      controller: 'ItemCtrl',
      templateUrl: 'item/item.html',
      pageTitle: 'Item',
      requiresLogin: true
    })
    .when('/past', {
      controller: 'PastFindsCtrl',
      templateUrl: 'past-finds/past-finds.html',
      pageTitle: 'Past Finds',
      requiresLogin: true
    })
    .when('/login', {
      controller: 'LoginCtrl',
      templateUrl: 'login/login.html',
      pageTitle: 'Login'
    });

  authProvider.init({
    domain: AUTH0_DOMAIN,
    clientID: AUTH0_CLIENT_ID,
    loginUrl: '/login'
  });

  // jwtInterceptorProvider.tokenGetter = function(store) {
  //     return store.get('token');
  // }


  // Add a simple interceptor that will fetch all requests and add the jwt token to its authorization header.
  // NOTE: in case you are calling APIs which expect a token signed with a different secret, you might
  // want to check the delegation-token example
  $httpProvider.interceptors.push('jwtInterceptor');
}).run(function($rootScope, auth, store, jwtHelper, $location) {
  $rootScope.$on('$locationChangeStart', function() {
    if (!auth.isAuthenticated) {
      var token = store.get('token');
      if (token) {
        if (!jwtHelper.isTokenExpired(token)) {
          auth.authenticate(store.get('profile'), token);
        } else {
          $location.path('/login');
        }
      }
    }

  });
}).service('itemservice', function() {
  this.item = {};
}).controller('AppCtrl', function AppCtrl($scope, $location, auth, store) {

  $scope.auth = auth;
  $scope.profile = store.get('profile');
  //$scope.url = "http://localhost:8080/Garage-Sale-Goddess-API";
  $scope.url = "http://75.118.135.179:7079/Garage-Sale-Goddess-API";

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

  $scope.cancel = function() {
    $location.path('/');
  };

  $scope.logout = function() {
    auth.signout();
    store.remove('profile');
    store.remove('token');
    $location.path('/login');
  }

  $scope.$on('$routeChangeSuccess', function(e, nextRoute) {
    if (nextRoute.$$route && angular.isDefined(nextRoute.$$route.pageTitle)) {
      $scope.pageTitle = nextRoute.$$route.pageTitle + ' | Garage Sale Goddess';
    }
  });
})

;
