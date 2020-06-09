const hasha = require('hasha');
const jwt = require('jsonwebtoken');
const Scoreboard = require('../models/Scoreboard');
const User = require('../models/User');
const secrets = require('../config/secrets.json');
const LocationService = require('../services/LocationService');

module.exports = {
  saveScore: async (req, res) => {
    try {
      const ip = req.ip.split(':').pop();
      const location = await LocationService.getLocationByIp(ip);
      const { country, city } = location;
      let selectedScoreboard = await Scoreboard.findOne({
        where: { gameId: req.body.gameId, userId: req.user.userId },
      });
      if (selectedScoreboard) {
        selectedScoreboard.numberOfRounds += 1;
        if (req.body.score) {
          selectedScoreboard.numberOfWins += 1;
        }
        if (req.body.score > selectedScoreboard.topScore) {
          selectedScoreboard.topScore = req.body.score;
        }
      } else {
        const saveData = Object.assign(req.body, { userId: req.user.userId });
        selectedScoreboard = await Scoreboard.create(saveData);
        selectedScoreboard.numberOfRounds = 1;
        if (req.body.score) {
          selectedScoreboard.numberOfWins = 1;
        }
        selectedScoreboard.topScore = req.body.score;
      }
      selectedScoreboard.city = city;
      selectedScoreboard.country = country;
      selectedScoreboard.save();
      res.json(selectedScoreboard);
    } catch (error) {
      res.status(400).json(`${error}`);
    }
  },

  authenticateUser: async (req, res) => {
    const user = await User.findOne({
      where: { email: req.body.email, password: hasha(req.body.password), isVerified: true },
    });
    if (user) {
      const token = jwt.sign({ userId: user.id }, secrets.jwtSecret);
      res.json({ token, user });
    } else {
      res.status(401).json({ error: 'Invalid email/password or not verified user' });
    }
  },

  verifyToken: async (req, res) => {
    try {
      const verify = jwt.verify(req.body.token, secrets.jwtSecret);
      console.log(verify.userId);
      res.json({ response: 'ok', userId: verify.userId });
    } catch (err) {
      res.json({ response: err.message });
    }
  },
};
