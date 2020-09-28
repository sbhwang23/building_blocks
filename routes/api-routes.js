
const db = require("../models");
const passport = require("../config/passport");

module.exports = function (app) {

  app.post("/", passport.authenticate("local"), (req, res) => {

    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  app.post("/api/signup", (req, res) => {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(() => {
        res.redirect(307, "/");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  app.post("/api/bucket-list", (req, res) => {
    db.BucketList.create({
      userId: req.body.userId,
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      collaborators: req.body.collaborators,
    })
      .then(() => {
        res.end();
      })
      .catch(err => {
        res.status(401).joson(err);
      })
  });


  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  app.get("/api/user_data", (req, res) => {
    if (!req.user) {

      res.json({});
    } else {

      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });
};

