/**
 * Модуль страницы списка продуктов (финальной)
 */
document.addEventListener('DOMContentLoaded', function() {
    const categoryContainer = document.getElementById('selected-category');
    const productListContainer = document.getElementById('selected-products-list');
    const recipeListUl = document.getElementById('recipe-list-ul');

    // --- Данные о рецептах (ВОЗВРАЩЕНА СТАРАЯ СТРУКТУРА!) ---
    const allRecipes = [
        { category: 'snack', title: 'Рулетики из баклажанов с творогом и чесноком', requiredIngredients: ['cottage_cheese', 'vegetable_oil'], fullRecipe: 'Рецепт рулетиков...' },
        { category: 'snack', title: 'Фаршированные яйца с сыром и морковью', requiredIngredients: ['egg', 'cheese', 'carrot'], fullRecipe: 'Рецепт фаршированных яиц...' },
        { category: 'snack', title: 'Салат с курицей, яблоками и сметаной', requiredIngredients: ['chicken', 'apple', 'sour_cream'], fullRecipe: 'Рецепт салата...' },
        { category: 'snack', title: 'Холодная закуска из тофу и фасоли с лимонным соусом', requiredIngredients: ['tofu', 'beans', 'lemon'], fullRecipe: 'Рецепт закуски из тофу...' },
        { category: 'drink', title: 'Бананово-молочный коктейль с мёдом', requiredIngredients: ['banana', 'milk', 'honey'], fullRecipe: 'Рецепт коктейля...' },
        { category: 'drink', title: 'Освежающий лимонад с мёдом', requiredIngredients: ['lemon', 'honey'], fullRecipe: 'Рецепт лимонада...' },
        { category: 'drink', title: 'Яблочный смузи с творогом', requiredIngredients: ['apple', 'cottage_cheese', 'milk'], fullRecipe: 'Рецепт смузи...' },
        { category: 'drink', title: 'Морковно-лимонный фреш', requiredIngredients: ['carrot', 'lemon'], fullRecipe: 'Рецепт фреша...' },
        { category: 'dessert', title: 'Запечённые яблоки с мёдом и творогом', requiredIngredients: ['apple', 'honey', 'cottage_cheese'], fullRecipe: 'Рецепт запеченных яблок...' },
        { category: 'dessert', title: 'Банановый пудинг с молоком', requiredIngredients: ['banana', 'milk', 'egg'], fullRecipe: 'Рецепт пудинга...' },
        { category: 'dessert', title: 'Лимонный крем с творогом', requiredIngredients: ['lemon', 'cottage_cheese', 'egg'], fullRecipe: 'Рецепт крема...' },
        { category: 'dessert', title: 'Морковный десерт с мёдом', requiredIngredients: ['carrot', 'honey'], fullRecipe: 'Рецепт морковного десерта...' },
        { category: 'soup', title: 'Куриный суп с картофелем и морковью', requiredIngredients: ['chicken', 'potato', 'carrot', 'onion'], fullRecipe: 'Рецепт куриного супа...' },
        { category: 'soup', title: 'Суп из фасоли с томатом и чесноком', requiredIngredients: ['beans', 'onion', 'vegetable_oil'], fullRecipe: 'Рецепт супа из фасоли...' },
        { category: 'soup', title: 'Рыбный суп из нежирной рыбы с картошкой', requiredIngredients: ['low-fat_fish', 'potato', 'onion'], fullRecipe: 'Рецепт рыбного супа...' },
        { category: 'soup', title: 'Суп-пюре из моркови и молока', requiredIngredients: ['carrot', 'milk', 'vegetable_oil'], fullRecipe: 'Рецепт супа-пюре...' },
        { category: 'main', title: 'Свинина, тушёная с луком и морковью', requiredIngredients: ['pork', 'onion', 'carrot'], fullRecipe: 'Рецепт свинины...' },
        { category: 'main', title: 'Запечённая куриная грудка с сыром и сметаной', requiredIngredients: ['chicken', 'cheese', 'sour_cream'], fullRecipe: 'Рецепт куриной грудки...' },
        { category: 'main', title: 'Тушёная баранина с картошкой и луком', requiredIngredients: ['mutton', 'potato', 'onion'], fullRecipe: 'Рецепт баранины...' },
        { category: 'main', title: 'Жирная рыба, запечённая с лимоном', requiredIngredients: ['bold_fish', 'lemon'], fullRecipe: 'Рецепт жирной рыбы...' },
        { category: 'garnish', title: 'Картофельное пюре с молоком', requiredIngredients: ['potato', 'milk'], fullRecipe: 'Рецепт пюре...' },
        { category: 'garnish', title: 'Гречка с жареным луком', requiredIngredients: ['buckwheat', 'onion', 'vegetable_oil'], fullRecipe: 'Рецепт гречки...' },
        { category: 'garnish', title: 'Рис с морковью и специями', requiredIngredients: ['rice', 'carrot', 'vegetable_oil'], fullRecipe: 'Рецепт риса...' },
        { category: 'garnish', title: 'Макароны с сыром', requiredIngredients: ['pasta', 'cheese', 'vegetable_oil'], fullRecipe: 'Рецепт макарон...' },
        { category: 'bakery', title: 'Сырники из творога', requiredIngredients: ['cottage_cheese', 'egg', 'honey'], fullRecipe: 'Рецепт сырников...' },
        { category: 'bakery', title: 'Банановые маффины', requiredIngredients: ['banana', 'egg', 'vegetable_oil'], fullRecipe: 'Рецепт маффинов...' },
        { category: 'bakery', title: 'Пирог с яблоками и сметаной', requiredIngredients: ['apple', 'sour_cream', 'egg'], fullRecipe: 'Рецепт пирога...' },
        { category: 'bakery', title: 'Лимонный кекс', requiredIngredients: ['lemon', 'egg', 'vegetable_oil'], fullRecipe: 'Рецепт кекса...' } 
    ];
    // ---------------------------------------------------------------------------

    const selectedCategoryId = localStorage.getItem('selectedFoodCategory') || '';
    const selectedProducts = JSON.parse(localStorage.getItem('selectedProducts')) || [];
    const selectedProductIds = selectedProducts.map(p => p.id);

    // --- Отладка --- 
    console.log("--- Отладка списка рецептов ---");
    console.log("Выбранная категория ID:", selectedCategoryId);
    console.log("Выбранные продукты IDs:", selectedProductIds);
    console.log("Всего рецептов для проверки:", allRecipes.length);
    // ---------------

    const categoryNames = { snack: 'Закуска', soup: 'Суп', drink: 'Напиток', main: 'Основное Блюдо', dessert: 'Десерт', garnish: 'Гарнир', bakery: 'Выпечка' };

    // Отображаем категорию
    if (categoryContainer) {
        const categoryName = categoryNames[selectedCategoryId] || selectedCategoryId || 'Не выбрана';
        categoryContainer.innerHTML = `<p>Категория: ${categoryName}</p>`;
    }

    // Отображаем выбранные продукты (как было)
    if (productListContainer) {
        productListContainer.innerHTML = '';
        if (selectedProducts.length > 0) {
             selectedProducts.forEach(product => {
                 const listItem = document.createElement('li');

                 // Добавляем изображение ПЕРВЫМ, если есть src
                 if (product.imgSrc && product.imgSrc.trim() !== '') { 
                     const img = document.createElement('img');
                     img.src = product.imgSrc;
                     img.alt = product.name;
                     img.classList.add('selected-product-image');
                     img.title = product.imgSrc; 
                     listItem.appendChild(img); // Добавляем img первым
                 } else {
                     console.warn(`Image source missing for product: ${product.name}`);
                     // Можно добавить плейсхолдер для выравнивания, если нужно
                     const placeholder = document.createElement('span');
                     placeholder.style.display = 'inline-block';
                     placeholder.style.width = '30px'; // Ширина как у картинки
                     placeholder.style.height = '30px';
                     placeholder.style.marginRight = '10px'; // Отступ как у картинки
                     listItem.appendChild(placeholder);
                 }

                 // Создаем span для текста ВТОРЫМ
                 const nameSpan = document.createElement('span');
                 nameSpan.classList.add('product-name-text');
                 nameSpan.textContent = product.name;
                 listItem.appendChild(nameSpan); // Добавляем span вторым
                
                 productListContainer.appendChild(listItem);
             });
        } else {
            productListContainer.innerHTML = '<li>Продукты не выбраны</li>';
        }
    }

    // Фильтруем и отображаем рецепты
    if (recipeListUl) {
        recipeListUl.innerHTML = '';
        console.log("--- Фильтрация рецептов ---");
        const suitableRecipes = allRecipes.filter(recipe => {
            console.log(`Проверка рецепта: "${recipe.title}" (Категория: ${recipe.category})`);
            // 1. Проверка категории
            const categoryMatch = recipe.category === selectedCategoryId;
            if (!categoryMatch) {
                console.log(`   -> Категория не совпадает (нужна: ${selectedCategoryId})`);
                return false;
            }

            // 2. Проверка наличия ВСЕХ необходимых ингредиентов (возвращена старая проверка)
            console.log(`   Необходимые ID: ${recipe.requiredIngredients.join(', ')}`);
            const ingredientsMatch = recipe.requiredIngredients.every(reqId => {
                const included = selectedProductIds.includes(reqId);
                if (!included) {
                    console.log(`      -> Отсутствует ID: ${reqId}`);
                }
                return included;
            });
            
            if (!ingredientsMatch) {
                 console.log(`   -> Не все ингредиенты найдены.`);
                 return false;
            }

            console.log(`   -> РЕЦЕПТ ПОДХОДИТ`);
            return true; // Прошел обе проверки
        });
        console.log("--- Фильтрация завершена ---");
        console.log("Найденные подходящие рецепты:", suitableRecipes);

        if (suitableRecipes.length > 0) {
            suitableRecipes.forEach(recipe => {
                const li = document.createElement('li');
                li.style.cursor = 'pointer';
                li.dataset.recipeTitle = recipe.title;
                li.addEventListener('click', showRecipeModal);

                // Создаем элемент для названия
                const titleElement = document.createElement('strong');
                titleElement.textContent = recipe.title;
                li.appendChild(titleElement);

                // Создаем элемент для ингредиентов
                const ingredientsElement = document.createElement('small');
                ingredientsElement.classList.add('recipe-ingredients'); // Класс для стилизации

                // Пытаемся получить названия ингредиентов (упрощенно)
                const ingredientNames = recipe.requiredIngredients.map(ing => {
                    const foundProduct = selectedProducts.find(p => p.id === ing);
                    return foundProduct ? foundProduct.name : ing; // Имя, если нашли, иначе ID
                });
                ingredientsElement.textContent = `Ингредиенты: ${ingredientNames.join(', ')}`;
                li.appendChild(ingredientsElement);

                recipeListUl.appendChild(li);
            });
        } else {
            recipeListUl.innerHTML = '<li>Подходящих рецептов не найдено</li>';
        }
    }

    // --- Функции для модального окна (ВОЗВРАЩЕНА СТАРАЯ ВЕРСИЯ) ---
    function showRecipeModal(event) {
        const clickedTitle = event.target.closest('li').dataset.recipeTitle;
        const recipeData = allRecipes.find(r => r.title === clickedTitle);

        if (recipeData) {
            const modal = document.getElementById('recipe-modal');
            const modalTitle = document.getElementById('modal-recipe-title');
            const modalContent = document.getElementById('modal-recipe-content');

            if (modal && modalTitle && modalContent) {
                modalTitle.textContent = recipeData.title;
                // Форматируем простой список ID ингредиентов
                const ingredientsText = recipeData.requiredIngredients.join(', '); 
                modalContent.textContent = `Ингредиенты: ${ingredientsText}\n\n${recipeData.fullRecipe}`; // Выводим ID + текст рецепта (плейсхолдер)
                modal.style.display = 'block';
            }
        }
    }

    function closeRecipeModal() {
        const modal = document.getElementById('recipe-modal');
        if (modal) {
            modal.style.display = 'none'; // Скрываем окно
        }
    }

    // --- Добавляем обработчик для кнопки закрытия модального окна (нужно будет добавить кнопку в HTML) ---
    const closeButton = document.getElementById('modal-close-button');
    if (closeButton) {
        closeButton.addEventListener('click', closeRecipeModal);
    }

     // Закрытие модального окна по клику вне его
     window.addEventListener('click', function(event) {
        const modal = document.getElementById('recipe-modal');
        if (event.target == modal) {
             closeRecipeModal();
        }
    });

}); 