import { styled } from '@mui/system';
import { Button } from '@mui/material';

export const StyledButton = styled(Button)({
  marginTop: '16px',
  borderRadius: '50px',
  ':hover': {
    backgroundColor: '#4caf50',
    color: 'white',
  },
});
