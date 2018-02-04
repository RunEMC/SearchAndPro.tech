const twit = require('twit');

const twitter = new twit({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

const sendDM = (recipient_id, body) => {
  return twitter.post('direct_messages/events/new', {
    "event": {
      "type": "message_create",
      "message_create": {
        "target": {
          "recipient_id": recipient_id
        },
        "message_data": {
          "text": body,
        }
      }
    }
  });
};

module.exports = sendDM;
