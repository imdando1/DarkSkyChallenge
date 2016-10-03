(function(){
    angular
        .module('darksky')
        .config(router);

    router.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

    function router (
        $stateProvider: ng.ui.IStateProvider,
        $urlRouterProvider: ng.ui.IUrlRouterProvider,
        $locationProvider: ng.ILocationProvider
    ){
        // Define routes
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

        // Handle request for non-existent route
        $urlRouterProvider.otherwise('/notFound');

        // Enable HTML5 navigation
        $locationProvider.html5Mode(true);
    }
})();
