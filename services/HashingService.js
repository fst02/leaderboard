const hasha = require('hasha');

const hashString = (text) => hasha(text);

module.exports = {
  hashString,
};
