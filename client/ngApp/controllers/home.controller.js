var darksky;
(function (darksky) {
    var Controllers;
    (function (Controllers) {
        var HomeController = (function () {
            function HomeController(weatherService) {
                this.weatherService = weatherService;
                this.message = "super awesome!!!";
            }
            return HomeController;
        }());
        Controllers.HomeController = HomeController;
    })(Controllers = darksky.Controllers || (darksky.Controllers = {}));
})(darksky || (darksky = {}));
