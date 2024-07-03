// Import the Firebase modules
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, push, onValue } from "firebase/database";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyChhkmf0GjZkx8wss1730fAc_OiLUOp3iY",
    authDomain: "collaborative-code-edito-6feaf.firebaseapp.com",
    projectId: "collaborative-code-edito-6feaf",
    storageBucket: "collaborative-code-edito-6feaf.appspot.com",
    messagingSenderId: "897451324445",
    appId: "1:897451324445:web:1ed56db5cf1304770682f4",
    measurementId: "G-H92VT4VZV3"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

// Function to initialize the app
function initApp() {
    // Prompt user for their name (for example)
    var userName = prompt("Enter your name:");

    // Add user to the active users list in Firebase
    var usersRef = ref(database, 'users');
    var userRef = push(usersRef);
    userRef.set({
        name: userName
    });

    // Remove user from the list when they leave
    window.addEventListener('beforeunload', function() {
        userRef.remove();
    });

    // Update user list in real-time
    onValue(usersRef, function(snapshot) {
        var users = snapshot.val();
        var userList = document.getElementById('users');
        userList.innerHTML = '';
        for (var id in users) {
            var li = document.createElement('li');
            li.textContent = users[id].name;
            userList.appendChild(li);
        }
    });

    // Font size selection (example)
    var fontSizeSelector = document.getElementById('font-size');
    fontSizeSelector.addEventListener('change', function() {
        var fontSize = fontSizeSelector.value + 'px';
        // Example: Change font size of code editor
        // Replace with your actual implementation
        // codeEditor.getWrapperElement().style.fontSize = fontSize;
        // codeEditor.refresh();
    });

    // Kick user button (example)
    var kickUserBtn = document.getElementById('kick-user-btn');
    kickUserBtn.addEventListener('click', function() {
        var activeUsersList = document.getElementById('users');
        var selectedUser = activeUsersList.querySelector('li:hover');
        if (selectedUser) {
            var userId = selectedUser.getAttribute('data-id');
            var userToRemove = ref(usersRef, userId);
            userToRemove.remove();
        } else {
            alert('Please select a user to kick.');
        }
    });

    // Add file button (placeholder functionality)
    var addFileBtn = document.getElementById('add-file-btn-toolbar');
    addFileBtn.addEventListener('click', addFileHandler);

    function addFileHandler() {
        var fileName = prompt('Enter file name:');
        if (fileName) {
            var filesList = document.getElementById('files');
            var li = document.createElement('li');
            li.textContent = fileName;
            filesList.appendChild(li);
        }
    }

    // Chat functionality (example)
    var chatInput = document.getElementById('chat-input');
    var sendMessageBtn = document.getElementById('send-message-btn');
    var chatMessages = document.getElementById('chat-messages');

    sendMessageBtn.addEventListener('click', function() {
        var message = chatInput.value.trim();
        if (message) {
            var chatMessage = userName + ': ' + message;
            var messageRef = ref(database, 'messages');
            push(messageRef).set({
                content: chatMessage
            });
            chatInput.value = '';
        }
    });

    // Listen for new chat messages
    onValue(ref(database, 'messages'), function(snapshot) {
        var message = snapshot.val().content;
        var messageElement = document.createElement('div');
        messageElement.textContent = message;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight; // Auto-scroll to bottom
    });
}

// Call the initApp function when the page loads
document.addEventListener('DOMContentLoaded', function() {
    initApp();
});
