var API_KEY = 'AIzaSyC-tEAh56qJBnYr7WTsvWyPqa1G9lRPpCc';
var SINGAPORE = {
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

    var service = new google.maps.places.PlacesService(map);

    savedLocations ? 
    savedLocations.forEach(location => {
        service.getDetails({
            placeId: location.place_id
        }, function (result, status) {
            if (status != google.maps.places.PlacesServiceStatus.OK) {
                alert(status);
                return;
            }
            var marker = new google.maps.Marker({
                map: map,
                position: result.geometry.location
            });
            var infoWindow = getInfoWindow(result);
            marker.addListener('click', () => { infoWindow.open(map, marker) });
        });
    }) : null;

    searchBox.addListener('places_changed', () => {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
            return;
        }

        // Clear out the old markers.
        markers.forEach(marker => {
            marker.setMap(null);
        });
        markers = [];

        // For each place, set the icon, marker and location.
        var bounds = new google.maps.LatLngBounds();
        places.forEach(place => {
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
            marker.addListener('click', () => {
                google.maps.event.addListener(infoWindow, 'domready', () => {
                    document.body.querySelector(`#${place.place_id}`).addEventListener('click', saveLocation);
                })
                infoWindow.open(map, marker);
            })

            // Create a custom infoWindow object here. Use the 'content' key to determine <html> data.
            var infoWindow = getInfoWindow(place);

            markers.push(marker);

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

function getInfoWindow(place){
    return new google.maps.InfoWindow({
        content: getContent(place)
    });
}

function getContent(place) {
    let photoURL;
    let photoSettings = {
        'maxWidth': 200,
        'maxHeight': 120
    }
    place.photos[0].getUrl() ? photoURL = place.photos[0].getUrl(photoSettings) : photoURL = "";

    return `
    <div style="width:200px; text-align:center;">
        <img src=${photoURL}></img>
        <h5>${place.name}</h5>
        <p>${place.formatted_address}</p>
        <button id=${place.place_id}>Save</button>
    </div>
    `
}

function saveLocation() {
    fetch('/locations/add', {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json",
            "X-Custom-Header": "ProcessImmediately"
        },
        body: JSON.stringify({
            place_id: this.id
        })
    })
}