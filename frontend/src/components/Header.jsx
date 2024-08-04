import { FaSearch } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Header = () => {
  const currentUser = useSelector((state) => state.user.currentUser);

  console.log('currentUser:', currentUser);  // Add console log to debug state

  return (
    <header className='bg-slate-200 shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to='/'>
          <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <span className='text-slate-500'>Aditya</span>
            <span className='text-slate-700'>Estate</span>
          </h1>
        </Link>
        <form className='bg-slate-100 p-3 rounded-lg flex items-center'>
          <input
            type='text'
            placeholder='Search...'
            className='bg-transparent focus:outline-none w-24 sm:w-64'
          />
          <button aria-label='Search'>
            <FaSearch className='text-slate-600' />
          </button>
        </form>
        <ul className='flex gap-4'>
          <li className='hidden sm:inline'>
            <Link to='/' className='text-slate-700 hover:underline'>
              Home
            </Link>
          </li>
          <li className='hidden sm:inline'>
            <Link to='/about' className='text-slate-700 hover:underline'>
              About
            </Link>
          </li>
          <li>
            <Link to='/profile' className='text-slate-700 hover:underline'>
              {currentUser ? (
                <img
                  className='rounded-full h-7 w-7 object-cover'
                  src={currentUser.user.photoURL}
                  alt='profile'
                />
              ) : (
                'Sign in'
              )}
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;