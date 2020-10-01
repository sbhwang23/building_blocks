$(document).ready(() => {

    // $.get("/api/user_data").then(data => {
    //     $(".member-name").text(data.email);
    // });

    $(".image-square-1").on("click", (event) => {
        event.preventDefault();
        window.location.replace("/mybucketlist");
    });

    $(".image-square-2").on("click", (event) => {
        event.preventDefault();
        window.location.replace("/newactivity");
    });

    $(".image-square-3").on("click", (event) => {
        event.preventDefault();
        window.location.replace("/search");
    });

    $(".image-square-4").on("click", (event) => {
        event.preventDefault();
        window.location.replace("/map");
    });
});