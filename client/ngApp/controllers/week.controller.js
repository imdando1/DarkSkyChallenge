(function () {
    var WeekController = (function () {
        function WeekController($scope, $uibModalInstance, $window, weatherService, address) {
            this.$scope = $scope;
            this.$uibModalInstance = $uibModalInstance;
            this.$window = $window;
            this.weatherService = weatherService;
            this.address = address;
            this.isReady = false;
            this.weeklyWeather = {
                data: []
            };
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
                    _this.weeklyWeather.data.push(data.data[i]);
                    i++;
                    if (i == data.data.length)
                        clearInterval(weatherData);
                    _this.$scope.$apply();
                }, 100);
                _this.isReady = true;
            });
        };
        WeekController.$inject = ['$scope', '$uibModalInstance', '$window', 'weatherService', 'address'];
        return WeekController;
    }());
    angular
        .module('darksky')
        .controller('weekController', WeekController);
})();
