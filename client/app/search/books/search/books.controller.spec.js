'use strict';

describe('Controller: SearchBooksCtrl', function () {

  // load the controller's module
  beforeEach(module('bookTradingClubApp'));

  var SearchBooksCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SearchBooksCtrl = $controller('SearchBooksCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
