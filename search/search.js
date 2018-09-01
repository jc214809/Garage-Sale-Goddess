    angular.module('sample.search', [])
      .controller('SearchCtrl', function SearchController($scope, $http, $location) {
        $scope.zipcode = 43230;
        $scope.miles = "20";
        $scope.dates = ["2018-08-31", "2018-09-01", "2018-09-02", "2018-09-03"]
        $scope.listings = [];

        $scope.doesListingExists = function(listings) {
          for (var i = 0; i < $scope.listings.length; i++) {
            if ($scope.listings[i].guid == listings.guid && $scope.listings[i].pubDate == listings.pubDate) {
              return true;
            }
          }
          return false;
        }

        $scope.getIndex = function(listings) {
          for (var i = 0; i < $scope.listings.length; i++) {
            if ($scope.listings[i].title == listings.title && $scope.listings[i].pubDate == listings.pubDate) {
              return i;
            }
          }
          return null;
        }

        $scope.getFeed = function(date) {
          $.ajax({
            url: 'https://api.rss2json.com/v1/api.json',
            method: 'GET',
            dataType: 'json',
            data: {
              rss_url: 'https://columbus.craigslist.org/search/gms?format=rss&postal=' + $scope.zipcode + '&query=garage%20sale&sale_date=' + date + '&search_distance=' + $scope.miles,
              api_key: 'kyetlmarpkb6xpukpnsnglefro8ct4xi8gbcv4qp', // put your api key here
              count: 50
            }
          }).done(function(response) {
            for (var i in response.items) {
              if ($scope.doesListingExists(response.items[i])) {
                $scope.listings[$scope.getIndex(response.items[i])].dates.push(date);
              } else {
                response.items[i].dates = [];
                response.items[i].dates.push(date)
                if (response.items[i].hasOwnProperty('title')) {
                  $scope.listings.push(response.items[i]);
                }
              }
              $scope.$apply()
            }
            //console.dir($scope.listings);
          })
        };
        $scope.updateSearch = function() {
          $scope.listings = [];
          for (var i = $scope.dates.length - 1; i >= 0; i--) {
            $scope.getFeed($scope.dates[i]);
          }
        }

        for (var i = $scope.dates.length - 1; i >= 0; i--) {
          $scope.getFeed($scope.dates[i]);
        }

      });