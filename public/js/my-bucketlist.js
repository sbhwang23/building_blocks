// const newActivity = require("./search");

// $(document).ready(() => {
//     if (newActivity !== "") {
//         console.log("booyah")
//     } else {
//         console.log("suckah")
//     }
  
$(document).ready(() => {
    $.get("/api/user_data").then(data => {
        $(".user-name").text(`${data.username}'s Bucket List`);
    });
});