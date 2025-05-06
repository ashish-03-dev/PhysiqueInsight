import React from 'react';

const Navbar = ({ toggleSidebar}) => {
  return (
    <nav className="navbar navbar-dark bg-primary px-3 d-flex justify-content-between align-items-center" style={{ height: '60px', position: 'sticky', top: 0, zIndex: 1020 }}>
      <div className="d-flex align-items-center">

        <button className="btn btn-outline-light me-3 d-md-none" onClick={toggleSidebar}>
          <i className="fas fa-bars"></i> {/* Bootstrap hamburger icon */}
        </button>
        <h5 className="navbar-brand mb-0 h1">Physique Insight</h5>

      </div>
    </nav>
  );
};

export default Navbar;
