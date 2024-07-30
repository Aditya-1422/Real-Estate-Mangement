import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
import { signInSuccess, signInFailure, signInStart } from '../redux/user/userSlice';

const OAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleGoogleClick = async () => {
        try {
            dispatch(signInStart());

            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider);
            console.log(result)
            // const response = await axios.post('/api/auth/google', {
            //     username: result.user.displayName,
            //     email: result.user.email
            // });

            dispatch(signInSuccess(response.data));
            navigate('/');
        } catch (error) {
            dispatch(signInFailure(error.message));
        }
    }

    return (
        <button
            onClick={handleGoogleClick}
            type='button'
            className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95'
        >
            Continue with Google
        </button>
    );
}

export default OAuth;