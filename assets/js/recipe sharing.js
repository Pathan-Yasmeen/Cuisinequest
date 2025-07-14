document.addEventListener('DOMContentLoaded', () => {
    const recipeForm = document.getElementById('recipe-form');

    if (recipeForm) {
        recipeForm.addEventListener('submit', (event) => {
            event.preventDefault();

            // Check if user is logged in (optional, but good for sharing)
            const loggedInUser = sessionStorage.getItem('loggedInUser');
            if (!loggedInUser) {
                alert('Please login to share a recipe.');
                window.location.href = 'login.html';
                return;
            }

            const newRecipe = {
                title: document.getElementById('recipe-title').value,
                category: document.getElementById('category').value,
                // Split ingredients by new line and trim each line
                ingredients: document.getElementById('ingredients').value.split('\n').map(item => item.trim()).filter(item => item !== ''),
                // Split instructions by new line and trim each line
                instructions: document.getElementById('instructions').value.split('\n').map(item => item.trim()).filter(item => item !== ''),
                image_url: document.getElementById('image-url').value || 'assets/images/default.png',
                prep_time: document.getElementById('prep-time').value,
                cook_time: document.getElementById('cook-time').value,
                servings: document.getElementById('servings').value,
                // user_id: JSON.parse(loggedInUser).id // If you track which user added which recipe
            };

            // Call the global addRecipe function from app.js
            addRecipe(newRecipe);
            alert('Recipe shared successfully!');
            recipeForm.reset(); // Clear the form
            window.location.href = 'index.html'; // Redirect or stay
        });
    }
});