'use strict';

angular.module('bookTradingClubApp')
  .controller('SearchUsersCtrl', function ($scope, $state, $http, Auth) {
  	$scope.getCurrentUser = Auth.getCurrentUser;
    $scope.finduser = {};
    $scope.searched = false;
    $scope.realuser = true;
    $scope.errorMessage = '';
    $scope.user = $scope.getCurrentUser();
	
    $scope.username = $state.params.userid;
  	$scope.searchUsers = function(username) {

  		$http.get('/api/users/find/user/' + username.toLowerCase()).success(function(response) {
        console.log(response);
	  		$scope.finduser = response;
	  		if ($scope.finduser === null) {
	  			$scope.searched = false;
	  			$scope.errorMessage = 'No user exists with that name!';
	  			$scope.realuser = false;
	  		}	else {
	  			$scope.realuser = true;
	  			$scope.errorMessage = '';
	  			$scope.searched = true;
          $http.get('/api/users/find/books/'+response._id).success(function(response) {
            console.log(response);
            $scope.books = response;
          });
	  		}
	  	});


  	}

    $scope.searchUsers($scope.username);

  });
