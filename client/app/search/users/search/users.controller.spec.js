'use strict';

describe('Controller: SearchUsersCtrl', function () {

  // load the controller's module
  beforeEach(module('bookTradingClubApp'));

  var SearchUsersCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SearchUsersCtrl = $controller('SearchUsersCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
