const API_KEY = 'AIzaSyC-tEAh56qJBnYr7WTsvWyPqa1G9lRPpCc';
const SINGAPORE = {
    zoom: 13,
    center: {
        lat: 1.3,
        lng: 103.851959
    }
};

function initMap() {
    // Center the map at Singapore
    var map = new google.maps.Map(document.getElementById('map'), SINGAPORE);

    // Create the search box and link it to the UI element.
    var searchInput = document.getElementById('search-input');
    var searchBox = new google.maps.places.SearchBox(searchInput);
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(searchInput);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function () {
        searchBox.setBounds(map.getBounds());
    });

    // When places are found, manipulate the markers for each place.
    var markers = [];
    searchBox.addListener('places_changed', function () {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
            return;
        }

        // Clear out the old markers.
        markers.forEach(function (marker) {
            marker.setMap(null);
        });
        markers = [];

        // For each place, set the icon, marker and location.
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function (place) {
            if (!place.geometry) {
                console.log("Returned place contains no geometry");
                return;
            }

            // Icon for each place is set here.
            var icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            let marker = new google.maps.Marker({
                map: map,
                icon: icon,
                title: place.name,
                position: place.geometry.location
            });

            // Add click listener for each marker, and attach the infoWindow object to it.
            marker.addListener(marker, 'click', () => {
                // alert('hi!');
                
            })

            markers.push(marker);

            // Create a custom infoWindow object here. Use the 'content' key to determine <html> data.
            var infoWindow = new google.maps.InfoWindow({
                
                content: ''
            });

            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        map.fitBounds(bounds);
    });
}
