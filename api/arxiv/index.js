export default function handler(request, response) {
  console.log(request)
  response.setHeader('Cache-Control', 'no-cache').setHeader('Access-Control-Allow-Credentials', true).setHeader('Access-Control-Allow-Origin', '*')
  response.status(200).json({
    nbOfPublications: Math.floor(Math.random() * 10) + 1
  });
}