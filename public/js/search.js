//TEXT
const ideaText = document.querySelector('.idea');
//BUTTONS
const discoverButton = document.querySelector('#new-idea');
const listButton = document.querySelector('.list');
const doOverButton = document.querySelector('.tryAgain');
// const closeButton = document.querySelector('.close-button')
const closeButtonArray = document.querySelectorAll('.close-button');
const discoverResultsArray = document.querySelectorAll('.discover-results');
//DIVS TO TOGGLE HIDE ON/OFF
const beforeDiscover = document.querySelector('.start-discover');
const afterDiscover = document.querySelector('.discover-results');

// const newIdeas = ["Eat a muffin", "Wash your hands you dirty bird"];
// const newActivity = [];

const listItemIds = [];
let userId;

// GET USER ID
$.get("/api/user_data").then((userData) => {
    userId = userData.id;
})

//GET BUCKETLIST ITEM IDs
$.get("/api/collab").then((bucketList) => {
    console.log(bucketList);
    bucketList.forEach(function(activity) {
        listItemIds.push(activity.id);
    })
})

//Click Events

// NEW IDEA BUTTON
discoverButton.onclick = function(e) {
    $("#what-if").addClass("hidden");
    $(".discover-results").addClass("hidden");
    const randomIndex = Math.floor(Math.random() * listItemIds.length);
    const randomId = listItemIds[randomIndex];
    console.log(randomId);
    $(`#discover-result-${randomId}`).toggleClass('hidden');
}

// discoverButton.onclick = function (e) {
//     e.preventDefault();
//     hideNSeek();
//     newDiscover();
// }

// CLOSE BUTTON
closeButtonArray.forEach(function(button) {
    button.onclick = function() {
        $(this).parent().parent().toggleClass('hidden');
        $("#what-if").removeClass("hidden");
    };
    
});

// ADD TO LIST BUTTON
$(".list").on("click", function() {
    let listItemId = $(this).attr("data-id");

    $.get(`/api/bucket-list/${listItemId}`)
    .then((data) => {
        // console.log(data);
        $.post("/api/saved-bucket-list", {
            title: data.title,
            description: data.description,
            category: data.category,
            collaborators: JSON.parse(data.collaborators),
            location_id: data.location_id,
            location_name: data.location_name,
            userId: JSON.parse(userId)
        })
        .then(() => {
            console.log("activity saved");
        }).catch(err => {
            console.log(err);
        });
    });


    
});

// closeButton.onclick = function(e) {
//     $(this).parent().parent().toggleClass('hidden');
// }

// closeButton.onclick = function () {
//     hideNSeek();
//     ideaText.innerHTML = ""
// }

// doOverButton.onclick = function (e) {
//     e.preventDefault();
//     newDiscover();
// }

// listButton.onclick = function () {
//     const x = ideaText.innerHTML;
//     newActivity.push(x);
//     window.location.href = '/newactivity'
// }

// hiding showing divs on initial search
// function hideNSeek() {
//     $('.start-discover').toggleClass('hidden');
//     $('.discover-results').toggleClass('hidden');
//     $('.grid-2').toggleClass('hidden');
// }
//search

// function newDiscover() {
//     ideaText.innerHTML = ""
//     const randomActivity = newIdeas[Math.floor(Math.random() * newIdeas.length)];
//     ideaText.innerHTML = randomActivity
// }

// exports.newActivityTitle = newActivity;