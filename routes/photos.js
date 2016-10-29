/**
 * Created by developer on 16.10.16.
 */

var express = require("express");
var api = express.Router();
var PhotoService = require("../services/photo");

module.exports = function(passport) {
    api.get("/", function(req, res) {
        var user = req.user;

        if (user) {
            PhotoService.getImages(req, res);
        } else {
            res.redirect("/logout");
        }
    });

    api.post("/new", function(req, res) {
        var user = req.user;

        if (user) {
            PhotoService.createPhoto(req, res);
        } else {
            res.redirect("/login");
        }
    });

    api.post("/remove", function(req, res) {
        var user = req.user;

        if (user) {
            PhotoService.removePhoto(req, res);
        } else {
            res.redirect("/login");
        }
    });

    api.post("/edit", function(req, res) {
        var user = req.user;

        if (user) {
            PhotoService.editPhoto(req, res);
        } else {
            res.redirect("/login");
        }
    });

    api.post("/edit/all", function(req, res) {
        var user = req.user;

        if (user) {

        } else {
            res.redirect("/login");
        }
    });

    return api;
};