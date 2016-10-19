/**
 * Created by developer on 17.10.16.
 */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PhotoSchema = Schema({
    _creator: {
        type: Schema.ObjectId,
        ref: "User"
    },
    title: String,
    alt: String,
    caption: String,
    thumbnailSrc: String,
    photoSrc: String
});


var Photo = mongoose.model('Photo', PhotoSchema);

module.exports = Photo;