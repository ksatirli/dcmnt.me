'use strict';

/* global angular */
var app = angular.module('app', [], function($httpProvider) {

  /* jshint ignore:start */
  $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
  /* jshint ignore:end */

  void $httpProvider;
});

app.controller('controller', function($scope, $http, $timeout) {
  $scope.bitlyConfig = {
    baseUrl: 'https://api-ssl.bitly.com/v3/shorten',
    login: 'dcmntme',
    apiKey: 'R_68b928b98a364daa93dd7870c015e12b',
    domain: 'dcmnt.me',
    format: 'json'
  };

  $scope.shortenButton = {
    buttonClass: 'btn-info',
    iconClass: 'fa fa-link',
    label: ' shorten'
  };

  $scope.shortenButtonDefault = $scope.shortenButton;

  $scope.getShortUrl = function() {
    var requestUrl = $scope.bitlyConfig.baseUrl;
    var requestData = {
      params: {
        login: $scope.bitlyConfig.login,
        apiKey: $scope.bitlyConfig.apiKey,
        longUrl: encodeURI($scope.urlToShorten),
        domain: $scope.bitlyConfig.domain,
        format: $scope.bitlyConfig.format
      }
    };

    $http.get(requestUrl, requestData)
      .success(function(data, status, headers, config) {
        void status;
        void headers;
        void config;

        // set 'fetch' button to show a checkmark
        $scope.shortenButton = {
          buttonClass: 'btn-success',
          iconClass: 'fa fa-check',
          label: 'URL shortened'
        };

        $timeout(function() {
          // reset 'fetch' button to default state
          $scope.shortenButton = $scope.shortenButtonDefault;
        }, 1250);

        // expose remote data to frontend
        $scope.urlToShorten = data.data.url.replace('http', 'https');
      })
      .error(function(data, status, headers, config) {
        // reset 'fetch' button to default state
        $scope.shortenButton = $scope.shortenButtonDefault;

        $scope.shortenButton = {
          buttonClass: 'btn-danger',
          iconClass: 'fa fa-refresh',
          label: 'retry'
        };

        console.log(data, status, headers, config);
      });

  }; // end: $scope.getShortUrl

});
