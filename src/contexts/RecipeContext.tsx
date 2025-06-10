import React, { createContext, useContext, useState, useEffect } from 'react';
import { Recipe, Product, Category } from '../models/types';
import { allRecipes } from '../data/recipes';

// Интерфейс, описывающий структуру контекста рецептов
interface RecipeContextType {
  selectedCategory: string; // Выбранная категория блюд
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>; // Функция для изменения категории
  selectedProducts: Product[]; // Массив выбранных продуктов
  setSelectedProducts: React.Dispatch<React.SetStateAction<Product[]>>; // Функция для изменения списка продуктов
  favoriteRecipes: Recipe[]; // Массив избранных рецептов
  addToFavorites: (recipe: Recipe) => void; // Функция добавления в избранное
  removeFromFavorites: (recipeTitle: string) => void; // Функция удаления из избранного
  isInFavorites: (recipeTitle: string) => boolean; // Функция проверки наличия в избранном
  filteredRecipes: Recipe[]; // Отфильтрованные рецепты
  allCategories: Category[]; // Все доступные категории
}

// Создание контекста с начальным значением undefined
const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

// Провайдер контекста рецептов
export const RecipeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Состояния для хранения выбранной категории, продуктов и избранных рецептов
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);
  
  // Массив всех доступных категорий блюд
  const allCategories: Category[] = [
    { id: 'snack', name: 'Закуска' },
    { id: 'soup', name: 'Суп' },
    { id: 'drink', name: 'Напиток' },
    { id: 'main', name: 'Основное Блюдо' },
    { id: 'dessert', name: 'Десерт' },
    { id: 'garnish', name: 'Гарнир' },
    { id: 'bakery', name: 'Выпечка' }
  ];

  // Загрузка сохраненных данных при монтировании компонента
  useEffect(() => {
    const savedCategory = localStorage.getItem('selectedFoodCategory');
    if (savedCategory) {
      setSelectedCategory(savedCategory);
    }
    
    const savedProducts = localStorage.getItem('selectedProducts');
    if (savedProducts) {
      setSelectedProducts(JSON.parse(savedProducts));
    }
    
    const savedFavorites = localStorage.getItem('favoriteRecipes');
    if (savedFavorites) {
      setFavoriteRecipes(JSON.parse(savedFavorites));
    }
  }, []);
  
  // Сохранение выбранной категории в localStorage
  useEffect(() => {
    localStorage.setItem('selectedFoodCategory', selectedCategory);
  }, [selectedCategory]);
  
  // Сохранение выбранных продуктов в localStorage
  useEffect(() => {
    localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
  }, [selectedProducts]);
  
  // Сохранение избранных рецептов в localStorage
  useEffect(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  }, [favoriteRecipes]);
  
  // Функция добавления рецепта в избранное
  const addToFavorites = (recipe: Recipe) => {
    setFavoriteRecipes(prev => {
      if (prev.some(r => r.title === recipe.title)) return prev;
      return [...prev, recipe];
    });
  };
  
  // Функция удаления рецепта из избранного
  const removeFromFavorites = (recipeTitle: string) => {
    setFavoriteRecipes(prev => prev.filter(recipe => recipe.title !== recipeTitle));
  };
  
  // Функция проверки наличия рецепта в избранном
  const isInFavorites = (recipeTitle: string) => {
    return favoriteRecipes.some(recipe => recipe.title === recipeTitle);
  };
  
  // Фильтрация рецептов на основе выбранной категории и продуктов
  const filteredRecipes = allRecipes
    .filter(recipe => {
      // Проверка соответствия категории
      if (selectedCategory && recipe.category !== selectedCategory) {
        return false;
      }
      
      // Проверка наличия необходимых ингредиентов
      const selectedProductIds = selectedProducts.map(p => p.id);
      const matchingIngredients = recipe.requiredIngredients.filter(reqId => 
        selectedProductIds.includes(reqId)
      );
      
      return matchingIngredients.length > 0;
    })
    .map(recipe => {
      // Расчет процента соответствия ингредиентов
      const selectedProductIds = selectedProducts.map(p => p.id);
      const matchingIngredients = recipe.requiredIngredients.filter(reqId => 
        selectedProductIds.includes(reqId)
      );
      
      return {
        ...recipe,
        matchCount: matchingIngredients.length,
        matchPercent: (matchingIngredients.length / recipe.requiredIngredients.length) * 100
      };
    })
    .sort((a, b) => {
      // Сортировка по проценту соответствия
      return b.matchPercent - a.matchPercent;
    });
  
  // Предоставление контекста дочерним компонентам
  return (
    <RecipeContext.Provider value={{
      selectedCategory,
      setSelectedCategory,
      selectedProducts,
      setSelectedProducts,
      favoriteRecipes,
      addToFavorites,
      removeFromFavorites,
      isInFavorites,
      filteredRecipes,
      allCategories
    }}>
      {children}
    </RecipeContext.Provider>
  );
};

// Хук для использования контекста рецептов
export const useRecipe = () => {
  const context = useContext(RecipeContext);
  if (context === undefined) {
    throw new Error('useRecipe must be used within a RecipeProvider');
  }
  return context;
};