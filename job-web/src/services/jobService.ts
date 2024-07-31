import { get, post } from './baseService';
import { Job } from '../shared/types/jobTypes';

/**
 * Fetch a list of jobs from the API.
 * Sends a GET request to '/jobs' and returns the list of jobs.
 */
export const fetchJobs = async (): Promise<Job[]> => {
  try {
    return await get<Job[]>('/jobs');
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
};

/**
 * Create a new job.
 * Sends a POST request to '/jobs' to create a new job (data can be added if needed).
 */
export const createJob = async (): Promise<void> => {
  try {
    await post('/jobs', {});
  } catch (error) {
    console.error('Error creating job:', error);
    throw error;
  }
};

/**
 * Fetch a single job by ID.
 * Sends a GET request to '/jobs/{id}' and returns the job details.
 */
export const getJob = async (id: string): Promise<Job> => {
  try {
    return await get<Job>(`/jobs/${id}`);
  } catch (error) {
    console.error('Error fetching job:', error);
    throw error;
  }
};
