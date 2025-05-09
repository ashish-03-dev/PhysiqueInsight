import React, { useState, createContext, useContext } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Outlet } from 'react-router-dom';
import ToastNotification from './components/ToastNotification';


const Layout = () => {
  const [username, setUsername] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("Your action was successful!");

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const triggerToast = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
      <div className="d-flex flex-column">

        <Navbar username={username} toggleSidebar={toggleSidebar} />

        <div className="d-flex flex-grow-1 " style={{ overflowY: 'auto' }}>

          <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

          <div
            className="container flex-grow-1 p-4 fade-in" style={{
              marginLeft: window.innerWidth >= 768 ? (sidebarOpen ? '250px' : '100px') : '0px',
              transition: 'margin 0.3s ease',
            }}
          >

            <Outlet context={{triggerToast, setUsername}}/>

            {showToast && <ToastNotification message={toastMessage} />}
            
          </div>
        </div>
      </div>
  );
};

export default Layout;
