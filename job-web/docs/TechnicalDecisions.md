## Technical Decisions

### 1. State Management: Context API

- **Why**: Simple and effective for managing job-related state without complex setup.
- **Tradeoffs**: Less scalable than Redux for larger applications, but sufficient for current needs.

### 2. Testing: React Testing Library (RTL)

- **Why**: Tests components from a user perspective, focusing on behavior rather than implementation.
- **Tradeoffs**: Steeper learning curve, but provides robust and maintainable tests.

### 3. Error Handling: Centralized Approach

- **Why**: Ensures consistent error messaging and simplifies updates through a single utility function.
- **Tradeoffs**: Adds a layer of abstraction but avoids repetitive code and inconsistencies.

### 4. Axios Configuration: Custom Axios Instance

- **Why**: Centralizes HTTP request configuration and error handling, ensuring consistency.
- **Tradeoffs**: Initial setup is more complex, but it improves maintainability and request management.

### 5. Polling vs. WebSockets

- **Why**: Polling is simpler to implement and manage for our current needs.
- **Tradeoffs**: Polling can be less efficient than WebSockets for real-time updates, but it's adequate for this application’s update frequency and reduces complexity.

### Overall Approach

- **Component Structure**: Follows Single Responsibility Principle (SRP) for better maintainability.
- **User Interaction Flow**: Intuitive navigation between pages.
- **Styling**: Uses `@mui/system` and `@mui/material` for consistent and responsive design.
