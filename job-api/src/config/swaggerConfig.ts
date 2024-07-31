const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Job API',
      version: '1.0.0',
      description:
        'API for managing job processing and fetching Unsplash images.',
    },
    servers: [
      {
        url: process.env.SERVER_URL || 'http://localhost:3001/',
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
  },
  apis: ['src/routes/*.ts'],
};

export default swaggerOptions;
