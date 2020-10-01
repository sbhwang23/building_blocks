$(document).ready(() => {

    const signUpForm = $("form.signup");
    const emailInput = $("input#email-input");
    // const firstInput = $("input#firstname-input");
    // const lastInput = $("input#lastname-input");
    const passwordInput = $("input#password-input");


    signUpForm.on("submit", event => {
        event.preventDefault();
        const userData = {
            // firstname: firstInput.val().trim(),
            // lastname: lastInput.val().trim(),
            email: emailInput.val().trim(),
            password: passwordInput.val().trim()
        };

        if (!userData.email || !userData.password) {
            return;
        }

        signUpUser(userData.email, userData.password);
        emailInput.val("");
        passwordInput.val("");
    });


    function signUpUser(email, password) {
        console.log("signup")
        $.post("/api/signup", {
            email: email,
            password: password
        })
            .then(() => {
                window.location.replace("/member");

            })
            .catch(handleLoginErr);
    }

    function handleLoginErr(err) {
        $("#alert .msg").text(err.responseJSON);
        $("#alert").fadeIn(500);
    }
});