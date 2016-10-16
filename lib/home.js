/**
 * Created by developer on 16.10.16.
 */

const express = require("express");
const api = express.Router();

api.get("/", (req, res) => {
    res.render("home/home.ejs");
});

module.exports = api;