namespace darksky.Services {




    export class WeatherService {
        private weatherResource;

        constructor($resource: ng.resource.IResourceService){
            this.weatherResource = $resource('/api/weather/:id');
        }

        getWeathers() {
            return this.weatherResource.get().$promise;
        }

    }

    angular
        .module('darksky')
        .service('weatherService', WeatherService);

}
