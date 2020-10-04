const path = require("path");
const db = require("../models");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

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
    app.get("/map", isAuthenticated, (req, res) => {
        db.BucketList.findAll({
            raw: true,
            include: [db.User]
        }).then((results) => {
            res.render("maps", {
                style: "map.css",
                mapPoints: results
            });
        })
            
    });

    app.get("/mybucketlist/:id", (req, res) => {

        const userId = req.params.id;

        db.User.findOne({
            raw: true,
            where: {
                id: userId
            }
        }).then((userData) => {
            const username = userData.username;

            db.BucketList.findAll({
                raw: true,
                where: {
                    UserId: userId
                },
                include: [db.User]
            }).then((results) => {
                res.render("mybucketlist", {
                    style: "style.css",
                    username: username,
                    bucketListItems: results
                });
            });

        });

            
    });

    app.get("/newactivity", (req, res) => {
        res.render("new-activity", {
            style: "newactivity.css"
        });
    });
    app.get("/search", isAuthenticated,
        (req, res) => {
            res.render("search", {
                style: "search.css"
            });
        });
};

//const path = require("path");
//
//const isAuthenticated = require("../config/middleware/isAuthenticated");
//
//module.exports = function(app) {
//    //LANDING HOME PAGE where user can login OR JOIN
//    app.get("/", (req, res) => {
//        res.render("loginpage", {
//            style: "login.css"
//        });
//    });
//    //SIGN UP PAGE
//    app.get("/join", (req, res) => {
//        res.render("signuppage", {
//            style: "signup.css"
//        });
//    });
//    app.get("/member", //isAuthenticated,
//        (req, res) => {
//            res.render("member", {
//                style: "member.css"
//            });
//        });
//    app.get("/map", (req, res) => {
//        res.render("maps", {
//            style: "map.css"
//        });
//    });
//    app.get("/mybucketlist", (req, res) => {
//        res.render("mybucketlist", {
//            style: "mylist.css"
//        });
//    });
//    app.get("/newactivity", (req, res) => {
//        res.render("new-activity", {
//            style: "newactivity.css"
//        });
//    });
//    app.get("/search", (req, res) => {
//        res.render("search", {
//            style: "search.css"
//        });
//    });
//};