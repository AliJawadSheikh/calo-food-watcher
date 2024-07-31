import React from 'react';
import { Error } from '../../components/Error/Error';

/**
 * Renders a 404 error page with a message and a link to the homepage
 */
export const NotFoundPage: React.FC = () => {
  return (
    <Error
      errorCode="404 - Not Found"
      errorMessage="The resource you are looking for does not exist"
    />
  );
};
