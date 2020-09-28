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
        console.log("posting")
        $.post("/", {
            email: email,
            password: password
        })
            .then(() => {
                window.location.replace("/member");
            })
            .catch(err => {
                console.log(err);
            });
    }
});