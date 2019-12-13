var mongoose = require('mongoose')

var Schema = mongoose.Schema;

var userSchema = new Schema({
    email: {
        type: String,
        required: true
    }, // String is shorthand for {type: String}
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Users', userSchema)