/**
 * Interface representing a job.
 */
export interface Job {
  id: string;
  status: 'pending' | 'resolved' | 'failed';
  result: string | null;
}
