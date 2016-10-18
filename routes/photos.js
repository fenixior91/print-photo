/**
 * Created by developer on 16.10.16.
 */

const express = require("express");
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



    // api.post("/photo/add", function(req, res) {
    //     console.log("", req.user);
    //     User.findOne({_id: req.user._id}, function(err, user) {
    //         var photo = new Photo({
    //             _creator: req.user._id,
    //             name: req.body.name,
    //             description: req.body.description,
    //             uri: req.body.uri
    //         });
    //
    //         user.local.photos.push(photo);
    //
    //         photo.save(function(err) {
    //             res.json({
    //                 user: user,
    //                 photo, photo
    //             });
    //         });
    //     });
    // });

    return api;
};