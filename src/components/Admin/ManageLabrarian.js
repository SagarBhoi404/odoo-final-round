import React from 'react'
import SideBar from './inc/SideBar'
import Navbar from './inc/Navbar'
import Footer from './inc/Footer'

const ManageLabrarian = () => {
  return (
    <div>
        <SideBar/>
      <main class="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg ">
        {/* <!-- Navbar --> */}
        <Navbar/>
        {/* <!-- End Navbar --> */}
        <div class="container-fluid py-4">
        <form class="row g-3 justify-content-center needs-validation" novalidate>
            <div className='card p-4 col-md-10'>
                <h4 className='text-center'>Manage Librarian</h4>
                <div class="col-12">
                  <label for="yourUsername" class="form-label">
                    Name
                  </label>
                  <div class="input-group">
                    
                    <input
                    placeholder='Enter'
                      type="text"
                      name="Name"
                      class="form-control"
                      id="yourUsername"
                      required
                    />
                    
                  </div>
                </div>
                <div class="col-12">
                  <label for="yourPassword" class="form-label">
                    Email
                  </label>
                  <input
                    placeholder='Enter'
                    type="text"
                    name="password"
                    class="form-control"
                    id="yourPassword"
                    required
                  />
                  
                </div>
                <div class="col-12">
                  <label for="yourPassword" class="form-label">
                    Class
                  </label>
                  <input
                    placeholder='Enter'
                    type="password"
                    name="password"
                    class="form-control"
                    id="yourPassword"
                    required
                  />
                  
                </div>
                
                <div class="col-12">
                  <label for="yourPassword" class="form-label">
                    Mobile No.
                  </label>
                  <input
                  placeholder='Enter'
                    type="text"
                    name="password"
                    class="form-control"
                    id="yourPassword"
                    required
                  />
                  
                </div>
                <div class="col-12 mt-4">
                  <button class="btn btn-primary w-100" type="submit">
                    Submit
                  </button>
                </div></div>
               
              </form>
    </div>
    {/* <Footer/> */}
    </main>
    </div>
  )
}

export default ManageLabrarian