'use strict';

angular.module('bookTradingClubApp')
  .controller('ProfileCtrl', function ($scope, Auth) {
    $scope.getCurrentUser = Auth.getCurrentUser;
  });
