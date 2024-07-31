// JobDetailPage.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Typography } from '@mui/material';

import { useJobs } from '../../context/JobContext';
import { Job } from '../../shared/types/jobTypes';
import { StyledButton } from '../../components/Button/StyledButton';

import { Container, Image, ButtonContainer } from './JobDetailPageStyles';

/**
 * Displays detailed job information and handles navigation to the homepage
 */
export const JobDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { jobId = '' } = useParams();
  const { getJob } = useJobs();
  const [job, setJob] = useState<Job | null>(null);

  const handleGoBack = () => {
    navigate('/');
  };

  useEffect(() => {
    if (jobId === '') return;
    getJob(jobId).then((res) => {
      setJob(res);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobId]);

  if (!job) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container>
      <Image
        src={job.result}
        alt={`Job ${job.id}`}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 100, damping: 10 }}
      />
      <ButtonContainer>
        <StyledButton
          type="submit"
          variant="outlined"
          color="success"
          onClick={handleGoBack}
        >
          Home
        </StyledButton>
      </ButtonContainer>
    </Container>
  );
};
