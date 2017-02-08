var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);