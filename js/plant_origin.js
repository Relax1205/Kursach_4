/**
 * Модуль страницы продуктов растительного происхождения
 */
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация страницы продуктов
    // Используем уникальный ключ localStorage
    ProductPage.init('selectedPlantOriginProduct', 'product__card'); 

    // Если нужны стрелки навигации, их тоже можно инициализировать:
    // ProductPage.initArrows(arrowConfig); 
    // Убедитесь, что переменная arrowConfig определена, если раскомментируете
}); 