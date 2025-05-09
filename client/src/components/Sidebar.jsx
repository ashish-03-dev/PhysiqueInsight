import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Sidebar = ({ sidebarOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false);
  const location = useLocation();
  useEffect(() => {
    if (window.innerWidth < 768) {
      toggleSidebar(false); // close on mobile by default
    }
  }, []);


  const handleLogout = () => {
    setLoggingOut(true);

    setTimeout(() => {
      localStorage.removeItem('token');
      navigate('/');
    }, 1000);
  };

  const menuItems = [
    { path: 'dashboard', label: 'Dashboard', icon: 'fas fa-home' },
    { path: 'measurements', label: 'Measurements', icon: 'fas fa-ruler' },
    { path: 'progress', label: 'Progress', icon: 'fas fa-chart-line' },
    { path: 'workout-page', label: 'Workout', icon: 'fas fa-dumbbell' },
    { path: 'profile', label: 'Profile', icon: 'fas fa-user' },
    { path: 'settings', label: 'Settings', icon: 'fas fa-cog' },

  ];


  return (
    <>
      {sidebarOpen && (
        <div
          className="d-md-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
          style={{ zIndex: 1009 }}
          onClick={toggleSidebar}
        />
      )}

      <div
        className={`bg-light border-end flex-column p-3 
    ${sidebarOpen ? 'd-flex' : 'd-none'} d-md-flex`} style={{
          width: sidebarOpen ? '250px' : '100px',
          transition: 'all 0.3s ease',
          position: 'fixed',
          top: '60px',
          bottom: '0px',
          left: window.innerWidth < 768 ? (sidebarOpen ? '0' : '-250px') : '0', // <-- This is key
          zIndex: 1010,
        }}
      >

        <div className="d-none d-md-flex p-2">
          <button className="btn btn-outline-secondary" onClick={toggleSidebar}>
            <i className="fas fa-bars"></i>
          </button>
        </div>

        <ul className="nav nav-pills flex-column mt-4 mb-auto">
          {menuItems.map((item, index) => (
            <li className="nav-item mb-2" key={index}>
              <Link
                to={item.path}
                className={`nav-link d-flex align-items-center ${location.pathname.includes(item.path) ? '' : 'link-dark'}`} >
                <div className="d-flex gap-1 flex-grow-1 align-items-center">
                  <i className={`bi ${item.icon} p-2 fs-5`}></i>
                  {sidebarOpen && item.label}
                </div>

              </Link>
            </li>
          ))}
        </ul>
        <hr />

        {sidebarOpen &&
          <div className="mt-auto">
            <button
              onClick={handleLogout}
              className="btn btn-danger w-100 d-flex align-items-center justify-content-center"
              disabled={loggingOut}
            >
              <i className="fas fa-sign-out-alt me-2"></i>
              {loggingOut
                ? 'Logging out...'
                : sidebarOpen && 'Logout'}
            </button>
          </div>}

      </div>
    </>
  );
};

export default Sidebar;
