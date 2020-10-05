
const db = require("../models");
const passport = require("../config/passport");

module.exports = function (app) {

  // LOGIN
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    res.json({
      // username: req.user.username,
      email: req.user.email,
      password: req.user.password
    });
  });

  // LOGOUT
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // SIGN UP
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

  // USER DATA
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

  // GET ALL BUCKET LIST ITEMS
  app.get("/api/bucket-list", (req, res) => {
    db.BucketList.findAll({})
      .then((list) => {
        res.json(list);
      });
  });

  // GET BUCKET LIST ITEM BY ID
  app.get("/api/bucket-list/:id", (req, res) => {
    const id = req.params.id;

    db.BucketList.findOne({
      raw: true,
      where: {
        id: id
      }
    }).then((activity) => {
      // console.log(activity);
      res.json(activity);
    });
  });

  // GET BUCKET LIST ITEMS SEEKING COLLABORATORS
  app.get("/api/collab", (req, res) => {
    // const collab = req.params.collab;
    db.BucketList.findAll({
      // raw: true,
      where: {
        collaborators: true
      }
    })
      .then((list) => {
        res.json(list);
      });
  });

  // POST BUCKET LIST ITEM
  app.post("/api/bucket-list", (req, res) => {
    // console.log(req.body);
    db.BucketList.create({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      collaborators: req.body.collaborators,
      location_id: req.body.location_id,
      location_name: req.body.location_name,
      UserId: req.body.userId
    })
      .then((data) => {
        // res.redirect("/member");
        res.json(data);
      })
      .catch(err => {
        res.status(401).json(err);
      })
  });

  // DELETE BUCKET LIST ITEM
  app.delete("/api/bucket-list/:id", (req, res) => {
    const listItemId = req.params.id;

    db.BucketList.destroy({
      where: {
        id: listItemId
      }
    }).then(() => {
      console.log("removed from BucketList");
      db.SavedBucketList.destroy({
        where: {
          bucketListId: listItemId
        }
      }).then((data) => {
        console.log("removed from SavedBucketList");
        res.json(data);
      })
      
    })
  });

  // GET SAVED BUCKET LIST ITEMS
  app.get("/api/saved-bucket-list", (req, res) => {
    db.SavedBucketList.findAll({})
    .then((data) => {
      res.json(data);
    })
  })

  // POST SAVED BUCKET LIST ITEM
  app.post("/api/saved-bucket-list", (req, res) => {
    // console.log(req.body);
    db.SavedBucketList.create({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      collaborators: req.body.collaborators,
      location_id: req.body.location_id,
      location_name: req.body.location_name,
      UserId: req.body.userId,
      bucketListId: req.body.bucketListId
    }).then((data) => {
      res.json(data);
    })
    .catch(err => {
      res.status(401).json(err);
    })
  });

};

