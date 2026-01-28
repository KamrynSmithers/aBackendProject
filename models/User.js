const bcrypt = require('bcrypt')
const mongoose = require ('mongoose')

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    identity: {
        firstName: String,
        middleInit: String, 
        lastName: String,
        dob: Date
    },
    reminderInfo : {
        phone: {type: String},
        email: {type: String, required: true, unique: true}
    },

    password: {type: String, required: true}, 
    passwordReset: String,
    passwordResetExpires: Date
}) 

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next();

  bcrypt
    .hash(this.password, 10)
    .then(hash => {
      this.password = hash;
      next();
    })
    .catch(err => next(err));
});


module.exports = mongoose.model('User', userSchema)