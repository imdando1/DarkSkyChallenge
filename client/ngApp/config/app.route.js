var darksky;
(function (darksky) {
    var Route;
    (function (Route) {
        angular
            .module('darksky')
            .config(router);
        router.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
        function router($stateProvider, $urlRouterProvider, $locationProvider) {
            $stateProvider
                .state('home', {
                url: '/',
                templateUrl: './ngApp/views/home.html',
                controller: darksky.Controllers.HomeController,
                controllerAs: 'vm'
            })
                .state('week', {
                url: '/week',
                templateUrl: './ngApp/views/week.html',
                controller: darksky.Controllers.WeekController,
                controllerAs: 'vm'
            })
                .state('notFound', {
                url: '/notFound',
                templateUrl: './ngApp/views/notFound.html'
            });
            $urlRouterProvider.otherwise('/notFound');
            $locationProvider.html5Mode(true);
        }
    })(Route = darksky.Route || (darksky.Route = {}));
})(darksky || (darksky = {}));
