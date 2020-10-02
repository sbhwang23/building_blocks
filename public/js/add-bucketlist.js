$(function() {

    $(".create-form").on("submit", (event) => {
        event.preventDefault();

        $.get("/api/user_data").then(data => {
            const userId = data.id;

            const newBucketListItem = {
                title: $("#title").val().trim(),
                description: $("#description").val().trim(),
                category: $("input[name='category']:checked").val().trim(),
                collaborators: $("input[name='collaborators']:checked").val().trim(),
                location: $("#location").val().trim(),
                userId: userId
            };
    
            $.post("/api/bucket-list", newBucketListItem)
            .then(() => {
                console.log("Is it...")
                $("#title").val("");
                $("#description").val("");
                $("input[name='category']:checked").val("");
                $("input[name='collaborators']:checked").val("");
                $("#location").val("");
                console.log("...working?")
                window.location.replace("/mybucketlist");
            });
            
        });

        

    });

});