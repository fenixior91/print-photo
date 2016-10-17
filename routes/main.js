/**
 * Created by developer on 17.10.16.
 */

const express = require("express");
const api = express.Router();
var routesUtils = require("./routesUtils");

module.exports = (passport) => {
    api.get("/", (req, res) => {
        routesUtils.isUserLoggedIn(req, res, "index.ejs", "/login");
    });

    api.get("/login", (req, res) => {
        routesUtils.isUserIsNotLoggedIn(req, res, "login.ejs", "/", "loginMessage");
    });

    api.post("/login", passport.authenticate("local-login", {
        successRedirect: "/",
        failureRedirect: "/login",
        failureFlash: true
    }));

    api.get("/signup", (req, res) => {
        res.render("signup.ejs", {
            message: req.flash("signupMessage")
        });
    });

    api.post("/signup", passport.authenticate("local-signup", {
        successRedirect: "/",
        failureRedirect: "/signup",
        failureFlash: true
    }));

    api.get("/logout", (req, res) => {
        req.logout();
        res.redirect("/login");
    });

    return api;
};