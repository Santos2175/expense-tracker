import { useState } from 'react';
import AuthLayout from '@/components/layouts/AuthLayout';
import Input from '@/components/ui/Input';
import { Link, useNavigate } from 'react-router';
import { validateEmail } from '@/utils/helper';
import axiosInstance from '@/api/axiosInstance';
import { API_PATHS } from '../../api/config';
import { useUserContext } from '../../context/UserContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { updateUser } = useUserContext();
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    if (isLoading) return;

    e.preventDefault();

    if (!validateEmail(email)) {
      setError('Please enter the valid email address');
      return;
    }

    if (!password) {
      setError('Please enter the password');
      return;
    }

    setError('');
    setIsLoading(true);

    // login api call
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token, user } = response.data.data;

      if (token) {
        localStorage.setItem('token', token);
        updateUser(user);
        navigate('/dashboard');
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError(`Something went wrong. Please try again.`);
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <AuthLayout>
      <div className='lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'>Welcome Back</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>
          Please enter your details to log in
        </p>

        <form onSubmit={handleLogin}>
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label='Email Address'
            placeholder='Johndoe@gmail.com'
            type='text'
          />

          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label='Password'
            placeholder='Min 8 characters'
            type='password'
          />

          {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

          <button
            type='submit'
            className={`btn-primary ${
              isLoading
                ? 'bg-purple-600/15 text-purple-600'
                : 'text-white bg-purple-600 '
            } `}
            disabled={isLoading}>
            {isLoading ? 'LOGGING IN...' : 'LOGIN'}
          </button>

          <p className='text-[13px] text-slate-800 mt-3'>
            Don't have an account?{' '}
            <Link to='/signup' className='font-medium text-primary underline'>
              SignUp
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
