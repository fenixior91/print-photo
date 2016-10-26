/**
 * Created by developer on 26.10.16.
 */

var express = require("express");
var api = express.Router();
var AlbumService = require("../services/album");

module.exports = function(passport) {
    api.get("/albums", function(req, res) {
        if (req.user) {
            AlbumService.getAlbums(req, res);
        } else {
            res.redirect("/login");
        }
    });
};