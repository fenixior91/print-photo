/**
 * Created by developer on 17.10.16.
 */

var mongoose = require("mongoose");
var bcrypt = require("bcrypt-nodejs");
var Schema = mongoose.Schema;

var UserSchema = Schema({
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
        uploads: {
            uploadsSystemPath: String,
            uploadsClientPath: String,
            filesSystemPath: String,
            filesClientPath: String,
            photosSystemPath: String,
            photosClientPath: String,
            thumbnailsSystemPath: String,
            thumbnailsClientPath: String
        },
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