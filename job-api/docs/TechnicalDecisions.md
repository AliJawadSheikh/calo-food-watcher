# Technical Overview

## Project Overview

The project implements a backend service for managing job processing and fetching images from Unsplash. The system is designed to handle job creation, job retrieval, and job processing while adhering to rate limits and ensuring data consistency.

## Key Components and Design Choices

### 1. Rate Limiting

- **Purpose**: To prevent abuse and ensure compliance with API usage limits.
- **Implementation**: We utilized `express-rate-limit` to impose a rate limit on job creation requests. Given Unsplash’s free tier has a limit of 50 requests per hour, this protects against exceeding the quota and ensures fair usage.
- **Trade-Off**: While rate limiting enhances stability and fairness, it can potentially restrict legitimate usage. The implementation needs careful configuration to balance between performance and user experience.

### 2. Data Persistence

- **File-Based Storage**: Data is stored in a JSON file (`db.json`) for simplicity and ease of implementation.
- **Libraries**: We employed `fs-extra` for file operations and `proper-lockfile` for concurrency control.
  - **File System**: Allows for straightforward data management without the overhead of a full database system.
  - **Locking**: Ensures atomicity and consistency when reading from or writing to the file, preventing race conditions in concurrent environments.
- **Trade-Off**: File-based storage is sufficient for small-scale or development purposes but may not scale well with high loads or large datasets. For production-grade systems, a more robust database system would be ideal.

### 3. Job Processing

- **Asynchronous Processing**: Jobs are processed asynchronously with delays to simulate real-world operations.
- **Handling Failures**: Jobs are marked as failed if they are not resolved within a specified timeout (5 minutes).
- **Implementation**: Utilized `setTimeout` to handle job processing and failure scenarios, with retry mechanisms in place for robustness.
- **Trade-Off**: Asynchronous processing allows the system to handle multiple jobs concurrently but introduces complexity in managing job states and ensuring consistent updates.

### 4. API Design

- **Endpoints**: Implemented endpoints for creating jobs, retrieving all jobs, and fetching job details by ID.
- **Swagger Documentation**: Used `swagger-jsdoc` and `swagger-ui-express` to provide interactive API documentation, facilitating ease of use and testing for developers.
- **Trade-Off**: While RESTful API design is intuitive and widely adopted, it might not be the best fit for every use case. For complex interactions or high-performance needs, alternatives like GraphQL could be considered.

### 5. Security

- **Helmet**: Applied `helmet` middleware to set security-related HTTP headers, enhancing protection against common web vulnerabilities.
- **CORS**: Configured CORS to restrict access to trusted origins, mitigating risks associated with cross-origin requests.
- **Trade-Off**: Enhanced security comes with added configuration complexity. Ensuring that security settings align with application requirements is crucial.

### 6. Logging and Error Handling

- **Winston**: Integrated `winston` for comprehensive logging, including custom log levels and formatting.
- **Error Handling**: Implemented centralized error handling to capture and log issues consistently, aiding in debugging and maintaining application health.
- **Trade-Off**: While detailed logging and error handling improve observability, excessive logging can impact performance and consume storage.

## Conclusion

The project demonstrates a robust approach to building a backend service with careful consideration of rate limits, data management, and security. By leveraging existing libraries and implementing best practices for asynchronous processing and error handling, the system is designed to be scalable and maintainable. However, the choice of file-based storage and rate limiting should be evaluated based on the expected scale and usage patterns, with potential for future enhancements to database systems or advanced API management strategies.
