
//Define functions being used in main processor

//Pre-define requests
//Request to extract personality description
const PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');
const personality_insights = new PersonalityInsightsV3({
  username: process.env.PI_USERNAME,
  password: process.env.PI_PASSWORD,
  version_date: '2017-10-13'
});

//Request to get the sentimement of tweets
const NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
const nlu = new NaturalLanguageUnderstandingV1({
  username: process.env.NLU_USERNAME,
  password: process.env.NLU_PASSWORD,
  url: 'https://gateway.watsonplatform.net/natural-language-understanding/api',
  version_date: NaturalLanguageUnderstandingV1.VERSION_DATE_2017_02_27
});

//Pre-load before main function
//Loads tweet information, returning and storing the an array of tweets
const loadTweets = (twitterHandle, callback) => {
  // TODO: CAll twitter API to load twelets from the given handle.
  // TODO: Callback will accept the list of tweets.

  callback([
    'It is an interview from CNTV (The web-based TV broadcaster of CCTV). Any volunteers help me to translate the subtitles into English. 😀',
    'Can we add a few things to this list? Youre not cool because you: Put rims on your car that is a POS Have multiple cars broken down around your apartment because they are projects  Dress like you got released from the pen yesterday   Walk around looking like someone just murdered your entire family Drive like every day is the Daytona 500 Former Technical Expert of Baidu and Meituan Edison Wu Joins #TRON, who is mainly responsible for smart contract development with 11 years experience in enterprise software. #TRX $TRX. Can we add a few things to this list?',
    'Seriously done with weed being a default pleasure. I live in CA, so this has been, and is recently a daily issue with current new recreational legalization. I m fine with the fact that it helps some people, but can we please talk about how it is a nightmare drug for some other people? I was on an OKCupid first-date once, and the girl smoked weed half way into our date, in the middle of the restaurant. She told me I must have psychological problems if I don t enjoy smoking. I don t enjoy smoking because it makes me anti-social and anxious. It s an incredibly uncomfortable experience. I have to have an enormous amount of trust and comfort with the people around me in order to enjoy smoking weed with them. And I am mystified by how marijuana seems to be a panacea and a social drug for so many others. I would prefer that people stop up-talking MJ and trying to push different strains on me. People be like,  Oh, you just need to try a different strain.  No, man, all strains make me',
    'wrap myself into a blanket, disappear into my closet, and regret all of my life choices. No one wants to be in that headspace at a party or on a date.',
    'It is an interview from CNTV (The web-based TV broadcaster of CCTV). Any volunteers help me to translate the subtitles into English. 😀',
    'Can we add a few things to this list? Youre not cool because you: Put rims on your car that is a POS Have multiple cars broken down around your apartment because they are projects  Dress like you got released from the pen yesterday   Walk around looking like someone just murdered your entire family Drive like every day is the Daytona 500 Former Technical Expert of Baidu and Meituan Edison Wu Joins #TRON, who is mainly responsible for smart contract development with 11 years experience in enterprise software. #TRX $TRX. Can we add a few things to this list?',
    'Seriously done with weed being a default pleasure. I live in CA, so this has been, and is recently a daily issue with current new recreational legalization. I m fine with the fact that it helps some people, but can we please talk about how it is a nightmare drug for some other people? I was on an OKCupid first-date once, and the girl smoked weed half way into our date, in the middle of the restaurant. She told me I must have psychological problems if I don t enjoy smoking. I don t enjoy smoking because it makes me anti-social and anxious. It s an incredibly uncomfortable experience. I have to have an enormous amount of trust and comfort with the people around me in order to enjoy smoking weed with them. And I am mystified by how marijuana seems to be a panacea and a social drug for so many others. I would prefer that people stop up-talking MJ and trying to push different strains on me. People be like,  Oh, you just need to try a different strain.  No, man, all strains make me',
    'wrap myself into a blanket, disappear into my closet, and regret all of my life choices. No one wants to be in that headspace at a party or on a date.',
    'It is an interview from CNTV (The web-based TV broadcaster of CCTV). Any volunteers help me to translate the subtitles into English. 😀',
    'Can we add a few things to this list? Youre not cool because you: Put rims on your car that is a POS Have multiple cars broken down around your apartment because they are projects  Dress like you got released from the pen yesterday   Walk around looking like someone just murdered your entire family Drive like every day is the Daytona 500 Former Technical Expert of Baidu and Meituan Edison Wu Joins #TRON, who is mainly responsible for smart contract development with 11 years experience in enterprise software. #TRX $TRX. Can we add a few things to this list?',
    'Seriously done with weed being a default pleasure. I live in CA, so this has been, and is recently a daily issue with current new recreational legalization. I m fine with the fact that it helps some people, but can we please talk about how it is a nightmare drug for some other people? I was on an OKCupid first-date once, and the girl smoked weed half way into our date, in the middle of the restaurant. She told me I must have psychological problems if I don t enjoy smoking. I don t enjoy smoking because it makes me anti-social and anxious. It s an incredibly uncomfortable experience. I have to have an enormous amount of trust and comfort with the people around me in order to enjoy smoking weed with them. And I am mystified by how marijuana seems to be a panacea and a social drug for so many others. I would prefer that people stop up-talking MJ and trying to push different strains on me. People be like,  Oh, you just need to try a different strain.  No, man, all strains make me',
    'wrap myself into a blanket, disappear into my closet, and regret all of my life choices. No one wants to be in that headspace at a party or on a date. Piece of shitl. Lol.'
  ]);
};

