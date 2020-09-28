const path = require("path");

const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
    //LANDING HOME PAGE where user can login OR JOIN
    app.get("/", (req, res) => {

        res.render("loginpage", { layout: "login" });
    });
    //SIGN UP PAGE
    app.get("/join", (req, res) => {
        res.render("signuppage", { layout: "signup" });
    });
    app.get("/member", (req, res) => {
        res.render("member", { layout: "main" });
    });
    app.get("/map", (req, res) => {
        res.render("maps", { layout: "activities" });
    });
    app.get("/mybucketlist", (req, res) => {
        res.render("mybucketlist", { layout: "activities" });
    });
    app.get("/newactivity", (req, res) => {
        res.render("new-activity", { layout: "activities" });
    });
    app.get("/search", (req, res) => {
        res.render("search", { layout: "activities" });
    });
};