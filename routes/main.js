/**
 * Created by developer on 17.10.16.
 */

const express = require("express");
const api = express.Router();

module.exports = (passport) => {
    api.get("/", (req, res) => {
        res.render("index.ejs", {
            user: req.user
        });
    });

    api.get("/login", (req, res) => {
        if (!req.user) {
            res.render("login.ejs", {
                message: req.flash("loginMessage")
            });
        } else {
            res.redirect("/profile");
        }
    });

    api.post("/login", passport.authenticate("local-login", {
        successRedirect: "/profile",
        failureRedirect: "/login",
        failureFlash: true
    }));

    api.get("/signup", (req, res) => {
        res.render("signup.ejs", {
            message: req.flash("signupMessage")
        });
    });

    api.post("/signup", passport.authenticate("local-signup", {
        successRedirect: "/profile",
        failureRedirect: "/signup",
        failureFlash: true
    }));

    api.get("/logout", (req, res) => {
        req.logout();
        res.redirect("/");
    });

    return api;
};