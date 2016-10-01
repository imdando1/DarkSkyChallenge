namespace darksky.Route {

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
                controller: darksky.Controllers.HomeController,
                controllerAs: 'vm'
            })
            // .state('week', {
            //     url:'/week',
            //     templateUrl: './ngApp/views/week.html',
            //     controller: darksky.Controllers.WeekController,
            //     controllerAs: 'vm'
            // })
            .state('notFound', {
                url: '/notFound',
                templateUrl: './ngApp/views/notFound.html'
            });

        // Handle request for non-existent route
        $urlRouterProvider.otherwise('/notFound');

        // Enable HTML5 navigation
        $locationProvider.html5Mode(true);
    }

}
