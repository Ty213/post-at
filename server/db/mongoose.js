const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/PostAt');

module.exports = {
    mongoose
};

//start local mongodb server
// ~/mongo/bin$ ./mongod --dbpath ~/mongo-data
