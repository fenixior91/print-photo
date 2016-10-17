/**
 * Created by developer on 17.10.16.
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let PhotoSchema = Schema({
    _creator: {
        type: Schema.ObjectId,
        ref: "User"
    },
    name: String,
    description: String,
    uri: String
});

let Photo = mongoose.model('Photo', PhotoSchema);

Photo.findByUserId = (id) => {
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

module.exports = Photo;