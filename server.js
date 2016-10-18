/**
 * Created by developer on 16.10.16.
 */

const express = require("express");
const app = express();

const flash = require("connect-flash");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const configDB = require("./config/database");

const mongoose = require("mongoose");
mongoose.connect(configDB.url);

const passport = require("passport");
require("./config/passport")(passport);

app.set("port", process.env.PORT || 3000);
app.set("views", __dirname + "/public/views");
app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));

const mainRouter = require("./routes/main")(passport);
const profileRouter = require("./routes/profile")(passport);
const photosRouter = require("./routes/photos")(passport);

configServer();
configRoutes();

app.listen(app.get("port"), () => {
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
}

function configRoutes() {
    app.use("/", mainRouter);
    app.use("/profile", profileRouter);
    app.use("/photos", photosRouter);
}