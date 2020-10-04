let invisibleMap;

function initMap() {
    invisibleMap = new google.maps.Map(document.getElementById("invisibleMap"), {
        center: { lat: 0, lng: 0 },
        zoom: 2
    });
    fetch("/api/user_data")
    .then((response) => response.json())
    .then((userData) => {
        document.querySelector(".user-name").textContent = userData.username;
        const userId = userData.id;

        fetch(`/api/bucket-list/${userId}`)
        .then((response) => response.json())
        .then((bucketList) => {
            for (let i = 0; i < bucketList.length; i++) {
                if (bucketList[i].location) {
                    const request = {
                        placeId: bucketList[i].location,
                        fields: ["name"]
                    };
                    const service = new google.maps.places.PlacesService(invisibleMap);
                    service.getDetails(request, (place, status) => {
                        if (status == google.maps.places.PlacesServiceStatus.OK) {
                            document.getElementById(`location-${bucketList[i].id}`).textContent = place.name;
                        };
                    });
                }
            }

        })
    });

    const deleteButtonArray = document.querySelectorAll(".deleteBtn");

    deleteButtonArray.forEach(function(listItem) {
        listItem.addEventListener("click", () => {
            const listItemId = listItem.dataset.id;
            fetch(`/api/bucket-list/${listItemId}`, {
                method: "DELETE"
            })
            .then((response) => response.json())
            .then(() => {
                location.reload();
            })
        })

    })
}