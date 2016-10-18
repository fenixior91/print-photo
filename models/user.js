/**
 * Created by developer on 17.10.16.
 */

const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
const Schema = mongoose.Schema;

const UserSchema = Schema({
    local : {
        _id: Number,
        email: String,
        password: String,
        firstName: String,
        lastName: String,
        city: String,
        address: String,
        postalCode : String,
        role: Number,
        avatar: String,
        photos: [{
            type: Schema.ObjectId,
            ref: "Photo"
        }]
    },
});

UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

const User = mongoose.model('User', UserSchema);

module.exports = User;