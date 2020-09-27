// Import the ORM to create functions that will interact with the database.
const orm = require("../config/orm.js");

//const job = {
//    all: function(cb) {
//        orm.all("jobs", function(res) {
//            cb(res);
//        });
//    },
//    // The constiables cols and vals are arrays.
//    create: function(cols, vals, cb) {
//        orm.create("jobs", cols, vals, function(res) {
//            cb(res);
//        });
//    },
//    update: function(objColVals, condition, cb) {
//        orm.update("jobs", objColVals, condition, function(res) {
//            cb(res);
//        });
//    },
//    delete: function(condition, cb) {
//        orm.delete("jobs", condition, function(res) {
//            cb(res);
//        });
//    }
//};

// Export the database functions for the controller (jobsController.js).
// module.exports = job;