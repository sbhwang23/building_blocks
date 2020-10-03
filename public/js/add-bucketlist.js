// let map;
// let selectedLocation;

// function initMap() {
//     map = new google.maps.Map(document.getElementById("map"), {
//         center: { lat: 0, lng: 0 },
//         zoom: 2,
//         mapTypeControl: false
//     });

//     // Try HTML5 geolocation.
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(
//         (position) => {
//             const pos = {
//             lat: position.coords.latitude,
//             lng: position.coords.longitude,
//             };
//             map.setCenter(pos);
//             map.setZoom(6);
//         });
//     };

//     const input = document.getElementById("location");
//     const autocomplete = new google.maps.places.Autocomplete(input); 
//     // Bind the map's bounds (viewport) property to the autocomplete object,
//     // so that the autocomplete requests use the current map bounds for the
//     // bounds option in the request.

//     autocomplete.bindTo("bounds", map); // Set the data fields to return when the user selects a place.

//     autocomplete.setFields(["address_components", "geometry", "icon", "name"]);
//     const infowindow = new google.maps.InfoWindow();
//     const infowindowContent = document.getElementById("infowindow-content");
//     infowindow.setContent(infowindowContent);
//     const marker = new google.maps.Marker({
//         map,
//         anchorPoint: new google.maps.Point(0, -29),
//     });
//     autocomplete.addListener("place_changed", () => {
//         infowindow.close();
//         marker.setVisible(false);
//         const place = autocomplete.getPlace();
//         selectedLocation = place.geometry.location;
//         console.log(selectedLocation);

//         if (!place.geometry) {
//         // User entered the name of a Place that was not suggested and
//         // pressed the Enter key, or the Place Details request failed.
//         window.alert("No details available for input: '" + place.name + "'");
//         return;
//         } // If the place has a geometry, then present it on a map.

//         if (place.geometry.viewport) {
//         map.fitBounds(place.geometry.viewport);
//         } else {
//         map.setCenter(place.geometry.location);
//         map.setZoom(17); // Why 17? Because it looks good.
//         }
        
//         marker.setPosition(place.geometry.location);
//         marker.setVisible(true);
//         let address = "";

//         if (place.address_components) {
//         address = [
//             (place.address_components[0] &&
//             place.address_components[0].short_name) ||
//             "",
//             (place.address_components[1] &&
//             place.address_components[1].short_name) ||
//             "",
//             (place.address_components[2] &&
//             place.address_components[2].short_name) ||
//             "",
//         ].join(" ");
//         }

//         infowindowContent.children["place-icon"].src = place.icon;
//         infowindowContent.children["place-name"].textContent = place.name;
//         infowindowContent.children["place-address"].textContent = address;
//         infowindow.open(map, marker);
//     });
// };


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
    selectedCollaborators = "true";
});
collaboratorsInputFalse.addEventListener("click", () => {
    selectedCollaborators = "false";
});


// function setupClickListener(id, key, value) {
//     const radioButton = document.getElementById(id);
//     radioButton.addEventListener("click", () => {
//       key = value;
//     });
// }

// setupClickListener("adventure", selectedCategory, "adventure");
// setupClickListener("homebody", selectedCategory, "homebody");
// setupClickListener("create", selectedCategory, "create");
// setupClickListener("take-action", selectedCategory, "take-action");
// setupClickListener("other", selectedCategory, "other");


// setupClickListener("true", selectedCollaborators, "true");
// setupClickListener("false", selectedCollaborators, "false");


submitButton.onclick = function(e) {
    
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
            location: "selectedLocation",
            userId: userId
        };

        console.log(newActivity);
        console.log(JSON.stringify(newActivity));

        fetch("/api/bucket-list", {
            method: "POST",
            body: JSON.stringify(newActivity),
            headers: {"Content-type": "application/json; charset=UTF-8"}
            })
            .then(response => response.json()) 
            .then(json => console.log(json))
            .catch(err => console.log(err));
        });
};