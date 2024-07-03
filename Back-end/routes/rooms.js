const express = require('express');
const router = express.Router();
const Room = require('../models/Room');
const User = require('../models/User');

// Create or join a room
router.post('/join', async (req, res) => {
    const { roomName, userId } = req.body;
    try {
        let room = await Room.findOne({ name: roomName });
        if (!room) {
            room = new Room({ name: roomName, participants: [userId] });
        } else {
            if (!room.participants.includes(userId)) {
                room.participants.push(userId);
            }
        }
        await room.save();
        res.json(room);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
