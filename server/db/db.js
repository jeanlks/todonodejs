var mongoose = require('mongoose');

mongoose.Promise = Promise;

var url = 'mongodb://localhost:27017/testmongo';

mongoose.connect(url);
module.exports = {
    mongoose
};
