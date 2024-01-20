// export default function handler(request, response) {
//   console.log(request)
//   // response.setHeader('Cache-Control', 'no-cache').setHeader('Access-Control-Allow-Credentials', true).setHeader('Access-Control-Allow-Origin', '*')
//   response.setHeader('Access-Control-Allow-Origin', '*')
//   response.status(200).json({
//     sentiment: Math.random()
//   });
// }
import { kv } from '@vercel/kv';

function check(data) {
  if (data.length !== 2) { throw new Error('Invalid returned data'); }
}

export default async function handler(request, response) {
  try {
    const data = await kv.zrange('sentiments', 0, 0, { rev: true, withScores: true });
    check(data);
    return response.status(200).json({ timestamp: data[1], sentiment: data[0] });
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}
