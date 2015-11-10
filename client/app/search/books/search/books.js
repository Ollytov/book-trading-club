'use strict';

angular.module('bookTradingClubApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('search/books', {
        url: '/search/books',
        templateUrl: 'app/search/books/search/books.html',
        controller: 'SearchBooksCtrl'
      });
  });