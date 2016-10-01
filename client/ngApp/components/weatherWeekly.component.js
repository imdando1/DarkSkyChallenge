var darksky;
(function (darksky) {
    var Components;
    (function (Components) {
        angular
            .module('darksky')
            .component('weatherWeekly', {
            templateUrl: '/ngApp/views/weatherWeekly.html',
            controllerAs: 'vm',
            bindings: {
                weather: '='
            }
        });
    })(Components = darksky.Components || (darksky.Components = {}));
})(darksky || (darksky = {}));
