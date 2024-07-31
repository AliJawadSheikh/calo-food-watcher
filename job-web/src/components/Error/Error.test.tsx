import { render, screen, fireEvent } from '@testing-library/react';
import { Error } from './Error';
import { useNavigate } from 'react-router-dom';
import '@testing-library/jest-dom';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

test('renders error code and message, and navigates home on button click', () => {
  const mockNavigate = jest.fn();
  (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

  render(<Error errorCode="404" errorMessage="Page Not Found" />);

  expect(screen.getByText('404')).toBeInTheDocument();
  expect(screen.getByText('Page Not Found')).toBeInTheDocument();

  const button = screen.getByRole('button', { name: /Go to Home/i });
  expect(button).toBeInTheDocument();

  fireEvent.click(button);

  expect(mockNavigate).toHaveBeenCalledWith('/');
});
