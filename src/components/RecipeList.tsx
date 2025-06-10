import React, { useState } from 'react';
import { useRecipe } from '../contexts/RecipeContext';
import { Recipe } from '../models/types';
import { ingredientTranslations } from '../data/products';
import RecipeModal from './RecipeModal';
import '../styles/recipeList.css';

// Функциональный компонент списка рецептов
const RecipeList: React.FC = () => {
  // Получение данных и функций из контекста рецептов
  const { filteredRecipes, selectedCategory, selectedProducts, isInFavorites, addToFavorites, removeFromFavorites } = useRecipe();
  // Состояние для хранения выбранного рецепта
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  // Состояние для управления видимостью модального окна
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Словарь переводов категорий
  const categoryTranslations: Record<string, string> = {
    snack: 'Закуска',
    soup: 'Суп',
    drink: 'Напиток',
    main: 'Основное Блюдо',
    dessert: 'Десерт',
    garnish: 'Гарнир',
    bakery: 'Выпечка'
  };

  // Обработчик клика по рецепту
  const handleRecipeClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
  };
  
  // Функция закрытия модального окна
  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  // Обработчик добавления/удаления из избранного
  const toggleFavorite = (e: React.MouseEvent, recipe: Recipe) => {
    e.stopPropagation();
    
    if (isInFavorites(recipe.title)) {
      removeFromFavorites(recipe.title);
    } else {
      addToFavorites(recipe);
    }
  };
  
  return (
    <div className="recipe-page">
      <img 
        src={require('../assets/backgrounds/book.png')} 
        alt="Книга с блюдами" 
        className="product-page__book-background" 
      />
      <div className="product-page__container">
        <div className="selected-list">
          <h2>Ваш выбор:</h2>
          <div className="selected-category">
            <p>
              Категория: {selectedCategory 
                ? categoryTranslations[selectedCategory] 
                : 'Не выбрана'}
            </p>
          </div>
          <h3>Продукты:</h3>
          <ul className="selected-products-list">
            {selectedProducts.length > 0 ? (
              selectedProducts.map(product => (
                <li key={product.id}>
                  <img 
                    src={product.imgSrc} 
                    alt={product.name} 
                    className="selected-product-image" 
                  />
                  <span className="product-name-text">{product.name}</span>
                </li>
              ))
            ) : (
              <li>Продукты не выбраны</li>
            )}
          </ul>
        </div>
        
        <div className="recipe-list">
          <h2>Рецепты:</h2>
          <ul id="recipe-list-ul">
            {filteredRecipes.length > 0 ? (
              filteredRecipes.map(recipe => (
                <li 
                  key={recipe.title} 
                  onClick={() => handleRecipeClick(recipe)}
                >
                  <strong>{recipe.title}</strong>
                  <small className="recipe-ingredients">
                    Ингредиенты: {recipe.requiredIngredients.map(ing => (
                      ingredientTranslations[ing as keyof typeof ingredientTranslations] || ing
                    )).join(', ')}
                  </small>
                  <span 
                    className={`favorite-icon ${isInFavorites(recipe.title) ? 'favorited' : ''}`}
                    onClick={(e) => toggleFavorite(e, recipe)}
                  >
                    {isInFavorites(recipe.title) ? '♥' : '♡'}
                  </span>
                </li>
              ))
            ) : (
              <li>Подходящих рецептов не найдено</li>
            )}
          </ul>
        </div>
      </div>
      
      <RecipeModal 
        recipe={selectedRecipe} 
        isOpen={isModalOpen} 
        onClose={closeModal} 
      />
    </div>
  );
};

export default RecipeList;