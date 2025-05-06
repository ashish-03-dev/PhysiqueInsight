const User = require('../models/User');
const { generateMotivationalMessage } = require('../utils/generateMotivationalMessage');


const markComplete = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);

        const today = new Date().toDateString();
        const lastDate = user.lastWorkoutDate ? new Date(user.lastWorkoutDate).toDateString() : null;

        if (lastDate === today) {
            return res.status(400).json({ message: 'Workout already marked for today' });
        }

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toDateString();

        if (lastDate === yesterdayStr) {
            user.workoutStreak += 1;
        } else {
            user.workoutStreak = 1;
        }

        user.lastWorkoutDate = new Date();
        await user.save();

        res.status(201).json({ message: 'Workout completed!', streak: user.workoutStreak });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}


const overview = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select('name workoutStreak weight lastWorkoutDate');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const motivation = generateMotivationalMessage(user); // optional helper function
        res.status(200).json({
            name: user.name,
            weight: user.weight,
            workoutStreak: user.workoutStreak,
            lastWorkoutDate: user.lastWorkoutDate,
            motivation,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = {
    markComplete,
    overview,
}