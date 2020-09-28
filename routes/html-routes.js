const path = require("path");
//const express = require('express')
//const app = express()
//var exphbs = require("express-handlebars");

//app.engine("handlebars", exphbs({ defaultLayout: "main" }));
//app.set("view engine", "handlebars");

const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
    //LANDING HOME PAGE where user can login OR JOIN
    app.get("/", (req, res) => {

        res.render("loginpage", { layout: "login" });
        //res.sendFile(path.join(__dirname, "../views/login.handlebars"));
        //if (req.user) {
        //    res.redirect("/members");
        //}
        //res.sendFile(path.join(__dirname, "../public/js/signup.html"));
    });
    //SIGN UP PAGE
    app.get("/join", (req, res) => {
        res.render("loginpage", { layout: "signup" });
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
    //app.get("/login", (req, res) => {
    //
    //    if (req.user) {
    //        res.redirect("/members");
    //    }
    //    res.sendFile(path.join(__dirname, "../public/js/login.html"));
    //});

    //app.get("/members", isAuthenticated, (req, res) => {
    //    //    res.sendFile(path.join(__dirname, "../public/js/members.html"));
    //    //});
};