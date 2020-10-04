$(document).ready(() => {

    $.get("/api/user_data").then(data => {
        $(".user-name").text(data.username);
    });

    $(".image-square-1").on("click", (event) => {
        event.preventDefault();
        $.get("/api/user_data").then(data => {
            const userId = data.id;
            window.location.replace(`/mybucketlist/${userId}`);
        });
    });

    $(".image-square-2").on("click", (event) => {
        event.preventDefault();
        window.location.replace("/newactivity");
    });

    $(".image-square-3").on("click", (event) => {
        event.preventDefault();
        window.location.replace("/discover");
    });

    $(".image-square-4").on("click", (event) => {
        event.preventDefault();
        window.location.replace("/map");
    });
});