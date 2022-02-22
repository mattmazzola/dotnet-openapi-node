import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Articles header', () => {
  render(<App />);
  const articlesHeader = screen.getByText(/Articles/i);
  expect(articlesHeader).toBeInTheDocument();
});
