$(document).ready(() => {

    const loginForm = $("form.login");
    const emailInput = $("input#email-input");
    const passwordInput = $("input#password-input");


    loginForm.on("submit", event => {
        event.preventDefault();
        console.log('submitted')
        const userData = {
            email: emailInput.val().trim(),
            password: passwordInput.val().trim()
        };

        if (!userData.email || !userData.password) {
            return;
        }

        loginUser(userData.email, userData.password);
        emailInput.val("");
        passwordInput.val("");
    });

    function loginUser(email, password) {
        $.post("/api/login", {
                email: email,
                password: password
            })
            .then(() => {
                window.location.replace("/member");
                // If there's an error, log the error
            })
            .catch(err => {
                console.log(err);
            });
    };

    // function loginUser(email, password) {
    //     console.log("posting")
    //     $.get("/member", {
    //         email: email,
    //         password: password
    //     })
    //         .then(() => {
    //             window.location.replace("/member");
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         });
    // }
});