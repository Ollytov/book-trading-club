'use strict';

angular.module('bookTradingClubApp')
  .controller('SearchBooksCtrl', function ($scope, $http, socket) {

    $http.get('/api/books').success(function(response) {
    	$scope.books = response;
    	socket.syncUpdates('books', $scope.books);
    });

    $scope.getInfo = function(book) {
      console.log(book._id);
    }

    $scope.deleteThing = function(book) {
      $http.delete('/api/books/' + book._id);
    };
    
    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('books');
    });

});
