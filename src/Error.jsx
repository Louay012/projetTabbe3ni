import React from 'react';
import { Link } from 'react-router-dom';
import { FaRegSadTear } from 'react-icons/fa';  

const Error = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-12 bg-white rounded-2xl shadow-xl max-w-lg w-full">
        <FaRegSadTear className="text-6xl text-purple-400 mb-6" />
        <h1 className="text-6xl font-extrabold text-gray-900">Ooops!!</h1>
        <p className="text-xl text-gray-700 mt-4">! It seems like there is a problem.</p>
        <p className="text-lg text-gray-500 mt-2">It seems like you’ve hit a dead end. Let’s get you back on track.</p>
        <Link 
          to="/" 
          className="mt-6 no-underline inline-block px-8 py-3 bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-purple-500 transition duration-300"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default Error;
