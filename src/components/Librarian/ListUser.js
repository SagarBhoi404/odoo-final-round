import React, { useState, useEffect } from 'react';
import SideBar from '../inc/SideBar';
import Navbar from '../inc/Navbar';
import Footer from '../inc/Footer';

const ListUser = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://192.168.2.232:8000/api/auth/getAllUser');
            if (response.ok) {
                const data = await response.json();
                if (data.error === false) {
                    const filteredUsers = data.data.filter(user => user.role === 'user');
                    setUsers(filteredUsers); // Set only users with role === 'user'
                } else {
                    console.error('Failed to fetch users:', data.message);
                }
            } else {
                console.error('Failed to fetch users');
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    return (
        <>
            <SideBar />
            <main className="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg">
                <Navbar />
                <div className='container py-4'>
                    <div className="row justify-content-center">
                        <div className="card col-md-11 mb-4">
                            <div className="card-header pb-0">
                                <h6>Users Table</h6>
                            </div>
                            <div className="card-body px-0 pt-0 pb-2">
                                <div className="table-responsive p-0">
                                    <table className="table align-items-center mb-0">
                                        <thead>
                                            <tr>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Name</th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Email</th>
                                                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Role</th>
                                                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users.map(user => (
                                                <tr key={user._id}>
                                                    <td>
                                                        <div className="d-flex px-2 py-1">
                                                            <div>
                                                                <img src="../assets/img/team-2.jpg" className="avatar avatar-sm me-3" alt="user1" />
                                                            </div>
                                                            <div className="d-flex flex-column justify-content-center">
                                                                <h6 className="mb-0 text-sm">{user.name}</h6>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <p className="text-xs font-weight-bold mb-0">{user.email}</p>
                                                    </td>
                                                    <td>
                                                        <p className="text-xs font-weight-bold mb-0">{user.role}</p>
                                                    </td>
                                                    <td>
                                                        <p className={`text-xs font-weight-bold mb-0 ${user.isActive ? 'text-success' : 'text-danger'}`}>
                                                            {user.isActive ? 'Inactive' : 'Active'}
                                                        </p>
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
                <Footer />
            </main>
        </>
    );
};

export default ListUser;
