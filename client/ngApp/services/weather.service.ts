namespace darksky.Services {
    // interface for WeatherService.
    //Wrapped in namespace so that it can be access easily from other files.
    export interface IWeatherService {
        getCurrnetWeather(zip);
        getWeeklyWeather();
    }
}


(function(){

    class WeatherService {
        // private fields
        private coords:any = {};
        private weather:any = {};
        private weatherResource;
        private zip;

        // $inject for minification
        static $inject = ['$resource', '$geolocation', '$q', '$http'];

        // constructor
        constructor(
            $resource: ng.resource.IResourceService,
            private $geolocation:any,
            private $q: ng.IQService,
            private $http: ng.IHttpService){

            this.weatherResource = $resource('/api/weather', null, {
                getWeek: {
                    method: 'PUT',
                    url: '/api/weather'
                }
            });
        }

        // private methods
        private getAddressByZip(){
            return this.$q((resolve, reject)=>{
                let URL = `https://maps.googleapis.com/maps/api/geocode/json?address=${this.zip}`;

                this.$http
                    .get(URL)
                    .then((data:any)=>{
                        resolve(data.data.results[0].formatted_address)
                    })
                    .catch(()=>{
                        reject();
                    });
            });
        }

        private getCoordByZip(){
            return this.$q((resolve, reject)=>{
                let URL = `https://maps.googleapis.com/maps/api/geocode/json?address=${this.zip}`;

                this.$http
                    .get(URL)
                    .then((data:any)=>{

                        let location = data.data.results[0].geometry.location;
                        this.coords.latitude = location.lat;
                        this.coords.longitude = location.lng;

                        resolve(this.coords)
                    })
                    .catch(()=>{
                        reject();
                    });
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

        private getZipByCoord(){
            return this.$q((resolve, reject)=>{
                let URL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.coords.latitude},${this.coords.longitude}&sensor=false`

                this.$http
                    .get(URL)
                    .then((data:any)=>{
                        this.zip = data.data.results[0].address_components.filter((elm)=>{
                            if(elm.types[0] == 'postal_code') return true;
                        })[0].short_name;
                        resolve()
                    })
                    .catch(()=>{
                        reject();
                    });
            });
        }

        // public methods
        getCurrnetWeather(zip){
            return this.$q((resolve, reject)=>{
                if(!zip){
                    // get current position
                    this.getCurrentPosition()
                        .then(()=>{
                            // then get weather data and address at the same time
                            this.$q.all([
                                // get weather info
                                this.weatherResource.save(this.coords).$promise
                                    .then((weather:any)=>{
                                        this.weather.currently = weather.hourly.data[(new Date()).getHours()];
                                        this.weather.hourly = weather.hourly;
                                        this.weather.daily = weather.daily;
                                }),
                                // get zip/address using coord
                                this.getZipByCoord().then(()=>{
                                    this.getAddressByZip().then((address)=>{
                                        this.weather.address = address;
                                    });
                                })
                            ]).then(()=>{
                                resolve(this.weather);
                            }).catch(()=>{
                                reject();
                            });
                        })
                } else {
                    this.zip = zip;

                    // get coords and address at the smae time
                    this.$q.all([
                        // get coord using zip
                        this.getCoordByZip(),
                        // get address by zip
                        this.getAddressByZip()
                            .then((address)=>{
                                this.weather.address = address;
                            })
                    ]).then(()=>{
                        // once coord and address is available, get weather info
                        this.weatherResource.save(this.coords).$promise
                            .then((weather:any)=>{
                                this.weather.currently = weather.hourly.data[(new Date()).getHours()];
                                this.weather.hourly = weather.hourly;
                                resolve(this.weather);
                        });
                    }).catch(()=>{
                        reject();
                    })
                }
            });
        }

        getWeeklyWeather(){
            return this.weatherResource.getWeek(this.coords).$promise;
        }
    }

    angular
        .module('darksky')
        .service('weatherService', WeatherService);

})();
