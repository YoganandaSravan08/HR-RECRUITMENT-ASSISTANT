import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Jobs from "./pages/Jobs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Candidates from "./pages/Candidates";
import InterviewGenerator from "./pages/InterviewGenerator";
import Analytics from "./pages/Analytics";
import UploadResume from "./pages/UploadResume";
import ATSAnalysis from "./pages/ATSAnalysis";
import CandidateDetails from "./pages/CandidateDetails";

function App() {
  return (
    <BrowserRouter>
      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
        }}
      />

      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/jobs"
          element={<Jobs />}
        />

        <Route
          path="/candidates"
          element={<Candidates />}
        />

        <Route
          path="/candidates/:id"
          element={<CandidateDetails />}
        />

        <Route
          path="/upload-resume"
          element={<UploadResume />}
        />

        <Route
          path="/ats"
          element={<ATSAnalysis />}
        />

        <Route
          path="/interview"
          element={<InterviewGenerator />}
        />

        <Route
          path="/analytics"
          element={<Analytics />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
