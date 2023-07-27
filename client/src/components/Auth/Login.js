import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';
import { toast } from "react-toastify"
import { useNavigate } from 'react-router-dom';
import Hub from "../../assets/HUBLOGO.png"
import { Link } from 'react-router-dom';

const LoginForm = () => {
  const naviagte = useNavigate()
  const [userFormData, setUserFormData] = useState({ username: '', pin: '' });
  const [login, { error }] = useMutation(LOGIN_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    try {
      event.preventDefault();
      const { data } = await login({
        variables: { ...userFormData },
      });
      console.log(data);
      Auth.login(data.login.token);
      naviagte("/user")
    } catch (err) {
      if (err.graphQLErrors.length > 0) {
        err.graphQLErrors.forEach((error) => {
          toast.error(error.message);
        });
      } else {
        toast.error('Something went wrong with your signup!');
      }
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div
            className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
          </div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <div>
                <h1 className="text-5xl text-centre font-semibold">HUB HP</h1>
                <img src={Hub} alt='logo'  />
                <h1 className="text-2xl font-semibold text-centre">Login Form</h1>
              </div>
              <div className="divide-y divide-gray-200">
                <form onSubmit={handleFormSubmit} className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="relative">
                    <input type="text"
                      placeholder="Your user name"
                      name="username"
                      onChange={handleInputChange}
                      value={userFormData.username}
                      required className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" />
                    <label htmlFor="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Username</label>
                  </div>
                  <div className="relative">
                    <input type="pin"
                      placeholder="Your pin"
                      name="pin"
                      onChange={handleInputChange}
                      value={userFormData.pin}
                      required className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" />
                    <label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Pin</label>
                  </div>
                  <div className="relative">
                    <button className="bg-blue-500 text-white rounded-md px-2 py-1" type="submit">Submit</button>
                  </div>
                </form>
                <Link to="/register">Register Now</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;