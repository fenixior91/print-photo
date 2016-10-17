/**
 * Created by developer on 17.10.16.
 */

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const photoSchema = new Schema({
    _creator: {
        type: Number,
        ref: "User"
    },

    name: String,
    description: String,
    uri: String
});

module.exports = mongoose.model('Photo', photoSchema);