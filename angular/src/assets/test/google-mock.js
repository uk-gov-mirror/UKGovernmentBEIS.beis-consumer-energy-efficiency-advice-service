window.google = {
    maps: {
        LatLng: function (lat, lng) {
            return {
                latitude: parseFloat(lat),
                longitude: parseFloat(lng),

                lat: function () {
                    return this.latitude;
                },
                lng: function () {
                    return this.longitude;
                }
            };
        },
        LatLngBounds: function () {
            return {
                extend: function() {
                    return {};
                }
            };
        },
        Marker: function () {
            return {
                getPosition: function () {
                    return {};
                },
                setMap: function () {
                    return {};
                }
            };
        },
        Map: function () {
            return {
                fitBounds: function () {
                    return {};
                }
            };
        },
        SymbolPath: {
            FORWARD_CLOSED_ARROW: "FORWARD_CLOSED_ARROW"
        }
    }
};
