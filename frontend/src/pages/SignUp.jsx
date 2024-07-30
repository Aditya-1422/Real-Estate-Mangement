import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import OAuth from '../components/OAuth'

const SignUp = () => {
    const [username, setUser] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError("")
        try {
            const response = await axios.post('http://localhost:4000/api/auth/signup', { username, password, email })
            alert("Signup successful! Please log in.")
            console.log(response)
            navigate('/sign-in')
        } catch (error) {
            setError(error.response.data.message || "An error occurred")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <input
                    type='text'
                    placeholder='username'
                    className='border p-3 rounded-lg'
                    id='username'
                    onChange={(e) => { setUser(e.target.value) }}
                />
                <input
                    type='email'
                    placeholder='email'
                    className='border p-3 rounded-lg'
                    id='email'
                    onChange={(e) => { setEmail(e.target.value) }}
                />
                <input
                    type='password'
                    placeholder='password'
                    className='border p-3 rounded-lg'
                    id='password'
                    onChange={(e) => { setPassword(e.target.value) }}
                />

                <button
                    disabled={loading}
                    className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
                >
                    {loading ? 'Loading...' : 'Sign Up'}
                </button>
                <OAuth/>
                </form>
            <div className='flex gap-2 mt-5'>
                <p>Have an account?</p>
                <Link to={'/sign-in'}>
                    <span className='text-blue-700'>Sign in</span>
                </Link>
            </div>
            {error && <p className='text-red-500 mt-5'>{error}</p>}
        </div>
    )
}

export default SignUp