const cryptoRandomString = require('crypto-random-string');
const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');
const hasha = require('hasha');
const readChunk = require('read-chunk');
const imageType = require('image-type');
const url = require('url');
const { serializeError } = require('serialize-error');
const MailerService = require('../services/MailerService');
const ValidationService = require('../services/ValidationService');
const User = require('../models/User');
const UserActivation = require('../models/UserActivation');

module.exports = {
  show: (req, res) => {
    const { nickname, email, introduction } = req.query;
    res.render('registration/show', {
      validationError: req.session.error,
      nickname,
      email,
      introduction,
    });
    req.session.error = null;
  },

  register: async (req, res) => {
    try {
      let filename = null;
      if (req.file) {
        const buffer = readChunk.sync(path.join(__dirname, `../public/images/${req.file.filename}`), 0, 12);
        if (imageType(buffer).mime.includes('image')) {
          filename = req.file.filename;
        }
      }
      const userData = Object.assign(req.body, { avatar: filename });
      if (userData.password !== userData.passwordRepeat) {
        throw new Error('Passwords do not match');
      }

      const token = cryptoRandomString({ length: 15, type: 'url-safe' });

      userData.password = hasha(req.body.password);
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
      res.redirect(303, url.format({
        pathname: '/registration/show',
        query: {
          nickname: req.body.nickname,
          email: req.body.email,
          introduction: req.body.introduction,
        },
      }));
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
