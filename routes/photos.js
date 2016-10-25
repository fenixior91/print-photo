/**
 * Created by developer on 16.10.16.
 */

var express = require("express");
var api = express.Router();
var PhotoService = require("../services/photo");

module.exports = function(passport) {
    api.get("/images", function(req, res) {
        var user = req.user;

        if (user) {
            PhotoService.findByUserId(user.id)
                .then(function(photos) {
                    res.status(200).json({
                        status: "ok",
                        photos: photos
                    });
                })
                .catch(function(error) {
                    res.json({
                        error: error
                    });
                });

        } else {
            res.redirect("/logout");
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
                        });
                    });
        } else {
            res.redirect("/login");
        }
    });

    api.post("/remove", function(req, res) {
        var user = req.user;

        if (user) {
            PhotoService.removeById(req)
                .then(PhotoService.removeUploadedPhoto)
                .then(PhotoService.removeGeneratedThumbnail)
                .then(function(result) {
                    res.json({
                        status: "ok",
                        message: result
                    });
                })
                .catch(function(error) {
                    res.json({
                        status: "error",
                        error: error
                    });
                });
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