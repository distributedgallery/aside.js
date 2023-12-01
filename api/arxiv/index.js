export default function handler(request, response) {
  console.log(request)
  response.status(200).setHeader('Cache-Control', 'no-cache').json({
    nbOfPublications: 9
  });
}