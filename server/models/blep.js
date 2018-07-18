const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blep = new Schema({
    title: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    content: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    parent: {
        type: String,
        default: 0
    },
    vote: {
        type: Number,
        default: 1
    },
    loc: {
        type: { type: String },
        coordinates: []
    }
   
});

blep.index({ "loc": "2dsphere" });
exports.Blep = mongoose.model('Blep', blep);
