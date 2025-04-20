/**
 * Модуль страницы категорий
 */
document.addEventListener('DOMContentLoaded', function() {
    // Загружаем сохраненную выбранную категорию
    let selectedCategory = localStorage.getItem('selectedFoodCategory') || '';
    
    // Применяем выделение к сохраненной категории
    if (selectedCategory) {
        const element = document.querySelector(`[data-category="${selectedCategory}"]`);
        if (element) {
            element.classList.add('category__card--selected');
        }
    }

    // Обработчик клика по категории (кроме мяса, которое обрабатывается отдельно)
    document.querySelectorAll('.category__card').forEach(card => {
        // Пропускаем карточку мяса
        if (card.getAttribute('href') === 'meat.html') {
            return;
        }
        
        card.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.dataset.category;
            
            // Снимаем выделение со всех категорий
            document.querySelectorAll('.category__card').forEach(c => {
                c.classList.remove('category__card--selected');
            });
            
            // Если кликнули на уже выбранную категорию - снимаем выбор
            if (selectedCategory === category) {
                selectedCategory = '';
            } else {
                // Иначе выбираем новую категорию
                this.classList.add('category__card--selected');
                selectedCategory = category;
            }
            
            // Сохраняем выбранную категорию
            localStorage.setItem('selectedFoodCategory', selectedCategory);
        });
    });
    
    // Функция обработки перехода на другую страницу
    const handlePageTransition = function(e) {
        e.preventDefault();
        const targetUrl = this.getAttribute('href');
        // Мгновенный переход без анимации
        window.location.href = targetUrl;
    };
    
    // Применяем обработчик к кнопке с мясом и стрелке
    const meatCard = document.querySelector('.category__card[href="meat.html"]');
    if (meatCard) {
        meatCard.addEventListener('click', handlePageTransition);
    }
    
    const navArrow = document.querySelector('.nav-arrow--to-meat');
    if (navArrow) {
        navArrow.addEventListener('click', handlePageTransition);
    }
}); 