const express = require('express');
const cors = require('cors');
const { logReqRes } = require('./middlewares/log');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

// const frontEnd = "http://192.168.0.102:3000"; // for local testing

const frontendURL = process.env.REACT_APP_FRONTEND_URL;

app.use(cors({
    origin: frontendURL,
}));
app.use(express.json());
app.use(logReqRes('log.txt'));

// const mongoURI = "mongodb://localhost:27017/physique-insight"; // for local testing
// const port = 4000; // for local testing

mongoose.connect(process.env.MONGO_URI)
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

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT || 4000}`));
