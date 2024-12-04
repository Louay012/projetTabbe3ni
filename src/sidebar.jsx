import React from "react";
import { Link } from "react-router-dom";
import { IoStatsChartSharp } from "react-icons/io5";
import { BiDollarCircle, BiCartAlt, BiBorderAll } from "react-icons/bi";
import { HiOutlineShoppingBag } from "react-icons/hi";

const Sidebar = ( {name}) => {
  return (
    <div className="bg-zinc-800 flex flex-col font-mono text-lg text-gray-50 w-14 md:w-48 h-screen">
      {/* Header */}
      <div className="py-4 text-center md:text-left">
        <h2 className="text-xl font-bold hidden md:block"><span>{name}</span></h2>
      </div>

      {/* Navigation */}
      <ul className="flex-1 list-none flex flex-col gap-4">
        {/* Dashboard */}
        <li className="flex justify-center md:justify-start items-center">
          <Link
            to="/dashboard"
            className="flex flex-col md:flex-row items-center gap-2 md:px-3 text-gray-50 no-underline hover:text-purple-400"
          >
            <IoStatsChartSharp className="h-6 w-6" />
            <span className="hidden md:block">Dashboard</span>
          </Link>
        </li>

        {/* Income */}
        <li className="flex justify-center md:justify-start items-center">
          <Link
            to="/income"
            className="flex flex-col md:flex-row items-center gap-2 md:px-3 text-gray-50 no-underline hover:text-purple-400"
          >
            <BiDollarCircle className="h-6 w-6" />
            <span className="hidden md:block">Income</span>
          </Link>
        </li>

        {/* Budgets */}
        <li className="flex justify-center md:justify-start items-center">
          <Link
            to="/budgets"
            className="flex flex-col md:flex-row items-center gap-2 md:px-3 text-gray-50 no-underline hover:text-purple-400"
          >
            <BiCartAlt className="h-6 w-6" />
            <span className="hidden md:block">Budgets</span>
          </Link>
        </li>

        {/* Transactions */}
        <li className="flex justify-center md:justify-start items-center">
          <Link
            to="/transactions"
            className="flex flex-col md:flex-row items-center gap-2 md:px-3 text-gray-50 no-underline hover:text-purple-400"
          >
            <HiOutlineShoppingBag className="h-6 w-6" />
            <span className="hidden md:block">Transactions</span>
          </Link>
        </li>

        {/* Categories */}
        <li className="flex justify-center md:justify-start items-center">
          <Link
            to="/categories"
            className="flex flex-col md:flex-row items-center gap-2 md:px-3 text-gray-50 no-underline hover:text-purple-400"
          >
            <BiBorderAll className="h-6 w-6" />
            <span className="hidden md:block">Categories</span>
          </Link>
        </li>
      </ul>

      {/* Footer */}
      <div className="h-28 flex items-center justify-center cursor-pointer hover:text-purple-400">
        Logout
      </div>
    </div>
  );
};

export default Sidebar;
