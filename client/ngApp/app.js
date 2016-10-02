var darksky;
(function (darksky) {
    var modules = ['ui.router', 'ngResource', 'ui.bootstrap', 'chart.js', 'ngGeolocation', 'ngAnimate'];
    angular.module('darksky', modules);
})(darksky || (darksky = {}));
