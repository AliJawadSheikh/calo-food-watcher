import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { JobDetailPage } from './JobDetailPage';
import { useJobs } from '../../context/JobContext';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import '@testing-library/jest-dom';

jest.mock('../../context/JobContext', () => ({
  useJobs: jest.fn(),
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('JobDetailPage', () => {
  const mockJob = {
    id: '1',
    result: 'https://example.com/job-image.jpg',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useJobs as jest.Mock).mockReturnValue({
      getJob: jest.fn().mockResolvedValue(mockJob),
    });
  });

  test('renders loading state initially', async () => {
    render(
      <MemoryRouter initialEntries={['/job/1']}>
        <Routes>
          <Route path="/job/:jobId" element={<JobDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByAltText(`Job ${mockJob.id}`)).toBeInTheDocument();
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(screen.getByRole('button', { name: /Home/i })).toBeInTheDocument();
    });
  });

  test('renders job details and handles navigation', async () => {
    render(
      <MemoryRouter initialEntries={['/job/1']}>
        <Routes>
          <Route path="/job/:jobId" element={<JobDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByAltText(`Job ${mockJob.id}`)).toBeInTheDocument();
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(screen.getByRole('button', { name: /Home/i })).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: /Home/i }));

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
