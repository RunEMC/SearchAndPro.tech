const sendDM = require('../src/sendDM.js');

/**
* @param {string} twitterID
* @param {string} message
* @returns {any}
*/
module.exports = (twitterID = "959877222038425600", message = "If you feel like you need some help, send us a DM! We\'re here to talk.", context, callback) => {
  sendDM(twitterID, message).then(results => {
    callback(null, results);
  }).catch(err => {
    callback(err);
  });
};


