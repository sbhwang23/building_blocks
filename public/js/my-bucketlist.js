let invisibleMap;



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
    });
});
