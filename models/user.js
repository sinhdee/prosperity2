const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  applications: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'application'
}
});


module.exports = mongoose.model('User', userSchema);

