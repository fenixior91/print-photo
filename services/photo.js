/**
 * Created by developer on 18.10.16.
 */

var Photo = require("../models/photo");
var fs = require("fs");
var imageMagick = require("imagemagick");

var PhotoService = () => {
}

PhotoService.uploadPhoto = function(req, res) {
    return new Promise(function(resolve, reject) {
        var user = req.user;

        req.pipe(req.busboy);
        req.busboy.on("file", function(fieldName, file, fileName) {
            var filePath = user.local.uploads.photosSystemPath + "/" + fileName;
            var fStream = fs.createWriteStream(filePath);

            if (fStream) {
                file.pipe(fStream);

                fStream.on("close", function(error) {
                    if (!error) {
                        req.fileName = fileName;
                        resolve(req, res)
                    } else {
                        reject("Cannot upload photo!");
                    }
                });
            } else {
                reject("Cannot upload photo!");
            }
        });
    });
};

PhotoService.createThumbnailPhoto = function(req, res) {
    return new Promise(function(resolve, reject) {
        var src = req.user.local.uploads.photosSystemPath + "/" + req.fileName;
        var dst = req.user.local.uploads.thumbnailsSystemPath + "/thumbnail_" + req.fileName;

        imageMagick.resize({
            srcPath : src,
            dstPath: dst,
            strip : false,
            width : "150!",
            height : "150!"
        }, function(error) {
            if(!error) {
                resolve(req, res);
            } else {
                reject(error);
            }
        });
    });
};

PhotoService.savePhoto = function(req, res) {
    return new Promise(function(resolve, reject) {
        let photo = new Photo({
            _creator: req.user._id,
            title: req.fileName,
            caption: "Default caption of " + req.fileName,
            alt: req.fileName,
            thumbnailSrc: req.user.local.uploads.thumbnailsClientPath + "/thumbnail_" + req.fileName,
            photoSrc: req.user.local.uploads.photosClientPath + "/" + req.fileName,
        });

        photo.save(function(error, photo) {
            if (!error) {
                resolve(req, res);
            } else {
                reject("Cannot save photo!");
            }
        });
    });
};

PhotoService.findByUserId = (id) => {
    return new Promise((resolve, reject) => {
        Photo.find( { _creator: id}, (error, photos) => {
            if (!error) {
                Photo.populate(photos, { path: "_creator" }, (error, photos) => {
                    if (!error) {
                        resolve(photos);
                    } else {
                        resolve(error);
                    }
                });
            } else {
                resolve(error);
            }
        });
    });
};

module.exports = PhotoService;