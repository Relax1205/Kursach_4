import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecipe } from '../contexts/RecipeContext';
import { categories } from '../data/products';
import '../styles/categoryGrid.css';

// Компонент сетки категорий
const CategoryGrid: React.FC = () => {
  // Получение данных и функций из контекста рецептов
  const { selectedCategory, setSelectedCategory } = useRecipe();
  // Состояние для отображения предупреждения
  const [showWarning, setShowWarning] = useState(false);
  // Хук для навигации
  const navigate = useNavigate();

  // Обработчик клика по кнопке "Далее"
  const handleNextClick = () => {
    if (!selectedCategory) {
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 3000);
    } else {
      navigate('/meat');
    }
  };

  // Обработчик выбора категории
  const handleCategorySelect = (categoryId: string) => {
    if (selectedCategory === categoryId) {
      setSelectedCategory('');
    } else {
      setSelectedCategory(categoryId);
    }
  };

  return (
    <div className="categories">
      <img 
        src={require('../assets/backgrounds/book.png')} 
        alt="Книга с блюдами" 
        className="categories__book-background" 
      />

      <div className="categories__container">
        {showWarning && (
          <div id="category-warning" className="warning-message">
            Пожалуйста, выберите категорию перед переходом!
          </div>
        )}

        {categories.map((category, index) => (
          <div 
            key={category.id} 
            className={`category category--position-${index + 1}`}
          >
            <div 
              className={`category__card ${selectedCategory === category.id ? 'category__card--selected' : ''}`}
              onClick={() => handleCategorySelect(category.id)}
            >
              <img 
                src={category.imgSrc} 
                alt={category.name} 
                className="category__image" 
              />
            </div>
            <h2 className="category__title">{category.name}</h2>
          </div>
        ))}

        <div className="nav-arrow nav-arrow--right" onClick={handleNextClick}>
          <div className="nav-arrow__symbol">›</div>
        </div>
      </div>
    </div>
  );
};

export default CategoryGrid;