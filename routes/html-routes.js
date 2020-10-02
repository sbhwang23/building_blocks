const path = require("path");
const db = require("../models");

const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {
    //LANDING HOME PAGE where user can login OR JOIN
    app.get("/", (req, res) => {
        if (req.isAuthenticated()) {
            res.render("member", {
                style: "member.css"
            });
        } else {
            res.render("loginpage", {
                style: "login.css"
            });
        }
    });
    //SIGN UP PAGE
    app.get("/join", (req, res) => {
        res.render("signuppage", {
            style: "signup.css"
        });
    });
    app.get("/member", isAuthenticated,
        (req, res) => {
            res.render("member", {
                style: "member.css"
            });
        });
    app.get("/map", isAuthenticated,
        (req, res) => {
            res.render("maps", {
                style: "map.css"
            });
    });
    
    app.get("/mybucketlist/:id", (req, res) => {
        
        const userId = req.params.id;
        console.log(userId);

        db.BucketList.findAll({
            raw: true,
            where: {
                UserId: userId
            }
        }).then((results) => {
            res.render("mybucketlist", {
                style: "style.css",
                bucketListItems: results
            });
        });

        // res.render("mybucketlist", {
        //     style: "style.css"
        // });
    });

    app.get("/newactivity", (req, res) => {
        res.render("new-activity", {
            style: "style.css"
        });
    });
    app.get("/search", isAuthenticated,
        (req, res) => {
            res.render("search", {
                style: "search.css"
            });
        });
};