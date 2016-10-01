namespace darksky.Services {

    export class WeatherService {
        private weatherResource;
        private coords:any = {};


        constructor(
            $resource: ng.resource.IResourceService,
            private $geolocation:any,
            private $q: ng.IQService,
            private $http: ng.IHttpService){

            this.weatherResource = $resource('/api/weather/:id');
        }

        getCurrentWeather() {
            return this.$q((resolve, reject)=>{
                this.getCurrentPosition().then(()=>{
                    this.weatherResource.save(this.coords).$promise.then((weather:any)=>{
                        this.getAddressByCoords().then((address)=>{
                            let currentWeather:any = {};
                            currentWeather.currently = weather.hourly.data[(new Date()).getHours()];
                            currentWeather.hourly = weather.hourly;
                            currentWeather.address = address;
                            // console.log(currentWeather);
                            // weather.address = address;

                            resolve(currentWeather);
                        })
                    }).catch((err)=>{
                        reject(err);
                    });
                });
            });
        }

        getAddressByCoords(){
            return this.$q((resolve, reject)=>{
                this.$http
                    .get('http://maps.googleapis.com/maps/api/geocode/json?address=98058')
                    .then((data:any)=>{
                        resolve(data.data.results[0].formatted_address)
                    })
                    .catch(()=>{
                        reject();
                    })
            });
        }

        private getCurrentPosition(){
            return this.$q((resolve, reject)=>{
                this.$geolocation.getCurrentPosition({
                    timeout: 60000
                }).then((position)=> {
                    if(position){
                        this.coords.latitude = position.coords.latitude;
                        this.coords.longitude = position.coords.longitude;
                        resolve();
                    } else {
                        reject();
                    }
                });
            });
        }
    }

    angular.module('darksky').service('weatherService', WeatherService);

}
