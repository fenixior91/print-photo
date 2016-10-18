/**
 * Created by developer on 18.10.16.
 */

const Photo = require("../models/photo");

let PhotoService = () => {
}

PhotoService.findByUserId = (id) => {
    return new Promise((resolve, reject) => {
        findByCreator(id)
            .then(populateByCreator)
            .then((photos) => {
                if (photos) {
                    resolve(photos);
                } else {
                    reject("");
                }
            });
    });
};

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