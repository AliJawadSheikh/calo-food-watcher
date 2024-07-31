import { readFromFile, writeToFile } from './fileOperations';
import { Job } from '../models/job';
import { logger } from '../utils/logger';
import { fetchRandomPhoto } from './photoService';

let jobsCache: Job[] = [];
let versionCache: number = 0;
const writeQueue: { jobs: Job[]; version: number }[] = [];
let writeInProgress = false;

/**
 * Reads jobs from the file, using cache if a write is in progress.
 * @returns An object containing the jobs and the version number.
 */
export const readJobs = async (): Promise<{ jobs: Job[]; version: number }> => {
  if (writeInProgress) {
    logger.debug('Read jobs requested during write in progress.');
    return { jobs: jobsCache, version: versionCache };
  }
  const { jobs, version } = await readFromFile();
  jobsCache = jobs;
  versionCache = version;
  logger.info(`Read jobs data with version ${versionCache}`);
  return { jobs, version };
};

/**
 * Writes jobs to the file, handling concurrent write requests with a queue.
 * @param jobs - Array of job objects to be written.
 * @param version - Version number to be written.
 */
export const writeJobs = async (
  jobs: Job[],
  version: number
): Promise<void> => {
  if (writeInProgress) {
    writeQueue.push({ jobs, version });
    logger.debug('Write job queued due to another write in progress.');
    return;
  }
  writeInProgress = true;
  try {
    await writeToFile(jobs, version);
    jobsCache = jobs;
    versionCache = version;
    logger.info(`Jobs data written with new version ${version}`);
  } catch (error) {
    logger.error('Error writing jobs data:', error);
  } finally {
    writeInProgress = false;
    processWriteQueue();
  }
};

/**
 * Processes the write queue, ensuring queued write operations are executed.
 */
const processWriteQueue = async (): Promise<void> => {
  while (writeQueue.length > 0 && !writeInProgress) {
    const { jobs, version } = writeQueue.shift()!;
    await writeJobs(jobs, version);
  }
};

/**
 * Processes a job, simulating a delay and fetching a random photo.
 * @param job - The job to process.
 */
export const processJob = async (job: Job): Promise<void> => {
  const delay = Math.floor(Math.random() * 12) * 5 + 5; // Random delay between 5 and 60 seconds
  setTimeout(async () => {
    try {
      const { jobs, version } = await readJobs();
      const jobToUpdate = jobs.find((j) => j.id === job.id);
      if (!jobToUpdate) return;

      const imageUrl = await fetchRandomPhoto();
      if (!imageUrl) throw new Error('Failed to fetch image');

      jobToUpdate.status = 'resolved';
      jobToUpdate.result = imageUrl;
      await writeJobs(jobs, version + 1);
      logger.info(`Job ${job.id} processed successfully.`);
    } catch (error) {
      logger.error(`Error processing job ${job.id}:`, error);
      await markJobAsFailed(job.id);
    }
  }, delay * 1000);
};

/**
 * Marks a job as failed.
 * @param jobId - The ID of the job to mark as failed.
 */
const markJobAsFailed = async (jobId: string): Promise<void> => {
  try {
    const { jobs, version } = await readJobs();
    const jobToUpdate = jobs.find((j) => j.id === jobId);
    if (jobToUpdate) {
      jobToUpdate.status = 'failed';
      await writeJobs(jobs, version + 1);
      logger.warn(`Job ${jobId} marked as failed.`);
    }
  } catch (error) {
    logger.error('Error updating job status to failed:', error);
  }
};
