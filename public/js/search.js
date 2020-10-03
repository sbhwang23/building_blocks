//TEXT
const ideaText = document.querySelector('.idea');
//BUTTONS
const searchButton = document.querySelector('.new-idea');
const listButton = document.querySelector('.list');
const doOverButton = document.querySelector('.tryAgain');
const closeButton = document.querySelector('.close-button')
//DIVS TO TOGGLE HIDE ON/OFF
const beforeSearch = document.querySelector('.start-search');
const afterSearch = document.querySelector('.search-results');

const newIdeas = ["Eat a muffin", "Wash your hands you dirty bird"];
const newActivity = [];

//Click Events

searchButton.onclick = function (e) {
    e.preventDefault();
    hideNSeek();
    newSearch();
}

closeButton.onclick = function () {
    hideNSeek();
    ideaText.innerHTML = ""
}

doOverButton.onclick = function (e) {
    e.preventDefault();
    newSearch();
}

listButton.onclick = function () {
    const x = ideaText.innerHTML;
    newActivity.push(x);
    window.location.href = '/newactivity'
}

// hiding showing divs on initial search
function hideNSeek() {
    $('.start-search').toggleClass('hidden');
    $('.search-results').toggleClass('hidden');
    $('.grid-2').toggleClass('hidden');
}
//search

function newSearch() {
    ideaText.innerHTML = ""
    const randomActivity = newIdeas[Math.floor(Math.random() * newIdeas.length)];
    ideaText.innerHTML = randomActivity
}

//module.exports = newActivity[0];