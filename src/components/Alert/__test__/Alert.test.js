import { render, screen } from '@testing-library/react';
import { Alert } from '../Alert';

it('renders Alert component', () => {
  render(<Alert children="alert me" onClose={jest.fn()} />);
  const alertElement = screen.getByTestId('alert')
  expect(alertElement).toBeInTheDocument();
});
