import React from 'react';
import { Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { StyledButton } from '../Button/StyledButton';
import { Root, ErrorImage } from '../Error/ErrorStyles';

/**
 *Error component displays error details with a button to navigate home
 */
type Props = {
  errorCode: string;
  errorMessage: string;
};

export const Error: React.FC<Props> = ({ errorCode, errorMessage }) => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <Root>
      <Box>
        <ErrorImage />
        <Typography variant="h2" component="h1">
          {errorCode}
        </Typography>
        <Typography variant="body1">{errorMessage}</Typography>
        <StyledButton
          type="submit"
          variant="outlined"
          color="success"
          onClick={handleGoHome}
        >
          Go to Home
        </StyledButton>
      </Box>
    </Root>
  );
};
