// JobDetailPageStyles.ts
import { styled } from '@mui/system';
import { Box } from '@mui/material';
import { motion } from 'framer-motion';

export const Container = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundColor: '#f0f0f0',
  padding: '16px',
});

export const Image = styled(motion.img)(({ theme }) => ({
  width: '500px',
  borderRadius: '16px',
  boxShadow: '0px 4px 8px rgba(0,0,0,0.2)',
  [theme.breakpoints.down('md')]: {
    width: '400px',
  },
  [theme.breakpoints.down('sm')]: {
    width: '300px',
  },
  [theme.breakpoints.down('xs')]: {
    width: '90vw',
  },
}));

export const ButtonContainer = styled(Box)({
  marginTop: '20px',
});
