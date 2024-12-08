import React from "react";
import { IoReturnUpBackSharp } from "react-icons/io5";
import { Link ,useNavigate  } from 'react-router-dom';
const DocPage = () => {
  return (
    <div className="bg-white text-gray-800 min-h-screen flex flex-col">
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-6 px-4 flex items-center">
        <Link to={"/"} className="flex no-underline items-center gap-2 text-white
          hover:underline font-semibold text-2xl group">
          <IoReturnUpBackSharp/>
          <span >Home</span>
          </Link>
        <div className="max-w-2xl mx-auto text-center bg-white bg-opacity-10 p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-semibold mb-2">Explore Our Features</h1>
          <p className="text-sm">
            Manage your finances effortlessly with tools tailored to your needs.
          </p>
        </div>
      </div>



      <div className="flex-1 px-6 py-12">
        <div className="max-w-5xl mx-auto space-y-12">
          <div id="overview" className="text-center">
            <h2 className="text-3xl font-bold text-purple-600 mb-4">Overview</h2>
            <p className="text-gray-700 text-lg">
              Our platform simplifies financial management with features like
              budgeting, expense tracking, and visual analytics. It’s designed
              to help you take control of your finances.
            </p>
          </div>

          <div id="features">
            <h2 className="text-3xl font-bold text-purple-600 text-center mb-8">
              Features
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-800">
                  Dashboard
                </h3>
                <p className="text-gray-600 mt-2">
                  View an overview of your financial health, including total
                  income, expenses, and remaining balance.
                </p>
              </div>

              <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-800">
                  Budget Tracking
                </h3>
                <p className="text-gray-600 mt-2">
                  Set budgets for categories and track your progress to ensure
                  you stay within your financial limits.
                </p>
              </div>

              <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-800">
                  Expense Management
                </h3>
                <p className="text-gray-600 mt-2">
                  Log your daily transactions, edit expenses, and organize them
                  by category for easy reference.
                </p>
              </div>

              <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-800">
                  Categories
                </h3>
                <p className="text-gray-600 mt-2">
                  Use predefined or custom categories to organize your spending
                  and gain insights into where your money goes.
                </p>
              </div>

              <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-800">
                  Analytics & Charts
                </h3>
                <p className="text-gray-600 mt-2">
                  Visualize your finances with intuitive graphs, including pie
                  charts, bar graphs, and line charts.
                </p>
              </div>

              <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-800">Support</h3>
                <p className="text-gray-600 mt-2">
                  Contact our support team for assistance via email, phone, or
                  live chat.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 text-gray-600 py-6 text-center">
        <p>&copy; 2024 TABBE3NI. All rights reserved.</p>
      </div>
    </div>
  );
};

export default DocPage;
