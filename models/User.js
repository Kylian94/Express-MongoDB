var mongoose = require('mongoose')
var bcrypt = require('bcrypt')
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

userSchema.methods.passwordHash = (password) => {
    return this.password = bcrypt.hashSync(password, 12)
}

module.exports = mongoose.model('Users', userSchema)