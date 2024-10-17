import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './User.css'
export default function User() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users', error);
        }
    };

    const deleteUser = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/users/${id}`);
            alert('User deleted');
            fetchUsers();
        } catch (error) {
            console.error('Error deleting user', error);
        }
    };

    return (
        <div className='user-list'>
            <h2>User List</h2>
            <ul className='user-item'>
                {users.map(user => (
                    <li key={user.id}>
                        <p>Name: {user.name}</p>
                        <p>Email: {user.email}</p>
                        <p>Role: {user.role}</p>
                        <button onClick={() => deleteUser(user.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
