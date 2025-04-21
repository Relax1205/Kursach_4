document.addEventListener('DOMContentLoaded', function() {
    // Translation map for ingredient IDs
    const ingredientTranslations = {
        'cottage_cheese': 'Творог', 'egg': 'Яйца', 'flour': 'Мука', 'honey': 'Мёд',
        'beans': 'Фасоль', 'onion': 'Лук', 'oil': 'Масло', 'apple': 'Яблоки',
        'chicken': 'Курица', 'cheese': 'Сыр', 'lemon': 'Лимоны', 'water': 'Вода',
        'milk': 'Молоко', 'rice': 'Рис', 'buckwheat': 'Гречка', 'carrot': 'Морковь',
        'beef': 'Говядина', 'potato': 'Картофель', 'pork': 'Свинина', 'bold_fish': 'Жирная рыба',
        'banana': 'Бананы'
    };

    // Favorites management
    function getFavoriteRecipes() {
        return JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    }
    function saveFavoriteRecipes(list) {
        localStorage.setItem('favoriteRecipes', JSON.stringify(list));
    }
    function removeFavorite(recipeData, liEl) {
        const favs = getFavoriteRecipes();
        const idx = favs.findIndex(r => r.title === recipeData.title);
        if (idx > -1) {
            favs.splice(idx, 1);
            saveFavoriteRecipes(favs);
        }
        if (liEl) liEl.remove();
    }

    const favListUl = document.getElementById('favorites-list-ul');
    const favorites = getFavoriteRecipes();

    // Populate favorites list
    if (favListUl) {
        if (favorites.length > 0) {
            favorites.forEach(recipe => {
                const li = document.createElement('li');
                li.style.position = 'relative';
                li.style.cursor = 'pointer';
                li.dataset.recipeTitle = recipe.title;
                li.addEventListener('click', showRecipeModal);

                // Title
                const titleEl = document.createElement('strong');
                titleEl.textContent = recipe.title;
                li.appendChild(titleEl);

                // Ingredients summary
                const ingEl = document.createElement('small');
                ingEl.classList.add('recipe-ingredients');
                const ingNames = recipe.requiredIngredients.map(id => ingredientTranslations[id] || id);
                ingEl.textContent = `Ингредиенты: ${ingNames.join(', ')}`;
                li.appendChild(ingEl);

                // Heart icon
                const heart = document.createElement('span');
                heart.classList.add('favorite-icon', 'favorited');
                heart.innerHTML = '♥';
                heart.addEventListener('click', function(e) {
                    e.stopPropagation();
                    removeFavorite(recipe, li);
                });
                li.appendChild(heart);

                favListUl.appendChild(li);
            });
        } else {
            favListUl.innerHTML = '<li>Избранных рецептов не найдено</li>';
        }
    }

    // Modal functionality (same as in list.js)
    function showRecipeModal(event) {
        const title = event.target.closest('li').dataset.recipeTitle;
        const recipe = getFavoriteRecipes().find(r => r.title === title);
        if (recipe) {
            const modal = document.getElementById('recipe-modal');
            const modalTitle = document.getElementById('modal-recipe-title');
            const modalContent = document.getElementById('modal-recipe-content');
            if (modal && modalTitle && modalContent) {
                modalTitle.textContent = recipe.title;
                modalContent.textContent = recipe.fullRecipe;
                modal.style.display = 'block';
            }
        }
    }
    function closeRecipeModal() {
        const modal = document.getElementById('recipe-modal');
        if (modal) modal.style.display = 'none';
    }

    const closeBtn = document.getElementById('modal-close-button');
    if (closeBtn) closeBtn.addEventListener('click', closeRecipeModal);
    window.addEventListener('click', function(e) {
        const modal = document.getElementById('recipe-modal');
        if (e.target === modal) closeRecipeModal();
    });
}); 