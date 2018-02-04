const getTweets = require('../src/getTweets.js');

/**
* @param {string} twitterHandle
* @returns {any}
*/
module.exports = (twitterHandle = 'sad_boie', context, callback) => {

  getTweets(twitterHandle).then(results => {
    callback(null, results);
  }).catch(err => {
    callback(err);
  });

};

const flatten = list =>
  list.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []);
