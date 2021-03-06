'use strict';

angular.module('bookTradingClubApp')
  .controller('ProfileEditCtrl', function ($scope, $http, $location, Auth) {
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.user = $scope.getCurrentUser();
    $http.get('/api/users/find/books/'+$scope.getCurrentUser()._id).success(function(response) {
        $scope.books = response;
    });

    $scope.changeInfo = function(form) {
    	$http.post('/api/users/profile-edit', form).then(function(response) {
    		$location.path('/profile');
    	}, function(err) {
    		console.log(err);
    	});
    }

  });
