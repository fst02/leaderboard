const Scoreboard = require('../models/Scoreboard');

module.exports = {
  saveScore: async (req, res) => {
    const score = await Scoreboard.create(req.body);
    res.json(score);
  },
};
