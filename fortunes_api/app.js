
const express = require('express');//this allows us to make the express application
const fortunes = require('./data/fortunes')

const app = express();//calls the express function

app.get('/fortunes', (req, res) => {
    res.json(fortunes);//.json is an express method, for responding and rendering with JSON formated data
});

app.get('/fortunes/random', (req, res) => {
    res.json(fortunes[Math.floor(Math.random() * fortunes.length)]);//app responds as json for the request
});
//find is an array function
app.get('/fortunes/:id', (req, res) => {
    res.json(fortunes.find(f => f.id == req.params.id));//don't use strict because of JSON object values are strings
});

module.exports = app;


