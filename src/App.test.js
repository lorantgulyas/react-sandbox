import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router';

test('renders learn react link', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
