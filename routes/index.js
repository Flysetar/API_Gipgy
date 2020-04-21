const express = require('express');
const router = express.Router();
const request = require('request');

router.get('/', (req, res, next) => {
  const url = "http://api.giphy.com/v1/gifs/random?api_key=JcRGqvyftY4alKbBsy3dYO6bA4etIjfs";
  request.get(url, (err, response, body) => {
    if(err) { console.error(err) }

    body = JSON.parse(body);
    const imgUrl = body.data.image_original_url

    res.render('index', { title: 'Make School Giphy', imgUrl: imgUrl });
  });
});

// Add the following 3 lines:
  router.get('/search', (req, res, next) => {
  res.render('search');
})

router.post('/search', (req, res, next) => {
  const query = req.body['giphy-query']
  const url = `http://api.giphy.com/v1/gifs/search?api_key=JcRGqvyftY4alKbBsy3dYO6bA4etIjfs&q=${query}`;

  request.get(url, (err, response, body) => {
    if(err) { console.error(err) }

    body = JSON.parse(body);

    // First, we select a random .gif from the Giphy results and get the URL
    const randomResult = body.data[Math.floor(Math.random() * body.data.length)];
    const searchResultUrl = randomResult.images.fixed_height.url;

    // Then we pass the URL to search.hbs
    res.render('search', { searchResultUrl: searchResultUrl });
  });
});

module.exports = router;
