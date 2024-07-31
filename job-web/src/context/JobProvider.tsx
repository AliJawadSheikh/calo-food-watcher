import React, { useState, useEffect, ReactNode, useCallback } from 'react';
import JobContext from './JobContext';
import {
  fetchJobs as fetchJobsApi,
  createJob as createJobApi,
  getJob as getJobApi,
} from '../services/jobService';
import { showErrorToast } from '../utils/toastUtils';
import { Job } from '../shared/types/jobTypes';
import { isEqual } from 'lodash';

export const JobProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [jobs, setJobs] = useState<Job[]>([]);

  const fetchJobs = useCallback(async () => {
    try {
      const response = await fetchJobsApi();
      setJobs((prevJobs) =>
        isEqual(prevJobs, response) ? prevJobs : response
      );
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  }, []);

  const createJob = async (): Promise<void> => {
    try {
      await createJobApi();
      await fetchJobs();
    } catch (error) {
      showErrorToast('Error While Creating Job');
    }
  };

  const getJob = async (id: string): Promise<Job> => {
    try {
      return await getJobApi(id);
    } catch (error) {
      showErrorToast('Error While Fetching Job');
      return { id: '', status: '', result: '' };
    }
  };

  useEffect(() => {
    fetchJobs();

    const interval = setInterval(() => {
      if (jobs.some((job) => job.status === 'pending')) {
        fetchJobs();
      }
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [jobs, fetchJobs]);

  return (
    <JobContext.Provider value={{ jobs, fetchJobs, createJob, getJob }}>
      {children}
    </JobContext.Provider>
  );
};

export default JobProvider;
