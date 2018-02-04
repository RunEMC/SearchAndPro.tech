const lib = require('lib');
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

// //For posting emergecny messages
// const Poster = new postTweet({
//   var client = new Twitter({
//     consumer_key: process.env.consumer_key,
//     consumer_secret: process.env.consumer_secret,
//     access_token_key: process.env.PI_USERNAMEprocess.env.access_token_key,
//     access_token_secret: process.env.access_token_secret
//   });
//
// });

//Pre-generated message
const emergencyMsg = "If you feel like you need some help, send us a DM! We're here to talk."
const emergencyLim = -0.5;
var recipientID = "959877222038425600"; //Default value to be later overrided by a function


//Pre-load before main function
//Loads tweet information, returning and storing the an array of tweets
// const loadTweets = (twitterHandle, callback) => {
//   // TODO: CAll twitter API to load twelets from the given handle.
//   // TODO: Callback will accept the list of tweets.
//
//   callback([
//     "I don't have too many friends - and I find that I'm keeping to myself a lot. My friends would always rag on me for complaining too much...I feel like I don't get enjoyment out of anything I do anymore - I feel like I'm just looking to kill time before the next 'thing' happens.",
//     "I only knew a couple people in my city and I spent most weekends sitting on my computer alone and upset basically killing time waiting for the weekend to end.  I find myself not really disinterested or completely interested in my current courses.",
//     "Not really sure what to say - I'm an upper year student and I've honestly never been this depressed before. If I could describe my mood as a colour - it would be grey. When I was on coop I was pretty depressed.",
//     "To make everything worse, my parents are pressuring me to get a girlfriend since I'm 21. It seems every girl I talk to rejects me :( Does anyone else feel this way?",
//     "I thought my self-esteem would go up but it also didn't. At last I thought getting a cali job would make everything alright so I busted my butt on side-projects. I finally made cali but I still feel there's something missing. I don't know how to feel happy",
//     "Just feeling sad/ down every day. Was going to do an exchange term which would be close home but due to my poor planning, I withdrew my app last min. Feeling very regretful and sad about that...idk what in the future to look forward to :(",
//     "This term hasn’t been going well. Had a really good coop term in the summer but coming back to loo just made me feel extremely depressed. Can’t concentrate on doing work.... feeling very worries/anxious about the unknown in the future. Feeling homesick.",
//     "Pretty much experienced most of the symptoms(could include netflix all day and night) I guess I felt this way is because I haven't made a lot of friends in uni and my relationship with my parents isn't the best back home so felt alone.",
//     "first year, first term was the worst. repetitive mundane schedule of going to lectures, coming back and reading notes that I don't even understand, crying every night, not fake smiles and show of strength, eating, constantly wonder why I'm here.",
//     "The term was literally a living nightmare. I would stay inside all the time, never leave my house, stare at the wall, stay in the bed, wonder why I can't do things like everybody else can. Failed the entire term, lost 15 lbs and then gained 15 extra pounds.",
//     "The big thing was that I kept up with work, with school, not because I wanted to, but because it was just 'something I did'. I never actually had any real motivation to do anything.",
//     "I was almost catatonic. Every day was formulaic. I would go to class, take notes, go home, do homework, then stare at a wall for a couple hours. I was so alone that all I could ever think about was having friends.",
//     "Did all assignments, attended all classes, didn't play video games or talk to anyone.\nWake up immediately upon morning alarm, wonder why I am such trash.\nGo to school, wait for traffic light, watch people walk by, wonder why I am such trash.",
//     "I did decent on midterms, despite feeling depressed, and this made me believe that I can finish the term successfully. However, recently, I just want to sleep, and stay in my room. I haven't seen a doctor regarding my depression, and plan to soon.",
//     "Since last term, I noticed my mood getting worse for no particular reason. Didn't pay much attention it. I started this term with a really weird passively irritating feeling in the back of my head. Almost like a bad emotional itch I can't scratch.",
//     "CS is as dead and asocial as they say. Nobody talks much in class. It's a world apart from the spirit and community in engineering.",
//     "I'm really upset no one appreciates me, everyone makes fun out of my username. and everyone act like they love me. no I'm not seeking attention I just want to be appreciated and loved by people and I want to feel picked once. is it too much to ask for love?",
//     "so lonely",
//     "nobody understands me",
//     "I hate my life...",
//     "this sucks"
//   ]);
// };

const loadTweets = (handle, callback) =>  lib.hygzhu['twitter-text']({twitterHandle: handle}, function (err, result) {
  if (err) {
    return "fail"
  }

  return callback(result);
});

const directMessage = (twitterID, message, callback) =>  lib.hygzhu['twitter-message']({twitterID: twitterID, message:message},
  function (err, result) {
    if (err) {
      return "fail"
    }

    return callback(result);
  });

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
              return done(null, {});
            }
            return done(null, response);
          }
        );
      },
      (error, results) => {
        if (error) {

          return {
            sentiment: 0,
            emotions: {
              sadness: 0,
              joy: 0,
              fear: 0,
              disgust: 0,
              anger: 0
            }
          };
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

              response["date"] = dd + '/' + mm + '/' + yyyy;
              response["time"] = today.getHours() + ':' + today.getMinutes() + ":" + today.getSeconds();
              response["twitterHandle"] = twitterHandle;

              nlu.analyze(
                {
                  text: tweets.join(' '),
                  language: 'en-us',
                  features: {
                    'keywords': {
                       'sentiment': true,
                       'limit': 3
                     }
                  }
                },
                (err, resp) => {
                  if (err) {

                  }
                  response["categories"] = resp;

                  //Trigger emergency message if threshold broken
                  //console.log("value: " + sums["sentiment"]);
                  if (sums["sentiment"] <= emergencyLim){
                    //Automated email
                    response["sentMessage"] = "true";
                    response["replyURL"] = "https://hygzhu.lib.id/twitter-message@0.0.0/?twitterID=" + recipientID + "?message=";

                    directMessage(recipientID,emergencyMsg, (res) => {
                      return callback(null,response);
                    });

                    // lib[`${context.service.identifier}.getFollowers`](twitterHandle).then(res => {
                    //       return callback(null, res);
                    //   });


                    // lib[`${context.service.identifier}.postTweet`](finalMsg, twitterHandle).then(res => {
                    //       return callback(null, res);
                    //   });


                  }
                  else {
                    console.log("No threshold broken.")
                    return callback(null, response);
                  }
                }
              );
            }
          }
        );
      }
    );

    //end of mapLimit
  });
};
