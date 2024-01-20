import { kv } from '@vercel/kv';

function isAuthorized(request) {
  return request.headers.authorization === `Bearer ${process.env.CRON_SECRET}`;
}

export default async function handler(request, response) {
  try {
    if (!isAuthorized(request)) {
      return response.status(401).json({ error: 'Unauthorized request' });
    }

    const timestamp = Date.now();
    const sentiment = Math.random();
    await kv.zadd(
      'sentiments',
      { score: timestamp, member: sentiment },
    );
    return response.status(200).json({ timestamp, sentiment });
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}
