var darksky;
(function (darksky) {
    var Controllers;
    (function (Controllers) {
        var WeekController = (function () {
            function WeekController(weatherService, address) {
                this.weatherService = weatherService;
                this.address = address;
                this.getWeeklyWeather();
            }
            WeekController.prototype.getWeeklyWeather = function () {
                var _this = this;
                this.weatherService.getWeeklyWeather().then(function (data) {
                    console.log(data.data);
                    _this.weeklyWeather = data;
                });
            };
            return WeekController;
        }());
        Controllers.WeekController = WeekController;
        angular.module('darksky').controller('weekController', WeekController);
    })(Controllers = darksky.Controllers || (darksky.Controllers = {}));
})(darksky || (darksky = {}));
