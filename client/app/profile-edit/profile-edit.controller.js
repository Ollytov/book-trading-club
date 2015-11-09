'use strict';

angular.module('bookTradingClubApp')
  .controller('ProfileEditCtrl', function ($scope, Auth) {
    $scope.getCurrentUser = Auth.getCurrentUser;

  });
