import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './components/Register/Register'
import Login from './components/Login/Login';
import UserList from './components/User/User';
import MessageList from './components/message/message';


function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/sign" element={<Signup/>} />
                    <Route path="/user-list" element={<UserList />} />
                    <Route path="/messages" element={<MessageList />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;


