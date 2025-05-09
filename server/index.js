const express = require('express');
const cors = require('cors');
const { logReqRes } = require('./middlewares/log');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

const FRONTEND_URL = process.env.FRONTEND_URL;
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;

app.use(cors({
    origin: FRONTEND_URL,
}));
app.use(express.json());
app.use(logReqRes('log.txt'));




mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB Atlas!");
    })
    .catch(err => {
        console.log("Error connecting to MongoDB Atlas:", err);
    });


app.get('/api/ping', (req, res) => {
    res.status(200).send('pong');
});

app.use("/api/auth", require("./routes/auth"));
app.use('/api/measurements', require('./routes/measurementRoutes'));
app.use('/api/workout', require('./routes/workoutRoutes'));
app.use('/api/profile', require('./routes/profileRoutes'));
app.use('/api/settings', require('./routes/settingsRoutes'));
app.use('/api/user', require('./routes/user'));

app.listen(PORT, () => console.log(`Server running on port ${process.env.PORT || 4000}`));
