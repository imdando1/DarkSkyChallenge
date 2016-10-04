(function(){

    angular.module('services', []);
    angular.module('controllers', []);

    let modules = ['ui.router', 'ngResource', 'ui.bootstrap','chart.js', 'ngGeolocation', 'ngAnimate', 'controllers', 'services'];
    angular.module('darksky', modules);
})();
