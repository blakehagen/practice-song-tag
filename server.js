var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    port = 3030;
    
// MODELS //
var Artist = require('./models/artist');
var Song = require('./models/song');
var Artist = require('./models/tag');

var app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://songtag:songtag@ds035723.mongolab.com:35723/song-tag');
var db = mongoose.connection;

// ENDPOINTS //
app.post('/api/artists', function (req, res, next) {
    var artist = new Artist(req.body);
    artist.save(function (err, artist) {
        return res.status(200).end();
    });
});

app.get('/api/artists', function (req, res, next) {
    Artist.find().exec(function(err, artists){
        return res.json(artists);
    });
});










app.listen(port, function () {
    console.log('I hear you on port ' + port);
});