const LocalStrategy = require('passport-local').Strategy;
const fs = require("fs");
const path = require("path");

const User = require('../models/user');
const UserService = require("../services/user");

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });

    passport.use('local-signup', new LocalStrategy({
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true

    }, (req, email, password, done) => {
            process.nextTick(() => {
                User.findOne({ 'local.email' :  email }, (err, user) => {
                    if (err)
                        return done(err);

                    if (user) {
                        return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                    } else {
                        var newUser = new User();
                        newUser.local.email  = email;
                        newUser.local.password = newUser.generateHash(password);
                        newUser.local.firstName = req.body.firstName;
                        newUser.local.lastName = req.body.lastName;
                        newUser.local.city = req.body.city;
                        newUser.local.address = req.body.address;
                        newUser.local.postalCode = req.body.postalCode;
                        newUser.local.role = 1;
                        newUser.local.avatar = "/images/common/user.png";

                        let atSign = email.replace(/\./g, "_").replace(/@/, "_at_");
                        let date = new Date().getTime();
                        let userDir = atSign + "_" + date;
                        let rootDir = process.env.PWD

                        newUser.local.uploads.uploadsSystemPath = rootDir + "/public/uploads/" + userDir;
                        newUser.local.uploads.uploadsClientPath =  "/uploads/" + userDir;
                        newUser.local.uploads.filesSystemPath = newUser.local.uploads.uploadsSystemPath + "/files";
                        newUser.local.uploads.filesClientPath = "/uploads/" + userDir + "/files";
                        newUser.local.uploads.photosSystemPath = newUser.local.uploads.uploadsSystemPath + "/photos";
                        newUser.local.uploads.photosClientPath = "/uploads/" + userDir + "/photos";
                        newUser.local.uploads.thumbnailsSystemPath = newUser.local.uploads.uploadsSystemPath + "/thumbnails";
                        newUser.local.uploads.thumbnailsClientPath = "uploads/" + userDir + "/thumbnails";

                        newUser.save((err, newUser) =>
                        {
                            if (!err) {
                                makeDirectories(newUser);

                                return done(null, newUser);
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
    }, (req, email, password, done) => {
        User.findOne({ 'local.email' :  email }, (err, user) => {
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
    let userDir = user.local.uploads.uploadsSystemPath;
    if (!fs.existsSync(userDir))
        fs.mkdirSync(userDir);

    let filesDir = user.local.uploads.filesSystemPath;
    if (!fs.existsSync(filesDir)) {
        fs.mkdirSync(filesDir);
    }

    let photosDir = user.local.uploads.photosSystemPath;
    if (!fs.existsSync(photosDir)) {
        fs.mkdirSync(photosDir);
    }

    let thumbnailsDir = user.local.uploads.thumbnailsSystemPath;
    if (!fs.existsSync(thumbnailsDir)) {
        fs.mkdirSync(thumbnailsDir);
    };
}
