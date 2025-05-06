import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from "./pages/Auth";
import PrivateRoute from './pages/PrivateRoute';
import Layout from './Layout';
import Dashboard from './components/Dashboard';
import SubmitMeasurement from './pages/Measurement';
import Progress from './pages/Progress';
import WorkoutPage from './pages/WorkoutPlan';
import Profile from './pages/Profile';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/home" element={<PrivateRoute><Layout/></PrivateRoute>} >
          <Route path="dashboard"element={<Dashboard />} />
          <Route path="measurements" element={<SubmitMeasurement />} />
          <Route path="progress" element={<Progress/>} />
          <Route path="workout-page" element={<WorkoutPage />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
