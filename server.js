/**
 * Created by developer on 16.10.16.
 */

var express = require("express");
var app = express();

var flash = require("connect-flash");
var morgan = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var session = require("express-session");
var configDB = require("./config/database")(app.get("env"));
var busboy = require("connect-busboy");

var mongoose = require("mongoose");
mongoose.connect(configDB);

var passport = require("passport");
require("./config/passport")(passport);

app.set("port", process.env.PORT || 3000);
app.set("views", __dirname + "/public/views");
app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));

var mainRouter = require("./routes/main")(passport);
var profileRouter = require("./routes/profile")(passport);
var photosRouter = require("./routes/photos")(passport);
var albumsRouter = require("./routes/albums")(passport);

configServer();
configRoutes();

app.listen(app.get("port"), function() {
    console.log("Application listen on port " + app.get("port"));
});

function configServer() {
    app.use(morgan("dev"));
    app.use(cookieParser());
    app.use(bodyParser());
    app.use(session({secret: "print_photo_secret_session_text"}));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());
    app.use(busboy());
}

function configRoutes() {
    app.use("/", mainRouter);
    app.use("/profile", profileRouter);
    app.use("/photos", photosRouter);
    app.use("/albums", albumsRouter);
}