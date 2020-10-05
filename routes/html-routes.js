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
                }
            }).then((userList) => {
                console.log(userList);
                console.log(typeof userList);
                db.SavedBucketList.findAll({
                    raw: true,
                    where: {
                        UserId: userId
                    }
                }).then((savedList) => {
                    console.log(savedList);
                    console.log(typeof savedList);
                    res.render("mybucketlist", {
                        style: "style.css",
                        username: username,
                        bucketListItems: userList.concat(savedList)
                    });
                })
            });
        });
    });

    
    


    app.get("/newactivity", (req, res) => {
        res.render("new-activity", {
            style: "newactivity.css"
        });
    });

    app.get("/discover", isAuthenticated, (req, res) => {
        db.BucketList.findAll({
            raw: true,
        }).then((list) => {
            res.render("search", {
                style: "search.css",
                bucketListItems: list
            });
        })
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