import React, { useEffect, useState } from 'react';

const ToastNotification = ({ message }) => {
  return (
    <div className="toast-container position-fixed bottom-0 end-0 p-3" style={{ zIndex: 12000 }}>
      <div className="toast show" role="alert">
        <div className="toast-header">
          <strong className="me-auto">Notice</strong>
         <small>now</small>
        </div>
        <div className="toast-body">
          {message}
        </div>
      </div>
    </div>
  );
};

export default ToastNotification;
