var darksky;
(function (darksky) {
    var Controllers;
    (function (Controllers) {
        var WeatherController = (function () {
            function WeatherController(weatherService, $geolocation, $uibModal) {
                this.weatherService = weatherService;
                this.$geolocation = $geolocation;
                this.$uibModal = $uibModal;
                this.date = new Date();
                this.chart = chartOptions;
                this.hourlyTableOn = false;
                this.isReady = false;
                this.isLoading = true;
                this.getWeather();
            }
            WeatherController.prototype.showWeekModal = function () {
                var _this = this;
                this.$uibModal.open({
                    templateUrl: '/ngApp/views/weekDialog.html',
                    controller: darksky.Controllers.WeekController,
                    controllerAs: 'vm',
                    resolve: {
                        address: function () { return _this.weather.address; }
                    },
                    size: 'lg'
                });
            };
            WeatherController.prototype.getWeather = function () {
                var _this = this;
                this.hourlyTableOn = false;
                this.isReady = false;
                this.isLoading = true;
                this.weatherService.getCurrnetWeather(this.zip).then(function (data) {
                    _this.weather = data;
                    _this.resetData();
                    _this.setData(data.hourly.data);
                    _this.isReady = true;
                    _this.isLoading = false;
                });
            };
            WeatherController.prototype.setData = function (data) {
                for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                    var i = data_1[_i];
                    this.chart.label.push((new Date(i.time * 1000)).getHours());
                    this.chart.data[0].push(i.temperature);
                    this.chart.data[1].push(i.windSpeed);
                }
            };
            WeatherController.prototype.resetData = function () {
                this.chart.label.length = 0;
                this.chart.data[0].length = 0;
                this.chart.data[1].length = 0;
            };
            return WeatherController;
        }());
        Controllers.WeatherController = WeatherController;
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
    })(Controllers = darksky.Controllers || (darksky.Controllers = {}));
})(darksky || (darksky = {}));
