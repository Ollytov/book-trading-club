'use strict';

describe('Controller: SearchBooksOverviewCtrl', function () {

  // load the controller's module
  beforeEach(module('bookTradingClubApp'));

  var SearchBooksOverviewCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SearchBooksOverviewCtrl = $controller('SearchBooksOverviewCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
