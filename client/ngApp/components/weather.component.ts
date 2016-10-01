namespace darksky.Components {

    angular
        .module('darksky')
        .component('weather', {
            templateUrl:'/ngApp/views/weather.html',
            controller: darksky.Controllers.WeatherController,
            controllerAs: 'vm'
        });

}
