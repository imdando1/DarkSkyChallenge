(function(){

    angular
        .module('darksky')
        .component('weather', {
            templateUrl:'/ngApp/views/weather.html',
            controller: 'weatherController',
            controllerAs: 'vm'
        });
        
})();
