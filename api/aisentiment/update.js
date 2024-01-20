import { kv } from '@vercel/kv';
import needle from 'needle';

const ENDPOINT = 'https://api.twitter.com/2/tweets/counts/recent';
const PROS = ['#aiforgood', '#ai4good'];
const CONS = ['#aiforbad', '#ai4bad'];

function query(hashtags) {
  let q = '';

  for (let i = 0; i < hashtags.length; i += 1) {
    if (i > 0) q += ' OR ';
    q += hashtags[i];
  }

  return q;
}

async function count(hashtags) {
  const response = await needle('get', ENDPOINT, { query: query(hashtags), granularity: 'day' }, {
    headers: {
      'User-Agent': 'v2RecentTweetCountsJS',
      authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
    },
  });

  if (response.body) { return response.body.meta.total_tweet_count; }

  throw new Error('Unsuccessful Twitter request');
}

function isAuthorized(request) {
  return request.headers.authorization === `Bearer ${process.env.CRON_SECRET}`;
}

export default async function handler(request, response) {
  try {
    if (!isAuthorized(request)) {
      return response.status(401).json({ error: 'Unauthorized request' });
    }

    const pros = await count(PROS);
    const cons = await count(CONS);

    if (pros === 0 && cons === 0) { throw new Error('No tweets found'); }

    const timestamp = Date.now();
    const sentiment = (pros / (pros + cons)).toFixed(2);

    await kv.zadd(
      'sentiments',
      { score: timestamp, member: sentiment },
    );
    return response.status(200).json({ timestamp, sentiment });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: error.message });
  }
}
