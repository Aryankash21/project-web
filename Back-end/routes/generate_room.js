const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

// Route to generate unique room ID
router.get('/generate-room-id', (req, res) => {
    const roomId = uuidv4();
    res.json({ roomId });
});

module.exports = router;
