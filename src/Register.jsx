// src/components/Register.jsx
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';

const Register = ({ onRegisterSuccess }) => {
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const handleRegister = () => {
        fetch('http://localhost:8080/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, name, password, email }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Registration failed');
                }
                alert('Registration successful!');
                onRegisterSuccess();
                return response.text();
            })
            .then(message => {
                if (message === 'User created successfully') {
                    return
                } else {
                    throw new Error('Registration failed');
                }
            })
            .catch(error => {
                console.error('Error during registration:', error);
                //setError('Registration failed. Please try again.');
            });
    };

    return (
        <div className="p-6 max-w-sm mx-auto bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Register</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <input
                type="text"
                className="border p-2 mb-4 w-full"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="text"
                className="border p-2 mb-4 w-full"
                placeholder="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="email"
                className="border p-2 mb-4 w-full"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                className="border p-2 mb-4 w-full"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleRegister} className="px-6 py-2 bg-blue-500 text-white rounded-lg w-full">Register</button>
        </div>
    );
};

export default Register;
