document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async function(event) {
            event.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            try {
                const response = await fetch('http://localhost:5000/api/users/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, password })
                });

                const data = await response.json();
                console.log(data);

                if (response.ok) {
                    alert('Login successful!');
                    // Optionally, redirect to another page
                    // window.location.href = '/home';
                } else {
                    alert('Error: ' + data.msg);
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred');
            }
        });
    } else {
        console.error('Login form element not found.');
    }
});
