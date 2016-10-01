namespace darksky.Services {

    export class WeatherService {
        private weatherResource;
        private coords:any = {};
        private zip;
        private weather:any = {};

        constructor(
            $resource: ng.resource.IResourceService,
            private $geolocation:any,
            private $q: ng.IQService,
            private $http: ng.IHttpService){

            this.weatherResource = $resource('/api/weather/:id');

        }

        getCurrnetWeather(zip){
            return this.$q((resolve, reject)=>{
                if(!zip){
                    this.getCurrentPosition()
                        .then(()=>{
                            this.$q.all([

                                this.weatherResource.save(this.coords).$promise
                                    .then((weather:any)=>{
                                        this.weather.currently = weather.hourly.data[(new Date()).getHours()];
                                        this.weather.hourly = weather.hourly;
                                }),

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
                    console.log('1. ' + this.zip);

                    this.$q.all([
                        this.getCoordByZip(),
                        this.getAddressByZip()
                            .then((address)=>{
                                this.weather.address = address;
                                console.log('2. ' + this.weather.address);
                            })
                    ]).then(()=>{
                        console.log("then block work?")
                        this.weatherResource.save(this.coords).$promise
                            .then((weather:any)=>{
                                this.weather.currently = weather.hourly.data[(new Date()).getHours()];
                                this.weather.hourly = weather.hourly;
                                resolve(this.weather);
                        });
                    }).catch(()=>{
                        console.log('q all rejected')
                        reject();
                    })
                }
            });
        }


        getCurrentWeather1() {
            return this.$q((resolve, reject)=>{
                this.getCurrentPosition().then(()=>{
                    this.weatherResource.save(this.coords).$promise.then((weather:any)=>{
                        this.getZipByCoord().then(()=>{
                            this.getAddressByZip().then((address)=>{
                                let currentWeather:any = {};
                                currentWeather.currently = weather.hourly.data[(new Date()).getHours()];
                                currentWeather.hourly = weather.hourly;
                                currentWeather.address = address;
                                // console.log(currentWeather);
                                // weather.address = address;

                                resolve(currentWeather);
                            });
                        });
                    }).catch((err)=>{
                        reject(err);
                    });
                });
            });
        }




        private getAddressByZip(){
            return this.$q((resolve, reject)=>{
                this.$http
                    .get(`http://maps.googleapis.com/maps/api/geocode/json?address=${this.zip}`)
                    .then((data:any)=>{
                        resolve(data.data.results[0].formatted_address)
                    })
                    .catch(()=>{
                        reject();
                    });
            });
        }

//////////////////////////////////////////////////////////////
        private getCoordByZip(){
            return this.$q((resolve, reject)=>{
                let URL = `http://maps.googleapis.com/maps/api/geocode/json?address=${this.zip}`;

                this.$http
                    .get(URL)
                    .then((data:any)=>{

                        let location = data.data.results[0].geometry.location;
                        this.coords.latitude = location.lat;
                        this.coords.longitude = location.lng;
                        console.log(this.coords)

                        resolve(this.coords)
                    })
                    .catch(()=>{
                        console.log('rejected');
                        reject();
                    });
            });
        }

        private getZipByCoord(){
            return this.$q((resolve, reject)=>{
                let URL = `http://maps.googleapis.com/maps/api/geocode/json?latlng=${this.coords.latitude},${this.coords.longitude}&sensor=false`

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
