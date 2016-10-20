/**
 * Created by developer on 16.10.16.
 */

var express = require("express");
var api = express.Router();
var PhotoService = require("../services/photo");

module.exports = function(passport) {
    api.get("/", function (req, res) {
        var user = req.user

        if (user) {
            PhotoService.findByUserId(user.id).then(
                function(photos) {
                    res.status(200).render("photos/show", {
                        photos: photos,
                        user: user
                    });
                }
            )
        } else {
            res.redirect("/login");
        }
    });

    api.get("/new", function(req, res) {
        var user = req.user

        if (user) {
            res.status(200).render("photos/new", {
                user: user
            });

        } else {
            res.redirect("/login");
        }
    });

    api.post("/new", function(req, res) {
        var user = req.user;

        if (user) {
            PhotoService.uploadPhoto(req, res)
                .then(PhotoService.createThumbnailPhoto)
                .then(PhotoService.savePhoto)
                .then(
                    function(photo) {
                        res.status(200).json({
                            status: "ok",
                            message: "file uploaded"
                        })
                    });
        } else {
            res.redirect("/login");
        }
    });

    return api;
};