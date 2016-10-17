/**
 * Created by developer on 17.10.16.
 */

const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    local : {
        email: String,
        password: String,
        firstName: String,
        lastName: String,
        city: String,
        address: String,
        postalCode : String,
        role: Number,
        photos: [{
            type: Schema.ObjectId,
            ref: "Photo"
        }]
    },
});

userSchema.methods.generateHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = (password) => {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);