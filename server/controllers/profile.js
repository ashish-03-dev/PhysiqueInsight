const User = require('../models/User');

const getUserData = async (req, res) => {
    const userId = req.user.id;
    try {
        const user = await User.findById(req.user.id).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (err) {
        console.error('Error fetching user profile:', err.message);
        res.status(500).json({ message: 'Server error' });
    }
}

const updateUserData = async (req, res) => {
    const { name, email, age, gender, height, weight, goal } = req.body;

    try {
        const user = await User.findById(req.user.id);

        if (!user) return res.status(404).json({ message: 'User not found' });

        // Update fields only if they exist in request
        if (name) user.name = name;
        if (age !== undefined) user.age = age;
        if (gender) user.gender = gender;
        if (height !== undefined) user.height = height;
        if (weight !== undefined) user.weight = weight;
        if (goal) user.goal = goal;

        const updatedUser = await user.save();

        res.json({
            id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email, 
            age: updatedUser.age,
            gender: updatedUser.gender,
            height: updatedUser.height,
            weight: updatedUser.weight,
            goal: updatedUser.goal,
        });
    } catch (err) {
        console.error('Error updating user:', err.message);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = {
    getUserData,
    updateUserData
}