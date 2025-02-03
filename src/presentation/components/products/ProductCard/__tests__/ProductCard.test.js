import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from '../ProductCard';

describe('ProductCard', () => {
  it('renders product information correctly', () => {
    const product = {
      name: 'Test Product',
      category: { name: 'Test Category' }
    };
    render(<ProductCard product={product} />);
    expect(screen.getByText('Test Product')).toBeInTheDocument();
  });
}); 