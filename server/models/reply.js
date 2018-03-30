var mongoose = require('mongoose');
var {ObjectID} = require('mongodb');
var Schema = mongoose.Schema;


var reply = new Schema({
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
    postat_id: {
        type: Schema.Types.ObjectId
    }
});

exports.Reply = mongoose.model('Reply', reply);

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