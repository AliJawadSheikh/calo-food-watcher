// ErrorStyles.ts
import { styled } from '@mui/system';
import { Container } from '@mui/material';
import { ReactComponent as WarningImage } from '../../assets/images/warning.svg';

export const Root = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  textAlign: 'center',
});

export const ErrorImage = styled(WarningImage)({
  width: '200px',
  height: 'auto',
});
