import { render, screen } from '@testing-library/react';
import { RecipeProvider } from '../../contexts/RecipeContext';
import RecipeList from '../../components/RecipeList';

describe('RecipeList Component', () => {
  beforeEach(() => {
    render(
      <RecipeProvider>
        <RecipeList />
      </RecipeProvider>
    );
  });

  it('displays selected category and products section', () => {
    expect(screen.getByText('Ваш выбор:')).toBeInTheDocument();

    // Ищем текст "Категория:" с помощью функции
    expect(screen.getByText((content) => content.startsWith('Категория:'))).toBeInTheDocument();

    expect(screen.getByText('Продукты:')).toBeInTheDocument();
  });

  it('displays recipes section', () => {
    expect(screen.getByText('Рецепты:')).toBeInTheDocument();
  });

  it('shows "no recipes" message when no recipes match', () => {
    expect(screen.getByText('Подходящих рецептов не найдено')).toBeInTheDocument();
  });
});