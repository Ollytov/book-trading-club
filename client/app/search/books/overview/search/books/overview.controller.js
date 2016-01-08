'use strict';

angular.module('bookTradingClubApp')
  .controller('SearchBooksOverviewCtrl', function ($scope, $timeout, $state, $stateParams, $location, $http, Auth) {
  	$scope.getCurrentUser = Auth.getCurrentUser;
    $scope.yourComment = function(commentname) {
        if ($scope.getCurrentUser().username === commentname) {
            return true; 
        }   else {
            return false;
        }
    }

    $http.get('/api/books/'+$state.params.book).success(function(response) {
    	$scope.responseBook = response.book[0];
    	$scope.fullResponse = response;
        if ($scope.fullResponse.comments.length === 0) {
            $scope.commentList = [];
        }   else {
            $scope.commentList = $scope.fullResponse.comments;
        }
    	$scope.addedBy = $scope.responseBook.addedBy === $scope.getCurrentUser().username;
    });


    $http.get('/api/users/find/user/'+$scope.getCurrentUser().username).success(function(response) {
        for (var i = 0; i < response.books.length; i++) {
            if (response.books[i]._id === $scope.fullResponse._id) {
                $scope.matchingFavs = true;
            }
        }
    })

    $scope.addComment = function() {
        var commentData = {
            commentText: $scope.maintext,
            userName: $scope.getCurrentUser().username,
            profileImg: $scope.getCurrentUser().profileimage
        };
        $http.post('/api/books/addcomment/'+$scope.fullResponse._id, commentData).then(function(response) {
            $scope.commentList.push(response);
        }, function(err) {
            console.log(err);
        });
        $http.get('/api/books/'+$state.params.book).success(function(response) {
            $scope.fullResponse = response;
            $scope.commentList = $scope.fullResponse.comments;
        });
        $scope.maintext = '';
    }

    $scope.deleteComment = function(comment) {
        var dataSent = {
            commentText: comment
        }
        $http.post('/api/books/removecomment/'+$scope.fullResponse._id, dataSent).then(function(response) {
        }, function(err) {
            console.log(err);
        });
        $http.get('/api/books/'+$state.params.book).success(function(response) {
            $scope.fullResponse = response;
            $scope.commentList = $scope.fullResponse.comments;
        });
    }


    $scope.addFavorites = function() {
    	$http.post('/api/users/addbook/'+$scope.getCurrentUser()._id, $scope.fullResponse).then(function(response) {
    		$scope.successMessage = true;
    		$scope.success = "This book has been added to your Favorites!";
            $scope.matchingFavs = true;
    	}, function(err) {
    		$scope.successMessage = false;
    		$scope.errorMessage = true;
    		$scope.error = "This book is already in your Favorites.";
    	});
    }

    $scope.removeFavorites = function() {
        $http.post('/api/users/remove/'+$scope.getCurrentUser()._id+'/'+$scope.fullResponse._id).then(function(response) {
            $scope.successMessage = true;
            $scope.success = "This book has been Removed from your Favorites!";
            $scope.matchingFavs = false;
          }, function(err) {
            $scope.successMessage = false;
            $scope.errorMessage = true;
            $scope.error = "There was an error... Please try again!";
          });
    }

    $scope.deleteBook = function() {
        $http.delete('/api/books/' + $scope.fullResponse._id).success(function(res) {

        });
        $location.path('/search/books');
    };

  });
