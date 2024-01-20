import { kv } from '@vercel/kv';

export default async function handler(request, response) {
  try {
    const timestamp = Date.now();
    const sentiment = Math.random();
    await kv.zadd(
      'sentiments',
      { score: timestamp, member: sentiment },
    );
    throw new Error('regrg');
    return response.status(200).json({ timestamp, sentiment });
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}
