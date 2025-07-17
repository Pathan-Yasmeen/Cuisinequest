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
           const recipeImage=document.getElementById('recipe-image'); 
           if(recipeImage){
            recipeImage.src=recipe.image_url;
            recipeImage.alt=recipe.title;
            recipeImage.onerror=function()
            {this.src ='assets/images/default.png';};
           }

// Declare ingredientsList inside this block
            const ingredientsList = document.getElementById('ingredients-list');
            if (ingredientsList) { 
                ingredientsList.innerHTML = ''; 
                if (recipe.ingredients && Array.isArray(recipe.ingredients)) { 
                    recipe.ingredients.forEach(ingredient => { 
                        const li = document.createElement('li');
                        li.textContent = ingredient;
                        ingredientsList.appendChild(li);
                    });
                } else {
                    console.warn("Ingredients data missing or not an array for recipe:", recipe.title);
                    ingredientsList.innerHTML = '<li>Ingredients not available.</li>';
                }
            } else {
                console.error("HTML element with ID 'ingredients-list' not found!");
            }
            // Declare instructionsList inside this block
            const instructionsList = document.getElementById('instructions-list'); 
            if (instructionsList) { 
                instructionsList.innerHTML = ''; 
                if (recipe.instructions && Array.isArray(recipe.instructions)) { 
                    recipe.instructions.forEach(instruction => { 
                        const li = document.createElement('li');
                        li.textContent = instruction;
                        instructionsList.appendChild(li);
                    });
                } else {
                    console.warn("Instructions data missing or not an array for recipe:", recipe.title);
                    instructionsList.innerHTML = '<li>Instructions not available.</li>';
                }
            } else {
                console.error("HTML element with ID 'instructions-list' not found!");
            }
        } else {
            console.error("Recipe not found with ID:", recipeId);
        }
    } else {
        console.warn("No recipe ID in URL for recipe-details.html");
    }
});



































           
