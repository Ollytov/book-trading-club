'use strict';

angular.module('bookTradingClubApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('addbook', {
        url: '/addbook',
        templateUrl: 'app/addbook/addbook.html',
        controller: 'AddbookCtrl'
      });
  });