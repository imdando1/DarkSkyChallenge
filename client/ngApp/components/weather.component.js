var darksky;
(function (darksky) {
    var Components;
    (function (Components) {
        angular
            .module('darksky')
            .component('weather', {
            templateUrl: '/ngApp/views/weather.html',
            controller: darksky.Controllers.WeatherController,
            controllerAs: 'vm'
        });
    })(Components = darksky.Components || (darksky.Components = {}));
})(darksky || (darksky = {}));
