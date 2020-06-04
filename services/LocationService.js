const fetch = require('node-fetch');

module.exports = {
  getLocationByIp(ip) {
    fetch(`http://ip-api.com/json/${ip}`)
      .then((res) => res.json())
      .then((data) => data);
  },
};
