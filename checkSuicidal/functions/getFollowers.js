const twitter = require('../twitter.js');

/**
* @param {string} twitterHandle
* @returns {any}
*/
module.exports = (twitterHandle, callback) => {
  twitter
    .get('followers/ids', { screen_name: twitterHandle })
    .then(result => {
      return callback(null, result);
    })
    .catch(error => {
      return callback(error);
    });
};
