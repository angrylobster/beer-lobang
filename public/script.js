window.onload = () => {
    enableLogout();
    // autocomplete(document.getElementById("myInput"), beers);
}
var API_KEY = 'AIzaSyC-tEAh56qJBnYr7WTsvWyPqa1G9lRPpCc';
var SINGAPORE = {
    zoom: 13,
    center: {
        lat: 1.3,
        lng: 103.851959
    }
};
var markers = [];
var map, service, searchBox;

function initMap() {
    // Center the map at Singapore
    map = new google.maps.Map(document.getElementById('map'), SINGAPORE);
    // Create a search box and link it to the map
    searchBox = new google.maps.places.SearchBox(document.getElementById('search-input'));
    // Align the search box to the top/center of the map
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(document.getElementById('search-input'));
    // Allow search box to search based on where the user is looking
    map.addListener('bounds_changed', function () {
        searchBox.setBounds(map.getBounds());
    });

    loadSavedLocations();
    // Attach an event listener that defines how the searchBox reacts to searches
    searchBox.addListener('places_changed', initializeSearchBox);
}

function initializeSearchBox(){
    var places = searchBox.getPlaces();
    if (places.length == 0) {
        return;
    }
    // Clear out the old markers.
    markers.forEach(marker => {
        marker.setMap(null);
    });

    // For each place, set the icon, marker and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(place => {
        if (!place.geometry) {
            console.log("Returned place contains no geometry");
            return;
        }

        // Create a marker for each place, with a specified icon.
        let marker = createMarker(place, {
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
        });

        // Add click listener for each marker, and attach the infoWindow object to it.
        marker.addListener('click', () => {
            google.maps.event.addListener(infoWindow, 'domready', () => {
                autocomplete(document.getElementById(place.place_id), beers);
            })
            infoWindow.open(map, marker);
        })

        var infoWindow = createInfoWindow(place);

        markers.push(marker);

        if (place.geometry.viewport) {
            // Only geocodes have viewport.
            bounds.union(place.geometry.viewport);
        } else {
            bounds.extend(place.geometry.location);
        }
    });
    map.fitBounds(bounds);
}

function loadSavedLocations() {
    // Load the service which gets location information from Google based on place_id
    service = new google.maps.places.PlacesService(map);
    if (savedLocations) {
        savedLocations.forEach(location => {
            service.getDetails({
                placeId: location.place_id
            }, (result, status) => {
                if (status != google.maps.places.PlacesServiceStatus.OK) {
                    alert(status);
                    return;
                }
                var marker = createMarker(result);
                result.isSavedLocation = true;
                var infoWindow = createInfoWindow(result);
                marker.addListener('click', () => {
                    infoWindow.open(map, marker);
                });
            });
        })
    }
}

function createMarker(obj, iconObj){
    return new google.maps.Marker({
        map: map,
        title: obj.name,
        icon: iconObj,
        position: obj.geometry.location
    })
}

function createInfoWindow(place) {
    // Create a custom infoWindow object here. Use the 'content' key to determine <html> data.
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
    place.photos ? photoURL = place.photos[0].getUrl(photoSettings) : photoURL = "";

    let buttonHTML;

    if (place.isSavedLocation) {
        buttonHTML = `
        <form method="POST" action="/locations/delete/${document.body.querySelector("#map").getAttribute('userid')}/${place.place_id}?_method=DELETE">
            <input type="submit" value="Delete"/>
        </form>
        `
    } else {
        buttonHTML = ` 
        <form autocomplete="off" method="POST" action="/locations/add/${place.place_id}">
            <div class="autocomplete" style="width:100px">
                <input id="${place.place_id}" type="text" name="beer" placeholder="Name of Beer">
                <input type="text" name="price" placeholder="Price">
            </div>
            <input type="submit" value="Save This Location"/>
        </form>
        `
    }

    return `
    <div style="width:200px; text-align:center">
        <img src=${photoURL}></img>
        <h5>${place.name}</h5>
        <a href='${place.url}'><p>${place.formatted_address}</p></a>
        ${buttonHTML}
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

function enableLogout(){
    if (document.cookie.includes('loggedIn=true')) {
        let logoutButton = document.body.querySelector('#logout-button');
        logoutButton.addEventListener('click', () => {
            document.cookie.split(";").forEach(cookie => {
                document.cookie = cookie.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
            });
            location.reload();
        })
    }
}

function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function (e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) {
            return false;
        }
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                /*make the matching letters bold:*/
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function (e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName("input")[0].value;
                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on thwindow.onload*/
                if (x) x[currentFocus].clickwindow.onload
            }
        }
    });

    function addActive(x) {
        /*a function to classify an item as window.onload
        if (!x) return false;
        /*start by removing the "active" clawindow.onload*/
        removeActive(x);
        if (currentFocus >= x.length) currenwindow.onload
        if (currentFocus < 0) currentFocus =window.onload
        /*add class "autocomplete-active":*/window.onload
        x[currentFocus].classList.add("autocomplete-active");
    }

    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }

    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}