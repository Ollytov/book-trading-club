'use strict';

angular.module('bookTradingClubApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('search/books/overview', {
        url: '/search/books/overview/:book',
        templateUrl: 'app/search/books/overview/search/books/overview.html',
        controller: 'SearchBooksOverviewCtrl',
        params : { book: null, },
      });
  });