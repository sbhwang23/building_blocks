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

const newIdeas = ["Eat a muffin", "Wash your hands you dirty bird"];
const newActivity = ["testtesttest"];

let listItemIds = [];

//GET BUCKETLIST ITEMS
$.get("/api/bucket-list").then((bucketList) => {
    bucketList.forEach(function(activity) {
        listItemIds.push(activity.id);
    })
})

//Click Events

discoverButton.onclick = function(e) {
    $("#what-if").addClass("hidden");
    $(".discover-results").addClass("hidden");
    const randomIndex = Math.floor(Math.random() * listItemIds.length);
    const randomId = listItemIds[randomIndex];
    $(`#discover-result-${randomId}`).toggleClass('hidden');
}

// discoverButton.onclick = function (e) {
//     e.preventDefault();
//     hideNSeek();
//     newDiscover();
// }

closeButtonArray.forEach(function(button) {
    button.onclick = function() {
        $(this).parent().parent().toggleClass('hidden');
    };
    $("#what-if").removeClass("hidden");
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