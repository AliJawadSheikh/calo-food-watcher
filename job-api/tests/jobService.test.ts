import request from 'supertest';
import express from 'express';
import jobRouter from '../src/routes/jobRouter';
import { readJobs, writeJobs, processJob } from '../src/services/jobService';

// Mock the job service methods
jest.mock('../src/services/jobService');

const app = express();
app.use(express.json());
app.use('/api/v1', jobRouter);

describe('JobController', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  describe('POST /jobs', () => {
    jest.setTimeout(120000); // Set timeout to 2 minutes

    it('should create a new job and return the job ID', async () => {
      (readJobs as jest.Mock).mockResolvedValue({ jobs: [], version: 0 });
      (writeJobs as jest.Mock).mockResolvedValue(undefined);
      (processJob as jest.Mock).mockImplementation(() => {});

      const res = await request(app).post('/api/v1/jobs').send();

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('id');
      expect(readJobs).toHaveBeenCalledTimes(1);
      expect(writeJobs).toHaveBeenCalledTimes(1);
      expect(processJob).toHaveBeenCalledTimes(1);
    });

    it('should return 500 if an error occurs', async () => {
      (readJobs as jest.Mock).mockRejectedValue(
        new Error('Failed to read jobs')
      );

      const res = await request(app).post('/api/v1/jobs').send();

      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty('error', 'Internal Server Error');
    });
  });

  describe('GET /jobs', () => {
    it('should return all jobs', async () => {
      const jobs = [
        { id: '1', status: 'pending', result: null },
        { id: '2', status: 'resolved', result: 'http://image.url' },
      ];
      (readJobs as jest.Mock).mockResolvedValue({ jobs, version: 0 });

      const res = await request(app).get('/api/v1/jobs').send();

      expect(res.status).toBe(200);
      expect(res.body).toEqual(jobs);
    });

    it('should return 500 if an error occurs', async () => {
      (readJobs as jest.Mock).mockRejectedValue(
        new Error('Failed to read jobs')
      );

      const res = await request(app).get('/api/v1/jobs').send();

      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty('error', 'Internal Server Error');
    });
  });

  describe('GET /jobs/:jobId', () => {
    it('should return the job with the given ID', async () => {
      const job = { id: '1', status: 'resolved', result: 'http://image.url' };
      (readJobs as jest.Mock).mockResolvedValue({ jobs: [job], version: 0 });

      const res = await request(app).get('/api/v1/jobs/1').send();

      expect(res.status).toBe(200);
      expect(res.body).toEqual(job);
    });

    it('should return 404 if the job is not found', async () => {
      (readJobs as jest.Mock).mockResolvedValue({ jobs: [], version: 0 });

      const res = await request(app).get('/api/v1/jobs/1').send();

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('error', 'Job not found');
    });

    it('should return 500 if an error occurs', async () => {
      (readJobs as jest.Mock).mockRejectedValue(
        new Error('Failed to read jobs')
      );

      const res = await request(app).get('/api/v1/jobs/1').send();

      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty('error', 'Internal Server Error');
    });
  });
});
