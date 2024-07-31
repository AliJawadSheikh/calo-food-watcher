export interface Job {
  id: string;
  status: string;
  result: string;
}

export interface JobContextProps {
  jobs: Job[];
  fetchJobs: () => void;
  createJob: () => Promise<void>;
  getJob: (id: string) => Promise<Job>;
}
