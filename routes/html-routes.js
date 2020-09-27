const path = require("path");
//const express = require('express')
//const app = express()


const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
    app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "../views/login.hbs"));
        //if (req.user) {
        //    res.redirect("/members");
        //}
        //res.sendFile(path.join(__dirname, "../public/js/signup.html"));
    });

    app.get("/login", (req, res) => {

        if (req.user) {
            res.redirect("/members");
        }
        res.sendFile(path.join(__dirname, "../public/js/login.html"));
    });

    app.get("/members", isAuthenticated, (req, res) => {
        res.sendFile(path.join(__dirname, "../public/js/members.html"));
    });
};