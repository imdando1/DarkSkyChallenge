namespace darksky.Controllers {

    export class WeekController {
        public weeklyWeather = {
            data: []
        };
        public isReady = false;

        constructor(
            private weatherService: darksky.Services.WeatherService,
            public address:string,
            private $window: ng.IWindowService,
            private $scope:ng.IScope,
            private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance){

            this.getWeeklyWeather();

        }

        close(){
            this.$uibModalInstance.close();
        }

        getWeeklyWeather(){
            this.weatherService.getWeeklyWeather().then((data)=>{
                let i = 0;
                let weatherData = this.$window.setInterval(()=>{
                    console.log(data.data[i]);
                    this.weeklyWeather.data.push(data.data[i]);
                    i++;
                    if(i == data.data.length) clearInterval(weatherData);
                    this.$scope.$apply();
                }, 100)

                //this.weeklyWeather = data;
                this.isReady = true;
            })
        }

    }

    angular.module('darksky').controller('weekController', WeekController);

}
