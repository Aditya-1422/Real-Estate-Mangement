import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const loading = false;
  const error = false;
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
  };

  const handleDeleteAccount = () => {
    // Add delete account logic here
  };

  const handleSignOut = () => {
    // Add sign out logic here
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        {currentUser && (
          <>
            <img
              src={currentUser.user.photoURL}
              alt='profile'
              className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'
            />
            <input
              type='text'
              placeholder='Username'
              defaultValue={currentUser.user.username}
              id='username'
              className='border p-3 rounded-lg'
            />
            <input
              type='email'
              placeholder='Email'
              id='email'
              defaultValue={currentUser.user.email}
              className='border p-3 rounded-lg'
            />
          </>
        )}
        <input
          type='password'
          placeholder='Password'
          id='password'
          className='border p-3 rounded-lg'
        />
        <button
          disabled={loading}
          className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Update'}
        </button>
        <Link
          className='bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95'
          to={'/create-listing'}
        >
          Create Listing
        </Link>
      </form>
      <div className='flex justify-between mt-5'>
        <span
          className='text-red-700 cursor-pointer'
          onClick={handleDeleteAccount}
        >
          Delete account
        </span>
        <span
          className='text-red-700 cursor-pointer'
          onClick={handleSignOut}
        >
          Sign out
        </span>
      </div>

      {error && <p className='text-red-700 mt-5'>{error}</p>}
      <button
        className='text-green-700 w-full mt-5'
        onClick={() => navigate('/your-listings')}
      >
        Show Listings
      </button>
      {/* Add user listings rendering logic here */}
    </div>
  );
};

export default Profile;