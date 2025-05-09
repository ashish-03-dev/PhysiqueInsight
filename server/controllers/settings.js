const User = require('../models/User');
const Measurement = require('../models/Measurement'); // if this exists
const WeeklyWorkout = require('../models/WeeklyWorkout');
const bcrypt = require('bcryptjs');

const updateEmail =  async (req, res) => {
    const { email } = req.body;
  
    if (!email) return res.status(400).json({ message: 'Email is required' });
  
    try {
      const user = await User.findById(req.user.id);
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      user.email = email;
      await user.save();
  
      res.json({ message: 'Email updated successfully', email: user.email });
    } catch (err) {
      console.error('Error updating email:', err.message);
      res.status(500).json({ message: 'Server error' });
    }
  }

  const updatePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;
  
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Current and new passwords are required' });
    }
  
    try {
      const user = await User.findById(req.user.id);
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) return res.status(401).json({ message: 'Incorrect current password' });
  
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
      await user.save();
  
      res.json({ message: 'Password updated successfully' });
    } catch (err) {
      console.error('Error updating password:', err.message);
      res.status(500).json({ message: 'Server error' });
    }
  }

  const deleteAccount =  async (req, res) => {
    try {
      const userId = req.user.id;
  
      await User.findByIdAndDelete(userId);
      await Measurement.deleteMany({ user: userId }); // optional, if you store measurements
      await WeeklyWorkout.deleteMany({ user: userId });
  
      res.json({ success: true, message: 'Account deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to delete user' });
    }
  }


  module.exports = {
    updateEmail,
    updatePassword,
    deleteAccount,
  }