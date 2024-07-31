import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  ListItemIcon,
  CircularProgress,
  Typography,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

import { useJobs } from '../../context/JobContext';
import JobForm from '../../components/JobForm/JobForm';
import { Job } from '../../shared/types/jobTypes';

import {
  SlideInListItem,
  SlideInList,
  Image,
  StyledIcon,
  TopContainer,
  NoJobContainer,
  Logo,
  NoJobsFound,
} from './JobListPageStyles';
import { motion } from 'framer-motion';

/**
 * Displays a list of jobs with their status and navigates to job details on click
 */
export const JobListPage: React.FC = () => {
  const { jobs } = useJobs();
  const navigate = useNavigate();

  const handleClick = (id: string, status: string) => {
    if (status === 'resolved') {
      navigate(`/jobs/${id}`);
    }
  };

  const renderJobStatus = (job: Job) => {
    switch (job.status) {
      case 'resolved':
        return <Image src={job.result} alt="Job Result" />;
      case 'pending':
        return <CircularProgress sx={{ color: 'rgb(226, 87, 76)' }} />;
      case 'failed':
        return <Image src="noimage.jpg" alt="Job Result" />; // You can customize this message or component as needed
      default:
        return null;
    }
  };

  return (
    <Container>
      <TopContainer>
        <Logo src="calologo.png" />
        <JobForm />
      </TopContainer>

      <Box mt={4}>
        {!jobs ? (
          // Display a skeleton loader while jobs are being fetched
          <Typography>{`Loading`}</Typography>
        ) : (
          <SlideInList>
            {jobs?.length > 0 ? (
              jobs.map((job, index) => (
                <SlideInListItem
                  key={job.id}
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => handleClick(job.id, job.status)}
                >
                  <StyledIcon status={job.status}>
                    {job.status === 'resolved' && <CheckCircleOutlineIcon />}
                    {job.status === 'failed' && <ErrorOutlineIcon />}
                  </StyledIcon>
                  <ListItemIcon>
                    <>{renderJobStatus(job)}</>
                  </ListItemIcon>
                </SlideInListItem>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <NoJobContainer>
                  <NoJobsFound variant="h1">No jobs found</NoJobsFound>
                </NoJobContainer>
              </motion.div>
            )}
          </SlideInList>
        )}
      </Box>
    </Container>
  );
};
