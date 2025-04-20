/**
 * Базовый модуль для работы с продуктами
 */
const ProductPage = {
    /**
     * Инициализация страницы продуктов
     * @param {string} storageKey - ключ для локального хранилища
     * @param {string} productCardSelector - селектор карточки продукта
     */
    init: function(storageKey, productCardSelector) {
        // Загружаем сохраненную выбранную категорию
        let selectedCategory = localStorage.getItem(storageKey) || '';
        
        // Применяем выделение к сохраненной категории
        if (selectedCategory) {
            const element = document.querySelector(`[data-category="${selectedCategory}"]`);
            if (element) {
                element.classList.add(`${productCardSelector}--selected`);
            }
        }

        // Обработчик клика по категории
        document.querySelectorAll(`.${productCardSelector}`).forEach(card => {
            card.addEventListener('click', function(e) {
                e.preventDefault();
                const category = this.dataset.category;
                
                // Снимаем выделение со всех категорий
                document.querySelectorAll(`.${productCardSelector}`).forEach(c => {
                    c.classList.remove(`${productCardSelector}--selected`);
                });
                
                // Если кликнули на уже выбранную категорию - снимаем выбор
                if (selectedCategory === category) {
                    selectedCategory = '';
                } else {
                    // Иначе выбираем новую категорию
                    this.classList.add(`${productCardSelector}--selected`);
                    selectedCategory = category;
                }
                
                // Сохраняем выбранную категорию
                localStorage.setItem(storageKey, selectedCategory);
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