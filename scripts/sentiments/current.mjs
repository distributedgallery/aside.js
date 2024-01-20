import { kv } from '@vercel/kv';
import colors from 'colors';
import columnify from 'columnify';

const reducer = (acc, x, i) => {
  if (i % 2 === 0) {
    acc.push({ sentiment: x });
  } else {
    acc[(i - 1) / 2] = { ...acc[(i - 1) / 2], timestamp: new Date(x) };
  }

  return acc;
};

async function list() {
  try {
    const data = await kv.zrange('sentiments', 0, 0, { rev: true, withScores: true });
    console.log('AI SENTIMENT'.green.bold);
    console.log('-------------'.green.bold);
    console.log('');
    console.log(columnify(data.reduce(reducer, []), { columns: ['timestamp', 'sentiment'] }));
  } catch (error) {
    console.log('Error retrieving data'.red.bold);
    console.log(error.red);
  }
}

list();
