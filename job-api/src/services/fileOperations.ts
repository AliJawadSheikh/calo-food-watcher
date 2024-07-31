import fs from 'fs-extra';
import path from 'path';
import lockfile from 'proper-lockfile';
import { logger } from '../utils/logger';
import { Job } from '../models/job';

const dataFilePath = path.join(__dirname, '../../data/db.json');

const lockOptions = {
  retries: {
    retries: 3,
    factor: 2,
    minTimeout: 100,
  },
};

/**
 * Ensures the specified file exists.
 * If the file does not exist, it creates it with an initial structure.
 *
 * @param filePath - Path to the file
 */
export const ensureFileExists = async (filePath: string): Promise<void> => {
  try {
    await fs.ensureFile(filePath);
    const fileData = await fs.readFile(filePath, 'utf8');
    if (!fileData) {
      await fs.writeFile(
        filePath,
        JSON.stringify({ jobs: [], version: 0 }, null, 2),
        'utf8'
      );
    }
  } catch (error) {
    logger.error(`Error ensuring file exists: ${filePath}`, error);
  }
};

/**
 * Reads data from the file.
 * Ensures the file exists before reading and acquires a lock to prevent concurrent access.
 *
 * @returns An object containing the jobs and version number
 */
export const readFromFile = async (): Promise<{
  jobs: Job[];
  version: number;
}> => {
  await ensureFileExists(dataFilePath);
  const release = await lockfile.lock(dataFilePath, lockOptions);
  try {
    const data = await fs.readFile(dataFilePath, 'utf8');
    const parsedData = JSON.parse(data);
    return { jobs: parsedData.jobs, version: parsedData.version };
  } catch (error) {
    logger.error('Error reading from file:', error);
    throw new Error('File read error');
  } finally {
    await release();
  }
};

/**
 * Writes data to the file.
 * Acquires a lock to prevent concurrent access while writing.
 *
 * @param jobs - Array of job objects to be written
 * @param version - Version number to be written
 */
export const writeToFile = async (
  jobs: Job[],
  version: number
): Promise<void> => {
  const release = await lockfile.lock(dataFilePath, lockOptions);
  try {
    const data = JSON.stringify({ jobs, version }, null, 2);
    await fs.writeFile(dataFilePath, data, 'utf8');
  } catch (error) {
    logger.error('Error writing to file:', error);
    throw new Error('File write error');
  } finally {
    await release();
  }
};
