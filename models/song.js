var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SongSchema = new Schema({
    name: { type: String },
    album: { type: String },
    genre: { type: String },
    releasedOn: { type: Date },
    isExplicit: { type: Boolean },
    artist: { type: Schema.Types.ObjectId, ref: 'Artist' },
    tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }]
});

module.exports = mongoose.model('Song', SongSchema);