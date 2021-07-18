import { render, screen } from '@testing-library/react';
import Checkbox from '../Checkbox';

it('renders Checkbox component', () => {
  render(<Checkbox id="1" handleClick={jest.fn()} isChecked={true} />);
  const checkboxElement = screen.getByRole('checkbox')
  expect(checkboxElement).toBeInTheDocument();
});
