/**
 * Модуль страницы мяса
 */
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация страницы продуктов
    ProductPage.init('selectedMeatType', 'product__card');

    // Инициализация навигационных стрелок
    ProductPage.initArrows(arrowConfig);
}); 