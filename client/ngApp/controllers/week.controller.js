var darksky;
(function (darksky) {
    var Controllers;
    (function (Controllers) {
        var WeekController = (function () {
            function WeekController(weatherService) {
                this.weatherService = weatherService;
            }
            WeekController.prototype.getWeeklyWeather = function () {
            };
            return WeekController;
        }());
        Controllers.WeekController = WeekController;
    })(Controllers = darksky.Controllers || (darksky.Controllers = {}));
})(darksky || (darksky = {}));
