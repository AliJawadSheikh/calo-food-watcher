import axios from 'axios';
import { logger } from '../utils/logger';

/**
 * Fetches a random photo URL from Unsplash.
 *
 * @returns The URL of the small-sized photo or null if an error occurs.
 */
export const fetchRandomPhoto = async (): Promise<string | null> => {
  try {
    logger.http('Fetching random photo from Unsplash');
    const response = await axios.get(`${process.env.UNSPLASH_URL}`, {
      headers: {
        Authorization: `Client-ID ${process.env.UNSPLASH_API_KEY}`,
      },
    });
    logger.info('Fetched random photo from Unsplash');
    return response.data.urls.small;
  } catch (error) {
    logger.error('Error fetching photo:', error);
    return null;
  }
};
