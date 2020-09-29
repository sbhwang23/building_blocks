const express = require("express");
const session = require("express-session");
const passport = require("./config/passport");
const path = require("path");

const PORT = process.env.PORT || 8080;
const db = require("./models");

// Creating express app and configuring middleware needed for authentication
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.static("/public"));
app.use(express.static(path.join(__dirname, "public")));

// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

// Requiring our routes
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

// Set Handlebars.
const handlebars = require("express-handlebars");

app.set("view engine", "hbs");

app.engine("hbs", handlebars({
    layoutsDir: `${__dirname}/views/layouts`,
    extname: 'hbs'
}));

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(
            "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
            PORT,
            PORT
        );
    });
});














































//const express = require("express");
//const session = require("express-session");
//const exphbs = require("express-handlebars");
//const passport = require("./config/passport");
//
//const PORT = process.env.PORT || 8080;
//const db = require("./models");
//
//const app = express();
//app.use(express.urlencoded({ extended: true }));
//app.use(express.json());
////app.use(express.static(path.join(__dirname, 'public')));
//
//app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
//app.use(passport.initialize());
//app.use(passport.session());
//
//require("./routes/html-routes.js")(app);
//require("./routes/api-routes.js")(app);
//
//app.engine("handlebars", exphbs({ defaultLayout: "main" }));
//app.set("view engine", "handlebars");
//
//app.get('/', (req, res) => {
//    res.render('index');
//});
//
//app.listen(PORT, () => {
//    console.log("listening at 8080");
//})
//
////db.sequelize.sync().then(() => {
////   app.listen(PORT, () => {
////       console.log(
////           "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
////           PORT,
////           PORT
////       );
////   });
////});
//
//// app.listen(PORT, () => {
////     console.log(
////         "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
////         PORT,
////         PORT
////     );
//// });