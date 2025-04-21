/**
 * Модуль страницы списка продуктов (финальной)
 */
document.addEventListener('DOMContentLoaded', function() {
    const categoryContainer = document.getElementById('selected-category');
    const productListContainer = document.getElementById('selected-products-list');
    const recipeListUl = document.getElementById('recipe-list-ul');

    // --- Данные о рецептах (НОВЫЙ НАБОР) ---
    const allRecipes = [
        // Закуска
        { category: 'snack', title: 'Творожные сырники с медом', requiredIngredients: ['cottage_cheese', 'egg', 'flour', 'honey'], fullRecipe: 'Рецепт сырников...' },
        { category: 'snack', title: 'Фасоль с луком', requiredIngredients: ['beans', 'onion', 'flour'], fullRecipe: 'Рецепт фасоли с луком...' },
        { category: 'snack', title: 'Яблочные оладьи', requiredIngredients: ['apple', 'flour', 'egg'], fullRecipe: 'Рецепт яблочных оладий...' },
        { category: 'snack', title: 'Куриные рулетики с сыром', requiredIngredients: ['chicken', 'cheese', 'flour'], fullRecipe: 'Рецепт куриных рулетиков...' },
        
        // Напиток
        { category: 'drink', title: 'Лимонный напиток с медом', requiredIngredients: ['lemon', 'honey'], fullRecipe: 'Рецепт лимонного напитка...' }, // Вода проигнорирована
        { category: 'drink', title: 'Молочный коктейль с медом', requiredIngredients: ['milk', 'honey'], fullRecipe: 'Рецепт молочного коктейля...' },
        { category: 'drink', title: 'Яблочный сок (свежевыжатый)', requiredIngredients: ['apple'], fullRecipe: 'Рецепт яблочного сока...' },
        { category: 'drink', title: 'Рисовый напиток с лимоном', requiredIngredients: ['rice', 'lemon'], fullRecipe: 'Рецепт рисового напитка...' }, // Вода проигнорирована

        // Десерт
        { category: 'dessert', title: 'Яблочный пирог с медом', requiredIngredients: ['apple', 'flour', 'egg', 'honey'], fullRecipe: 'Рецепт яблочного пирога...' },
        { category: 'dessert', title: 'Творожная запеканка с яблоками', requiredIngredients: ['cottage_cheese', 'egg', 'flour', 'apple'], fullRecipe: 'Рецепт творожной запеканки...' },
        { category: 'dessert', title: 'Гречневые печенья с медом', requiredIngredients: ['buckwheat', 'flour', 'honey', 'egg'], fullRecipe: 'Рецепт гречневых печений...' },
        { category: 'dessert', title: 'Морковные кексы с медом', requiredIngredients: ['carrot', 'flour', 'honey', 'egg'], fullRecipe: 'Рецепт морковных кексов...' },

        // Основное блюдо
        { category: 'main', title: 'Говядина с картофелем и морковью', requiredIngredients: ['beef', 'potato', 'carrot', 'flour'], fullRecipe: 'Рецепт говядины...' },
        { category: 'main', title: 'Курица с картошкой и луком', requiredIngredients: ['chicken', 'potato', 'onion', 'flour'], fullRecipe: 'Рецепт курицы с картошкой...' },
        { category: 'main', title: 'Свинина с рисом', requiredIngredients: ['pork', 'rice', 'flour'], fullRecipe: 'Рецепт свинины с рисом...' },
        { category: 'main', title: 'Жирная рыба с картофелем и морковью', requiredIngredients: ['bold_fish', 'potato', 'carrot', 'flour'], fullRecipe: 'Рецепт жирной рыбы...' },

        // Гарнир
        { category: 'garnish', title: 'Гречка с маслом', requiredIngredients: ['buckwheat', 'flour'], fullRecipe: 'Рецепт гречки с маслом...' },
        { category: 'garnish', title: 'Рис с морковью', requiredIngredients: ['rice', 'carrot', 'flour'], fullRecipe: 'Рецепт риса с морковью...' },
        { category: 'garnish', title: 'Картофель, запеченный с луком', requiredIngredients: ['potato', 'onion', 'flour'], fullRecipe: 'Рецепт запеченного картофеля...' },
        { category: 'garnish', title: 'Фасоль с картошкой', requiredIngredients: ['beans', 'potato', 'flour'], fullRecipe: 'Рецепт фасоли с картошкой...' },

        // Выпечка
        { category: 'bakery', title: 'Банановые маффины', requiredIngredients: ['banana', 'flour', 'egg', 'honey'], fullRecipe: 'Рецепт банановых маффинов...' },
        { category: 'bakery', title: 'Яблочные пирожки', requiredIngredients: ['apple', 'flour', 'egg'], fullRecipe: 'Рецепт яблочных пирожков...' },
        { category: 'bakery', title: 'Творожные лепешки с медом', requiredIngredients: ['cottage_cheese', 'flour', 'egg', 'honey'], fullRecipe: 'Рецепт творожных лепешек...' },
        { category: 'bakery', title: 'Картофельные пирожки с курицей', requiredIngredients: ['potato', 'chicken', 'flour'], fullRecipe: 'Рецепт картофельных пирожков...' }
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

    // --- Функции для модального окна (ОБНОВЛЕНА для лучшего отображения) ---
    function showRecipeModal(event) {
        const clickedTitle = event.target.closest('li').dataset.recipeTitle;
        const recipeData = allRecipes.find(r => r.title === clickedTitle);
        // Получаем выбранные продукты из localStorage еще раз или используем переменную `selectedProducts` из внешней области видимости
        const currentSelectedProducts = JSON.parse(localStorage.getItem('selectedProducts')) || []; 

        if (recipeData) {
            const modal = document.getElementById('recipe-modal');
            const modalTitle = document.getElementById('modal-recipe-title');
            const modalContent = document.getElementById('modal-recipe-content');

            if (modal && modalTitle && modalContent) {
                modalTitle.textContent = recipeData.title;

                // Формируем HTML для содержимого
                let contentHtml = '<h3>Необходимые ингредиенты:</h3><ul>';
                recipeData.requiredIngredients.forEach(reqId => {
                    const product = currentSelectedProducts.find(p => p.id === reqId);
                    const productName = product ? product.name : reqId; // Используем имя, если нашли, иначе ID
                    contentHtml += `<li>${productName}</li>`;
                });
                contentHtml += '</ul>';

                contentHtml += '<hr><h3>Рецепт приготовления:</h3>'; // Разделитель и заголовок для рецепта
                // Добавляем сам рецепт (пока это плейсхолдер)
                contentHtml += `<p style="white-space: pre-wrap;">${recipeData.fullRecipe.replace(/\n/g, '<br>')}</p>`; // Используем pre-wrap для сохранения переносов строк

                modalContent.innerHTML = contentHtml; // Используем innerHTML
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