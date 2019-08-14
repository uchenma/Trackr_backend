const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 
    userId: {
        type: String,
        required: true
    }
})

const User = mongoose.model("User", userSchema);

module.exports = {
    User
}