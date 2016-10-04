describe('Testing Angular Specs: ', function(){

    beforeEach(angular.mock.module('controllers'));

    describe('Controllers >> ', function(){
        var ctrl;

        // describe homeController
        describe('homeController', function(){
            beforeEach(angular.mock.inject(function($controller){
                ctrl = $controller('homeController', {});
            }));

            it('should exist', function(){
                expect(ctrl).toBeDefined();
            });

            it('should have message field', function(){
                expect(ctrl.message).toBeDefined();
                expect(ctrl.message).toBe("Hello L4 Digital! Thanks for the opportunity! -Dan-")
            });
        });
    });
});
