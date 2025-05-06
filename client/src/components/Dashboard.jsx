import React from 'react';
import { Link } from 'react-router-dom';
import CurrentStatus from './dashboard/CurrentStatus';
import OverView from './dashboard/OverView';
import AnalyticsSection from './dashboard/AnalysisSection';

const DashboardHome = () => {
  return (
    <div className="container-fluid overflowY-scroll">

      <OverView />
      <AnalyticsSection />
      <CurrentStatus />

      <div className="mt-4 mb-5">
        <h5 className='mb-3'>Quick Actions</h5>
        <Link to={'/home/measurements'}>
          <button className="btn btn-primary me-2">+ New Measurement</button>
        </Link>
        <Link to={'/home/progress'}>
          <button className="btn btn-outline-dark">View Analytics</button>
        </Link>
      </div>

    </div>
  );
};

export default DashboardHome;
