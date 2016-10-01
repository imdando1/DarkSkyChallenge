namespace darksky.Controllers {

    export class WeatherController {
        public weather;
        public date = new Date();
        public position;

        public chart:any = {
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

        constructor(
            private weatherService: darksky.Services.WeatherService,
            private $geolocation: any, private $http:any){

            this.getWeather();

        }

        getWeather(){
            this.weatherService.getCurrentWeather().then((data:any)=>{
                console.log(data);
                this.weather = data;
                this.setData(data.hourly.data);
            });
        }

        private setData(data) {
            for(let i of data) {
                this.chart.label.push((new Date(i.time * 1000)).getHours());
                this.chart.data[0].push(i.temperature);
                this.chart.data[1].push(i.windSpeed);
            }
        }
    }
}
