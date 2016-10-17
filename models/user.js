/**
 * Created by developer on 17.10.16.
 */

const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");

var userSchema = mongoose.Schema({
    local : {
        email: String,
        password: String,
        firstName: String,
        lastName: String,
        city: String,
        address: String,
        postalCode : String,
        role: Number
    },
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);