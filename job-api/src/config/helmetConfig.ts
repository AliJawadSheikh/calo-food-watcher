import { HelmetOptions } from 'helmet';

export const helmetConfig: HelmetOptions = {
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"], // Default source for all content
      scriptSrc: ["'self'"], // Allow scripts only from self
      styleSrc: ["'self'"], // Allow styles only from self
      connectSrc: ["'self'"], // Allow connections only from self
      imgSrc: ["'self'", 'data:'], // Allow images only from self and data URIs
    },
  },
};
