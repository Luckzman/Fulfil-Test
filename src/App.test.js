import { render, screen } from '@testing-library/react';
import App from './App';
import {mockResponse} from './__mocks__/axios'

describe('App Component', () => {
  beforeEach(() => {
    jest.mock("./__mocks__/axios")
  })
  it('should be able to render data from endpoint', async () => {
    render(<App />);
    const rowElements = await screen.findAllByTestId('rows')
    expect(rowElements.length).toBe(mockResponse.data.length);
  })
});
