require('dotenv').config(); // Load environment variables

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(bodyParser.json());

// Use the MongoDB URI from environment variables
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected successfully');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });

// Use user routes
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000; // Default to port 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
