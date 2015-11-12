'use strict';

angular.module('bookTradingClubApp')
  .controller('ProfileCtrl', function ($scope, $state, $http, $timeout, Auth) {
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.user = $scope.getCurrentUser();

    $http.get('/api/users/find/books/'+$scope.getCurrentUser()._id).success(function(response) {
    	$scope.books = response;
    });

  });
