import { render, screen } from '@testing-library/react';
import RoutesApp from './RoutesApp';

test('renders learn react link', () => {
  render(<RoutesApp />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
