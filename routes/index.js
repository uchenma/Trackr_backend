const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { User } = require("../models");

router.post("/createUser", async (req, res) => {
  console.log("in the create user route")
  try {
    console.log("console log is my best friend, inside try")
    User.findOne({userId: req.body.userId}, async (err, resp) => {
      if (resp) {
        res.json({success: false, error: "user already exists"})
      } else {
        const user = new User({
          name: req.body.name,
          userId: req.body.userId
        });
        await user.save();
        res.json({ success: true, error: "" });
      }
    })
  } catch (e) {
    console.log("Error saving user", e);
    res.json({ success: false, error: e });
  }
  console.log("console log after catch")
});

router.post("/login", async (req, res) => {
  try{
    User.findOne({userId: req.body.userId}, async (err, resp) => {
      if (resp) {
        res.json({ success: true, user: resp });
      } else{
        res.json({success: false, error: "user doesn't exist"})
      }
    })
  } catch (e) {
    console.log("Error finding user", e);
    res.json({ success: false, error: e });
  }
})
router.get("/allStats", async (req, res) => {
  try {
  
  } catch (e) {
    console.log("Error loading stats user", e);
    res.json({ success: false, error: e });
  }
})

router.post("/test", async (req, res) => {
  res.send(`Posting to test ${req.body.userId}`)
});

module.exports = router;
