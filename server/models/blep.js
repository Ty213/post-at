const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postat = new Schema({
    text: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    smile: {
        type: Number,
        default: 1
    },
    frown: {
        type: Number,
        default: 0
    },
    loc: {
        type: { type: String },
        coordinates: []
    }
   
});

postat.index({ "loc": "2dsphere" });
exports.Postat = mongoose.model('Postat', postat);
