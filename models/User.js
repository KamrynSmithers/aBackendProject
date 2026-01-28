const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  identity: {
    firstName: String,
    middleInit: String,
    lastName: String,
    dob: Date
  },
  reminderInfo: {
    phone: { type: String },
    email: { type: String, required: true, unique: true }
  },
  password: { type: String, required: true },
  passwordReset: String,
  passwordResetExpires: Date
});

userSchema.pre('save', async function() {
  if (!this.isModified('password')) {
    return;
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model('User', userSchema);