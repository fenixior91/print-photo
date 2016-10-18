/**
 * Created by developer on 18.10.16.
 */

const mkdirp = require("mkdirp");
const User = require("../models/photo");

let UserService = () => {
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

UserService.save = (user) => {
    return new Promise((resolve, reject) => {
        user.save((err, user) => {
            if (err) {
                reject(err);
            } else {
                resolve(user);
            }
        });
    });
};

UserService.createFilesDirectory = (path) => {
    return new Promise((resolve, reject) => {

    });
};

UserService.isUserExists = (email) => {
    return new Promise((resolve, reject) => {
        User.findOne({ 'local.email' :  email }, (err, user) => {
            if (err) {
                reject(err);
            } else {
                resolve(user);
            }
        });
    });
}

function generateUserData(email, password, body) {
    return {
        email: email,
        password: password,
        firstName: body.firstName,
        lastName: body.lastName,
        city: body.city,
        address: body.address,
        postalCode: body.postalCode,
    };
}


module.exports = UserService;