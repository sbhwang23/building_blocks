
const db = require("../models");
const passport = require("../config/passport");

module.exports = function (app) {

  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    res.json({
      // username: req.user.username,
      email: req.user.email,
      password: req.user.password
    });
  });

  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  app.post("/api/signup", (req, res) => {
    db.User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  app.get("/api/user_data", (req, res) => {
    if (!req.user) {

      res.json({});
    } else {

      res.json({
        username: req.user.username,
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  // app.post("/api/users", (req, res) => {
  //   db.User.create({
  //     username: req.body.username,
  //     email: req.body.email,
  //     password: req.body.password
  //   })
  //     .then(() => {
  //       res.redirect(307, "/");
  //     })
  //     .catch(err => {
  //       res.status(401).json(err);
  //     });
  // });

  // app.get("/api/users", (req, res) => {
  //   db.User.findAll({})
  //   .then((users) => {
  //     res.json(users);
  //   })
  // });

  // app.get("/api/users/:id", function(req, res) {
  //   db.User.findOne({
  //     where: {
  //       id: req.params.id
  //     },
  //     include: [db.BucketList]
  //   }).then(function(dbUser) {
  //     res.json(dbUser);
  //   });
  // });

  

  app.get("/api/bucket-list", (req, res) => {
    db.BucketList.findAll({})
      .then((list) => {
        res.json(list);
      });
  });

  app.post("/api/bucket-list", (req, res) => {
    db.BucketList.create({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      collaborators: req.body.collaborators,
      UserId: req.body.userId
    })
      .then(() => {
        // res.redirect("/member");
        res.end();
      })
      .catch(err => {
        res.status(401).json(err);
      })
  });
};

