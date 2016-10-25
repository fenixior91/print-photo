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
    photoSrc: String,
    extension: String
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

module.exports = Photo;