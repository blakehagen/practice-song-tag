var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TagSchema = new Schema({
    name: { type: String, unique: true, required: true },
    songs: [{ type: Schema.Types.ObjectId, ref: 'Song' }]
});

module.exports = mongoose.model('Tag', TagSchema);