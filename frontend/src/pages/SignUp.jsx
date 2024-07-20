import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { URL } from '../url.js';
import axios from 'axios';

export default function SignUp() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const response = await axios.post(`${URL}/api/auth/signup`, { username, email, password }, { withCredentials: true });
            console.log(response.data);
            setSuccess('User registered successfully!');
            setTimeout(() => {
                navigate('/sign-in');
            },
            setLoading(false), 800); // Navigate to the login page after 2 seconds
        } catch (err) {
            setLoading(false);
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError('Registration failed. Please try again.');
            }
        }
    };

    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <input
                    type='text'
                    placeholder='username'
                    className='border p-3 rounded-lg'
                    id='username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type='email'
                    placeholder='email'
                    className='border p-3 rounded-lg'
                    id='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type='password'
                    placeholder='password'
                    className='border p-3 rounded-lg'
                    id='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    disabled={loading}
                    className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
                >
                    {loading ? 'Loading...' : 'Sign Up'}
                </button>
            </form>
            <div className='flex gap-2 mt-5'>
                <p>Have an account?</p>
                <Link to={'/sign-in'}>
                    <span className='text-blue-700'>Sign in</span>
                </Link>
            </div>
            {error && <p className='text-red-500 mt-5'>{error}</p>}
            {success && <p className='text-green-500 mt-5'>{success}</p>}
        </div>
    );
}