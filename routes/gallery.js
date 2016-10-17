/**
 * Created by developer on 16.10.16.
 */

const express = require("express");
const api = express.Router();

module.exports = (passport) => {
    api.get("/", (req, res) => {
        res.render("gallery.ejs");
    });

    api.get("/photo/:id", (req, res) => {
        res.render("gallery.ejs");
    });

    return api;
};