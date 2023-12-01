export default function handler(request, response) {
  console.log(request)
  response.setHeader('Cache-Control', 'no-cache');
  response.status(200).json({
    nbOfPublications: 11
  });
}