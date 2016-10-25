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

Photo.findById = function(id) {
    return new Promise(function(resolve, reject) {
        Photo.findOne({ _id: id }, function(error, photo) {
            if (!error) {
                resolve(photo);
            } else {
                reject(error);
            }
        });
    });
};

Photo.update = function (photo, params) {
    return new Promise(function(resolve, reject) {
        photo.title = params.title;
        photo.alt = params.alt;
        photo.caption = params.caption;

        photo.save(function(error, updatedPhoto) {
            if (!error) {
                resolve(updatedPhoto);
            } else {
                reject(error);
            }
        });
    });
};

module.exports = Photo;