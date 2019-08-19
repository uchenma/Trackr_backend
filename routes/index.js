const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { User, Stats } = require("../models");

router.post("/createUser", async (req, res) => {
  try {
    User.findOne({userId: req.body.userId}, async (err, resp) => {
      console.log("inside findOne", resp)
      if (resp) {
        res.json({success: false, error: "user already exists"})
      } else {
        const user = new User({
          name: req.body.name,
          userId: req.body.userId
        });
        await user.save();
        res.json({ success: true});
      }
      console.log("after if statements")
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

router.post("/updateStats", async (req, res)=> {
  try{
    Stats.findOne({userId: req.body.userId, url: req.body.url, date: req.body.date}, async (err, resp) => {
      if (resp){
        resp.time = resp.time + Number(req.body.time)
        await resp.save()
        res.json({success: true, stats: resp})
      } else {
        const stats = new Stats ({
          userId : req.body.userId,
          url: req.body.url,
          time: Number(req.body.time),
          date: req.body.date
        })
        await stats.save()
        res.json({success: true, stats: stats})
      }
    })
  } catch (e) {
    console.log("Error updating stats user", e);
    res.json({ success: false, error: e });
  }
})

router.get("/allStats/:userId", async (req, res) => {
  try {
    Stats.find({userId: req.params.userId})
    .sort({date: 1, time: -1})
    .exec(async (err, resp) => {
      if (resp.length) {
        res.json({success: true, stats: resp})
      } else {
        res.json({success: false, error: "user has no stats"})
      }
    })
  } catch (e) {
    console.log("Error loading stats user", e);
    res.json({ success: false, error: e });
  }
})

module.exports = router;
