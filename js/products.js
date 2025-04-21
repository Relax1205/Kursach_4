/**
 * Базовый модуль для работы с продуктами
 */
const ProductPage = {
    storageKey: 'selectedProducts', // Глобальный ключ для всех продуктов

    /**
     * Инициализация страницы продуктов для множественного выбора
     * @param {string} productCardSelector - селектор карточки продукта
     */
    init: function(productCardSelector) {
        let selectedProducts = JSON.parse(localStorage.getItem(this.storageKey)) || [];
        
        // Применяем выделение к сохраненным продуктам
        selectedProducts.forEach(product => {
            const element = document.querySelector(`.${productCardSelector}[data-category="${product.id}"]`);
            if (element) {
                element.classList.add(`${productCardSelector}--selected`);
            }
        });

        // Обработчик клика по продукту
        document.querySelectorAll(`.${productCardSelector}`).forEach(card => {
            card.addEventListener('click', (e) => {
                e.preventDefault();
                const categoryId = card.dataset.category;
                const titleElement = card.closest('.product')?.querySelector('.product__title');
                const categoryName = titleElement ? titleElement.textContent : categoryId;
                const imageElement = card.querySelector('.product__image'); // Находим изображение
                const imageSrc = imageElement ? imageElement.getAttribute('src') : ''; // Получаем его src

                selectedProducts = JSON.parse(localStorage.getItem(this.storageKey)) || [];
                const productIndex = selectedProducts.findIndex(p => p.id === categoryId);

                if (productIndex > -1) {
                    // Продукт уже выбран - удаляем
                    selectedProducts.splice(productIndex, 1);
                    card.classList.remove(`${productCardSelector}--selected`);
                } else {
                    // Продукт не выбран - добавляем объект с id, name и imgSrc
                    selectedProducts.push({ id: categoryId, name: categoryName, imgSrc: imageSrc });
                    card.classList.add(`${productCardSelector}--selected`);
                }
                
                // Сохраняем обновленный список
                localStorage.setItem(this.storageKey, JSON.stringify(selectedProducts));
            });
        });
    },

    /**
     * Инициализация навигационных стрелок
     * @param {Object} config - конфигурация стрелок
     */
    initArrows: function(config) {
        // Для каждой конфигурации стрелки
        for (const arrow of config) {
            const arrowElement = document.querySelector(arrow.selector);
            if (arrowElement) {
                arrowElement.addEventListener('click', function(e) {
                    e.preventDefault();

                    // Если стрелка ведет на категорию, кликаем по ней
                    if (arrow.targetCategory) {
                        const targetElement = document.querySelector(`[data-category="${arrow.targetCategory}"]`);
                        if (targetElement) targetElement.click();
                    }
                    
                    // Если стрелка ведет на другую страницу, переходим
                    if (arrow.targetPage) {
                        window.location.href = arrow.targetPage;
                    }
                });
            }
        }
    }
}; 