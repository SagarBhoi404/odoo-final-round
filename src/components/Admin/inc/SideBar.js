import React from "react";
import { MdDashboardCustomize } from "react-icons/md";
import { FaDatabase } from "react-icons/fa";
import { CiViewList } from "react-icons/ci";
import { Link } from "react-router-dom";

function SideBar() {
  

  return (
    <>
       <aside class="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 " id="sidenav-main">
    <div class="sidenav-header">
      <i class="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav"></i>
      <a class="navbar-brand m-0" href="https://demos.creative-tim.com/soft-ui-dashboard/pages/dashboard.html" target="_blank">
        <span class="ms-1 font-weight-bold"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL_uqkSMAQ3JhpBHcu-0TnNVn2B5b3cr6Vig&s" className="img-rounded me-2" width="20px"></img>Admin</span>
      </a>
    </div>
    <hr class="horizontal dark mt-0"/>
    <div class="collapse navbar-collapse  w-auto  max-height-vh-100 h-100" id="sidenav-collapse-main">
      <ul class="navbar-nav my-1">
        <li class="nav-item">
          <Link class="nav-link  active" to="../Admin/Admindashboard">
            <div class="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
            <MdDashboardCustomize />
            </div>
            <span class="nav-link-text ms-1">Dashboard </span>
          </Link>
        </li>
        
      </ul>
      <ul class="navbar-nav my-2">
        <li class="nav-item">
          <Link class="nav-link " to="../Admin/ManageLibrarian">
            <div class="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
            <FaDatabase/>
            </div>
            <span class="nav-link-text ms-1"> Manage Librarian</span>
          </Link>
        </li>
        
      </ul>
      <ul class="navbar-nav">
        <li class="nav-item">
          <Link class="nav-link " to="../Admin/ViewLibrarian">
            <div class="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
            <CiViewList/>
            </div>
            <span class="nav-link-text ms-1"> View Librarian</span>
          </Link>
        </li>
        
      </ul>
    </div>
    
  </aside>
    </>
  );
}

export default SideBar;
