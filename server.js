var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    cors = require('cors');
    
var app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://songtag:songtag@ds035723.mongolab.com:35723/song-tag');
var db = mongoose.connection;