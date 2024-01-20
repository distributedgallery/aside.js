import { kv } from '@vercel/kv';

// if (req.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
//   return res.status(401).end('Unauthorized');
// }

export default async function handler(request, response) {
  try {
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
