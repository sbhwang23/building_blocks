let mainMap;

function setIcon(category) {
    let imageIcon;
    switch(category) {
        case "adventure":
            imageIcon = "http://maps.google.com/mapfiles/kml/pal2/icon12.png";
            break;
        case "homebody": 
            imageIcon = "http://maps.google.com/mapfiles/kml/pal2/icon28.png";
            break;
        case "create":
            imageIcon = "http://maps.google.com/mapfiles/kml/pal4/icon47.png";
            break;
        case "take action":
            imageIcon = "http://maps.google.com/mapfiles/kml/pal3/icon27.png";
            break;
        default:
            imageIcon = "http://maps.google.com/mapfiles/kml/pal2/icon13.png";
    }
    return imageIcon;
}

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
        for (let i = 0; i < listData.length; i++) {
            const activityCategory = listData[i].category;
            if (listData[i].location_id) {
                const request = {
                    placeId: listData[i].location_id,
                    fields: ["geometry"]
                };
                const infowindow = new google.maps.InfoWindow();
                const infowindowContent = document.getElementById(`infowindow-${listData[i].id}`);
                infowindow.setContent(infowindowContent);
                const service = new google.maps.places.PlacesService(mainMap);
                service.getDetails(request, (place, status) => {
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        const marker = new google.maps.Marker({
                            map: mainMap,
                            position: place.geometry.location,
                            icon: setIcon(activityCategory)
                        });
                        google.maps.event.addListener(marker, "click", function () {
                            infowindow.open(mainMap, this);
                        });
                        marker.setVisible(true);
                    }
                });
            }
        }
    });
};