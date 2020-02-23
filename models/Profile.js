const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  motivation: {
    type: String,
    required: true
  },
  goals: {
    type: String
  },

  workouts:[{
    title: String ,
    description: String,
    date: Date
   
  }],
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
