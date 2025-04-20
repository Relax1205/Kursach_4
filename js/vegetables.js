/**
 * Модуль страницы овощей
 */
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация страницы продуктов
    ProductPage.init('selectedVegetableType', 'product__card');

    // Конфигурация стрелок для страницы овощей
    const arrowConfig = [
        {
            selector: '.nav-arrow--to-cucumber',
            targetCategory: 'cucumber'
        },
        {
            selector: '.nav-arrow--to-categories',
            targetPage: 'categories.html'
        },
        {
            selector: '.nav-arrow--to-meat',
            targetPage: 'meat.html'
        }
    ];

    // Инициализация навигационных стрелок
    ProductPage.initArrows(arrowConfig);
}); 