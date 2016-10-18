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

                        newUser.local.uploads.uploadsSystemPath = process.env.PWD + "/public/uploads/" + atSign + "_" + date;
                        newUser.local.uploads.uploadsClientPath =  "/uploads/" + atSign + "_" + date;

                        newUser.save((err, newUser) =>
                        {
                            if (!err) {
                                let dir = newUser.local.uploads.uploadsSystemPath;
                                if (!fs.existsSync(dir))
                                    fs.mkdirSync(dir);

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
