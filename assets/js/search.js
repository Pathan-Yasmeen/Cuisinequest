document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const recipesResultsGrid = document.getElementById('recipes-results-grid');
    const noResultsMessage = document.getElementById('no-results');

    // Function to filter and display recipes
    function performSearch(query, categoryFilter = '') {
        const allRecipes = getAllRecipes(); // Get all recipes from app.js
        let filteredRecipes = allRecipes;

        if (query) {
            const lowerCaseQuery = query.toLowerCase();
            filteredRecipes = filteredRecipes.filter(recipe =>
                recipe.title.toLowerCase().includes(lowerCaseQuery) ||
                recipe.ingredients.some(ing => ing.toLowerCase().includes(lowerCaseQuery)) ||
                recipe.category.toLowerCase().includes(lowerCaseQuery)
            );
        }

        if (categoryFilter) {
            filteredRecipes = filteredRecipes.filter(recipe => recipe.category.toLowerCase() === categoryFilter.toLowerCase());
        }

        displayRecipes('recipes-results-grid', filteredRecipes); // Use the global displayRecipes

        if (filteredRecipes.length === 0) {
            noResultsMessage.style.display = 'block';
        } else {
            noResultsMessage.style.display = 'none';
        }
    }

    // Event listener for search button
    if (searchButton) {
        searchButton.addEventListener('click', () => {
            performSearch(searchInput.value);
        });
    }

    // Event listener for Enter key in search input
    if (searchInput) {
        searchInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                performSearch(searchInput.value);
            }
        });
    }

    // Check for category query parameter on page load (e.g., from homepage category click)
    const urlParams = new URLSearchParams(window.location.search);
    const categoryFromUrl = urlParams.get('category');
    const queryFromUrl = urlParams.get('query');

    if (categoryFromUrl) {
        performSearch('', categoryFromUrl);
        // Optionally update the search input to show the category that was searched
        if (searchInput) {
            searchInput.value = categoryFromUrl;
        }
    } else if (queryFromUrl) {
        performSearch(queryFromUrl);
        if (searchInput) {
            searchInput.value = queryFromUrl;
        }
    } else {
        // Display all recipes initially if no specific search/category
        performSearch('');
    }
});