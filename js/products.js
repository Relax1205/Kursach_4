/**
 * Базовый модуль для работы с продуктами
 */
const ProductPage = {
    storageKey: 'selectedProducts',
    init: function(productCardSelector) {
        let selectedProducts = JSON.parse(localStorage.getItem(this.storageKey)) || [];
        selectedProducts.forEach(product => {
            const element = document.querySelector(`.${productCardSelector}[data-category="${product.id}"]`);
            if (element) {
                element.classList.add(`${productCardSelector}--selected`);
            }
        });

        document.querySelectorAll(`.${productCardSelector}`).forEach(card => {
            card.addEventListener('click', (e) => {
                e.preventDefault();
                const categoryId = card.dataset.category;
                const titleElement = card.closest('.product')?.querySelector('.product__title');
                const categoryName = titleElement ? titleElement.textContent : categoryId;
                const imageElement = card.querySelector('.product__image');
                const imageSrc = imageElement ? imageElement.getAttribute('src') : '';

                selectedProducts = JSON.parse(localStorage.getItem(this.storageKey)) || [];
                const productIndex = selectedProducts.findIndex(p => p.id === categoryId);

                if (productIndex > -1) {
                    selectedProducts.splice(productIndex, 1);
                    card.classList.remove(`${productCardSelector}--selected`);
                } else {
                    selectedProducts.push({ id: categoryId, name: categoryName, imgSrc: imageSrc });
                    card.classList.add(`${productCardSelector}--selected`);
                }
                
                localStorage.setItem(this.storageKey, JSON.stringify(selectedProducts));
            });
        });
    },

    initArrows: function(config) {
        for (const arrow of config) {
            const arrowElement = document.querySelector(arrow.selector);
            if (arrowElement) {
                arrowElement.addEventListener('click', function(e) {
                    e.preventDefault();

                    if (arrow.targetCategory) {
                        const targetElement = document.querySelector(`[data-category="${arrow.targetCategory}"]`);
                        if (targetElement) targetElement.click();
                    }
                    
                    if (arrow.targetPage) {
                        window.location.href = arrow.targetPage;
                    }
                });
            }
        }
    }
}; 