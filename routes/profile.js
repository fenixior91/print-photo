/**
 * Created by developer on 17.10.16.
 */

var express = require("express");
var api = express.Router();

module.exports = function(passport) {
    api.get("/", isLoggedIn, function(req, res) {
        res.render("profile.ejs", {
            user: req.user
        });
    });

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }

        res.redirect("/");
    }

    return api;
}