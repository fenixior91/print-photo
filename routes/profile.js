/**
 * Created by developer on 17.10.16.
 */

const express = require("express");
const api = express.Router();

module.exports = (passport) => {
    api.get("/", isLoggedIn, (req, res) => {
        res.render("profile.ejs", {
            user: req.user
        });
    });

    function isLoggedIn(req, res, next) {
        console.log(req.path);
        if (req.isAuthenticated()) {
            return next();
        }

        res.redirect("/");
    }

    return api;
}