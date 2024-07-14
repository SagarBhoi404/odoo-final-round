import React, { useState } from 'react';
import SideBar from './inc/SideBar';
import Navbar from './inc/Navbar';
import Footer from './inc/Footer';

const ViewLibrarian = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedLibrarian, setSelectedLibrarian] = useState(null);
  const [librarians, setLibrarians] = useState([
    { id: 1, name: 'Tushar', email: 'tushar@1gmail.com', mobile: '1234567890' }
  ]);

  const handleEditClick = (librarian) => {
    setSelectedLibrarian(librarian);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleSave = () => {
    setLibrarians(librarians.map(lib => (lib.id === selectedLibrarian.id ? selectedLibrarian : lib)));
    handleClose();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedLibrarian({ ...selectedLibrarian, [name]: value });
  };

  return (
    <div>
      <SideBar />
      <main className="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg">
        <Navbar />
        <div className="container-fluid py-4">
          <div className="row justify-content-center">
            <div className="p-4 card shadow col-md-10">
              <h4 className="text-center">Librarian Details</h4>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Sr.</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {librarians.map((librarian, index) => (
                    <tr key={librarian.id}>
                      <td>{index + 1}</td>
                      <td>{librarian.name}</td>
                      <td>{librarian.email}</td>
                      <td>{librarian.mobile}</td>
                      <td>
                        <button className="btn btn-success mx-1" onClick={() => handleEditClick(librarian)}>Edit</button>
                        <button className="btn btn-danger">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Footer />
      </main>

      {showModal && (
        <div className={`modal fade ${showModal ? 'show d-block' : ''}`} tabIndex="-1" role="dialog" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Librarian</h5>
                <button type="button" className="close" aria-label="Close" onClick={handleClose}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" id="name" name="name" value={selectedLibrarian.name} onChange={handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" id="email" name="email" value={selectedLibrarian.email} onChange={handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="mobile">Mobile</label>
                    <input type="text" className="form-control" id="mobile" name="mobile" value={selectedLibrarian.mobile} onChange={handleInputChange} />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
                <button type="button" className="btn btn-primary" onClick={handleSave}>Save changes</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewLibrarian;
