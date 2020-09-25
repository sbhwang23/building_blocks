const express = require("express");

const router = express.Router();

// Import the model (job.js) to use its database functions.
//const job = require("../models/jobs.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
    //job.all(function(data) {
    //    const hbsObject = {
    //        jobs: data
    //    };
    //    console.log(hbsObject);
    res.render("index");
});
//});

// Export routes for server.js to use.
module.exports = router;


//router.post("/api/jobs", function(req, res) {
//  job.create([
//    "", ""
//  ], [
//    req.body., req.body.
//  ], function(result) {
//    // Send back the ID of the new quote
//    res.json({ id: result.insertId });
//  });
//});

//router.put("/api/jobs/:id", function(req, res) {
//  const condition = "id = " + req.params.id;
//
//  console.log("condition", condition);
//
//  job.update({
//    sleepy: req.body.sleepy
//  }, condition, function(result) {
//    if (result.changedRows == 0) {
//      // If no rows were changed, then the ID must not exist, so 404
//      return res.status(404).end();
//    } else {
//      res.status(200).end();
//    }
//  });
//});
//
//router.delete("/api/jobs/:id", function(req, res) {
//  const condition = "id = " + req.params.id;
//
//  job.delete(condition, function(result) {
//    if (result.affectedRows == 0) {
//      // If no rows were changed, then the ID must not exist, so 404
//      return res.status(404).end();
//    } else {
//      res.status(200).end();
//    }
//  });
//});