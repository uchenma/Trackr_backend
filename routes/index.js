const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { User } = require("../models");

router.post("/createUser", async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      userId: req.body.userId
    });
    await user.save();
    res.json({ success: true, error: "" });
  } catch (e) {
    console.log("Error saving user", e);
    res.json({ success: false, error: e });
  }
});

module.exports = router;
