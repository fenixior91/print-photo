/**
 * Created by developer on 26.10.16.
 */

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var AlbumSchema = Schema({
    _user: {
        type: Schema.ObjectId,
        ref: "User"
    },
    name: String,
    createdDate: Date,
    updatedDate: Date
});

var Album = mongoose.model("Album", AlbumSchema);

Album.findById = function(id) {
    return new Promise(function(resolve, reject) {
        Album.findOne( { _id: id }, function(error, album) {
            if (!error) {
                resolve(album);
            } else {
                reject(error);
            }
        });
    });
};

Album.findAllByUser = function(id) {
    return new Promise(function(resolve, reject) {
        Album.find({ _user: id }, albumsFound);

        function albumsFound(error, albums) {
            if (!error) {
                resolve(albums);
            } else {
                reject(error);
            }
        }
    });
};


module.exports = Album;