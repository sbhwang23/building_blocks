const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const passport = require("./config/passport");
const path = require("path");

const PORT = process.env.PORT || 8080;
const db = require("./models");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

require("./routes/html-routes")(app);
require("./routes/api-routes.js")(app);

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.get('/', (req, res) => {
    res.render('index');
});


db.sequelize.sync().then(() => {
   app.listen(PORT, () => {
       console.log(
           "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
           PORT,
           PORT
       );
   });
});

// app.listen(PORT, () => {
//     console.log(
//         "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
//         PORT,
//         PORT
//     );
// });