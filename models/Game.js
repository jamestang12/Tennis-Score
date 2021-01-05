const mongoose = require("mongoose");

const GameSchema = new mongoose.Schema({
  p1: {
    type: String,
    required: true,
  },
  p2: {
    type: String,
    required: true,
  },
  p1Score: {
    type: Number,
    default: 0,
  },
  p2Score: {
    type: Number,
    default: 0,
  },
  p1DisplayScore: {
    type: Number,
    default: 0,
  },
  p2DisplayScore: {
    type: Number,
    default: 0,
  },
  result: {
    type: Number,
    default: 3,
  },
});

module.exports = Game = mongoose.model("game", GameSchema);
