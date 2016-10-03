(function(){

    // create weather component in darksky module
    angular
        .module('darksky')
        .component('weather', {
            templateUrl:'/ngApp/views/weather.html',
            controller: 'weatherController',
            controllerAs: 'vm'
        });

})();
