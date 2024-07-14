import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SideBar from '../inc/SideBar';
import Navbar from '../inc/Navbar';
import Footer from '../inc/Footer';
import toast, { Toaster } from 'react-hot-toast';

const BookManagement = () => {
    const initialBookData = {
        isbn: '',
        title: '',
        author: '',
        publisher: '',
        year: '',
        genre: '',
        quantity: '',
        description: ''
    };

    const [bookData, setBookData] = useState(initialBookData);
    const [editMode, setEditMode] = useState(false);
    const [editBookId, setEditBookId] = useState('');
    const [viewBook, setViewBook] = useState(null); // State to manage which book to view

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBookData({
            ...bookData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        
        try {
            let response;
            if (editMode) {
                response = await axios.put(
                    `http://192.168.2.232:8000/api/book/${editBookId}`,
                    bookData,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }
                );
            } else {
                response = await axios.post(
                    'http://192.168.2.232:8000/api/book/add',
                    bookData,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }
                );
            }
            
            if (response.status === 200) {
                toast.success(editMode ? 'Book updated successfully!' : 'Book added successfully!');
                if (editMode) {
                    setEditMode(false);
                    setEditBookId('');
                }
                // Clear the form
                setBookData(initialBookData);
                // Refetch books after adding/updating
                fetchBooks();
            } else {
                toast.error(editMode ? 'Failed to update book.' : 'Failed to add book.');
            }
        } catch (error) {
            toast.error(`An error occurred while ${editMode ? 'updating' : 'adding'} the book.`);
        }
    };

    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get('http://192.168.2.232:8000/api/book/all', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                setBooks(response.data.data); // Assuming response.data.data is the array of books
            } else {
                toast.error('Failed to fetch books.');
            }
        } catch (error) {
            toast.error('An error occurred while fetching books.');
        }
    };

    const handleEdit = (book) => {
        setBookData({
            isbn: book.isbn,
            title: book.title,
            author: book.author,
            publisher: book.publisher,
            year: book.year,
            genre: book.genre,
            quantity: book.quantity,
            description: book.description
        });
        setEditMode(true);
        setEditBookId(book._id);
    };

    const handleView = (book) => {
        setViewBook(book); // Set the book to view
    };

    const handleCloseView = () => {
        setViewBook(null); // Close the view modal or section
    };

    const handleDelete = async (id) => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.delete(`http://192.168.2.232:8000/api/book/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                toast.success('Book deleted successfully!');
                // Filter out the deleted book from the local state
                setBooks(books.filter(book => book._id !== id));
            } else {
                toast.error('Failed to delete book.');
            }
        } catch (error) {
            toast.error('An error occurred while deleting the book.');
        }
    };

    return (
        <>
            <SideBar />
            <main className="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg ">
                <Navbar />
                <div className='container py-4'>
                    <form className="row g-3" onSubmit={handleSubmit}>
                        <div className='card p-3'>
                            <h5 className="text-center">{editMode ? 'Edit Book' : 'Add Book'}</h5>
                            <div className="col-12">
                                <label htmlFor="isbn" className="form-label">
                                    ISBN
                                </label>
                                <input
                                    placeholder='Enter ISBN'
                                    type="text"
                                    name="isbn"
                                    className="form-control"
                                    id="isbn"
                                    value={bookData.isbn}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-12">
                                <label htmlFor="title" className="form-label">
                                    Title
                                </label>
                                <input
                                    placeholder='Enter Title'
                                    type="text"
                                    name="title"
                                    className="form-control"
                                    id="title"
                                    value={bookData.title}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-12">
                                <label htmlFor="author" className="form-label">
                                    Author
                                </label>
                                <input
                                    placeholder='Enter Author'
                                    type="text"
                                    name="author"
                                    className="form-control"
                                    id="author"
                                    value={bookData.author}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-12">
                                <label htmlFor="publisher" className="form-label">
                                    Publisher
                                </label>
                                <input
                                    placeholder='Enter Publisher'
                                    type="text"
                                    name="publisher"
                                    className="form-control"
                                    id="publisher"
                                    value={bookData.publisher}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-12">
                                <label htmlFor="year" className="form-label">
                                    Year
                                </label>
                                <input
                                    placeholder='Enter Year'
                                    type="text"
                                    name="year"
                                    className="form-control"
                                    id="year"
                                    value={bookData.year}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-12">
                                <label htmlFor="genre" className="form-label">
                                    Genre
                                </label>
                                <input
                                    placeholder='Enter Genre'
                                    type="text"
                                    name="genre"
                                    className="form-control"
                                    id="genre"
                                    value={bookData.genre}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-12">
                                <label htmlFor="quantity" className="form-label">
                                    Quantity
                                </label>
                                <input
                                    placeholder='Enter Quantity'
                                    type="number"
                                    name="quantity"
                                    className="form-control"
                                    id="quantity"
                                    value={bookData.quantity}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-12 mb-3">
                                <label htmlFor="description" className="form-label">
                                    Description
                                </label>
                                <textarea
                                    placeholder='Enter Description'
                                    name="description"
                                    className="form-control"
                                    id="description"
                                    value={bookData.description}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-12">
                                <button className="btn btn-primary w-100" type="submit">
                                    {editMode ? 'Update' : 'Submit'}
                                </button>
                            </div>
                        </div>
                    </form>
                    <Toaster />
                </div>
                <div className='container'>
                    <div className='row justify-content-center'>
                        <div className="card col-md-12 mb-4">
                            <div className="card-header pb-0">
                                <h6>Books Table</h6>
                            </div>
                            <div className="card-body px-0 pt-0 pb-2">
                                <div className="table-responsive p-0">
                                    <table className="table align-items-center mb-0">
                                        <thead>
                                            <tr>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">ISBN</th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Title</th>
                                                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {books.map(book => (
                                                <tr key={book._id}>
                                                    <td>{book.isbn}</td>
                                                    <td>{book.title}</td>
                                                    <td>
                                                        <button type='button' className="btn btn-secondary p-2 m-1" onClick={() => handleView(book)} data-toggle="tooltip" data-original-title="View book">
                                                            View
                                                        </button>
                                                        <button type='button' className="btn btn-success p-2 m-1" onClick={() => handleEdit(book)} data-toggle="tooltip" data-original-title="Edit book">
                                                            Edit
                                                        </button>
                                                        <button type='button' className="btn btn-danger p-2 m-1" onClick={() => handleDelete(book._id)} data-toggle="tooltip" data-original-title="Delete book">
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Modal or Detailed View Section */}
                {viewBook && (
                    <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                        <div className="modal-dialog modal-lg" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">{viewBook.title}</h5>
                                    <button type="button" className="btn-close" aria-label="Close" onClick={handleCloseView}></button>
                                </div>
                                <div className="modal-body">
                                    <p><strong>ISBN:</strong> {viewBook.isbn}</p>
                                    <p><strong>Title:</strong> {viewBook.title}</p>
                                    <p><strong>Author:</strong> {viewBook.author}</p>
                                    <p><strong>Publisher:</strong> {viewBook.publisher}</p>
                                    <p><strong>Year:</strong> {viewBook.year}</p>
                                    <p><strong>Genre:</strong> {viewBook.genre}</p>
                                    <p><strong>Quantity:</strong> {viewBook.quantity}</p>
                                    <p><strong>Description:</strong> {viewBook.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <Footer />
            </main>
        </>
    );
};

export default BookManagement;
