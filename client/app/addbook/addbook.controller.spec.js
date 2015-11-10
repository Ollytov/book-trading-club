'use strict';

describe('Controller: AddbookCtrl', function () {

  // load the controller's module
  beforeEach(module('bookTradingClubApp'));

  var AddbookCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AddbookCtrl = $controller('AddbookCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
