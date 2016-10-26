/**
 * Created by developer on 17.10.16.
 */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PhotoSchema = Schema({
    _user: {
        type: Schema.ObjectId,
        ref: "User"
    },
    _album: {
        type: Schema.ObjectId,
        ref: "Album"
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

Photo.findAllByUser = function(id) {
    return new Promise(function(resolve, reject) {
        Photo.find({ _user: id }, photosFound);

        function photosFound(error, photos) {
            if (!error) {
                resolve(photos);
            } else {
                reject(error);
            }
        }
    });
};

Photo.findAllByAlbum = function(id) {
    return new Promise(function(resolve, reject) {
        Photo.find({ _album: id }, photosFound);

        function photosFound(error, photos) {
            if (!error)
                resolve(photos);
            else
                reject(error);
        }
    });
}

Photo.removeById = function(id) {
    return new Promise(function (resolve, reject) {
        Photo.remove({ _id: id}, function(error) {
            if (!error) {
                resolve(true);
            } else {
                reject(error);
            }
        });
    });
};

module.exports = Photo;