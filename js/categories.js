/**
 * Модуль страницы категорий
 */
document.addEventListener('DOMContentLoaded', function() {
    // --- Очистка предыдущего выбора при загрузке страницы категорий ---
    localStorage.removeItem('selectedFoodCategory');
    localStorage.removeItem('selectedProducts');
    console.log('localStorage очищен при загрузке categories.html'); // Для отладки
    // --------------------------------------------------------------------

    // Загружаем сохраненную выбранную категорию (теперь всегда будет пустой или null)
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
    
    // Находим стрелку для перехода к мясу
    const nextButton = document.querySelector('.nav-arrow--right');
    if (nextButton) {
        nextButton.addEventListener('click', function(e) {
            if (!selectedCategory) {
                e.preventDefault();
                const warningElement = document.getElementById('category-warning');
                if (warningElement) {
                    warningElement.textContent = 'Пожалуйста, выберите категорию перед переходом!';
                    warningElement.style.display = 'block';
                    setTimeout(() => {
                        warningElement.style.display = 'none';
                    }, 3000);
                } else {
                    alert('Пожалуйста, выберите категорию перед переходом!');
                }
            } else {
                const targetUrl = this.getAttribute('href');
                window.location.href = targetUrl; 
            }
        });
    }
    
    // Удаляем старый обработчик для карточки 'meat'
    const meatCard = document.querySelector('.category__card[href="meat.html"]');
    if (meatCard) {
        // Так как обработчик был простой анонимной функцией, его нельзя удалить так просто.
        // Но так как он больше не нужен и элемент не существует, это не проблема.
        // Если бы существовал элемент meat.html как категория, нужно было бы переделать
    }
}); 