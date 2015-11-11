'use strict';

angular.module('bookTradingClubApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('search/users', {
        url: '/search/users/:userid',
        templateUrl: 'app/search/users/search/users.html',
        controller: 'SearchUsersCtrl'
      });
  });