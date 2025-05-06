const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  age: Number,
  gender: String,
  height: Number,
  weight: {
    type: Number,
    default: 0,
  },
  goal: String,
  workoutStreak: {
    type: Number,
    default: 0,
  },
  lastWorkoutDate: {
    type: Date,
  },
});
const User = mongoose.model("User", userSchema);

module.exports = User;