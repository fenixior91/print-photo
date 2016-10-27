/**
 * Created by developer on 26.10.16.
 */

var express = require("express");
var api = express.Router();
var AlbumService = require("../services/album");

module.exports = function(passport) {
    api.get("/", function(req, res) {
        if (req.user) {
            AlbumService.getAlbums(req, res);
        } else {
            res.redirect("/login");
        }
    });

    api.get("/album/:id", function(req, res) {
        if (req.user) {
            AlbumService.getAlbum(req, res);
        } else {
            res.redirect("/login");
        }
    });

    api.post("/create", function(req, res) {
        if (req.user) {
            AlbumService.createAlbum(req, res);
        } else {
            res.redirect("/login");
        }
    });

    api.post("/remove", function(req, res) {
        if (req.user) {
            AlbumService.removeAlbum(req, res);
        } else {
            res.redirect("/login");
        }
    })

    return api;
};