document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');

    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent default form submission

            const usernameInput = document.getElementById('username').value;
            const passwordInput = document.getElementById('password').value;

            // In a real app, you'd send this to a server for validation and secure hashing
            // For now, simulate user storage from app.js
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(u => u.username === usernameInput && u.password === passwordInput); // Unsafe for real app!

            if (user) {
                alert('Login Successful!');
                // Set a flag in session storage or local storage to indicate login status
                sessionStorage.setItem('loggedInUser', JSON.stringify(user));
                window.location.href = 'index.html'; // Redirect to home page
            } else {
                alert('Invalid Username or Password.');
            }
        });
    }
});