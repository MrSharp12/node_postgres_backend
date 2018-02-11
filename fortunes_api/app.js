const fs = require('fs');
const express = require('express');//allow us to make the express application
const bodyParser = require('body-parser');
const fortunes = require('./data/fortunes');

const app = express();//calls the express function

app.use(bodyParser.json());

app.get('/fortunes', (req, res) => {
  res.json(fortunes);//.json is an express method, for responding and rendering with JSON formated data
});

app.get('/fortunes/random', (req, res) => {
  res.json(fortunes[Math.floor(Math.random() * fortunes.length)]);//app responds as json for the request
});

app.get('/fortunes/:id', (req, res) => {
  res.json(fortunes.find(f => f.id == req.params.id));//don't use strict because of JSON object values are strings
});

const writeFortunes = json => {
  fs.writeFile('./data/fortunes.json', JSON.stringify(json), err => console.log(err));
};

app.post('/fortunes', (req, res) => {
  const { message, lucky_number, spirit_animal } = req.body;

  const fortune_ids = fortunes.map(f => f.id);

  const new_fortunes = fortunes.concat({
    id: (fortune_ids.length > 0 ? Math.max(...fortune_ids) : 0) + 1,
    message,
    lucky_number,
    spirit_animal
  });

  writeFortunes(new_fortunes);

  res.json(new_fortunes);
});

app.put('/fortunes/:id', (req, res) => {
  const { id } = req.params;

  const old_fortune = fortunes.find(f => f.id == id);//finds the fortune to update

  ['message', 'lucky_number', 'spirit_animal'].forEach(key => {
    if (req.body[key]) old_fortune[key] = req.body[key];//this allows partial updates, value will not return undefined if left blank
  });

  writeFortunes(fortunes);

  res.json(fortunes);
});

app.delete('/fortunes/:id', (req, res) => {
  const { id } = req.params;

  const new_fortunes = fortunes.filter(f => f.id != id);

  writeFortunes(new_fortunes);

  res.json(new_fortunes);
});

module.exports = app;