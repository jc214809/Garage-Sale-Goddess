    angular.module('sample.search', [])
      .controller('SearchCtrl', function SearchController($scope, $http, $location) {
        $scope.zipcode = 43230;
        $scope.miles = "20";
        $scope.dates = []; //"2018-08-31", "2018-09-01", "2018-09-02", "2018-09-03"
        $scope.listings = [];
        $scope.keywords = ["Garage Sale", "Yard Sale", "Community Sale", "Community Garage Sale", "Moving Sale", "Barn Sale"];
        $scope.secondaryKeywords = ["Tag Sale", "Estate Sale", "Rummage Sale"];
        var FRIDAY = 5;
        var SATURDAY = 6;
        var SUNDAY = 0;

        $scope.doesListingExists = function(listings) {
          for (var i = 0; i < $scope.listings.length; i++) {
            if ($scope.listings[i].link == listings.link && $scope.listings[i].issued == listings.issued) {
              return true;
            }
          }
          return false;
        }

        $scope.getIndex = function(listings) {
          for (var i = 0; i < $scope.listings.length; i++) {
            if ($scope.listings[i].link == listings.link && $scope.listings[i].issued == listings.issued) {
              return i;
            }
          }
          return null;
        }

        $scope.toggleKeywordSearch = function(checked, word) {
          if (checked == false) {
            $scope.secondaryKeywords.push($scope.keywords.splice($scope.keywords.indexOf(word), 1));
          } else {
            $scope.keywords.push($scope.secondaryKeywords.splice($scope.secondaryKeywords.indexOf(word), 1));
          }
        };

        $scope.getFeed = function(date) {
          for (var k = 0; k < $scope.keywords.length; k++) {
            $http.get("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%20%3D%20'https%3A%2F%2Fcolumbus.craigslist.org%2Fsearch%2Fgms%3Fformat%3Drss%26postal%3D" + $scope.zipcode + "%26query%3D" + $scope.keywords[k].replace(/ /g, "%2520") + "%26sale_date%3D" + date + "%26search_distance%3D" + $scope.miles + "'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys")
              .success(function(response, status) {
                var listings = response.query.results.RDF.item;
                for (var i in response.query.results.RDF.item) {
                  if ($scope.doesListingExists(listings[i])) {
                    var index = $scope.getIndex(listings[i]);
                    if (!$scope.listings[index].saleDates.includes(date)) {
                      $scope.listings[index].saleDates.push(date);
                    }
                  } else {
                    listings[i].saleDates = [];
                    listings[i].saleDates.push(date);
                    if (listings[i].hasOwnProperty('title')) {
                      $scope.scrubTitle(listings[i])
                      $scope.listings.push(listings[i]);
                    }
                  }
                }
              });
          }
        };
        $scope.updateSearch = function() {
          $scope.listings = [];
          for (var i = $scope.dates.length - 1; i >= 0; i--) {
            $scope.getFeed($scope.dates[i]);
          }
        }

        $scope.getGarageSaleDates = function() {
          var date = new Date();
          //date.setDate(date.getDate() + 2);
          if ([FRIDAY, SATURDAY, SUNDAY].indexOf(date.getDay()) > -1) {
            if (date.getDay() == FRIDAY) {
              $scope.dates.push(formatDate(date));
              for (var i = 0; i < 2; i++) {
                date.setDate(date.getDate() + 1);
                var arrayDate = formatDate(date);
                $scope.dates.push(arrayDate);
              }
            }
            if (date.getDay() == SATURDAY) {
              $scope.dates.push(formatDate(date));
              date.setDate(date.getDate() + 1);
              $scope.dates.push(formatDate(date));
            }
            if (date.getDay() == SUNDAY) {
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
        }

        $scope.scrubTitle = function(item) {
          var fakeprice = item.title[0].match(/\-?\d+.?\d+?$/);
          if (fakeprice != null) {
            item.title[0] = item.title[0].replace(fakeprice, "");
          }
          item.title[0] = item.title[0].replace("&#x", "").trim();
        }

        $scope.getCurrentUserLocation = function() {
          $scope.listings = [];
          console.log("Starting Here")
          window.navigator.geolocation.getCurrentPosition(function(pos) {
            $http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + pos.coords.latitude + ',' + pos.coords.longitude + '&sensor=true&key=AIzaSyCkk2guPfwd0SPhb93GJ-nUmb5Xy-Hgq3Q').then(function(res) {
              $scope.zipcode = parseInt(res.data.results[0].address_components[8].short_name);
              console.log($scope.zipcode);
              console.dir(res);
            })
          });
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