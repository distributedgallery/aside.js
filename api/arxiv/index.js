export default function handler(request, response) {
  response.status(200).setHeader('Cache-Control', 'no-cache').json({
    nbOfPublications: 9
  });
}