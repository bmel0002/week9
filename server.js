const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const actors = require('./routers/actor');
const movies = require('./routers/movie');

const app = express();
app.listen(8080);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", express.static(path.join(__dirname, "dist/movieAng")));

const DB_URL = 'mongodb://localhost:27017/movies';

mongoose.connect(DB_URL, function (err) {
    if (err) {
        return console.log('Mongoose - connection error:', err);
    }
    console.log('Connect Successfully');
});

//Configuring Endpoints
//Actor RESTFul endpoionts 
app.get('/actors', actors.getAll);
app.post('/actors', actors.createOne);
app.get('/actors/:id', actors.getOne);
app.put('/actors/:id', actors.updateOne);
app.post('/actors/:id/movies', actors.addMovie);
app.delete('/actors/:id', actors.deleteOne);
app.delete('/actors/harddelete/:id', actors.hardDelete);
app.delete('/actors/:actorID/movies/:movieID', actors.deleteMovie);
app.put('/actors/clearmovies/:id', actors.clearMovies);
app.delete('/actors/resetmovies/:id', actors.resetMovies);
//Movie RESTFul  endpoints
app.get('/movies', movies.getAll);
app.post('/movies', movies.createOne);
app.get('/movies/:id', movies.getOne);
app.put('/movies/:id', movies.updateOne);
app.delete('/movies/:id', movies.deleteOne);
app.delete('/movies/:movieID/actors/:actorID', movies.deleteActor);
app.post('/movies/:id/actors', movies.addActor);
app.get('/movies/:year1/:year2', movies.getAllBetweenYears);
app.delete('/movies/:year1/:year2', movies.deleteAllBetweenYears);