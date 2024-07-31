import { render, screen } from '@testing-library/react';
import { NotFoundPage } from './NotFoundPage';
import '@testing-library/jest-dom';

jest.mock('../../components/Error/Error', () => ({
  Error: ({
    errorCode,
    errorMessage,
  }: {
    errorCode: string;
    errorMessage: string;
  }) => (
    <div>
      <h1>{errorCode}</h1>
      <p>{errorMessage}</p>
    </div>
  ),
}));

describe('NotFoundPage', () => {
  test('renders Error component with correct props', () => {
    render(<NotFoundPage />);

    expect(screen.getByText('404 - Not Found')).toBeInTheDocument();
    expect(
      screen.getByText('The resource you are looking for does not exist')
    ).toBeInTheDocument();
  });
});
