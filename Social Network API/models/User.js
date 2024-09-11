const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Please fill a valid email address']
  },
  thoughts: [{
    type: Schema.Types.ObjectId,
    ref: 'Thought'
  }],
  friends: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
});

// Create a virtual property 'friendCount'
userSchema.virtual('friendCount').get(function() {
  return this.friends.length; // Returns the length of the friends array
});

// Export the model
const User = mongoose.model('User', userSchema);
module.exports = User;
