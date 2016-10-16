/**
 * Created by developer on 16.10.16.
 */

const express = require("express");
const app = express();
const homeApi = require("./lib/home");
const galleryApi = require("./lib/gallery");

app.set("port", process.env.PORT || 3000);
app.set("views", __dirname + "/public/views");
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use("/", homeApi);
app.use("/gallery", galleryApi);

app.listen(app.get("port"), () => {
    console.log("Application listen on port " + app.get("port"));
});