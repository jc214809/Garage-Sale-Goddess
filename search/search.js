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
    $scope.checkDate = function(dates) {
      for (var i = 0; i < dates.length; i++) {
        var result = dates[i].split(" ");
        var date = result[1].split("-");
        var saleDate = new Date(date[0], date[1], date[2]);
        var today = new Date();
        var dateDiffDays = Math.ceil((Math.ceil(saleDate.getTime() - today.getTime())) / (1000 * 3600 * 24));
        if (dateDiffDays >= -10 && dateDiffDays <= 10) {

        } else {
          return false;
        }
      }
      return true;
    };
  });