import { createContext, useContext } from 'react';
import { JobContextProps } from '../shared/types/jobTypes';

const JobContext = createContext<JobContextProps | undefined>(undefined);

export const useJobs = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error('useJobs must be used within a JobProvider');
  }
  return context;
};

export default JobContext;
