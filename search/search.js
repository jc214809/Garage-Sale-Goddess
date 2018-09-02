    angular.module('sample.search', [])
      .controller('SearchCtrl', function SearchController($scope, $http, $location) {
        $scope.zipcode = 43230;
        $scope.miles = "20";
        $scope.dates = []; //"2018-08-31", "2018-09-01", "2018-09-02", "2018-09-03"
        $scope.listings = [];
        var FRIDAY = 5;

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
            if ($scope.listings[i].guid == listings.guid && $scope.listings[i].pubDate == listings.pubDate) {
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
              count: 75
            }
          }).done(function(response) {
            for (var i in response.items) {
              if ($scope.doesListingExists(response.items[i])) {
                $scope.listings[$scope.getIndex(response.items[i])].dates.push(date);
              } else {
                response.items[i].dates = [];
                response.items[i].dates.push(date);
                if (response.items[i].hasOwnProperty('title')) {
                  $scope.scrubTitle(response.items[i])
                  $scope.listings.push(response.items[i]);
                }
              }
              $scope.$apply();
            }
          })
        };
        $scope.updateSearch = function() {
          $scope.listings = [];
          for (var i = $scope.dates.length - 1; i >= 0; i--) {
            $scope.getFeed($scope.dates[i]);
          }
        }

        $scope.getGarageSaleDates = function() {
          var date = new Date();
          date.setDate(date.getDate() + 1);
          if ([5, 6, 0].indexOf(date.getDay()) > -1) {
            if (date.getDay() == 5) {
              $scope.dates.push(formatDate(date));
              for (var i = 0; i < 2; i++) {
                date.setDate(date.getDate() + 1);
                var arrayDate = formatDate(date);
                $scope.dates.push(arrayDate);
              }
            }
            if (date.getDay() == 6) {
              $scope.dates.push(formatDate(date));
              date.setDate(date.getDate() + 1);
              $scope.dates.push(formatDate(date));
            }
            if (date.getDay() == 0) {
              $scope.dates.push(formatDate(date));
            }
          } else {
            date.setDate(date.getDate() + (7 + FRIDAY - date.getDay()) % 7);
            $scope.dates.push(formatDate(date));
            for (var i = 0; i < 2; i++) {
              date.setDate(date.getDate() + 1);
              var arrayDate = formatDate(date);
              $scope.dates.push(arrayDate);
            }
          }
          console.log($scope.dates);
        }

        $scope.scrubTitle = function(item) {
          var fakeprice = item.title.match(/\-?\d+.?\d+?$/);
          if (fakeprice != null) {
            item.title = item.title.replace(fakeprice, "");
          }
          item.title = item.title.replace("&amp;#x", "").trim();
        }

        function formatDate(date) {
          var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

          if (month.length < 2) month = '0' + month;
          if (day.length < 2) day = '0' + day;

          return [year, month, day].join('-');
        }
        $scope.getGarageSaleDates();
        for (var i = $scope.dates.length - 1; i >= 0; i--) {
          $scope.getFeed($scope.dates[i]);
        }

      });