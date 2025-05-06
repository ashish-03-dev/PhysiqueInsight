const WeeklyWorkout = require('../models/WeeklyWorkout'); // Adjust the path as necessary

exports.saveWeeklyWorkout = async (req, res) => {
  try {
    const userId = req.user._id; // Secure and reliable
    const { plan } = req.body;

    console.log('Received data:', req.body);

    if (!userId || !Array.isArray(plan)) {
      return res.status(400).json({ success: false, message: 'Invalid data' });
    }

    const newPlan = new WeeklyWorkout({
      user: userId,
      plan, // array of { day, workouts: [...] }
      date: new Date()
    });

    await newPlan.save();

    res.json({ success: true, message: 'Workout plan saved', plan: newPlan.plan });
  } catch (err) {
    console.error('Error saving weekly plan:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}
exports.getWeeklyWorkout = async (req, res) => {
  try {
    const userId = req.user._id;  // Get user ID from the authenticated user (set in the middleware)

    // Fetch the weekly workout plan for the user
    const weeklyWorkout = await WeeklyWorkout.findOne({ user: userId }).sort({ date: -1 });

    if (!weeklyWorkout) {
      return res.status(404).json({ message: 'No weekly workout plan found for this user.' });
    }

    // Send the workout plan
    res.status(200).json({ plan: weeklyWorkout.plan });
  } catch (error) {
    console.error('Error fetching weekly workout plan:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Example: Endpoint to get today's workout only
exports.getTodaysWorkout = async (req, res) => {
  try {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    const userId = req.user._id;  // Get user ID from the authenticated user (set in the middleware)

    // Fetch the weekly workout plan for the user
    const weeklyWorkout = await WeeklyWorkout.findOne({ user: userId }).sort({ date: -1 });

    if (!weeklyWorkout) {
      return res.status(404).json({ message: 'No weekly workout plan found for this user.' });
    }

    const todayWorkout = weeklyWorkout.plan.find(d => d.day === today);
    if (todayWorkout) {
      res.json(todayWorkout);
    } else {
      res.json({ message: 'No workout planned for today' });
    }
  } catch (error) {
    console.error('Error fetching today\'s workout:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}