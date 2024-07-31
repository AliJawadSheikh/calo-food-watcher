# Calo Food Watcher

**Calo Food Watcher** is a comprehensive system designed for job management and image retrieval. The project includes two primary components:

## Overview

### **Job Web (JOB-WEB)**

- **Description**: A React application for managing job listings.
- **Features**: Allows users to view, create, and manage job listings through an intuitive interface.
- **Technologies**: Utilizes React and Material-UI for styling, Context API for state management, and Axios for API requests.

### **Job API Service (JOB-API)**

- **Description**: A backend service for job processing and fetching Unsplash images.
- **Features**: Manages job creation, status tracking, and result retrieval. Integrates with the Unsplash API to provide random images.
- **Technologies**: Built with Node.js and Express, using file-based storage for job data and integrating with external APIs for image retrieval.

## Problem Statement

The problem statement for this project is detailed in the attached [PDF document](job-web/docs/CALO-Fullstack-Task.pdf). This document outlines the requirements and challenges addressed by the Calo Food Watcher system.

## Note on Design Influence

The design and user interface of the application were influenced and motivated by the user-friendly and aesthetically pleasing elements observed on [Calo](https://calo.app). The goal was to create a similarly engaging and functional experience for managing job listings.

For detailed documentation and setup, please refer to the respective README files:

- [Job API README](job-api/README.md)
- [Job Web README](job-web/README.md)

## Setup Instructions

To set up and run the project, follow these steps:

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Node.js**: Download and install from [Node.js official website](https://nodejs.org/).
- **Git**: Install from [Git official website](https://git-scm.com/).

### Clone the Repository

1. **Clone the repository** using Git:

   ```bash
   git clone https://github.com/alijawadsheikh/calo-food-watcher.git
   ```

   &

   ```bash
   cd calo-food-watcher
   ```

2. **Install Dependencies for Job API Service**:

   ```bash
   npm run install-job-api
   ```

3. **Install Dependencies for Job Web Application**:

   ```bash
   npm run install-job-web
   ```

4. **Install Concurrently**:

   ```bash
   npm install concurrently --save-dev
   ```

5. **Start the Application**:

   ```bash
   npm start
   ```

   This command will start both the Job API Service and the Job Web application concurrently, setting up your development environment please make sure your environment variables are setup correctly.

6. Verify the application is running at `http://localhost:3000`.

## Additional Documentation

For further details on technical decisions and time reports, refer to these documents:

- **[API Technical Decisions](job-api/docs/TechnicalDecisions.md)**: Outlines the key technical decisions made during the development of the API.
- **[API Time Report](job-api/docs/TimeReport.md)**: Contains a report on the time spent on various tasks and phases of the API project.
- **[System Breakdown](job-api/docs/SystemBreakdown.md)**: Offers a detailed breakdown of the system's functional requirements and components.
- **[WEB Technical Decisions](job-web/docs/TechnicalDecisions.md)**: Details the key technical decisions made during the development of the frontend application.
- **[WEB Time Report](job-web/docs/TimeReport.md)**: Provides a report on the time spent on various tasks and phases of the frontend project.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact Information

## Contact

- For any inquiries, please contact [Ali Jawad](alijawadsheikh@gmail.com).

- Connect with me on [LinkedIn](https://www.linkedin.com/in/alijawadsheikh/).
