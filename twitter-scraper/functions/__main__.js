let scrapeTwitter = require("scrape-twitter");
/**
* Scrapes the text contents of a Twitter Users timeline
* Used node module https://www.npmjs.com/package/scrape-twitter
* @param {string} name twitter handle
* @returns {array}
*/
module.exports = (name = 'sad_boie', context, callback) => {

  let timeline = new scrapeTwitter.TimelineStream(name);
  let data = [];
  console.log('hello');
  timeline.on('data', (chunk) => {
    data.push(chunk);
  });
  timeline.on('end', (chunk) => {
    let text = [];

    for (let key in data){
      text.push(data[key].text);
    }
    callback(null, text);
  });

};
