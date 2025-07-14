document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = urlParams.get('id');

    if (recipeId) {
        const recipe = getRecipeById(recipeId); // Get recipe using global function

        if (recipe) {
            document.getElementById('recipe-details-title').textContent = '${recipe.title} - CuisineQuest';
            document.getElementById('recipe-details-heading').textContent = recipe.title;
            document.getElementById('recipe-category').textContent = recipe.category;
            document.getElementById('recipe-prep-time').textContent = recipe.prep_time || 'N/A';
            document.getElementById('recipe-cook-time').textContent = recipe.cook_time || 'N/A';
            document.getElementById('recipe-servings').textContent = recipe.servings || 'N/A';
            document.getElementById('recipe-image').src = recipe.image_url || 'assets/images/default.png';
            document.getElementById('recipe-image').alt = recipe.title;

            const ingredientsList = document.getElementById('recipe-ingredients');
            ingredientsList.innerHTML = '';
            recipe.ingredients.forEach(ingredient => {
                const li = document.createElement('li');
                li.textContent = ingredient;
                ingredientsList.appendChild(li);
            });

            const instructionsList = document.getElementById('recipe-instructions');
            instructionsList.innerHTML = '';
            recipe.instructions.forEach(instruction => {
                const li = document.createElement('li');
                li.textContent = instruction;
                instructionsList.appendChild(li);
            });
        } else {
            document.getElementById('recipe-details-heading').textContent = 'Recipe Not Found';
            const container = document.querySelector('.recipe-details-container');
            if (container) {
                container.innerHTML += '<p style="text-align: center; margin-top: 20px;">The recipe you are looking for does not exist.</p>';
            }
        }
    } else {
        document.getElementById('recipe-details-heading').textContent = 'Invalid Recipe ID';
        const container = document.querySelector('.recipe-details-container');
        if (container) {
            container.innerHTML += '<p style="text-align: center; margin-top: 20px;">Please provide a valid recipe ID.</p>';
        }
    }
});