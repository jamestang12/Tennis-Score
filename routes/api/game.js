const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const mongoose = require("mongoose");
const Game = require("../../models/Game");

// @route     POST api/game
// @desc      Create new game
// @access    Public
router.post(
  "/",
  [
    check("p1", "P1 name is required").not().isEmpty(),
    check("p2", "P2 name is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { p1, p2 } = req.body;
    try {
      game = new Game({
        p1,
        p2,
      });

      const newGame = await game.save();

      // return res.status(200).json({ data: newGame });
      res.send("Game created");
    } catch (error) {
      console.log(errors);
      res.status(500).send("Server error");
    }
  }
);

// @route     GET api/game/:id
// @desc      update game score
// @access    Public
router.get("/:id", async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) {
      res.status(404).send({ error: "Game not found" });
    } else {
      return res.status(200).send({ data: game });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Server error" });
  }
});

// @route     PUT api/game/:id
// @desc      update game score
// @access    Public
router.put(
  "/:id",
  [
    check("p1Score", "p1 score is requird").not().isEmpty(),
    check("p2Score", "p2 score is requird").not().isEmpty(),
    check("p2DisplayScore", "p2 score is requird").not().isEmpty(),
    check("p1DisplayScore", "p2 score is requird").not().isEmpty(),
    check("result", "result is requird").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      p1Score,
      p2Score,
      result,
      p1DisplayScore,
      p2DisplayScore,
    } = req.body;

    try {
      const game = await Game.findById(req.params.id);
      if (!game) {
        res.status(404).send({ error: "Game not found" });
      } else {
        const gameUpdate = {
          p1Score: p1Score,
          p2Score: p2Score,
          p1DisplayScore: p1DisplayScore,
          p2DisplayScore: p2DisplayScore,
          result: result,
        };

        const data = await Game.findByIdAndUpdate(
          req.params.id,
          { $set: gameUpdate },
          { new: true }
        );

        return res.status(200).send({ data: data });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: "Server error" });
    }
  }
);

// @route     PUT api/game/reset/:id
// @desc      reset game
// @access    Public
router.put("/reset/:id", async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) {
      res.status(404).send({ error: "Game not found" });
    } else {
      const gameUpdate = {
        p1Score: 0,
        p2Score: 0,
        p1DisplayScore: 0,
        p2DisplayScore: 0,
        result: 3,
      };

      const data = await Game.findByIdAndUpdate(
        req.params.id,
        { $set: gameUpdate },
        { new: true }
      );

      return res.status(200).send({ data: data });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Server error" });
  }
});

module.exports = router;
