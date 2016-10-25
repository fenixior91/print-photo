/**
 * Created by developer on 18.10.16.
 */

var Photo = require("../models/photo");
var fs = require("fs");
var path = require("path");
var imageMagick = require("imagemagick");

var PhotoService = function() {
}

PhotoService.uploadPhoto = function(req, res) {
    return new Promise(function(resolve, reject) {
        var user = req.user;
        req.pipe(req.busboy);

        req.busboy.on("file", function(fieldName, file, fileName) {
            var filePath = user.local.uploads.photosSystemPath + path.sep + fileName;
            var fStream = fs.createWriteStream(filePath);

            if (fStream) {
                file.pipe(fStream);

                fStream.on("close", function(error) {
                    if (!error) {
                        req.extension = fileName.substring(fileName.lastIndexOf("."), fileName.length);
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

    function busyBoyOnFile() {
        return new Promise(function(resolve, reject) {

        });
    }

    function fileStreamOnClose() {
        return new Promise(function(resolve, reject) {

        });
    }
};

PhotoService.createThumbnailPhoto = function(req, res) {
    return new Promise(function(resolve, reject) {
        var src = req.user.local.uploads.photosSystemPath + path.sep + req.fileName;
        var dst = req.user.local.uploads.thumbnailsSystemPath + path.sep + "thumbnail_" + req.fileName;

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
        var fileName = removeFileExtension(req.fileName);

        var photo = new Photo({
            _creator: req.user._id,
            title: fileName,
            caption: "Default caption of " + fileName,
            alt: fileName,
            thumbnailSrc: req.user.local.uploads.thumbnailsClientPath + path.sep + "thumbnail_" + req.fileName,
            photoSrc: req.user.local.uploads.photosClientPath + path.sep + req.fileName,
            extension: req.extension
        });

        save(photo)
            .then(function(result) {
                resolve(res);
            })
            .catch(function(error) {
                reject(error);
            });
    });

    function removeFileExtension(fileName) {
        var endString = fileName.indexOf(".");

        return req.fileName.substr(0, endString);
    }

    function save(photo) {
        return new Promise(function(resolve, reject) {
            photo.save(function(error, photo) {
                if (!error) {
                    resolve(photo);
                } else {
                    reject(error);
                }
            });
        });
    }
};

PhotoService.findByUserId = function(id) {
    return new Promise(function(resolve, reject) {
        Photo.find( { _creator: id}, function(error, photos) {
            if (!error) {
                Photo.populate(photos, { path: "_creator" }, function(error, photos) {
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

PhotoService.removeById = function(req) {
    return new Promise(function(resolve, reject) {
        var id = req.body._id;

        Photo.remove({ _id: id }, function(error) {
            if (!error) {
                resolve(req);
            } else {
                reject(error);
            }
        });
    });
};

PhotoService.removeUploadedPhoto = function(req) {
    return new Promise(function(resolve, reject) {
        var sep = path.sep;
        var photoName = req.body.title;
        var photoSrc = req.user.local.uploads.photosSystemPath + sep + photoName;

        fs.unlink(photoSrc, function(error) {
            if (!error) {
                resolve(req);
            } else {
                reject(error);
            }
        });
    });
};

PhotoService.removeGeneratedThumbnail = function(req) {
    return new Promise(function(resolve, reject) {
        var photoName = req.body.title;
        var thumbnailSrc = req.user.local.uploads.thumbnailsSystemPath + path.sep + "thumbnail_" + photoName;

        fs.unlink(thumbnailSrc, function(error) {
            if (!error) {
                resolve("Photo removed!");
            } else {
                reject(error);
            }
        });
    });
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
            var thumbnail = "thumbnail_";
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