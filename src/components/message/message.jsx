import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './message.css';

export default function Message() {
    const [messages, setMessages] = useState([]);
    const [messageText, setMessageText] = useState('');
    const [receiverId, setReceiverId] = useState('');
    const [users, setUsers] = useState([]);
    const userId = localStorage.getItem('userId'); // Assume userId is stored upon login

    useEffect(() => {
        fetchMessages();
        fetchUsers();
    }, []);

    const fetchMessages = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/messages/${userId}`);
            setMessages(response.data);
        } catch (error) {
            console.error('Error fetching messages', error);
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users', error);
        }
    };

    const sendMessage = async () => {
        try {
            await axios.post('http://localhost:5000/messages', {
                sender_id: userId,
                receiver_id: receiverId,
                message: messageText
            });
            setMessageText('');
            setReceiverId('');
            fetchMessages();
            alert('Message sent');
        } catch (error) {
            console.error('Error sending message', error);
        }
    };

    return (
        <div className='message-list'>
            <h2>Messages</h2>
            <ul className='message-item'>
                {messages.map(msg => (
                    <li key={msg.id}>
                        <p><strong>From:</strong> {msg.sender_id}</p>
                        <p><strong>To:</strong> {msg.receiver_id}</p>
                        <p><strong>Message:</strong> {msg.message}</p>
                    </li>
                ))}
            </ul>
            <h3>Send a Message</h3>
            <div className='message-form'>
                <select
                    value={receiverId}
                    onChange={(e) => setReceiverId(e.target.value)}
                    required
                >
                    <option value="">Select Receiver</option>
                    {users.map(user => (
                        <option key={user.id} value={user.id}>{user.name}</option>
                    ))}
                </select>
                <textarea
                    placeholder="Message"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    required
                ></textarea>
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
}
