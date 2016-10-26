/**
 * Created by developer on 26.10.16.
 */

var Album = require("../models/album");
var Photo = require("../models/photo");
var path = require("path");

var AlbumService = function() {

};

AlbumService.createAlbum = function(req, res) {
    save()
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
    
    function save() {
        return new Promise(function(resolve, reject) {
            var album = new Album({
                _user: req.user._id,
                name: req.body.name,
                createdDate: new Date().getTime(),
                updatedDate: new Date().getTime()
            });

            album.save(albumSaved);

            function albumSaved(error, newAlbum) {
                if (!error)
                    resolve(newAlbum);
                else
                    reject(error);
            }
        });
    }
};

AlbumService.getAlbums = function(req, res) {
    Album.findAllByUser(req.user._id)
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

    function populate(albums) {
        return new Promise(function(resolve, reject) {
            var options = {
                path: "_user"
            };

            Album.populate(albums, options, populated);

            function populated(error, albums) {
                if (!error) {
                    resolve(albums);
                } else {
                    reject(false);
                }
            }
        });
    }
};

AlbumService.showAlbum = function(req, res) {
    return new Promise(function (resolve, reject) {
        Photo.findAllByAlbum(req.body._id)
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
            var options = {
                path: "_album"
            };

            Photo.populate(photos, options, populated);

            function populated(error, photos) {
                if (!error)
                    resolve(photos);
                else
                    reject(error);
            }
        }
    });
};

module.exports = AlbumService;