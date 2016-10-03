var darksky;
(function (darksky) {
    var Controllers;
    (function (Controllers) {
        var HomeController = (function () {
            function HomeController() {
                this.message = "Simple Weather";
            }
            return HomeController;
        }());
        Controllers.HomeController = HomeController;
    })(Controllers = darksky.Controllers || (darksky.Controllers = {}));
})(darksky || (darksky = {}));
