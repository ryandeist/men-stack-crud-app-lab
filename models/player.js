const mongoose = require("mongoose");

// create the player schema
const playerSchema = new mongoose.Schema({
    name: String,
    position: String,
    yearsActive: Number,
    yearsWithJets: Number,
    proBowls: Number,
    yearInducted: Number,
    retiredAJet: Boolean,
});

// create the model
const Player = mongoose.model("Player", playerSchema); 

module.exports = Player;