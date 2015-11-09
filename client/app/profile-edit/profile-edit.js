'use strict';

angular.module('bookTradingClubApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('profile-edit', {
        url: '/profile-edit',
        templateUrl: 'app/profile-edit/profile-edit.html',
        controller: 'ProfileEditCtrl'
      });
  });