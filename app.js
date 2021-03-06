const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', async (req, res) => {
  try {
    const beersArr = await punkAPI.getBeers();
    // console.log(beersArr);
    res.render('beers', { beersArr });
  } catch (err) {
    console.log(err);
  }
});

app.get('/beers/beer/:id', async (req, res) => {
  try {
    const beer = await punkAPI.getBeer(req.params.id);
    // console.log(beer);
    res.send(beer);
  } catch (err) {
    console.log(err);
  }
});

app.get('/random-beers', async (req, res) => {
  try {
    const randomBeer = await punkAPI.getRandom();
    // console.log(randomBeer);
    res.render('random-beers', { randomBeer });
  } catch (err) {
    console.log(err);
  }
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