const mapLimit = require('async').mapLimit;

//Main function
/**
* @param {string} twitterHandle
* @returns {any}
*/
module.exports = (twitterHandle, context, callback) => {
  loadTweets(twitterHandle, tweets => {

    //Gets sentiment analysis
    mapLimit(
      tweets,
      tweets.length,
      (item, done) => {
        nlu.analyze(
          {
            text: item,
            language: 'en-us',
            features: {
              emotion: {},
              sentiment: {}
            }
          },
          (error, response) => {
            if (error) {
              console.log(error);
              return done(null, {});
            }
            return done(null, response);
          }
        );
      },
      (error, results) => {
        if (error) {
          return callback(error);
        }

        let sentimentCount = 0;
        let emotionCount = 0;
        let sums = results.reduce(
          (acc, cur) => {
            if (cur.sentiment) {
              acc.sentiment += cur.sentiment.document.score;
              sentimentCount++;
            }
            if (cur.emotion) {
              acc.emotions.sadness += cur.emotion.document.emotion.sadness;
              acc.emotions.joy += cur.emotion.document.emotion.joy;
              acc.emotions.fear += cur.emotion.document.emotion.fear;
              acc.emotions.disgust += cur.emotion.document.emotion.disgust;
              acc.emotions.anger += cur.emotion.document.emotion.anger;
              emotionCount++;
            }
            return acc;
          },
          {
            sentiment: 0,
            emotions: {
              sadness: 0,
              joy: 0,
              fear: 0,
              disgust: 0,
              anger: 0
            }
          }
        );

        sums.sentiment /= sentimentCount;
        Object.keys(sums.emotions).forEach(emotion => {
          sums.emotions[emotion] /= emotionCount;
        });

        //Gets profile information
        personality_insights.profile(
          {
            content: tweets.join(' '),
            content_type: 'text/plain',
            consumption_preferences: true
          },
          (err, response) => {
            if (err) {
              return callback(err, "Fail");
            } else {
              response["sentiment"] = sums;

              //Calculate cuurent time:
              var today = new Date();
              var dd = today.getDate();
              var mm = today.getMonth() + 1; //January is 0!

              var yyyy = today.getFullYear();
              if(dd < 10){
                dd='0'+dd;
              }
              if(mm < 10){
                mm='0'+mm;
              }

              response["timestamp"] = dd+'/'+mm+'/'+yyyy;;
              return callback(null, response);
            }
          }
        );
      }
    );
  });
};
