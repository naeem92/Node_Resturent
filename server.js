const express = require('express');
const app = express();
const db= require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Welcome to my Resturent...How i can help you?');
});

// Import the Router File///
const personRoutes = require('./routes/PersonRoutes');
const MenuItemRoutes = require('./routes/menuItemRoutes');

// Use the router file//
app.use('/person', personRoutes);
app.use('/Menu', MenuItemRoutes);

app.listen(3001, () => {
  console.log('Example app listening on port 3001!');
});