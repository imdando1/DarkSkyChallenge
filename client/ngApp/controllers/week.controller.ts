(function(){

    interface IWeekController {
        // public fields
        isReady: boolean;
        weeklyWeather: any;
        address: string;
        // public methods
        close();
        getWeeklyWeather();
    }

    class WeekController implements IWeekController {
        // public fields
        public isReady = false;
        public weeklyWeather = {
            data: []
        };

        // $inject for minification
        static $inject = ['$scope', '$uibModalInstance', '$window', 'weatherService', 'address'];

        // constructor
        constructor(
            private $scope:ng.IScope,
            private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance,
            private $window: ng.IWindowService,
            private weatherService: darksky.Services.IWeatherService,
            public address:string){

            this.getWeeklyWeather();
        }

        // private methods
        // none...

        // public methods
        close(){
            this.$uibModalInstance.close();
        }

        getWeeklyWeather(){
            this.weatherService.getWeeklyWeather().then((data)=>{
                let i = 0;

                let weatherData = this.$window.setInterval(()=>{
                    this.weeklyWeather.data.push(data.data[i]);
                    i++;

                    if(i == data.data.length) clearInterval(weatherData);

                    this.$scope.$apply();
                }, 100)

                this.isReady = true;
            })
        }
    }

    angular
        .module('darksky')
        .controller('weekController', WeekController);

})();
