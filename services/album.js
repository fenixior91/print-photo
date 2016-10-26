/**
 * Created by developer on 26.10.16.
 */

var Album = require("../models/album");
var path = require("path");

var AlbumService = function() {

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