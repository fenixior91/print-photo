/**
 * Created by developer on 16.10.16.
 */

const express = require("express");
const fs = require("fs");
const api = express.Router();
const PhotoService = require("../services/photo");


module.exports = (passport) => {
    api.get("/", function (req, res) {
        let user = req.user

        if (user) {
            PhotoService.findByUserId(user.id).then(
                (photos) => {
                    res.status(200).render("photos/show.ejs", {
                        photos: photos,
                        user: user
                    });
                }
            )
        } else {
            res.redirect("/login");
        }
    });

    api.get("/new", (req, res) => {
        let user = req.user

        if (user) {
            res.status(200).render("photos/new.ejs", {
                user: user
            });

        } else {
            res.redirect("/login");
        }
    });

    api.post("/new", function(req, res) {
        let user = req.user;

        if (user) {
            PhotoService.uploadPhoto(req, res, user)
                .then(PhotoService.savePhoto)
                .then(
                    function(resolve) {
                        res.status(200).json({status: "ok", message: "file uploaded"});
                    }
                )
                .catch(function(error) {
                    res.json({
                        error: error
                    });
                });
        } else {
            res.redirect("/login");
        }
    });

    api.get("/edit", (req, res) => {
        let user = req.user

        if (user) {
            res.status(200).render("photos/edit.ejs", {
                user: user
            });
        } else {
            res.redirect("/login");
        }
    });



    api.post("/photo/add", function(req, res) {
        console.log("", req.user);

    });

    return api;
};