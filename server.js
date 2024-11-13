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
// initialize method override for UPDATE/DELETE routes
const methodOverride = require('method-override');
// initialize morgan for status updates.
const morgan = require('morgan');

// unless otherwise defined, port === `3000`
const PORT = process.env.PORT ? process.env.PORT : '3000';

// Middleware
// convert request body to JS
app.use(express.urlencoded({ extended: false}));
app.use(methodOverride('_method'));
app.use(morgan('dev'));

// Public Routes
// HOME route
app.get('/', async (req, res) => {
    res.render('index.ejs');
});

// INDEX route
app.get('/players', async (req, res) => {
    allPlayers = await Player.find();
    res.render("players/index.ejs", { players: allPlayers });
});
// NEW route
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

// DELETE route
app.delete("/players/:playerId", async (req, res) => {
    await Player.findByIdAndDelete(req.params.playerId);
    res.redirect("/players");
});

// EDIT route
app.get('/players/:playerId/edit', async (req,res) => {
    const singlePlayer = await Player.findById(req.params.playerId);
    res.render('players/edit.ejs', {
        player: singlePlayer,
    });
});

// UPDATE route
app.put('/players/:playerId', async (req, res) => {
    if (req.body.retiredAJet === "on") {
        req.body.retiredAJet = true;
    } else {
        req.body.retiredAJet = false;
    }
    
    await Player.findByIdAndUpdate(req.params.playerId, req.body);

    res.redirect(`/players/${req.params.playerId}`);
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});