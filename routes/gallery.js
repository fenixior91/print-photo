/**
 * Created by developer on 16.10.16.
 */

const express = require("express");
const api = express.Router();
var Photo = require("../models/photo");
var User = require("../models/user");

var routesUtils = require("./routesUtils");

module.exports = (passport) => {
    api.get("/photos", function (req, res) {
        let user = req.user

        if (user) {
            Photo.findByUserId(user._id)
                .then(
                    (photos) => {
                        res.status(200).render("photos.ejs", {
                            status: "ok",
                            photos: photos
                        });
                    },
                    (error) => {
                        res.status(500).render("photos.ejs", {
                            status: "error",
                            error: error
                        });
                    }
                )
                .catch((error) => {
                    res.status(500).render("photos.ejs", {
                        status: "error",
                        error: error
                    });
                });

        } else {
            res.redirect("/login");
        }
    });

    api.get("/albums", function (req, res) {
        routesUtils.isUserLoggedIn(req, res, "albums", "/login");
    });

    api.get("/photo/add", function(req, res) {
        routesUtils.isUserLoggedIn(req, res, "add-photo.ejs", "/login");
    });

    api.post("/photo/add", function(req, res) {
        console.log("", req.user);
        User.findOne({_id: req.user._id}, function(err, user) {
            var photo = new Photo({
                _creator: req.user._id,
                name: req.body.name,
                description: req.body.description,
                uri: req.body.uri
            });

            user.local.photos.push(photo);

            photo.save(function(err) {
                res.json({
                    user: user,
                    photo, photo
                });
            });
        });
    });

    return api;
};