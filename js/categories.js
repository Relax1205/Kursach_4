document.addEventListener('DOMContentLoaded', function() {
    localStorage.removeItem('selectedFoodCategory');
    localStorage.removeItem('selectedProducts');
    console.log('localStorage очищен при загрузке categories.html');
    let selectedCategory = localStorage.getItem('selectedFoodCategory') || '';
    if (selectedCategory) {
        const element = document.querySelector(`[data-category="${selectedCategory}"]`);
        if (element) {
            element.classList.add('category__card--selected');
        }
    }
    document.querySelectorAll('.category__card').forEach(card => {
        if (card.getAttribute('href') === 'meat.html') {
            return;
        }
        
        card.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.dataset.category;
            document.querySelectorAll('.category__card').forEach(c => {
                c.classList.remove('category__card--selected');
            });

            if (selectedCategory === category) {
                selectedCategory = '';
            } else {
                this.classList.add('category__card--selected');
                selectedCategory = category;
            }
            
            localStorage.setItem('selectedFoodCategory', selectedCategory);
        });
    });
    
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
    const meatCard = document.querySelector('.category__card[href="meat.html"]');
    if (meatCard) {}
}); 