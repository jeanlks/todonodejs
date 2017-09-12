var {mongoose} = require('../db/db')
var userSchema = mongoose.Schema({
    text: {type: String, required: true},
    completed: {type: Boolean, default: false},
    completedAt: {type: Number, default: null}
});


var Todo = mongoose.model('Todo', userSchema);


module.exports = {
  Todo
};