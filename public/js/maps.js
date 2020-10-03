let mainMap;

function initMap() {
    mainMap = new google.maps.Map(document.getElementById("mainMap"), {
        center: { lat: 0, lng: 0 },
        zoom: 2
    });

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
        (position) => {
            const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            };
            mainMap.setCenter(pos);
            mainMap.setZoom(3);
        });
    };

    fetch("/api/bucket-list")
    .then((response) => response.json())
    .then((listData) => {
        console.log(listData);

        for (let i = 0; i < listData.length; i++) {
            console.log(listData[i].location);
            console.log(listData[i].id);
            if (listData[i].location) {
                const request = {
                    placeId: listData[i].location,
                    fields: ["name", "geometry"]
                };
                const infowindow = new google.maps.InfoWindow();
                const infowindowContent = document.getElementById(`infowindow-${listData[i].id}`);
                infowindow.setContent(infowindowContent);
                const service = new google.maps.places.PlacesService(map);
                service.getDetails(request, (place, status) => {
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        const marker = new google.maps.Marker({
                            mainMap,
                            position: place.geometry.location,
                        });
                        google.maps.event.addListener(marker, "click", function () {
                            infowindowContent.children.namedItem(`place-name-${listData[i].id}`).textContent = place.name;
                            infowindow.open(map, this);
                        });
                    }
                });
            }
        }
    });
}