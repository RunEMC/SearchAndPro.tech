
/**
* @param {string} tweetText
* @returns {any}
*/
module.exports = (tweetText, callback) => {

  nlu.analyze(
    {
      text: item,
      language: 'en-us',
      features: {
        'keywords': {
           'sentiment': true,
           'limit': 3
         }
      }
    },
    (error, response) => {
      if (error) {
        return callback(null, {});
      }
      return callback(null, response);
    }
  );
}
