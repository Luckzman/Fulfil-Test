import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  // beforeEach(() => {
  //   jest.mock("./__mocks__/axios")
  // })
  it('should be able to render data from endpoint', async () => {
    render(<App />);
    // const rowElements = await screen.findAllByTestId('rows')
    // expect(rowElements).toBeInTheDocument();
  })
});
