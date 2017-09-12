var {mongoose} = require('../db/db')

var userSchema = mongoose.Schema({
    name: String,
    age: Number
});


var User = mongoose.model('User', userSchema);

module.exports = {
   User
};