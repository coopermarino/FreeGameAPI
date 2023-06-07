const express = require('express');
const path = require('path');

const app = express();

// Set the views directory
app.set('views', path.join(__dirname, 'views'));

// Set the view engine
app.set('view engine', 'ejs');

// Define an array of genres
const genres = [
  'mmorpg', 'shooter', 'strategy', 'moba', 'racing', 'sports', 'social', 'sandbox', 'open-world', 'survival',
  'pvp', 'pve', 'pixel', 'voxel', 'zombie', 'turn-based', 'first-person', 'third-person', 'top-down', 'tank',
  'space', 'sailing', 'side-scroller', 'superhero', 'permadeath', 'card', 'battle-royale', 'mmo', 'mmofps', 'mmotps',
  '3d', '2d', 'anime', 'fantasy', 'sci-fi', 'fighting', 'action-rpg', 'action', 'military', 'martial-arts', 'flight',
  'low-spec', 'tower-defense', 'horror', 'mmorts'
];

app.get('/', async (req, res) => {
  try {
    const { default: fetch } = await import('node-fetch');

    // Get the selected genre, sort option, and platform from the query parameters
    const selectedGenre = req.query.genre || '';
    const selectedSort = req.query.sort || '';
    const selectedPlatform = req.query.platform || '';

    // Create the API request URL based on the selected genre, sort option, and platform
    let apiUrl = 'https://www.freetogame.com/api/games';
    const queryParameters = [];

    if (selectedGenre) {
      queryParameters.push(`category=${selectedGenre}`);
    }

    if (selectedSort) {
      queryParameters.push(`sort-by=${selectedSort}`);
    }

    if (selectedPlatform) {
      queryParameters.push(`platform=${selectedPlatform}`);
    }

    if (queryParameters.length > 0) {
      apiUrl += `?${queryParameters.join('&')}`;
    }

    const response = await fetch(apiUrl);
    const data = await response.json();

    // Rest of the code...

    res.render('index', {
      genres,
      selectedGenre,
      selectedSort,
      selectedPlatform,
      data
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Error occurred while fetching the data');
  }
});



const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
