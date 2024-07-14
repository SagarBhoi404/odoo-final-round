import React from 'react'
import Navbar from "./inc/Navbar";
import SideBar from "./inc/SideBar";
// import Footer from "./inc/Footer";

function Admindashboard() {
  return (
    <div>
      <SideBar/>
      <main class="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg ">
        <Navbar />
        <div class="container-fluid py-4 justify-content-center">
        <div class="card col-md-10" style={{width: "18rem;"}}>
  <div class="card-body">
    <h5 class="card-title">Total Librarian</h5>
    <p class="card-text">5</p>
  </div>
</div>
        </div>
        {/* <Footer/> */}
        </main>
    </div>
  )
}

export default Admindashboard