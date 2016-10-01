namespace darksky.Components {


    angular
        .module('darksky')
        .component('weatherWeekly', {
            templateUrl:'/ngApp/views/weatherWeekly.html',
            controllerAs: 'vm',
            bindings: {
                weather: '='
            }
        });

}
