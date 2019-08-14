
const bodyParser = require("body-parser");
const path = require("path");
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const routes = require("./routes/index")

const app = express();
const server = require("http").Server(app);

// static
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.static(path.join(__dirname, "build")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// mongo stuff
const REQUIRED_ENVS = ["MONGODB_URI"];
REQUIRED_ENVS.forEach(function(el) {
  if (!process.env[el]) throw new Error("Missing required env var " + el);
});
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("open", () => console.log(`Connected to MongoDB!`));
mongoose.connection.on("error", function(err) {
  console.log("Mongoose default connection error: " + err);
});

app.get("/", (req, res)=> {
  res.send("hello heroku")
})

// get routes
app.use(routes);

server.listen(process.env.PORT||4000, function() {
    console.log("server is running on port 4000");
  });