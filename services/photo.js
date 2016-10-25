/**
 * Created by developer on 18.10.16.
 */

var Photo = require("../models/photo");
var fs = require("fs");
var path = require("path");
var imageMagick = require("imagemagick");
var thumbnail = "thumbnail_";

var PhotoService = function() {
}

PhotoService.getImages = function(req, res) {
    Photo.findAllByCreator(req.user._id)
        .then(populate)
        .then(function(result) {
            res.status(200).json({
                status: "ok",
                data: result
            });
        })
        .catch(function(error) {
            res.status(200).json({
                status: "error",
                error: error
            });
        });

    function populate(photos) {
        return new Promise(function(resolve, reject) {
            var options = {
                path: "_creator"
            };

            Photo.populate(photos, options, populated);

            function populated(error, photos) {
                if (!error) {
                    resolve(photos);
                } else {
                    reject(false);
                }
            }
        });
    }
};

PhotoService.createPhoto = function(req, res) {
    uploadPhoto()
        .then(generateThumbnail)
        .then(save)
        .then(function(result) {
            res.status(200).json({
                status: "ok",
                data: result
            })
        })
        .catch(function(error) {
            res.status(200).json({
                status: "error",
                error: error
            });
        });

    function uploadPhoto() {
        return new Promise(function (resolve, reject) {
            var user = req.user;
            req.pipe(req.busboy);

            req.busboy.on("file", function (fieldName, file, fileName) {
                var filePath = user.local.uploads.photosSystemPath + path.sep + fileName;
                var fStream = fs.createWriteStream(filePath);

                if (fStream) {
                    file.pipe(fStream);

                    fStream.on("close", function (error) {
                        if (!error) {
                            req.extension = fileName.substring(fileName.lastIndexOf("."), fileName.length);
                            req.fileName = fileName.substring(0, fileName.lastIndexOf("."));
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
    }

    function generateThumbnail() {
        return new Promise(function (resolve, reject) {
            var src = req.user.local.uploads.photosSystemPath + path.sep + req.fileName + req.extension;
            var dst = req.user.local.uploads.thumbnailsSystemPath + path.sep + thumbnail + req.fileName + req.extension;
            var options = {
                srcPath: src,
                dstPath: dst,
                strip: false,
                width: "150!",
                height: "150!"
            };

            imageMagick.resize(options, resize);

            function resize(error) {
                if (!error) {
                    resolve(req, res);
                } else {
                    reject(error);
                }
            }
        });
    }

    function save() {
        return new Promise(function (resolve, reject) {
            var photo = new Photo({
                _creator: req.user._id,
                title: req.fileName,
                caption: "Default caption of " + req.fileName,
                alt: req.fileName,
                thumbnailSrc: req.user.local.uploads.thumbnailsClientPath + path.sep + thumbnail + req.fileName + req.extension,
                photoSrc: req.user.local.uploads.photosClientPath + path.sep + req.fileName + req.extension,
                extension: req.extension
            });

            photo.save(afterSave);

            function afterSave(error, savedPhoto) {
                if (!error) {
                    resolve(savedPhoto);
                } else {
                    reject(error);
                }
            }
        });
    }
};

PhotoService.removePhoto = function(req, res) {
    Photo.findById(req.body._id)
        .then(removePhoto)
        .then(removeThumbnail)
        .then(remove)
        .then(function (result) {
            res.status(200).json({
                status: "ok",
                data: {}
            });
        })
        .catch(function(error) {
            res.status(200).json({
                status: "error",
                error: error
            });
        });

    function removePhoto(photo) {
        return new Promise(function (resolve, reject) {
            var photoSrc = req.user.local.uploads.photosSystemPath + path.sep + photo.title + photo.extension;

            fs.unlink(photoSrc, function (error) {
                if (!error) {
                    resolve(photo);
                } else {
                    reject(error);
                }
            });
        });
    }

    function removeThumbnail(photo) {
        return new Promise(function (resolve, reject) {
            var thumbnail = "thumbnail_";
            var thumbnailSrc = req.user.local.uploads.thumbnailsSystemPath + path.sep + thumbnail + photo.title + photo.extension;

            fs.unlink(thumbnailSrc, function (error) {
                if (!error) {
                    resolve(photo);
                } else {
                    reject(error);
                }
            });
        });
    }

    function remove(photo) {
        return new Promise(function(resolve, reject) {
            photo.remove(function(error) {
                if (!error) {
                    resolve(true);
                } else {
                    reject(false);
                }
            });
        });
    }
};


PhotoService.editPhoto = function(req, res) {
    Photo.findById(req.body._id)
        .then(renamePhoto)
        .then(renameThumbnail)
        .then(edit)
        .then(function(photo) {
            res.status(200).json({
                status: "ok",
                data: photo
            });
        })
        .catch(function (error) {
            res.status(200).json({
                status: "error",
                error: error
            });
        });

    function renamePhoto(photo) {
        return new Promise(function(resolve, reject) {
            var oldFileName = photo.title;
            var newFileName = req.body.title;
            var ext = photo.extension;

            var oldPath = req.user.local.uploads.photosSystemPath + path.sep + oldFileName + ext;
            var newPath = req.user.local.uploads.photosSystemPath + path.sep + newFileName + ext;

            fs.rename(oldPath, newPath, function(error) {
                if (!error) {
                    resolve(photo);
                } else {
                    reject(error);
                }
            });
        });
    }

    function renameThumbnail(photo) {
        return new Promise(function(resolve, reject) {
            var oldFileName = thumbnail + photo.title;
            var newFileName = thumbnail + req.body.title;
            var ext = photo.extension;

            var oldPath = req.user.local.uploads.thumbnailsSystemPath + path.sep + oldFileName + ext;
            var newPath = req.user.local.uploads.thumbnailsSystemPath + path.sep + newFileName + ext;

            fs.rename(oldPath, newPath, function(error) {
                if (!error) {
                    resolve(photo);
                } else {
                    reject(error);
                }
            });
        });
    }

    function edit(photo) {
        return new Promise(function(resolve, reject) {
            photo.title = req.body.title || "";
            photo.alt = req.body.alt || "";
            photo.caption = req.body.caption || "";
            photo.photoSrc = req.user.local.uploads.photosClientPath + path.sep + photo.title + photo.extension;
            photo.thumbnailSrc = req.user.local.uploads.thumbnailsClientPath + path.sep + thumbnail + photo.title + photo.extension;

            photo.save(function(error, updatedPhoto) {
                if (!error) {
                    resolve(updatedPhoto);
                } else {
                    reject(error);
                }
            });
        });
    }
};

module.exports = PhotoService;