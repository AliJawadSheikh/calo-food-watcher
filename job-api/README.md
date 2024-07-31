# Job API Service

A backend service for managing job processing and fetching Unsplash images.

## Table of Contents

1.  [Overview](#overview)
2.  [Features](#features)
3.  [Technologies Used](#technologies-used)
4.  [Setup](#setup)
5.  [Prerequisites](#prerequisites)
6.  [Configuration](#configuration)
7.  [Running the Application](#running-the-application)
8.  [Testing](#testing)
9.  [API Endpoints](#api-endpoints)
10. [Job Processing API Workflow](#job-processing-api-workflow)
11. [Error Handling](#error-handling)
12. [Logging](#logging)
13. [Swagger API Documentation](#swagger-api-documentation)
14. [Additional Documentation](#additional-documentation)
15. [Directory Structure](#directory-structure)
16. [File Operations](#file-operations)
17. [Job Processing](#job-processing)
18. [Performance Considerations](#performance-considerations)
19. [Security](#security)
20. [Troubleshooting](#troubleshooting)
21. [License](#license)
22. [Contact Information](#contact-information)
23. [Changelog](#changelog)

## Overview

The Job API Service is a backend service for managing job processing and fetching Unsplash images. It allows clients to create jobs, track their status, and retrieve the results. The service is built with Node.js and Express, and it uses file-based storage for job data. The application also integrates with the Unsplash API to fetch random images.

## Features

- **Create Jobs**: Submit a job request to be processed.
- **Track Job Status**: Retrieve the status of a job.
- **Fetch Job Results**: Get the result of a completed job.
- **Swagger API Documentation**: Access interactive API documentation.
- **Rate Limiting**: Protect against API abuse with request limits.
- **CORS Configuration**: Manage cross-origin requests.
- **Error Handling**: Comprehensive error logging and handling.
- **Image Fetching**: Retrieve random images from Unsplash.

## Technologies Used

- **Node.js**: JavaScript runtime for building the server.
- **Express**: Web framework for building RESTful APIs.
- **TypeScript**: Superset of JavaScript that provides type safety.
- **Swagger**: API documentation and testing.
- **Jest**: Testing framework for unit and integration tests.
- **Winston**: Logging library for error and info logging.
- **fs-extra**: Extended file system operations.
- **proper-lockfile**: File locking to prevent concurrent writes.
- **dotenv**: Environment variable management.
- **axios**: HTTP client for making requests to Unsplash.
- **helmet**: Security middleware to set HTTP headers.

## Setup

Please refer to the [Setup Guide](#setup) for instructions on how to set up and run the project.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Node.js**: Download and install from [Node.js official website](https://nodejs.org/).
- **Git**: Install from [Git official website](https://git-scm.com/).

### Clone the Repository

1. **Clone the repository** using Git:

   ```bash
   git clone https://github.com/alijawadsheikh/job-api.git

   ```

2. **Navigate to the project Directory**

   ```bash
   cd job-apis
   npm i
   ```

## Configuration

Ensure the following environment variables are set for the backend to operate correctly:

- `PORT`: Port on which the server will run (default: `3001`).
- `logger_level`: Logging level (default: `debug`).
- `UNSPLASH_API_KEY`: Access token for Unsplash API.
- `UNSPLASH_URL`: URL for fetching random images from Unsplash.
- `JWT_SECRET_KEY`: Secret key for JWT authentication.
- `USER_ID`: User ID for the application.
- `SERVER_URL`: Base URL for the server.
- `CORS_ALLOWED_ORIGINS`: Comma-separated list of allowed origins for CORS.

### Example Configuration

```bash
PORT=3001
logger_level=debug
UNSPLASH_API_KEY=e3ORae27hZOwGtBMMprxrSt2rskuvPjwM7nWEiZjGvc
UNSPLASH_URL=https://api.unsplash.com/photos/random?query=food&orientation=portrait
JWT_SECRET_KEY=calo-test-assessment
USER_ID=7facf919-9bbb-483f-8615-e9037d04b1d1
SERVER_URL=http://localhost:3001/
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
```

### Running the Application:

1.  Compile the TypeScript code:

    ```bash
    npm run build
    ```

2.  Start the application:
    ```bash
    npm start
    ```
3.  For development, run:

    ```bash
    npm run dev

    ```

4.  Verify the application is running at `http://localhost:3001`.

5.  Access API documentation at `http://localhost:3001/api-docs`.

6.  Check logs in `logs/app.log` or console output.

## Testing

To ensure the functionality of the Job API Service, unit and integration tests are written using Jest and Supertest. The tests cover various scenarios, including successful job creation, error handling, and job retrieval.

### Running Tests

To run the tests, use the following command:

```bash
npm run test
```

### Code Quality:

1.  Lint the code:

```bash
   npm run lint
```

2. Format the code:

   ```bash
   npm run format
   ```

   or

   ```bash
   npm run lint:fix
   ```

3. Prettier formatting:
   ```bash
   npm run prettier
   ```

### Cleanup:

- Remove compiled files:

  ```bash
  npm run clean
  ```

## API Endpoints

### POST /api/v1/jobs

- **Description**: Creates a new job and returns the job ID.
- **Request Body**: None
- **Response**:
  - **201 Created**: Returns the job ID.
  - **500 Internal Server Error**: Returns an error message.

### GET /api/v1/jobs

- **Description**: Retrieves all jobs.
- **Response**:
  - **200 OK**: Returns a list of jobs.
  - **500 Internal Server Error**: Returns an error message.

### GET /api/v1/jobs/:jobId

- **Description**: Retrieves a specific job by ID.
- **Response**:
  - **200 OK**: Returns the job data.
  - **404 Not Found**: Returns an error message if the job is not found.
  - **500 Internal Server Error**: Returns an error message.

## Job Processing API Workflow

This diagram illustrates the workflow of job processing in the API. It covers the common sequence for different types of requests: creating a job, getting all jobs, and getting a job by ID.

```mermaid
sequenceDiagram
    participant Client
    participant API as API Server
    participant Middleware as Middleware Layer
    participant JobController as Job Controller
    participant JobService as Job Service
    participant FileSystem as File System

    Client->>API: Request to create/get jobs or job by ID

    API->>Middleware: Apply authentication
    Middleware->>JobController: Forward request

    alt Create Job
        Middleware->>JobController: Apply rate limiting
        JobController->>JobService: Call to create a new job
        JobService->>FileSystem: Write new job data
        FileSystem->>JobService: Confirm write
        JobService->>JobController: Return new job ID
        JobController->>API: Send job ID to Client
    else Get All Jobs
        JobController->>JobService: Call to get all jobs
        JobService->>FileSystem: Read all job data
        FileSystem->>JobService: Return all job data
        JobService->>JobController: Return all jobs
        JobController->>API: Send all jobs to Client
    else Get Job by ID
        JobController->>JobService: Call to get job by ID
        JobService->>FileSystem: Read job data by ID
        FileSystem->>JobService: Return job data by ID
        JobService->>JobController: Return job by ID
        JobController->>API: Send job data to Client
    end

    API->>Client: Response with data or error
```

## Error Handling

Comprehensive error handling is implemented using custom middleware. Errors are logged using Winston and appropriate responses are sent to the client.

- **Global Error Handler**: Catches all unhandled errors and exceptions.
- **Validation Errors**: Handles validation errors and sends a 400 status code with error details.
- **Not Found Errors**: Returns a 404 status code for resource not found errors.
- **Internal Server Errors**: Logs the error and sends a 500 status code for unexpected errors.

## Logging

The application uses Winston for logging with support for both console and file outputs.

- **Info Logs**: General application information, like successful job creation.
- **Error Logs**: Details of errors for debugging and monitoring.
- **Debug Logs**: Detailed development and troubleshooting information.

## Accessing Logs

- **Console Output**: View real-time logs directly in the console.
- **Log Files**: Access logs at `logs/app.log`.

## Swagger API Documentation

- **Swagger UI**: Accessible at `/api-docs` endpoint. This interface allows users to view and interact with the API documentation directly from the browser.
- **Swagger JSDoc**: Used to generate the Swagger documentation from JSDoc comments in the code. The configuration for Swagger is defined in the `swaggerConfig.ts` file.

### How to Use

1. **Access Swagger UI**: Open your browser and navigate to `http://localhost:3001/api-docs` (adjust the port if necessary).
2. **Authenticate Endpoints**: Before making requests, enter your access token in the "Authorize" button in Swagger UI. A dialog will prompt you to enter your token.
3. **Explore Endpoints**: View available endpoints, request parameters, and response structures.
4. **Test Endpoints**: Use the interactive features to make requests and see responses directly within the Swagger UI.

#### Example

To get a visual representation of the API:
Start the server

```bash
npm run start
```

### Open the Swagger UI

http://localhost:3001/api-docs

### Authenticating API Requests

1. **Access Token**: For development purposes, a hardcoded token is used.

2. **Set Up Authentication**:

   - Open Swagger UI.
   - Click "Authorize" and enter the hardcoded token:

     `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVU0VSX0lEIjoiN2ZhY2Y5MTktOWJiYi00ODNmLTg2MTUtZTkwMzdkMDRiMWQxIn0.-AnaIqO__YZq_0NQD77FqrT4gPhIhF6FDAf5g_TWWq0`

   - This token is used for all API requests to authenticate them.

3. **Make Requests**:
   - Use the token in the `Authorization` header for API requests.

**Note:** Using hardcoded tokens is not recommended for production environments. Consider implementing a secure token management system for production use.

## Additional Documentation

For more detailed information about the system and its implementation, please refer to the following documents in the `docs` folder:

- **[System Breakdown](docs/SystemBreakdown.md)**: Provides a detailed breakdown of the system's functional requirements and components.
- **[Time Report](docs/TimeReport.md)**: Contains a report on the time spent on various tasks and phases of the project.
- **[Technical Decisions](docs/TechnicalDecisions.md)**: Outlines the key technical decisions made during the development of the project.

These documents offer in-depth insights into different aspects of the project and can help in understanding the overall architecture and implementation details.

## Directory Structure

The project directory structure is organized as follows:

- **`src/`**: Contains the source code for the project.

  - **`config/`**: Configuration files.
    - `helmetConfig.ts`: Security middleware configuration.
    - `swaggerConfig.ts`: Swagger API documentation configuration.
  - **`controllers/`**: Controllers for handling requests.
    - `jobController.ts`: Job-related request handling.
  - **`middlewares/`**: Middleware functions for request processing.
    - `auth.ts`: Authentication middleware.
    - `errorHandler.ts`: Error handling middleware.
    - `rateLimit.ts`: Rate limiting middleware.
  - **`models/`**: Data models for the application.
    - `job.ts`: Job data model.
    - `jobStatus.ts`: Job status data model.
  - **`routes/`**: Route definitions.
    - `jobRouter.ts`: Job-related API routes.
  - **`services/`**: Business logic and service functions.
    - `fileOperations.ts`: File operations handling.
    - `jobService.ts`: Job processing logic.
    - `photoService.ts`: Image fetching logic from Unsplash.
  - **`utils/`**: Utility functions and helpers.
    - `errorHandling.ts`: Error handling utilities.
    - `extractToken.ts`: Token extraction utilities.
    - `logger.ts`: Logging utilities.
  - **`server.ts`**: Main server entry point.
  - **`tests/`**: Test files.
    - `jobService.test.ts`: Unit and integration tests for the job service.

- **`data/`**: Contains database files.

  - `db.json`: File-based job data storage.

- **`docs/`**: Documentation files.

- **`logs/`**: Log files.

  - `app.log`: Application logs.

- **`.github/`**: GitHub configuration files.

- **`.husky/`**: Husky configuration for Git hooks.

- **`.env`**: Environment variable configuration.

- **`.eslintrc.js`**: ESLint configuration.

- **`.gitignore`**: Specifies files and directories to be ignored by Git.

- **`.prettierrc`**: Prettier configuration.

- **`jest.config.js`**: Jest configuration.

- **`package.json`**: Project metadata and dependencies.

- **`package-lock.json`**: Dependency lock file.

- **`README.md`**: This documentation file.

- **`tsconfig.json`**: TypeScript configuration.

### File Operations

- **File Locking:** Ensures atomic file operations to prevent data corruption.
- **Data Persistence:** Stores job data in a JSON file, supporting basic CRUD operations.

### Job Processing

- **Job Scheduling:** Uses `setTimeout` to schedule job processing and timeout handling.
- **Image Fetching:** Retrieves random images from Unsplash API and attaches them to job results.

## Performance Considerations

- Implemented rate limiting to handle up to 50 requests per hour.

## Security

- Token authentication used for API access.
- Ensure sensitive data is handled securely.

## Troubleshooting

If you encounter issues, check the following:

- **Ensure that all environment variables are correctly set.**
- **Verify that the Unsplash API key is valid and not expired.**
- **Review the server logs for error messages.**

For additional help, refer to the [Technical Documentation](docs/TechnicalDecisions.md) or open an issue on the [GitHub repository](https://github.com/your-repository-url/issues).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact Information

## Contact

- For any inquiries, please contact [Ali Jawad](alijawadsheikh@gmail.com).

- Connect with me on [LinkedIn](https://www.linkedin.com/in/alijawadsheikh/).

## Changelog

- **v1.0.0**: Initial release.
- **v1.1.0**: Added job status tracking feature.
