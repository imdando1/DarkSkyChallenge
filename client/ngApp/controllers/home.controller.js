(function () {
})();
var HomeController = (function () {
    function HomeController() {
        this.message = "Hello L4 Digital! Thanks for the opportunity! -Dan-";
    }
    return HomeController;
}());
angular
    .module('controllers')
    .controller('homeController', HomeController);
