//let modules = ['ui.router', 'ngResource', 'ui.bootstrap','chart.js', 'ngGeolocation', 'ngAnimate']

describe('Testing Angular Specs: ', function(){
    // create mock dependencies
    beforeEach(angular.mock.module('ui.router',[]));
    beforeEach(angular.mock.module('ngResource',[]));
    beforeEach(angular.mock.module('ui.bootstrap',[]));
    beforeEach(angular.mock.module('chart.js',[]));
    beforeEach(angular.mock.module('ui.router',[]));
    beforeEach(angular.mock.module('ngAnimate',[]));
    // call the app module
    beforeEach(angular.mock.module('darksky'));


    // describe controllers
    describe('Controller > ', function(){

        var $controller;

        beforeEach(inject(function(_$controller_){
            $controller = _$controller_;
        }));

        // describe homeController
        describe('homeController ', function(){
            it('should exist > ', function(){

            })
        })

    })

});

// describe('homeController', function() {
//   beforeEach(angular.mock.module('darksky'));
//
//   var $controller;
//
//   beforeEach(inject(function(_$controller_){
//     // The injector unwraps the underscores (_) from around the parameter names when matching
//     $controller = _$controller_;
//   }));
//
//   describe('HomeController', function() {
//     it('should exist', function() {
//       var controller = $controller('HomeController', {});
//       expect(controller).toBeDefined();
//     });
//   });
// });


describe('A sample test', function(){
    it('should be working', function(){
        expect(5).toBe(5);
    });
});
