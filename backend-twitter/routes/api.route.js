const router = require('express').Router();
const Twitter = require('twitter');
 
const client = new Twitter({
  consumer_key: process.env.API_KEY,
  consumer_secret: process.env.API_SECRET,
  bearer_token: process.env.BEARER,
});

router.get('/tweets', async (req, res, next) => {
  try {
    const query = req.query.q;
    const count = req.query.count;
    const max_id = req.query.max_id;
    const include_entities = req.query.include_entities;
    const tweets = await client.get('search/tweets.json', {
      q: query || 'violin',
      count: count || 10,
      max_id: max_id,
      include_entities: include_entities,
      tweet_mode: 'extended',
    })
    
    res.send(tweets);
  } catch (error) {
    next(error)
  }
});

module.exports = router;
// { message: 'Ok api is working 🚀' }