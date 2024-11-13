// require .env config
require('dotenv').config();
// require our database file
require('./config/database');
// require express
const express = require('express');
//import player model
const Player = require('./models/player');
// initialize express
const app = express();

// unless otherwise defined, port === `3000`
const PORT = process.env.PORT ? process.env.PORT : '3000';
// convert request body to JS
app.use(express.urlencoded({ extended: false}));

// Public Routes
// Reach the landing page
app.get('/', async (req, res) => {
    res.render('index.ejs');
});

app.get('/players', async (req, res) => {
    allPlayers = await Player.find();
    res.render("players/index.ejs", { players: allPlayers });
});
// Render new player form page
app.get('/players/new', async (req, res) => {
    res.render('players/new.ejs');
});

// SHOW route
app.get('/players/:playerId', async (req, res) => {
    const singlePlayer = await Player.findById(req.params.playerId);
    res.render("players/show.ejs", {player: singlePlayer});
});

// CREATE route
app.post('/players', async (req, res) => {
    if (req.body.retiredAJet === "on") {
        req.body.retiredAJet = true;
    } else {
        req.body.retiredAJet = false;
    }
    await Player.create(req.body);
    res.redirect('/players');
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});