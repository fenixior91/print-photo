/**
 * Created by developer on 18.10.16.
 */

const Photo = require("../models/photo");
const UserService = require("../services/user");
const fs = require("fs");

let PhotoService = () => {
}

PhotoService.findByUserId = (id) => {
    return new Promise((resolve, reject) => {
        findByCreator(id)
            .then(populateByCreator)
            .then(function(photos) {
                if (photos)
                    resolve(photos);
            })
            .catch(function(error) {
                reject(error);
            });
    });
};

PhotoService.uploadPhoto = (req, res, user) => {
    return new Promise(function(resolve, reject) {
        req.pipe(req.busboy);

        busyBoyOnFile(req, user)
            .then(fileStreamOnClose)
            .then(function(resovled) {
                resolve(req, res);
            })
            .catch(function(error) {
                reject(error);
            });
    });
};

PhotoService.savePhoto = function(req, res) {
    return new Promise(function(resolve, reject) {
        let photo = new Photo({
            _creator: req.user._id,
            title: req.fileName,
            caption: "Caption of " + req.fileName,
            src: req.user.local.uploads.uploadsClientPath + "/" + req.fileName,
            alt: req.fileName
        });

        save(photo).then(
                function (photo) {
                    resolve(photo);
            })
            .catch(
                function (error) {
                    reject(error);
                }
            );
    });


};

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

function busyBoyOnFile(req, user) {
    return new Promise(function(resolve, reject) {
        req.busboy.on("file", function(fieldName, file, fileName) {
            req.fileName = fileName;

            let filePath = user.local.uploads.uploadsSystemPath + "/" + fileName;
            let fStream = fs.createWriteStream(filePath);

            if (fStream) {
                file.pipe(fStream);
                resolve(fStream);
            } else {
                reject("No file stream");
            }
        });
    });
}

function fileStreamOnClose(fStream) {
    return new Promise(function(resolve, reject) {
        fStream.on("close", function(error) {
            if (!error) {
                resolve(fStream)
            } else {
                reject(error);
            }
        })
    });
}

function findByCreator(id) {
    return new Promise((resolve, reject) => {
        Photo.find( { _creator: id}, (err, photos) => {
            if (err) {
                reject(err);
            } else {
                resolve(photos);
            }
        });
    });
}

function populateByCreator(photos) {
    return new Promise((resolve, reject) => {
        Photo.populate(photos, { path: "_creator" }, (err, photos) => {
            if (err) {
                reject(err);
            } else {
                resolve(photos);
            }
        });
    });
}

module.exports = PhotoService;