namespace darksky.Controllers {



    export class HomeController {
        public message = "super awesome!!!";

        constructor(private weatherService: darksky.Services.WeatherService){
        }

        

    }

}
