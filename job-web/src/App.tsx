import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { JobProvider } from './context/JobProvider';
import { JobListPage } from './pages/JobList/JobListPage';
import { NotFoundPage } from './pages/Error/NotFoundPage';
import { JobDetailPage } from './pages/JobDetail/JobDetailPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  return (
    <Router>
      <ToastContainer />
      <JobProvider>
        <Routes>
          <Route path="/" element={<JobListPage />} />
          <Route path="/jobs/:jobId" element={<JobDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </JobProvider>
    </Router>
  );
};

export default App;
