// Simulate database using an array and localStorage
let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
let users = JSON.parse(localStorage.getItem('users')) || [];

// Pre-populate some dummy recipes if none exist
if (recipes.length === 0) {
    recipes = [
        {
            id: 1,
            title: 'Classic Pancakes',
            category: 'breakfast',
            ingredients: [
                '1 ½ cups all-purpose flour',
                '3 ½ teaspoons baking powder',
                '1 teaspoon salt',
                '1 tablespoon white sugar',
                '1 ¼ cups milk',
                '1 egg',
                '3 tablespoons melted butter'
            ],
            instructions: [
                'In a large bowl, sift together the flour, baking powder, salt, and sugar.',
                'In a separate bowl, beat the egg, then stir in the milk and melted butter.',
                'Pour the milk mixture into the flour mixture; beat until smooth.',
                'Heat a lightly oiled griddle or frying pan over medium high heat.',
                'Pour or scoop the batter onto the griddle, using approximately 1/4 cup for each pancake.',
                'Brown on both sides and serve hot.'
            ],
            image_url: 'assets/images/pancakes.jpg',
            prep_time: '10 mins',
            cook_time: '15 mins',
            servings: '4'
        },
        {
            id: 2,
            title: 'Spaghetti Carbonara',
            category: 'dinner',
            ingredients: [
                '200g spaghetti',
                '100g pancetta or smoked bacon',
                '2 large eggs',
                '50g Pecorino Romano cheese (or Parmesan)',
                'Black pepper',
                'Salt'
            ],
            instructions: [
                'Bring a large pot of salted water to a boil. Add spaghetti and cook according to package directions until al dente.',
                'While spaghetti cooks, chop pancetta into small pieces. Cook in a large skillet over medium heat until crispy. Remove pancetta and set aside, leaving rendered fat in the pan.',
                'In a bowl, whisk eggs with grated Pecorino Romano and plenty of black pepper. Add a splash of pasta water to make a creamy sauce.',
                'Drain spaghetti, reserving about 1 cup of pasta water. Add spaghetti to the skillet with pancetta fat. Toss to coat.',
                'Remove skillet from heat. Quickly pour the egg mixture over the spaghetti, tossing continuously to prevent eggs from scrambling. Add a little reserved pasta water if needed to create a creamy sauce.',
                'Stir in the cooked pancetta. Serve immediately with extra cheese and black pepper.'
            ],
            image_url: 'assets/images/carbonara.jpg',
            prep_time: '15 mins',
            cook_time: '20 mins',
            servings: '2'
        },
        {
            id: 3,
            title: 'Chicken Salad Sandwich',
            category: 'lunch',
            ingredients: [
                '2 cups cooked chicken, shredded',
                '1/2 cup mayonnaise',
                '1/4 cup finely chopped celery',
                '2 tablespoons finely chopped red onion',
                '1 tablespoon fresh parsley, chopped',
                'Salt and pepper to taste',
                'Bread or lettuce for serving'
            ],
            instructions: [
                'In a medium bowl, combine shredded chicken, mayonnaise, celery, red onion, and parsley.',
                'Mix well until all ingredients are combined.',
                'Season with salt and pepper to taste.',
                'Serve on your favorite bread, toasted, or in lettuce cups for a lighter option.'
            ],
            image_url: 'assets/images/chicken-salad.jpg',
            prep_time: '10 mins',
            cook_time: '0 mins',
            servings: '2-3'
        },
        {
            id: 4,
            title: 'Fruit Smoothie',
            category: 'snacks',
            ingredients: [
                '1 ripe banana',
                '1 cup mixed berries (fresh or frozen)',
                '1/2 cup Greek yogurt',
                '1/2 cup milk (dairy or non-dairy)',
                '1 tablespoon honey or maple syrup (optional)',
                'Ice cubes (optional)'
            ],
            instructions: [
                'Combine banana, mixed berries, Greek yogurt, milk, and honey (if using) in a blender.',
                'Blend until smooth and creamy. If too thick, add more milk. If too thin, add more frozen fruit or ice cubes.',
                'Pour into a glass and serve immediately.'
            ],
            image_url: 'assets/images/smoothie.jpg',
            prep_time: '5 mins',
            cook_time: '0 mins',
            servings: '1'
        },
    ];
    localStorage.setItem('recipes', JSON.stringify(recipes));
}

// Function to save recipes to localStorage
function saveRecipes() {
    localStorage.setItem('recipes', JSON.stringify(recipes));
}

// Function to save users to localStorage
function saveUsers() {
    localStorage.setItem('users', JSON.stringify(users));
}

// Global function to get all recipes
function getAllRecipes() {
    return recipes;
}

// Global function to add a recipe (simulated)
function addRecipe(recipe) {
    const newId = recipes.length > 0 ? Math.max(...recipes.map(r => r.id)) + 1 : 1;
    recipe.id = newId;
    recipes.push(recipe);
    saveRecipes();
    console.log('Recipe added:', recipe);
}

// Global function to get a recipe by ID
function getRecipeById(id) {
    return recipes.find(recipe => recipe.id === parseInt(id));
}

// Function to display recipes on the homepage (featured or by category)
function displayRecipes(containerId, recipeList) {
    const container = document.getElementById(containerId);
    if (!container) return; // Exit if container doesn't exist (e.g., on login page)
    container.innerHTML = ''; // Clear previous content

    if (recipeList.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #666;">No recipes to display yet.</p>';
        return;
    }

    recipeList.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');
        recipeCard.innerHTML = `
            <img src="${recipe.image_url || 'assets/images/default.png'}" alt="${recipe.title}">
            <h3>${recipe.title}</h3>
            <p><strong>Category:</strong> ${recipe.category}</p>
            <a href="recipe-details.html?id=${recipe.id}">View Recipe</a>
        `;
        container.appendChild(recipeCard);
    });
}

// --- Home Page Specific Logic ---
document.addEventListener('DOMContentLoaded', () => {
    const heroSection = document.getElementById('hero');
    const categoriesGrid = document.querySelector('.categories-grid');
    const featuredRecipesGrid = document.querySelector('#featured-recipes .recipes-grid');

    if (heroSection) { // Only run if on index.html
        // Display featured recipes (e.g., the first 3)
        displayRecipes('featured-recipes .recipes-grid', recipes.slice(0, 3));

        // Add event listeners for category cards
        if (categoriesGrid) {
            categoriesGrid.addEventListener('click', (event) => {
                const card = event.target.closest('.category-card');
                if (card) {
                    const category = card.dataset.category;
                    window.location.href = 'search.html?category=${category}';
                }
            });
        }
    }
});