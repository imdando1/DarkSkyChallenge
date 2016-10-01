namespace darksky.Controllers {

    export class WeekController {
        public weeklyWeather;

        constructor(
            private weatherService: darksky.Services.WeatherService,
            public address){

            this.getWeeklyWeather();

        }

        getWeeklyWeather(){
            this.weatherService.getWeeklyWeather().then((data)=>{
                console.log(data.data);
                this.weeklyWeather = data;
            })
        }

    }

    angular.module('darksky').controller('weekController', WeekController);

}
