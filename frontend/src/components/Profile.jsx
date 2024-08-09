import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [filePerc, setFilePerc] = useState(0);
  const [uploadedImgURL, setUploadedImgURL] = useState(currentUser?.user?.photoURL);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    if (!file || !file.name) {
      console.error('Invalid file: ', file);
      return;
    }

    try {
      const storage = getStorage(app);
      const filename = new Date().getTime() + file.name;
      const storageref = ref(storage, filename);

      const uploadFileTask = uploadBytesResumable(storageref, file);

      uploadFileTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Uploading snapshot: ' + progress);
          setFilePerc(Math.round(progress)); // Update file percentage
          setFileUploadError(false);
        },
        (error) => {
          console.error('File upload error: ', error.message);
          setFileUploadError(true);
          setFilePerc(0); // Reset file percentage on error
        },
        () => {
          getDownloadURL(uploadFileTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at: ', downloadURL);
            setUploadedImgURL(downloadURL); // Set new image URL after upload
            setFilePerc(100); // Set to 100% when the upload is complete
          });
        }
      );
    } catch (error) {
      console.error('Error in file upload: ', error);
    }
  };

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
        <input onChange={(e) => { setFile(e.target.files[0]) }} type="file" accept='image/*' ref={fileRef} hidden />
        {currentUser && (
          <>
            <div className='relative self-center mt-2'>
              <img
                onClick={(e) => { fileRef.current.click() }}
                src={uploadedImgURL}
                alt='profile'
                className='rounded-full h-24 w-24 object-cover cursor-pointer'
              />
              {filePerc > 0 && filePerc < 100 && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-full">
                  <span className="text-white text-xs">{filePerc}%</span>
                </div>
              )}
            </div>
            {fileUploadError && (
              <p className="text-red-700">Failed to upload file. Please try again.</p>
            )}
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
          className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'
        >
          Update
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