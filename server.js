// require .env config
require("dotenv").config();
// require our database file
require("./config/database");
// require express
const express = require("express");
const Fruit = require("./models/player.js");

// initialize express
const app = express();
// unless otherwise defined, port === `3000`
const PORT = process.env.PORT ? process.env.PORT : '3000';

// Public Routes
// Reach the landing page
app.get('/', async (req, res) => {
    res.render("index.ejs");
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});