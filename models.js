const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true,
    unique: true
  }
});

const statsSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true
  },
  time: {
    type: Number,
    required: true
  },
  date: {
    type: String,
    required: true
  }
});

const User = mongoose.model("User", userSchema);
const Stats = mongoose.model("Stats", statsSchema);

module.exports = {
  User,
  Stats
};
