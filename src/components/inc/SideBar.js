import React from "react";
import { MdDashboardCustomize } from "react-icons/md";
import { FaBook } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
// import BookManagement from "../Librarian/BookManagement";

function SideBar() {


  return (
    <>
      <aside class="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 " id="sidenav-main">
        <div class="sidenav-header">
          <i class="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav"></i>
          <a class="navbar-brand m-0" href="https://demos.creative-tim.com/soft-ui-dashboard/pages/dashboard.html" target="_blank">
            <img src="../assets/img/logo-ct.png" class="navbar-brand-img h-100" alt="main_logo" />
            <span class="ms-1 font-weight-bold">Librarian Login</span>
          </a>
        </div>
        <hr class="horizontal dark mt-0" />
        <div class="collapse navbar-collapse  w-auto  max-height-vh-100 h-100" id="sidenav-collapse-main">
          <ul class="navbar-nav my-2">
            <li class="nav-item">
              <Link class="nav-link " to="../Librarian/Librariandashboard">
                <div class="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                  <MdDashboardCustomize />
                </div>
                <span class="nav-link-text ms-1"> Dashboard</span>
              </Link>
            </li>
          </ul>
          <ul class="navbar-nav">
            <li class="nav-item">
              <Link class="nav-link " to="../Librarian/BookManagement">
                <div class="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                <FaBook />

                </div>
                <span class="nav-link-text ms-1"> Book Management</span>
              </Link>
            </li>
          </ul>
          <ul class="navbar-nav my-2">
            <li class="nav-item">
              <Link class="nav-link " to="../Librarian/ListUser">
                <div class="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                <FaUser/>
                </div>
                <span class="nav-link-text ms-1">All User List</span>
              </Link>
            </li>
          </ul>
          <ul class="navbar-nav my-2">
            <li class="nav-item">
              <Link class="nav-link " to="../Librarian/UserBorrow">
                <div class="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                <FaUser/>
                </div>
                <span class="nav-link-text ms-1">Borrow Book</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}

export default SideBar;
