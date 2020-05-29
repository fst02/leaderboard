const cryptoRandomString = require('crypto-random-string');
const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');
const { serializeError } = require('serialize-error');
const MailerService = require('../services/MailerService');
const ValidationService = require('../services/ValidationService');
const User = require('../models/User');
const UserActivation = require('../models/UserActivation');

const targetUrl = '/';

module.exports = {
  show: (req, res) => {
    res.render('registration/show', { validationError: req.session.error });
    console.log(req.session.error);
    req.session.error = null;
  },

  register: async (req, res) => {
    try {
      let filename = null;
      if (req.file !== undefined) {
        filename = req.file.filename;
      }
      const userData = Object.assign(req.body, { avatar: filename });
      if (userData.password !== userData.passwordRepeat) {
        throw new Error('Passwords do not match');
      }

      const token = cryptoRandomString({ length: 15, type: 'url-safe' });

      const user = await User.create(userData);
      const expiredAt = new Date();
      expiredAt.setHours(expiredAt.getHours() + 24);
      await UserActivation.create({ token, expiredAt, userId: user.id });

      const templateFile = fs.readFileSync(path.join(__dirname, '../views/emails/activation.hbs'), 'utf8');
      const template = Handlebars.compile(templateFile);
      MailerService.send(
        userData.email,
        'Confirmation email',
        template({ token }),
      );

      res.redirect('/registration/success');
    } catch (err) {
      console.log(err);
      req.session.error = serializeError(err);
      res.redirect(303, '/registration/show');
    }
  },

  success: (req, res) => {
    res.render('registration/success');
  },

  verify: async (req, res) => {
    try {
      const currentDate = new Date();
      const result = await ValidationService.select(req.query.token);
      if (result.length !== 0 && result[0].expiredAt >= currentDate) {
        ValidationService.setToVerified(result[0].userId);
      }
      res.render('registration/confirmed');
    } catch (err) {
      console.log(`verify error: ${err}`);
    }
  },
};
