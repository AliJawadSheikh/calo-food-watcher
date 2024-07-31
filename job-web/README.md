# JOB-WEB

JOB-WEB is a React application that allows users to view, create, and manage job listings. It utilizes Material-UI for styling and Context API for state management, with Axios handling API requests.

https://github.com/user-attachments/assets/017f43cc-b2e8-49f9-b986-3033096f3345

## Features

- **Job Listing**: Displays a list of jobs with their statuses.
- **Job Details**: View detailed information about a selected job.
- **Create Job**: Form to create new job entries.
- **Error Handling**: Displays error messages and navigates to home on errors.
- **Responsive Design**: Uses Material-UI for responsive and styled components.

## Table of Contents

1.  [Installation](#installation)
2.  [Configuration](#configuration)
3.  [Usage](#usage)
4.  [Components](#components)
5.  [Context and State Management](#context-and-state-management)
6.  [Services](#services)
7.  [Interaction Flowchart](#interaction-flowchart)
8.  [Testing](#testing)
9.  [Additional Documentation](#additional-documentation)
10. [License](#license)
11. [Contact](#contact)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/alijawadsheikh/job-web.git

   ```

2. **Navigate to the project Directory**

   ```bash
   cd job-web
   npm i
   ```

## Configuration

Ensure the following environment variables are set for the frontend to operate correctly:

- `REACT_APP_API_URL`: Base URL for the API server.
- `REACT_APP_DEFAULT_ACCESS_TOKEN`: Secret Token for JWT authentication.

### Example Configuration

```bash
REACT_APP_API_URL=http://localhost:3001/api/v1
REACT_APP_DEFAULT_ACCESS_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVU0VSX0lEIjoiN2ZhY2Y5MTktOWJiYi00ODNmLTg2MTUtZTkwMzdkMDRiMWQxIn0.-AnaIqO__YZq_0NQD77FqrT4gPhIhF6FDAf5g_TWWq0
```

### Running the Application:

- Start the application:

  ```bash
  npm start
  ```

- Verify the application is running at `http://localhost:3000`.

## Components

### `StyledButton`

A custom-styled button component using Material-UI's `Button` with additional styling for margin, border radius, and hover effects.

**File:** `src/components/Button/StyledButton.ts`

### `Error`

Displays error details with a button to navigate to the home page. Used for showing error messages and guiding users back to the main page.

**File:** `src/components/Error/Error.tsx`

### `JobForm`

A form component for creating new job entries. Includes a submit button to trigger job creation.

**File:** `src/components/JobForm/JobForm.tsx`

### `JobDetailPage`

Shows detailed information about a selected job, including an image and a button to navigate back to the home page.

**File:** `src/pages/JobDetail/JobDetailPage.tsx`

### `JobListPage`

Displays a list of jobs with their statuses. Allows users to click on a job to view its details. Includes a form for creating new jobs and shows job status using icons and images.

**File:** `src/pages/JobList/JobListPage.tsx`

## Context and State Management

### `JobContext`

Provides the job-related data and functions needed by other components. Includes `jobs`, `fetchJobs`, `createJob`, and `getJob`.

**File:** `src/context/JobContext.tsx`

### `JobProvider`

Wraps the application with the `JobContext` provider. Manages job state and handles data fetching and job creation.

**File:** `src/context/JobProvider.tsx`

### `useJobs`

A custom hook that allows components to access `JobContext`. Throws an error if used outside of a `JobProvider`.

**File:** `src/context/JobContext.tsx`

## Services

### Axios Configuration

Configures Axios with a base URL and default headers. Includes request and response interceptors for handling authorization and errors.

**File:** `src/services/api/axiosConfig.ts`

### Base Service

Provides generic `get` and `post` methods for making HTTP requests. Uses the configured Axios instance.

**File:** `src/services/baseService.ts`

### Job Service

Includes methods for interacting with job-related endpoints:

- `fetchJobs`: Fetches a list of jobs.
- `createJob`: Creates a new job.
- `getJob`: Fetches a single job by ID.

**File:** `src/services/jobService.ts`

## Interaction Flowchart

```mermaid
graph TD
  A[User] -->|Visits Homepage| B[JobListPage]
  B -->|Clicks on Job| C[JobDetailPage]
  B -->|Clicks Create Job| D[JobForm]
  B -->|No Jobs Found| E[NoJobsFound]
  C -->|Clicks Home Button| F[JobListPage]
  D -->|Submits Form| G[JobListPage]
  H[404 - Not Found] -->|Invalid URL| B
```

## Testing

### Setup

Tests are written using React Testing Library and Jest. Test files are located alongside their respective components and pages.

**File Location:**

- Components: `src/components/.../ComponentName.test.tsx`
- Pages: `src/pages/.../PageName.test.tsx`

### Test Files

- **Error Component:** Tests rendering and error handling.
- **JobForm Component:** Tests form submission.
- **JobDetailPage:** Tests job details fetching and navigation.
- **JobListPage:** Tests job listing, status rendering, and interaction.

**File Path Examples:**

- `src/components/Error/Error.test.tsx`
- `src/pages/JobList/JobListPage.test.tsx`

## Additional Documentation

For more detailed information about the system and its implementation, please refer to the following documents in the `docs` folder:

- **[Time Report](docs/TimeReport.md)**: Contains a report on the time spent on various tasks and phases of the project.
- **[Technical Decisions](docs/TechnicalDecisions.md)**: Outlines the key technical decisions made during the development of the project.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact Information

## Contact

- For any inquiries, please contact [Ali Jawad](alijawadsheikh@gmail.com).

- Connect with me on [LinkedIn](https://www.linkedin.com/in/alijawadsheikh/).
