// JobListPageStyles.ts
import { styled } from '@mui/system';
import { Box, Typography, Icon } from '@mui/material';
import { motion } from 'framer-motion';

export const SlideInListItem = styled(motion.div)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '8px 16px',
  marginBottom: '8px',
  marginRight: '8px',
  marginLeft: '8px',
  borderRadius: '40rem',
  aspectRatio: '68/89',
  backgroundColor: '#f5f5f5',
  boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#e0e0e0',
  },
});

export const SlideInList = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)', // Default to 4 columns
  gap: '16px', // Space between items
  justifyContent: 'space-between',
  [theme.breakpoints.down('lg')]: {
    gridTemplateColumns: 'repeat(3, 1fr)', // 3 columns for large screens
  },
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: 'repeat(2, 1fr)', // 2 columns for medium screens
  },
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: 'repeat(1, 1fr)', // 1 column for small screens
  },
}));

export const Image = styled('img')(({ theme }) => ({
  width: '150px',
  height: '150px',
  borderRadius: '50%',
  marginBottom: '8px',
  [theme.breakpoints.down('md')]: {
    width: '180px',
    height: '180px',
  },
  [theme.breakpoints.down('sm')]: {
    width: '200px',
    height: '200px',
  },
  [theme.breakpoints.down('xs')]: {
    width: '220px',
    height: '220px',
  },
}));

export const StyledIcon = styled(Icon)(({ status }: { status: string }) => ({
  alignSelf: 'flex-end',
  marginRight: '20px',
  color: status === 'resolved' ? 'rgb(60, 173, 104)' : 'rgb(226, 87, 76)',
}));

export const TopContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'space-between',
  width: '75vw',
  height: '80px',
  borderRadius: '8px',
  textAlign: 'center',
  fontWeight: 'bold',
  [theme.breakpoints.down('sm')]: {
    width: '90vw',
  },
}));

export const NoJobContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '75vw',
  height: '80px',
  borderRadius: '8px',
  textAlign: 'center',
  fontWeight: 'bold',
  [theme.breakpoints.down('sm')]: {
    width: '90vw',
  },
}));

export const Logo = styled('img')(({ theme }) => ({
  width: '100px',
  borderRadius: '8px',
  marginRight: '16px',
  [theme.breakpoints.down('md')]: {
    marginRight: '12px',
  },
  [theme.breakpoints.down('sm')]: {
    marginRight: '8px',
  },
  [theme.breakpoints.down('xs')]: {
    marginRight: '4px',
  },
}));

export const NoJobsFound = styled(Typography)({
  fontSize: '5rem',
  color: 'rgb(226, 87, 76)',
});
