'use client'
import { signupThunk } from '@/redux/features/userSlice';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
// pages/register.js
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCPassword] = useState('');

const dispatch = useDispatch();
const router = useRouter()
  const handleRegister = (e) => {
    e.preventDefault();
    // Add registration logic here
    if(password === cpassword)
      {

        console.log({ name, email, password });
        if(!name || !email || !password)
          alert("Fill ALl The feilds")
        const formData = {
          name,
          email,
          password
        }
        dispatch(signupThunk({formData, router}))
      }
      else
      alert("Password Did't Matched !")

  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">Register</h2>
        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="block w-full px-4 py-2 mt-1 text-gray-700 bg-white border rounded-md focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="block w-full px-4 py-2 mt-1 text-gray-700 bg-white border rounded-md focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="block w-full px-4 py-2 mt-1 text-gray-700 bg-white border rounded-md focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              id="password"
              value={cpassword}
              onChange={(e) => setCPassword(e.target.value)}
              required
              className="block w-full px-4 py-2 mt-1 text-gray-700 bg-white border rounded-md focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Register
            </button>
            <p className="mt-2">
              Already Have An Account ? 
              <Link href='/login'>
              <span className='text-blue-500 ml-2'>
                LogIn
              </span>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
