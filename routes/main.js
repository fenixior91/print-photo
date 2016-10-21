/**
 * Created by developer on 17.10.16.
 */

var express = require("express");
var path = require("path");
var api = express.Router();
var routesUtils = require("./routesUtils");

module.exports = function(passport) {
    api.get("/", function(req, res) {
        var user = req.user;

        if (user) {
            res.status(200).render("main", {
                user: user,
                rootUrl: process.env.PWD,
                pathSeparator: path.sep
            });

        } else {
            res.redirect("/login");
        }
    });

    api.get("/login", function(req, res) {
        routesUtils.isUserIsNotLoggedIn(req, res, "login.ejs", "/", "loginMessage");
    });

    api.post("/login", passport.authenticate("local-login", {
        successRedirect: "/",
        failureRedirect: "/login",
        failureFlash: true
    }));

    api.get("/signup", function(req, res) {
        res.render("signup.ejs", {
            message: req.flash("signupMessage")
        });
    });

    api.post("/signup", passport.authenticate("local-signup", {
        successRedirect: "/",
        failureRedirect: "/signup",
        failureFlash: true
    }));

    api.get("/logout", function(req, res) {
        req.logout();
        res.redirect("/login");
    });

    return api;
};