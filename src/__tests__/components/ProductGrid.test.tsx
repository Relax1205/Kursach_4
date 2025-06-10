// ProductGrid.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { RecipeProvider } from '../../contexts/RecipeContext';
import ProductGrid from '../../components/ProductGrid';

const mockProducts = [
  { id: '1', name: 'Test Product 1', imgSrc: 'test1.png' },
  { id: '2', name: 'Test Product 2', imgSrc: 'test2.png' }
];

describe('ProductGrid Component', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <RecipeProvider>
          <ProductGrid 
            products={mockProducts}
            prevPage="/prev"
            nextPage="/next"
          />
        </RecipeProvider>
      </BrowserRouter>
    );
  });

  it('renders all products', () => {
    expect(screen.getByText('Test Product 1')).toBeInTheDocument();
    expect(screen.getByText('Test Product 2')).toBeInTheDocument();
  });

  it('toggles product selection on click', () => {
    const productCard = screen.getByTestId('product-card-1');

    fireEvent.click(productCard);
    expect(productCard).toHaveClass('product__card--selected');

    fireEvent.click(productCard);
    expect(productCard).not.toHaveClass('product__card--selected');
  });

  it('renders navigation arrows', () => {
    expect(screen.getAllByText('›')).toHaveLength(2);
  });
});