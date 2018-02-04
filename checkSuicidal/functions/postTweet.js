const twitter = require('../twitter.js');

/**
* @param {string} status
* @param {string} twitterHandle
* @returns {any}
*/
module.exports = (status, twitterHandle, callback) => {
  twitter
    .post('statuses/update', { status: status })
    .then(result => {
      return callback(null, result);
    })
    .catch(error => {
      return callback(error);
    });
};
