import React, { useState } from 'react';
import axios from 'axios';
import './Register.css'
export default function Register() {
    const [formData, setFormData] = useState({
        name: '', email: '', password: '', phone_number: '', role: 'Student'
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/register', formData);
            alert('User registered');
        } catch (error) {
            console.error('Error registering user', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="name" placeholder="Name" onChange={handleChange} required />
            <input name="email" placeholder="Email" onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
            <input name="phone_number" placeholder="Phone Number" onChange={handleChange} required />
            <select name="role" onChange={handleChange}>
                <option value="Student">Student</option>
                <option value="Teacher">Teacher</option>
                <option value="Institute">Institute</option>
            </select>
            <button type="submit">Register</button>
        </form>
    );
}
