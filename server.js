var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    port = 3030;
    
// MODELS //
var Artist = require('./models/artist');
var Song = require('./models/song');
var Tag = require('./models/tag');

var app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://songtag:songtag@ds035723.mongolab.com:35723/song-tag');
var db = mongoose.connection;

// ENDPOINTS //
app.post('/api/artists', function (req, res, next) {
    var artist = new Artist(req.body);
    artist.save(function (err, artist) {
        return res.status(200).send(artist);
    });
});

app.get('/api/artists', function (req, res, next) {
    Artist.find().exec(function (err, artists) {
        return res.send(artists);
    });
});

app.get('/api/artists/:id', function (req, res, next) {
    Artist.findById(req.params.id).populate('songs').exec(function (err, artist) {
        return res.send(artist);
    });
});

app.post('/api/artists/:id/songs', function (req, res, next) {
    var song = new Song(req.body);
    Artist.findById(req.params.id).populate('songs').populate('artist').exec(function (err, artist) {
        song.save(function (err, song) {
            artist.songs.push(song);
            artist.save();
            return res.status(200).send(song);
        });
    });
});

app.get('/api/songs/:id', function (req, res, next) {
    Song.findById(req.params.id).populate('tags').exec(function (err, song) {
        return res.send(song);
    });
});

app.post('/api/songs/:id/tags', function (req, res) {
    Tag.findOneAndUpdate({ name: req.body.name }, req.body, { upsert: true }).exec(function (err, tag) {
        Song.findById(req.params.id).populate('tags').exec(function (err, song) {
            song.tags.push(tag);
            song.save(function (err, song) {
                return res.status(200).send(tag);
            });
        });
    });
});

// PORT LISTEN //
app.listen(port, function () {
    console.log('listening on port ' + port);
});