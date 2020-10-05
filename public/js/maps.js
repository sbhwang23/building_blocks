let mainMap;

function setIcon(category) {
    let imageIcon;
    switch(category) {
        case "adventure":
            imageIcon = "http://maps.gstatic.com/mapfiles/ridefinder-images/mm_20_purple.png";
            break;
        case "homebody": 
            imageIcon = "http://maps.gstatic.com/mapfiles/ridefinder-images/mm_20_blue.png";
            break;
        case "create":
            imageIcon = "http://maps.gstatic.com/mapfiles/ridefinder-images/mm_20_orange.png";
            break;
        case "take action":
            imageIcon = "http://maps.gstatic.com/mapfiles/ridefinder-images/mm_20_green.png";
            break;
        default:
            imageIcon = "http://maps.gstatic.com/mapfiles/ridefinder-images/mm_20_white.png";
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