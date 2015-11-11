'use strict';

angular.module('bookTradingClubApp')
  .controller('AddbookCtrl', function ($scope, $http, $location, Auth) {
  	$scope.numBook = 0;
  	$scope.isActive = false;
    $scope.errorMessageTrue = false;
  	$scope.getCurrentUser = Auth.getCurrentUser;


    $scope.searchBooks = function(bookname) {
    	$scope.errorMessageTrue = false;
        $scope.errorMessage = '';
    	$http.get('/api/users/search/'+bookname).then(function(response) {
    		$scope.responseData = response;
    		$scope.addBookToPage(response);
    	}, function(err) {
    		console.log(err);
    	});
    }

    $scope.addBookToPage = function(response) {
    	$scope.isActive = true;
    	$scope.currentBook = $scope.responseData.data[$scope.numBook];
    	$scope.search_bookname = $scope.currentBook.title;
    	$scope.search_bookimg = $scope.currentBook.thumbnail;
    	$scope.search_bookauthor = $scope.currentBook.authors[0];
    }

    $scope.keepLooking = function() {
    	if ($scope.numBook >= 9) {
    		$scope.numBook = 0;
    	}	else {
    		$scope.numBook = $scope.numBook + 1;
    	}
    	$scope.addBookToPage($scope.responseData);
    }

    $scope.addBook = function() {
    	$scope.currentBook.addedBy = $scope.getCurrentUser().username;

    	$http.post('/api/books/add', $scope.currentBook).then(function(response) {
            $scope.errorMessageTrue = false;
            $scope.errorMessage = '';
    		$location.path('/search/books');
    	}, function(err) {
            $scope.errorMessageTrue = true;
    		$scope.errorMessage = err.data;
    	});
    	console.log($scope.currentBook);
    	console.log($scope.getCurrentUser());
    }

  });
