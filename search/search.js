angular.module('sample.search', [])
  .controller('SearchCtrl', function SearchController($scope, $http, $location) {

    $scope.listings = [];
    var craigslist = require('node-craigslist'),
      client = new craigslist.Client({
        city: 'columbus'
      });

    client.search('Garage Sale').then((listings) => {
      // play with listings here...
      listings.forEach((listing) => client.details(listing)
        .then((details) => {
          $scope.listings.push(details);
          console.log(details);
          $scope.$apply();
        }))
    }).catch((err) => {
      console.error(err);
    });
  });