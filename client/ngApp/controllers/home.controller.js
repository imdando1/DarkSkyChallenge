(function () {
    var HomeController = (function () {
        function HomeController() {
            this.message = "Simple Weather";
        }
        return HomeController;
    }());
    angular.module('darksky').controller('homeController', HomeController);
})();
