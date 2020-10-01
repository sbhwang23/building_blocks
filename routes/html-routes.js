const path = require("path");

const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {
    //LANDING HOME PAGE where user can login OR JOIN
    app.get("/", (req, res) => {
        res.render("loginpage", { 
            style: "login.css"
        });
    });
    //SIGN UP PAGE
    app.get("/join", (req, res) => {
        res.render("signuppage", {
            style: "signup.css"
        });
    });
    app.get("/member", //isAuthenticated,
     (req, res) => {
        res.render("member", {
            style: "style.css"
        });
    });
    app.get("/map", (req, res) => {
        res.render("maps", {
            style: "map.css"
        });
    });
    app.get("/mybucketlist", (req, res) => {
        res.render("mybucketlist", {
            style: "style.css"
        });
    });
    app.get("/newactivity", (req, res) => {
        res.render("new-activity", { 
            style: "style.css"
        });
    });
    app.get("/search", (req, res) => {
        res.render("search", {
            style: "search.css"
        });
    });
};