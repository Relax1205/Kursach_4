// Точка входа в приложение
import { StrictMode } from 'react';
// Импорт функции создания корневого элемента
import { createRoot } from 'react-dom/client';
// Импорт главного компонента приложения
import App from './App';
// Импорт глобальных стилей
import './index.css';

// Создание корневого элемента и рендеринг приложения
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
