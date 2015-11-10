'use strict';

angular.module('bookTradingClubApp')
  .controller('ProfileEditCtrl', function ($scope, $http, $location, Auth) {
    $scope.getCurrentUser = Auth.getCurrentUser;


    $scope.changeInfo = function(form) {
    	console.log("changeInfo has been run!");
    	console.log($scope.getCurrentUser().name);
    	$http.post('/api/users/profile-edit', form).then(function(response) {
    		$location.path('/profile');
    	}, function(err) {
    		console.log(err);
    	});
    }

  });
