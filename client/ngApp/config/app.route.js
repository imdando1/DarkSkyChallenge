(function () {
    angular
        .module('darksky')
        .config(router);
    router.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];
    function router($locationProvider, $stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
            url: '/',
            templateUrl: './ngApp/views/home.html',
            controller: 'homeController',
            controllerAs: 'vm'
        })
            .state('about', {
            url: '/about',
            templateUrl: './ngApp/views/about.html',
        })
            .state('notFound', {
            url: '/notFound',
            templateUrl: './ngApp/views/notFound.html'
        });
        $urlRouterProvider.otherwise('/notFound');
        $locationProvider.html5Mode(true);
    }
})();
