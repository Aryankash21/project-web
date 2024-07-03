const mongoose = require("mongoose");

async function connectMongoDB(uri) {
    try {
        await mongoose.connect(uri);
        console.log("MongoDB connected!");
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
}

module.exports = { connectMongoDB };
