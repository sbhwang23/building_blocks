$(document).ready(() => {

    $("#submit").on("click", event => {
        event.preventDefault();
        const newBucketListItem = {
            title: $("#title").val().trim(),
            description: $("#description").val().trim(),
            category: $("input[name='category']:checked").val().trim(),
            collaborators: $("input[name='collaborators']:checked").val().trim(),
            location: $("#location").val().trim()
        };

        $.ajax("/api/bucket-list", {
            type: 'POST',
            data: newBucketListItem
        }).then(() => {
            location.reload();
        })

    })

});