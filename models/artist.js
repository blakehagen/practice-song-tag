var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArtistSchema = new Schema({
    name: { type: String },
    bio: { type: String },
    genres: [{ type: String, unique: true }],
    songs: [{ type: Schema.Types.ObjectId, ref: 'Song' }]
});

module.exports = mongoose.model('Artist', ArtistSchema);