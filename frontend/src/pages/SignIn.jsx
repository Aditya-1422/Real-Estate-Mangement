import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { signInFailure, signInStart, signInSuccess } from '../redux/user/userSlice'
import OAuth from '../components/OAuth'

const SignIn = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch(signInStart())
        try {
            const response = await axios.post('http://localhost:4000/api/auth/signin', { email, password })
            dispatch(signInSuccess(response.data))
            setLoading(false)
            alert("Login successful!")
            console.log(response)
            navigate('/')
        } catch (error) {
            setError(error)
            dispatch(signInFailure(error.response.data.message || "An error occurred"))
        }
    }

    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <input
                    type='email'
                    placeholder='email'
                    className='border p-3 rounded-lg'
                    id='email'
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type='password'
                    placeholder='password'
                    className='border p-3 rounded-lg'
                    id='password'
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    disabled={loading}
                    className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
                >
                    {loading ? 'Loading...' : 'Sign In'}
                </button>
                <OAuth/>
            </form>
            <div className='flex gap-2 mt-5'>
                <p>Don't have an account?</p>
                <Link to={'/sign-up'}>
                    <span className='text-blue-700'>Sign up</span>
                </Link>
            </div>
            {error && <p className='text-red-500 mt-5'>{error}</p>}
        </div>
    )
}

export default SignIn