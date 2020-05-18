const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'csandor444@gmail.com',
    pass: 'braininghub',
  },
});

module.exports = {
  send(to, subject, text) {
    const mailOptions = {
      from: 'csandor444@gmail.com',
      to,
      subject,
      text,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log(`Email sent: ${info.response}`);
      }
    });
  },
};
