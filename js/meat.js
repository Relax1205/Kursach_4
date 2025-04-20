/**
 * Модуль страницы мяса
 */
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация страницы продуктов
    ProductPage.init('selectedMeatType', 'product__card');

    // Конфигурация стрелок для страницы мяса
    const arrowConfig = [
        {
            selector: '.nav-arrow--to-chicken',
            targetCategory: 'chicken'
        },
        {
            selector: '.nav-arrow--to-categories',
            targetPage: 'categories.html'
        },
        {
            selector: '.nav-arrow--to-vegetables',
            targetPage: 'vegetables.html'
        }
    ];

    // Инициализация навигационных стрелок
    ProductPage.initArrows(arrowConfig);
}); 