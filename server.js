const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/passport-examples2";

// Configure mongoose to use Promises, because callbacks are passe.
mongoose.Promise = global.Promise;
// Connect to the Mongo DB
mongoose.connect(MONGODB_URI);

// Use body-parser for reading form submissions into objects
app.use(bodyparser.urlencoded({ extended: true }));
// Use body-parser for reading application/json into objects
app.use(bodyparser.json());

require('./passport')(app);

app.use(require('./routes'));

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
