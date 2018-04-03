var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/PostAt');

module.exports = {
    mongoose
};

// ~/mongo/bin$ ./mongod --dbpath ~/mongo-data
