var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var postat = new Schema({
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

// postat.methods.findNearby = function findNearby (lng,lat) {
//     return console.log(lng,lat);
//   };

// postat.statics.search = function search (name) {
//     return console.log(name);
//   }


postat.index({ "loc": "2dsphere" });

exports.Postat = mongoose.model('Postat', postat);

// var Postat = mongoose.model('Postat', {
//     text: {
//         type: String,
//         required: true,
//         minlength: 1,
//         trim: true
//   }
// });

// module.exports = {
//     Postat
// }

//39.838450, -75.021521
//39.92,-23


// var place = new Schema({
//     ...
//     creationDate: { type: Date, default: Date.now },
//     userId: ObjectId,
//     username: String,
//     geo: {type: [Number], index: '2d'}
//     ...
//   });
//   exports.PlaceService = mongoose.model('Place', place);