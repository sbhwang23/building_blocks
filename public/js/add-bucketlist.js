let newActivityMap;
let selectedLocation;

function initMap() {
    newActivityMap = new google.maps.Map(document.getElementById("newActivityMap"), {
        center: { lat: 0, lng: 0 },
        zoom: 2,
        mapTypeControl: false
    });

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                newActivityMap.setCenter(pos);
                newActivityMap.setZoom(6);
            });
    };

    const input = document.getElementById("location");
    const autocomplete = new google.maps.places.Autocomplete(input);
    // Bind the map's bounds (viewport) property to the autocomplete object,
    // so that the autocomplete requests use the current map bounds for the
    // bounds option in the request.

    autocomplete.bindTo("bounds", newActivityMap); // Set the data fields to return when the user selects a place.

    autocomplete.setFields(["address_components", "geometry", "icon", "name", "place_id"]);
    const infowindow = new google.maps.InfoWindow();
    const infowindowContent = document.getElementById("infowindow-content");
    infowindow.setContent(infowindowContent);
    const marker = new google.maps.Marker({
        newActivityMap,
        anchorPoint: new google.maps.Point(0, -29),
    });
    autocomplete.addListener("place_changed", () => {
        infowindow.close();
        marker.setVisible(false);
        const place = autocomplete.getPlace();
        selectedLocation_id = place.place_id;
        selectedLocation_name = place.name;

        if (!place.geometry) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            window.alert("No details available for input: '" + place.name + "'");
            return;
        } // If the place has a geometry, then present it on a map.

        if (place.geometry.viewport) {
            newActivityMap.fitBounds(place.geometry.viewport);
        } else {
            newActivityMap.setCenter(place.geometry.location);
            newActivityMap.setZoom(17); // Why 17? Because it looks good.
        }

        marker.setPosition(place.geometry.location);
        marker.setVisible(true);
        let address = "";

        if (place.address_components) {
            address = [
                (place.address_components[0] &&
                    place.address_components[0].short_name) ||
                "",
                (place.address_components[1] &&
                    place.address_components[1].short_name) ||
                "",
                (place.address_components[2] &&
                    place.address_components[2].short_name) ||
                "",
            ].join(" ");
        }

        infowindowContent.children["place-icon"].src = place.icon;
        infowindowContent.children["place-name"].textContent = place.name;
        infowindowContent.children["place-address"].textContent = address;
        infowindow.open(newActivityMap, marker);
    });
};


const submitButton = document.querySelector("#submit");

const titleInput = document.querySelector("#title");
const descriptionInput = document.querySelector("#description");
const categoryInputAdventure = document.querySelector("#adventure");
const categoryInputHomebody = document.querySelector("#homebody");
const categoryInputCreate = document.querySelector("#create");
const categoryInputTakeAction = document.querySelector("#take-action");
const categoryInputOther = document.querySelector("#other");
const collaboratorsInputTrue = document.querySelector("#true");
const collaboratorsInputFalse = document.querySelector("#false");

let selectedCategory;
let selectedCollaborators;

categoryInputAdventure.addEventListener("click", () => {
    selectedCategory = "adventure";
});
categoryInputHomebody.addEventListener("click", () => {
    selectedCategory = "homebody";
});
categoryInputCreate.addEventListener("click", () => {
    selectedCategory = "create";
});
categoryInputTakeAction.addEventListener("click", () => {
    selectedCategory = "take action";
});
categoryInputOther.addEventListener("click", () => {
    selectedCategory = "other";
});

collaboratorsInputTrue.addEventListener("click", () => {
    selectedCollaborators = true;
});
collaboratorsInputFalse.addEventListener("click", () => {
    selectedCollaborators = false;
});

submitButton.onclick = function (e) {

    e.preventDefault();

    fetch("/api/user_data")
    .then((response) => response.json())
    .then((userData) => {
        const userId = userData.id;

        const newActivity = {
            title: titleInput.value,
            description: descriptionInput.value,
            category: selectedCategory,
            collaborators: selectedCollaborators,
            location_id: selectedLocation_id,
            location_name: selectedLocation_name,
            userId: userId
        };
        // console.log(newActivity);
        // console.log(JSON.stringify(newActivity));

        fetch("/api/bucket-list", {
            method: "POST",
            body: JSON.stringify(newActivity),
            headers: {"Content-type": "application/json; charset=UTF-8"}
            })
            .then(response => response.json()) 
            .then(() => {
                titleInput.value = "";
                descriptionInput.value = "";
                categoryInputAdventure.checked = false;
                categoryInputHomebody.checked = false;
                categoryInputCreate.checked = false;
                categoryInputTakeAction.checked = false;
                categoryInputOther.checked = false;
                collaboratorsInputTrue.checked = false;
                collaboratorsInputFalse.checked = false;
                window.location.replace(`/mybucketlist/${userId}`);
            });
        
    });
};