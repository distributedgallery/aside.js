// search for Tweets within the past seven days
// https://developer.twitter.com/en/docs/twitter-api/tweets/search/quick-start/recent-search

const needle = require('needle');



// The code below sets the bearer token from your environment variables
// To set environment variables on macOS or Linux, run the export command below from the terminal:
// export BEARER_TOKEN='YOUR-TOKEN'
const BEARER_TOKEN = "AAAAAAAAAAAAAAAAAAAAAOdorQEAAAAAf0RObsAiXPbZmOoNQd8%2FxV8r4m8%3DkJvhBodBuY1vyHVnbZH9VlEz2Pwlcvh8hzX205tTjvbgXaD4N2";
const ENDPOINT = "https://api.twitter.com/2/tweets/counts/recent";

const PROS = ['#aiforgood', '#ai4good'];
const CONS = ['#aiforbad', '#ai4bad'];


function _queryPro() {
    let _query = '';

    for (let i = 0; i < PROS.length; i++) {
        if (i > 0)  _query += ' OR ';
        _query += PROS[i];
    }
    return _query
}

async function getRequest() {

    // Edit query parameters below and specify a search query
    // optional params: start_time,end_time,since_id,until_id,next_token,granularity
    const params = {
        'query': '#aiforgood',
        'granularity': 'day'
    }

    for (const element of array1) {
        console.log(element);
      }

    const res = await needle('get', ENDPOINT, params, {
        headers: {
            "User-Agent": "v2RecentTweetCountsJS",
            "authorization": `Bearer ${BEARER_TOKEN}`
        }
    })

    // .meta.total_tweet_count
    if (res.body) {
        return res.body;
    } else {
        throw new Error('Unsuccessful request');
    }
}

(async () => {

    try {
        // Make request
        // const response = await getRequest();
        // console.dir(response, {
        //     depth: null
        // });

        console.log(_queryPro());

    } catch (e) {
        console.log(e);
        process.exit(-1);
    }
    process.exit();
})();