/**
 * Created by developer on 17.10.16.
 */

const express = require("express");
const api = express.Router();

module.exports = (passport) => {
    api.get("/", (req, res) => {
        if (req.user) {
            res.render("index.ejs", {
                user: req.user
            });
        } else {
            res.redirect("/login");
        }
    });

    api.get("/login", (req, res) => {
        if (!req.user) {
            res.render("login.ejs", {
                message: req.flash("loginMessage")
            });
        } else {
            res.redirect("/");
        }
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