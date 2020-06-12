const fetch = require('node-fetch');

const getLocationByIp = (ip) => fetch(`http://ip-api.com/json/${ip}`)
  .then((res) => res.json())
  .then((data) => data);

module.exports = {
  getLocationByIp,
};
