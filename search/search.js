angular.module('sample.search', [])
  .controller('SearchCtrl', function SearchController($scope, $http, $location) {
    // $scope.listings = [];
    // $scope.searchTerms = ['Garage Sale', 'Yard Sale', 'Moving Sale', 'Estate Sale'];
    // var craigslist = require('node-craigslist'),
    //   client = new craigslist.Client({
    //     city: 'columbus'
    //   });
    // for (var i = 0; i < $scope.searchTerms.length; i++) {
    //   client.search($scope.searchTerms[i]).then((listings) => {
    //     listings.forEach((listing) => client.details(listing)
    //       .then((details) => {
    //         details.description = details.description.replace("QR Code Link to This Post", "");
    //         $scope.listings.push(details);
    //         console.log(details);
    //         $scope.$apply();
    //       }))
    //   }).catch((err) => {
    //     console.error(err);
    //   });
    // }
    // $scope.checkDate = function(dates) {
    //   for (var i = 0; i < dates.length; i++) {
    //     var result = dates[i].split(" ");
    //     var date = result[1].split("-");
    //     var saleDate = new Date(date[0], date[1], date[2]);
    //     var today = new Date();
    //     var dateDiffDays = Math.ceil((Math.ceil(saleDate.getTime() - today.getTime())) / (1000 * 3600 * 24));
    //     if (dateDiffDays >= -1 && dateDiffDays <= 8) {

    //     }
    //   }
    // };
  });