const generateRoomIdBtn = document.getElementById('generate-room-id-btn');
const roomIdInput = document.getElementById('room-id');

generateRoomIdBtn.addEventListener('click', async () => {
    try {
        const response = await fetch('http://localhost:5000/api/generate-room-id');
        if (!response.ok) {
            throw new Error('Failed to generate room ID');
        }
        const data = await response.json();
        roomIdInput.value = data.roomId; // Update the input field with the generated room ID
    } catch (error) {
        console.error(error);
        alert('Failed to generate room ID');
    }
});
