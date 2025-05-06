const mongoose = require('mongoose');

const WorkoutSchema = new mongoose.Schema({
  exercise: String,
  sets: Number,
  reps: Number
});

const DayPlanSchema = new mongoose.Schema({
  day: String,
  workouts: [WorkoutSchema]
});

const WeeklyWorkoutSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  plan: [DayPlanSchema],
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('WeeklyWorkout', WeeklyWorkoutSchema);
