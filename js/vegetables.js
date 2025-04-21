/**
 * Модуль страницы овощей/фруктов
 */
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация страницы продуктов
    // Используем другой ключ localStorage, чтобы не конфликтовать со страницей мяса
    ProductPage.init('selectedVegetableOrFruit', 'product__card'); 

    // Если нужны стрелки навигации, их тоже можно инициализировать:
    // ProductPage.initArrows(arrowConfig); 
    // Убедитесь, что переменная arrowConfig определена, если раскомментируете
}); 