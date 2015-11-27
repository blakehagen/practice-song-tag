var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TagSchema = new Schema({
    name: { type: String, unique: true },
    songs: [{ type: Schema.Types.ObjectID, ref: 'Song' }]
});

module.exports = mongoose.model('Tag', TagSchema);