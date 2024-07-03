const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { connectMongoDB } = require('./connect.js');
const userRouter = require('./routes/users');
const roomRouter = require('./routes/generate_room'); // Import the room routes
const firebaseAdmin = require('firebase-admin');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectMongoDB('mongodb://localhost:27017/mydatabase')
    .then(() => console.log('MongoDB connected!'))
    .catch(err => console.error('MongoDB connection error:', err.message || err.stack));

// Initialize Firebase Admin SDK (for server-side operations)
const serviceAccount = require('./path/to/firebase/serviceAccountKey.json');
firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
    databaseURL: "https://your-project-id.firebaseio.com"
});

// Define Routes
app.use('/api/users', userRouter);
app.use('/api', roomRouter); // Use the room routes for any request starting with /api

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
