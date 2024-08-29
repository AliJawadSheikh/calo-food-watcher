import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { readJobs, writeJobs, processJob } from '../services/jobService';
import { Job } from '../models/job';
import { logger } from '../utils/logger';

/**
 * Create a new job.
 * Generates a unique job ID, sets its initial status, and processes it.
 *
 * @param req - Express request object
 * @param res - Express response object
 */
export const createJob = async (req: Request, res: Response) => {
  try {
    const { jobs, version } = await readJobs();
    const newJob: Job = {
      id: uuidv4(),
      status: 'pending',
      result: null,
    };

    jobs.push(newJob);
    await writeJobs(jobs, version + 1);
    processJob(newJob);

    logger.info(`Job ${newJob.id} created successfully.`);
    res.status(201).json(newJob);
  } catch (error) {
    logger.error('Error creating job:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * Get all jobs.
 * Retrieves the list of all jobs with their current statuses and results.
 *
 * @param req - Express request object
 * @param res - Express response object
 */
export const getJobs = async (req: Request, res: Response) => {
  try {
    const { jobs } = await readJobs();

    if (!jobs || jobs.length === 0) {
      logger.info('No jobs found.');
      return res.status(404).json({ message: 'No jobs found' });
    }

    res.status(200).json(
      jobs.map((job) => ({
        id: job.id,
        status: job.status,
        result: job.status === 'resolved' ? job.result : null,
      }))
    );
    logger.info('Fetched all jobs successfully.');
  } catch (error) {
    logger.error('Error fetching jobs:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * Get a job by ID.
 * Fetches the details of a specific job using its ID.
 *
 * @param req - Express request object
 * @param res - Express response object
 */
export const getJobById = async (req: Request, res: Response) => {
  try {
    const jobId = req.params.jobId;

    // Validate jobId
    if (!jobId || typeof jobId !== 'string') {
      logger.warn('Invalid job ID.');
      return res.status(400).json({ error: 'Invalid job ID' });
    }

    const { jobs } = await readJobs();
    const job = jobs.find((job) => job.id === jobId);
    if (!job) {
      logger.warn(`Job ${jobId} not found.`);
      return res.status(404).json({ error: 'Job not found' });
    }
    res.status(200).json({
      id: job.id,
      status: job.status,
      result: job.status === 'resolved' ? job.result : null,
    });
    logger.info(`Fetched job ${jobId} successfully.`);
  } catch (error) {
    logger.error(`Error fetching job ${req.params.jobId}:`, error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
