(function () {
    var geoApi = (navigator.geolocation !== undefined);
    var locator = function Locator(input) {
        this.isSupportGeoApi = geoApi;
        this.$input = $(input);

    };

    locator.prototype.getLocation = function () {
        if (!this.isSupportGeoApi) {
            console.warn('Не можем установить геолокацию =(')
        }
        navigator.geolocation.getCurrentPosition(
            function (position) {
                alert('You are ' + position.coords);
            },
            function () {
                alert('Position could not be determined.')
            },
            {
                enableHighAccuracy: true
            }
        );

    };

    global.Locator = locator;
})();
