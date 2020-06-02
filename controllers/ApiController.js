const hasha = require('hasha');
const jwt = require('jsonwebtoken');
const Scoreboard = require('../models/Scoreboard');
const User = require('../models/User');
const secrets = require('../config/secrets.json');

module.exports = {
  saveScore: async (req, res) => {
    const score = await Scoreboard.create(req.body);
    res.json(score);
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
};
