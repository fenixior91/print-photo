/**
 * Created by developer on 18.10.16.
 */

var mkdirp = require("mkdirp");
var User = require("../models/photo");

var UserService = function() {
}

UserService.findByUserId = function(id) {
    return new Promise(function(resolve, reject) {
        User.findOne({_id: id}, function(error, user) {
            if (!error) {
                console.log("NOT ERROR", user);
                resolve(user);
            } else {
                console.log("ERROR");
                reject(error);
            }
        });
    });
};

UserService.save = function(user) {
    return new Promise(function(resolve, reject) {
        user.save(function(err, user) {
            if (err) {
                reject(err);
            } else {
                resolve(user);
            }
        });
    });
};

UserService.isUserExists = function(email) {
    return new Promise(function(resolve, reject) {
        User.findOne({ 'local.email' :  email }, function(err, user) {
            if (err) {
                reject(err);
            } else {
                resolve(user);
            }
        });
    });
}


module.exports = UserService;