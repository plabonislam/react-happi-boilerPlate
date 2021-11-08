const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    created: {
        type: Date,
        default: Date.now,
    },
    updated: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("History",historySchema);