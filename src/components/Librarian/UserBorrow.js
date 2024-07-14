import React, { useState } from 'react';
import SideBar from '../inc/SideBar';
import Navbar from '../inc/Navbar';
import Footer from '../inc/Footer';
// import { Toaster } from 'react-hot-toast';
import toast, { Toaster } from 'react-hot-toast';

const UserBorrow = () => {
    const [bookData, setBookData] = useState({
        userId: '',
        bookId: '',
        dueDate: ''
    });
    const token = localStorage.getItem('token');

    const [selectedUser, setSelectedUser] = useState(null);
    const [userSearchTerm, setUserSearchTerm] = useState('');
    const [users, setUsers] = useState([]);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

    const [bookSearchTerm, setBookSearchTerm] = useState('');
    const [books, setBooks] = useState([]);
    const [isBookDropdownOpen, setIsBookDropdownOpen] = useState(false);

    const handleUserSearchChange = (e) => {
        setUserSearchTerm(e.target.value);
        fetchUserData(e.target.value); // Fetch users as the search term changes
    };

    const handleBookSearchChange = (e) => {
        setBookSearchTerm(e.target.value);
        fetchBookData(e.target.value); // Fetch books as the search term changes
    };

    const fetchUserData = async (term) => {
        try {
            const response = await fetch(`http://192.168.2.232:8000/api/auth/getAllUser?name=${term}`);
            if (response.ok) {
                const data = await response.json();
                const usersData = data.data; // Assuming data.data contains the array of users
                if (Array.isArray(usersData) && usersData.length > 0) {
                    console.log('Users found:', usersData);
                    setUsers(usersData); // Set users array from API response
                    setIsUserDropdownOpen(true); // Open dropdown if there are results
                } else {
                    console.log('No users found');
                    setUsers([]); // Reset users array if no results
                    setIsUserDropdownOpen(false); // Close dropdown if no results
                }
            } else {
                console.error('Failed to fetch users');
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const fetchBookData = async (term) => {
        try {
            const response = await fetch(`http://192.168.2.232:8000/api/book/all?title=${term}`);
            if (response.ok) {
                const data = await response.json();
                const booksData = data.data; // Assuming data.data contains the array of books
                if (Array.isArray(booksData) && booksData.length > 0) {
                    console.log('Books found:', booksData);
                    setBooks(booksData); // Set books array from API response
                    setIsBookDropdownOpen(true); // Open dropdown if there are results
                } else {
                    console.log('No books found');
                    setBooks([]); // Reset books array if no results
                    setIsBookDropdownOpen(false); // Close dropdown if no results
                }
            } else {
                console.error('Failed to fetch books');
            }
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    const handleUserSelect = (e) => {
        const userId = e.target.value;
        console.log('Selected User ID:', userId);
        const selectedUser = users.find(user => user._id === userId);
        setSelectedUser(selectedUser); // Set selectedUser with the object
        setBookData(prevData => ({
            ...prevData,
            userId: userId
        }));
        setIsUserDropdownOpen(false); // Close dropdown after selection
    };

    const handleBookSelect = (e) => {
        const bookId = e.target.value;
        console.log('Selected Book ID:', bookId);
        setBookData(prevData => ({
            ...prevData,
            bookId: bookId
        }));
        setIsBookDropdownOpen(false); // Close dropdown after selection
    };

    const handleDueDateChange = (e) => {
        const dueDate = e.target.value;
        setBookData(prevData => ({
            ...prevData,
            dueDate: dueDate
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://192.168.2.232:8000/api/transactions/borrow', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                
                body: JSON.stringify(bookData)
            });
            if (response.ok) {
                console.log('Borrow transaction successful');
                toast.success("Borrow transaction successful")
                // Optionally handle success (e.g., show a success message)
            } else {
                console.error('Failed to borrow book');
                toast.error("Failed to borrow book")
                // Optionally handle failure (e.g., show an error message)
            }
        } catch (error) {
            toast.error("Failed to borrow book")
            console.error('Error borrowing book:', error);
            // Handle network errors or other exceptions
        }
    };

    return (
        <>
            <SideBar />
            <main className="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg">
                <Navbar />
                <div className='container py-4'>
                    <form className="row g-3" onSubmit={handleSubmit}>
                        <div className='card p-3'>
                            <h5 className="text-center">Borrow</h5>

                            <div className="col-12">
                                <div className="mb-3">
                                    <label htmlFor="userSearchTerm" className="form-label">Search and Select User</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="userSearchTerm"
                                        value={userSearchTerm}
                                        onChange={handleUserSearchChange}
                                        placeholder="Search for a user by name or email"
                                    />
                                    {isUserDropdownOpen && (
                                        <select
                                            className="form-select mt-3"
                                            onChange={handleUserSelect}
                                            size={users.length > 5 ? 5 : users.length} // Limit the size of the dropdown
                                            style={{ width: '100%' }}
                                        >
                                            {users.map(user => (
                                                <option key={user._id} value={user._id}>
                                                    {user.name} - {user.email}
                                                </option>
                                            ))}
                                        </select>
                                    )}
                                </div>
                            </div>

                            <div className="col-12">
                                <div className="mb-3">
                                    <label htmlFor="userId" className="form-label">Selected User ID</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="userId"
                                        value={bookData.userId}
                                        readOnly // Make it read-only
                                    />
                                </div>
                            </div>

                            <div className="col-12">
                                <div className="mb-3">
                                    <label htmlFor="bookSearchTerm" className="form-label">Search and Select Book</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="bookSearchTerm"
                                        value={bookSearchTerm}
                                        onChange={handleBookSearchChange}
                                        placeholder="Search for a book by title"
                                    />
                                    {isBookDropdownOpen && (
                                        <select
                                            className="form-select mt-3"
                                            onChange={handleBookSelect}
                                            size={books.length > 5 ? 5 : books.length} // Limit the size of the dropdown
                                            style={{ width: '100%' }}
                                        >
                                            {books.map(book => (
                                                <option key={book._id} value={book._id}>
                                                    {book.title} - {book.author}
                                                </option>
                                            ))}
                                        </select>
                                    )}
                                </div>
                            </div>

                            <div className="col-12">
                                <div className="mb-3">
                                    <label htmlFor="bookId" className="form-label">Selected Book ID</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="bookId"
                                        value={bookData.bookId}
                                        readOnly // Make it read-only
                                    />
                                </div>
                            </div>

                            <div className="col-12">
                                <div className="mb-3">
                                    <label htmlFor="dueDate" className="form-label">Due Date</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="dueDate"
                                        value={bookData.dueDate}
                                        onChange={handleDueDateChange}
                                    />
                                </div>
                            </div>

                            <div className="col-12 mt-3">
                                <button className="btn btn-primary w-100" type="submit">
                                    Submit
                                </button>
                            </div>
                        </div>
                    </form>

                    <Toaster />
                </div>

                <Footer />
            </main>
        </>
    );
};

export default UserBorrow;
