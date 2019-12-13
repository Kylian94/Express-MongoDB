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

userSchema.methods.passwordVerify = function (password) {
    return this.password = bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('Users', userSchema)