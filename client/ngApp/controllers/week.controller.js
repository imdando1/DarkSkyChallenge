(function () {
    var WeekController = (function () {
        function WeekController(weatherService, address, $window, $scope, $uibModalInstance) {
            this.weatherService = weatherService;
            this.address = address;
            this.$window = $window;
            this.$scope = $scope;
            this.$uibModalInstance = $uibModalInstance;
            this.weeklyWeather = {
                data: []
            };
            this.isReady = false;
            this.getWeeklyWeather();
        }
        WeekController.prototype.close = function () {
            this.$uibModalInstance.close();
        };
        WeekController.prototype.getWeeklyWeather = function () {
            var _this = this;
            this.weatherService.getWeeklyWeather().then(function (data) {
                var i = 0;
                var weatherData = _this.$window.setInterval(function () {
                    console.log(data.data[i]);
                    _this.weeklyWeather.data.push(data.data[i]);
                    i++;
                    if (i == data.data.length)
                        clearInterval(weatherData);
                    _this.$scope.$apply();
                }, 100);
                _this.isReady = true;
            });
        };
        return WeekController;
    }());
    angular.module('darksky').controller('weekController', WeekController);
})();
