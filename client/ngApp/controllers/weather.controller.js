(function () {
    var WeatherController = (function () {
        function WeatherController($geolocation, $uibModal, weatherService) {
            this.$geolocation = $geolocation;
            this.$uibModal = $uibModal;
            this.weatherService = weatherService;
            this.chart = chartOptions;
            this.date = new Date();
            this.hourlyTableOn = false;
            this.isLoading = true;
            this.isReady = false;
            this.getWeather();
        }
        WeatherController.prototype.resetData = function () {
            this.chart.label.length = 0;
            this.chart.data[0].length = 0;
            this.chart.data[1].length = 0;
        };
        WeatherController.prototype.setData = function (data) {
            for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                var i = data_1[_i];
                this.chart.label.push((new Date(i.time * 1000)).getHours());
                this.chart.data[0].push(i.temperature);
                this.chart.data[1].push(i.windSpeed);
            }
        };
        WeatherController.prototype.getWeather = function () {
            var _this = this;
            this.hourlyTableOn = false;
            this.isLoading = true;
            this.isReady = false;
            this.weatherService.getCurrnetWeather(this.zip).then(function (data) {
                _this.weather = data;
                _this.resetData();
                _this.setData(data.hourly.data);
                _this.isLoading = false;
                _this.isReady = true;
            });
        };
        WeatherController.prototype.showWeekModal = function () {
            var _this = this;
            this.$uibModal.open({
                templateUrl: '/ngApp/views/weekDialog.html',
                controller: 'weekController',
                controllerAs: 'vm',
                resolve: {
                    address: function () { return _this.weather.address; }
                },
                size: 'lg'
            });
        };
        WeatherController.$inject = ['$geolocation', '$uibModal', 'weatherService'];
        return WeatherController;
    }());
    var chartOptions = {
        label: [],
        data: [[], []],
        series: ['Temperature', 'Wind Speed'],
        datasetOverride: [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }],
        options: {
            scales: {
                yAxes: [
                    {
                        id: 'y-axis-1',
                        type: 'linear',
                        display: true,
                        position: 'left'
                    },
                    {
                        id: 'y-axis-2',
                        type: 'linear',
                        display: true,
                        position: 'right'
                    }
                ]
            }
        }
    };
    angular
        .module('darksky')
        .controller('weatherController', WeatherController);
})();
