const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    name: {
        type: String,
        required: true
    }, 
    userId: {
        type: String,
        required: true,
        unique: true,
    }
})

const statSchema = new Schema ({
    
})

const User = mongoose.model("User", userSchema);

module.exports = {
    User
}