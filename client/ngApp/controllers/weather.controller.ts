(function(){

    interface IWeatherController {
        // public fields
        chart: any;
        date: Date;
        hourlyTableOn: boolean;
        isLoading: boolean;
        isReady: boolean;
        weather: any;
        zip: number;
        // public methods
        getWeather();
        showWeekModal();
    }

    class WeatherController implements IWeatherController{
        // public fields
        public chart = chartOptions;
        public date = new Date();
        public hourlyTableOn = false;
        public isLoading = true;
        public isReady = false;
        public weather;
        public zip;

        // $inject for minification
        static $inject = ['$geolocation', '$uibModal', 'weatherService'];
        
        // constructor
        constructor(
            private $geolocation: any,
            private $uibModal: ng.ui.bootstrap.IModalService,
            private weatherService: darksky.Services.IWeatherService){

            this.getWeather();
        }

        // private methods
        private resetData(){
            this.chart.label.length = 0;
            this.chart.data[0].length = 0;
            this.chart.data[1].length = 0;
        }

        private setData(data) {
            for(let i of data) {
                this.chart.label.push((new Date(i.time * 1000)).getHours());
                this.chart.data[0].push(i.temperature);
                this.chart.data[1].push(i.windSpeed);
            }
        }

        // public methods
        getWeather(){
            this.hourlyTableOn = false
            this.isLoading = true;
            this.isReady = false;

            this.weatherService.getCurrnetWeather(this.zip).then((data:any)=>{
                this.weather = data;
                this.resetData();
                this.setData(data.hourly.data);
                this.isLoading = false;
                this.isReady = true;
            });
        }

        showWeekModal(){
            // opens modal
            this.$uibModal.open({
                templateUrl: '/ngApp/views/weekDialog.html',
                controller: 'weekController',
                controllerAs: 'vm',
                resolve: {
                    address: ()=> this.weather.address
                },
                size: 'lg'
            });
        }
    }

    let chartOptions = {
        label: [],
        data: [[],[]],
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
