//TEXT
const ideaText = document.querySelector('.idea');
//BUTTONS
const searchButton = document.querySelector('.new-idea');
const addToList = document.querySelector('.list');
const tryAgain = document.querySelector('.tryAgain');
const closeButton = document.querySelector('.close-button')
    //DIVS TO TOGGLE HIDE ON/OFF
const beforeSearch = document.querySelector('.start-search');
const afterSearch = document.querySelector('.search-results');

let newIdeas = ["Eat a muffin", "Wash your hands you dirty bird"];
let newActivity = [];


//Click Events

searchButton.onclick = function(e) {
    e.preventDefault();
    hideNSeek();
    newSearch();
}

closeButton.onclick = function() {
    hideNSeek();
}

// hiding showing divs on initial search
function hideNSeek() {
    $('.start-search').toggleClass('hidden');
    $('.search-results').toggleClass('hidden');
    $('.grid-2').toggleClass('hidden');
}

//search

function newSearch() {
    const randomActivity = newIdeas[Math.floor(Math.random() * newIdeas.length)];
    ideaText.innerHTML = randomActivity
}