import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { RecipeProvider } from './contexts/RecipeContext';
import './styles/index.css';

// Получение корневого элемента
const container = document.getElementById('root');
// Создание корневого элемента
const root = createRoot(container!);

// Рендеринг приложения с настройкой маршрутизации и контекста
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <RecipeProvider>
        <App />
      </RecipeProvider>
    </BrowserRouter>
  </React.StrictMode>
);