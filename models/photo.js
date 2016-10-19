/**
 * Created by developer on 17.10.16.
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PhotoSchema = Schema({
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


const Photo = mongoose.model('Photo', PhotoSchema);

module.exports = Photo;