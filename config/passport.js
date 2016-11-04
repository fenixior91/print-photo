var LocalStrategy = require('passport-local').Strategy;
var fs = require("fs");
var path = require("path");

var User = require('../models/user');
var UserService = require("../services/user");

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use('local-signup', new LocalStrategy({
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true

    },
    function(req, email, password, done) {
            process.nextTick(function() {
                User.findOne({ 'local.email' :  email }, function(err, user) {
                    if (err)
                        return done(err);

                    if (user) {
                        return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                    } else {
                        var newUser = new User();
                        newUser.local.email  = email;
                        newUser.local.password = newUser.generateHash(password);
                        newUser.local.login = req.body.login;
                        newUser.local.role = 1;
                        newUser.local.avatar = path.sep + "images" + path.sep + "common" + path.sep + "user.png";

                        var atSign = email.replace(/\./g, "_").replace(/@/, "_at_");
                        var date = new Date().getTime();
                        var userDir = atSign + "_" + date;
                        var rootDir = process.env.PWD

                        newUser.local.uploads.uploadsSystemPath = rootDir + path.sep + "public" + path.sep + "uploads" + path.sep + userDir;
                        newUser.local.uploads.uploadsClientPath =  path.sep + "uploads" + path.sep + userDir;
                        newUser.local.uploads.filesSystemPath = newUser.local.uploads.uploadsSystemPath + path.sep + "files";
                        newUser.local.uploads.filesClientPath = path.sep + "uploads" + path.sep + userDir + path.sep + "files";
                        newUser.local.uploads.photosSystemPath = newUser.local.uploads.uploadsSystemPath + path.sep + "photos";
                        newUser.local.uploads.photosClientPath = path.sep + "uploads" + path.sep + userDir + path.sep + "photos";
                        newUser.local.uploads.thumbnailsSystemPath = newUser.local.uploads.uploadsSystemPath + path.sep + "thumbnails";
                        newUser.local.uploads.thumbnailsClientPath = path.sep + "uploads" + path.sep + userDir + path.sep + "thumbnails";

                        newUser.save(function(err, newUser)
                        {
                            if (!err) {
                                makeDirectories(newUser)
                                    .then(function(result) {
                                        console.log(result);
                                        return done(null, newUser);
                                    })
                                    .catch(function(error) {
                                        console.log(error);
                                        return;
                                    });
                            }
                        });
                    }
                });
            });
    }));


    passport.use('local-login', new LocalStrategy({
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true
    }, function(req, email, password, done) {
        User.findOne({ 'local.email' :  email }, function(err, user) {
            if (err)
                return done(err);

            if (!user)
                return done(null, false, req.flash('loginMessage', 'No user found.'));

            if (!user.validPassword(password))
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));

            return done(null, user);
            });
    }));
};

function makeDirectories(user) {
    return new Promise(function(resolve, reject) {
        makeUploadsSystemPath()
            .then(makeFilesSystemPath)
            .then(makePhotosSystemPath)
            .then(makeThumbnailsSystemPath)
            .then(function(result) {
                resolve(result);
            })
            .catch(function(error) {
                reject(error);
            });

        function makeUploadsSystemPath() {
            return new Promise(function(resolve, reject) {
                var userDir = user.local.uploads.uploadsSystemPath;

                fs.exists(userDir, function(error) {
                    if (!error) {
                        fs.mkdir(userDir, function(error) {
                            if (!error)
                                resolve("Uploads Directory created.");
                            else
                                reject(error);
                        });
                    }
                    else
                        reject(error);
                })
            });
        }

        function makeFilesSystemPath() {
            return new Promise(function(resolve, reject) {
                var filesDir = user.local.uploads.filesSystemPath;

                fs.exists(filesDir, function(error) {
                    if (!error)
                        fs.mkdir(filesDir, function(error) {
                            if (!error)
                                resolve("Files Directory created.");
                            else
                                reject(error);
                        });
                    else
                        reject(error);
                });
            });
        }

        function makePhotosSystemPath() {
            return new Promise(function(resolve, reject) {
                var photosDir = user.local.uploads.photosSystemPath;

                fs.exists(photosDir, function(error) {
                    if (!error) {
                        fs.mkdir(photosDir, function(error) {
                            if (!error)
                                resolve("Photos Directory created.");
                            else
                                reject(error);
                        });
                    }

                    else
                        reject(error);
                });
            });
        }

        function makeThumbnailsSystemPath() {
            return new Promise(function(resolve, reject) {
                var thumbnailsDir = user.local.uploads.thumbnailsSystemPath;

                fs.exists(thumbnailsDir, function(error) {
                    if (!error) {
                        fs.mkdir(thumbnailsDir, function(error) {
                            if (!error)
                                resolve("Thumbnails Directory created.");
                            else
                                reject(error);
                        });
                    }
                    else
                        reject(error);
                });
            });
        }
    });
}
