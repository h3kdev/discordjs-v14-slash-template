const mongoose = require("mongoose");

const userSh = new mongoose.Schema({
    id: { type: String, default: null, required: true },
});

module.exports = mongoose.model("user", userSh);