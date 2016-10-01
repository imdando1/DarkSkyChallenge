var darksky;
(function (darksky) {
    var Config;
    (function (Config) {
        angular
            .module('darksky')
            .config(configuration);
        function configuration() {
        }
    })(Config = darksky.Config || (darksky.Config = {}));
})(darksky || (darksky = {}));
