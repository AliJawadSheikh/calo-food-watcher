import React from 'react';
import { Box } from '@mui/material';
import { useJobs } from '../../context/JobContext';
import { StyledButton } from '../Button/StyledButton';

/**
 * JobForm component for creating a new job
 */
const JobForm: React.FC = () => {
  const { createJob } = useJobs();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createJob();
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <StyledButton type="submit" variant="outlined" color="success">
        Create Job
      </StyledButton>
    </Box>
  );
};

export default JobForm;
