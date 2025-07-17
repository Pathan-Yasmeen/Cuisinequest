document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    const registerMessage = document.getElementById('register-message');

    registerForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission

        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();
        const confirmPassword = document.getElementById('confirm-password').value.trim();

        // Basic client-side validation
        if (username === '' || password === '' || confirmPassword === '') {
            registerMessage.textContent = 'All fields are required.';
            return;
        }

        if (password !== confirmPassword) {
            registerMessage.textContent = 'Passwords do not match.';
            return;
        }

        // Get existing users from localStorage or initialize an empty array
        let users = JSON.parse(localStorage.getItem('users')) || [];

        // Check if username already exists
        if (users.some(user => user.username === username)) {
            registerMessage.textContent = 'Username already taken.';
            return;
        }

        // Add new user (without hashing for now, as per instructions)
        const newUser = {
            id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1, // Simple ID generation
            username: username,
            password: password // IMPORTANT: NOT SECURE for real apps!
        };
        users.push(newUser);

        // Save updated users array to localStorage
        localStorage.setItem('users', JSON.stringify(users));

        registerMessage.textContent = 'Registration successful! You can now log in.';
        registerMessage.style.color = 'green'; // Make success message green
        registerForm.reset(); // Clear the form
        // Optionally redirect to login page after a short delay
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
    });
});