import { render, screen, fireEvent } from '@testing-library/react';
import JobForm from './JobForm';
import { useJobs } from '../../context/JobContext';
import '@testing-library/jest-dom';

jest.mock('../../context/JobContext', () => ({
  useJobs: jest.fn(),
}));

describe('JobForm', () => {
  test('renders JobForm and triggers createJob on form submission', () => {
    const mockCreateJob = jest.fn();
    (useJobs as jest.Mock).mockReturnValue({ createJob: mockCreateJob });

    render(<JobForm />);

    const button = screen.getByRole('button', { name: /Create Job/i });
    expect(button).toBeInTheDocument();

    // eslint-disable-next-line testing-library/no-node-access
    const form = button.closest('form');
    if (!form) throw new Error('Form element not found');

    fireEvent.submit(form);

    expect(mockCreateJob).toHaveBeenCalled();
  });
});
