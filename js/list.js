/**
 * Модуль страницы списка продуктов (финальной)
 */
document.addEventListener('DOMContentLoaded', function() {
    const categoryContainer = document.getElementById('selected-category');
    const productListContainer = document.getElementById('selected-products-list');

    // Получаем данные из localStorage
    const selectedCategoryId = localStorage.getItem('selectedFoodCategory') || 'Не выбрана';
    const selectedProducts = JSON.parse(localStorage.getItem('selectedProducts')) || [];

    // Объект для перевода ID категории в название
    const categoryNames = {
        snack: 'Закуска',
        soup: 'Суп',
        drink: 'Напиток',
        main: 'Основное Блюдо',
        dessert: 'Десерт',
        garnish: 'Гарнир',
        bakery: 'Выпечка'
        // Добавьте другие категории, если они есть
    };

    // Отображаем выбранную категорию
    if (categoryContainer) {
        const categoryName = categoryNames[selectedCategoryId] || selectedCategoryId; // Используем ID, если название не найдено
        categoryContainer.innerHTML = `<p>Категория: ${categoryName}</p>`;
    }

    // Отображаем список выбранных продуктов
    if (productListContainer) {
        productListContainer.innerHTML = ''; // Очищаем предыдущий список
        if (selectedProducts.length > 0) {
            selectedProducts.forEach(product => {
                const listItem = document.createElement('li');
                
                // Создаем span для текста ПЕРЕД изображением
                const nameSpan = document.createElement('span');
                nameSpan.classList.add('product-name-text'); // Класс для стилизации
                nameSpan.textContent = product.name;
                listItem.appendChild(nameSpan); // Добавляем span первым

                // Добавляем изображение, если есть src
                if (product.imgSrc && product.imgSrc.trim() !== '') { // Добавил проверку на непустой src
                    const img = document.createElement('img');
                    img.src = product.imgSrc;
                    img.alt = product.name; // Добавляем alt текст
                    img.classList.add('selected-product-image'); // Класс для стилизации
                    // Добавляем title для отладки - при наведении покажет путь
                    img.title = product.imgSrc; 
                    listItem.appendChild(img); // Добавляем img вторым
                } else {
                    // Если нет imgSrc, можно добавить плейсхолдер или ничего не делать
                    console.warn(`Image source missing for product: ${product.name}`);
                }
                
                productListContainer.appendChild(listItem);
            });
        } else {
            productListContainer.innerHTML = '<li>Продукты не выбраны</li>';
        }
    }

    // Если нужны стрелки навигации, их тоже можно инициализировать:
    // ProductPage.initArrows(arrowConfig); 
    // Убедитесь, что переменная arrowConfig определена, если раскомментируете
}); 