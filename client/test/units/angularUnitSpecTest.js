describe('Testing Angular Specs: ', function () {
    beforeEach(angular.mock.module('ui.router', []));
    beforeEach(angular.mock.module('ngResource', []));
    beforeEach(angular.mock.module('ui.bootstrap', []));
    beforeEach(angular.mock.module('chart.js', []));
    beforeEach(angular.mock.module('ui.router', []));
    beforeEach(angular.mock.module('ngAnimate', []));
    beforeEach(angular.mock.module('darksky'));
    describe('Controller > ', function () {
        var $controller;
        beforeEach(inject(function (_$controller_) {
            $controller = _$controller_;
        }));
        describe('homeController ', function () {
            it('should exist > ', function () {
            });
        });
    });
});
describe('A sample test', function () {
    it('should be working', function () {
        expect(5).toBe(5);
    });
});
