$(document).ready(() => {
$("#list").on("click", (event) => {
    event.preventDefault();
    $.get("/api/user_data").then(data => {
        const userId = data.id;
        console.log(userId);
        window.location.replace(`/mybucketlist/${userId}`);
    });
});
});