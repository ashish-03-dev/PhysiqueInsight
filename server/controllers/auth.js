const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

async function handleUserSignup(req, res) {
    const { name, password, email } = req.body;
    if (!email || !password || !name) {
        return res.status(400).json({ error: "All fields are required" });
    }
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ error: "Email already registered" });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
        name,
        password: hashedPassword,
        email,
    });
    
    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, {
        expiresIn: '7d',
    });
    
    console.log("POST " + req.path + " - User Signed up");
    return res.status(201).json({ message: "User created", token });
}

async function handleUserLogin(req, res) {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid email or password" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: "Invalid password" });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
        expiresIn: '7d',
    });

    console.log("POST " + req.path + " - User Logged in");
    return res.status(200).json({ token });
}


module.exports = {
    handleUserSignup,
    handleUserLogin,
}

