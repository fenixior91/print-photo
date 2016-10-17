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

    api.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile', // redirect to the secure profile section
        failureRedirect: '/login', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
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