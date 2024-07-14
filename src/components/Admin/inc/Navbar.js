import React, { useState } from 'react';

function Navbar() {
  const [isSidebarToggled, setIsSidebarToggled] = useState(false);

  const handleToggleClick = () => {
    setIsSidebarToggled(!isSidebarToggled);
    document.body.classList.toggle('toggle-sidebar', !isSidebarToggled);
  };

  return (
    <>
      <nav className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl" id="navbarBlur" navbar-scroll="true">
        <div className="container-fluid py-1 px-3">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
              <li className="breadcrumb-item text-sm"><a className="opacity-5 text-dark" href="javascript:;">Pages</a></li>
              <li className="breadcrumb-item text-sm text-dark active" aria-current="page">Dashboard</li>
            </ol>
            <h6 className="font-weight-bolder mb-0">Dashboard</h6>
          </nav>
          <button 
            className="navbar-toggler text-light" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbar" 
            aria-controls="navbar" 
            aria-expanded="false" 
            aria-label="Toggle navigation" 
            onClick={handleToggleClick}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
            <div className="ms-md-auto pe-md-3 d-flex align-items-center">
              <div className="input-group">
                <span className="input-group-text text-body"><i className="fas fa-search" aria-hidden="true"></i></span>
                <input type="text" className="form-control" placeholder="Type here..." />
              </div>
            </div>
            <ul className="navbar-nav justify-content-end">
              <li className="nav-item d-flex align-items-center">
                <a href="javascript:;" className="nav-link text-body font-weight-bold px-0">
                  <i className="fa fa-user me-sm-1"></i>
                  <a className="d-sm-inline d-none" href='/'>Log Out</a>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
