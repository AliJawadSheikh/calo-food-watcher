import { render, screen, fireEvent } from '@testing-library/react';
import { JobListPage } from './JobListPage';
import { useJobs } from '../../context/JobContext';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

jest.mock('../../context/JobContext', () => ({
  useJobs: jest.fn(),
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('JobListPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading state initially', async () => {
    (useJobs as jest.Mock).mockReturnValue({ jobs: null });

    render(
      <MemoryRouter>
        <JobListPage />
      </MemoryRouter>
    );

    expect(await screen.findByText(/Loading/i)).toBeInTheDocument();
  });

  test('renders job list and handles navigation', async () => {
    const mockJobs = [
      {
        id: '1',
        status: 'resolved',
        result: 'https://example.com/job-image.jpg',
      },
      { id: '2', status: 'pending', result: '' },
      { id: '3', status: 'failed', result: '' },
    ];

    (useJobs as jest.Mock).mockReturnValue({ jobs: mockJobs });

    render(
      <MemoryRouter>
        <JobListPage />
      </MemoryRouter>
    );

    const images = screen.getAllByAltText('Job Result');
    expect(images.length).toBeGreaterThan(0);

    const resolvedImage = images.find((img) =>
      (img as HTMLImageElement).src.includes(
        'https://example.com/job-image.jpg'
      )
    );
    expect(resolvedImage).toBeInTheDocument();

    if (resolvedImage) {
      fireEvent.click(resolvedImage);
    } else {
      throw new Error('Image not found');
    }

    expect(mockNavigate).toHaveBeenCalledWith('/jobs/1');
  });

  test('renders "No jobs found" message when no jobs are available', () => {
    (useJobs as jest.Mock).mockReturnValue({ jobs: [] });

    render(
      <MemoryRouter>
        <JobListPage />
      </MemoryRouter>
    );

    expect(screen.getByText('No jobs found')).toBeInTheDocument();
  });
});
