namespace darksky.Controllers {

    export class WeatherController {
        public weather;
        public date = new Date();

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

        getWeather(){
            this.weatherService.getWeathers().then((data)=>{
                console.log(data);
                this.weather = data;
                this.setData(data.hourly.data);
            });
        }

        private setData(data) {
            console.log(data);
            for(let i of data) {
                console.log(i);
                this.chart.label.push((new Date(i.time * 1000)).getHours());
                this.chart.data[0].push(i.temperature);
                this.chart.data[1].push(i.windSpeed);
            }
            console.log(this.chart.data);
        }

        constructor(private weatherService: darksky.Services.WeatherService){
            this.getWeather();
        }

    }




}
