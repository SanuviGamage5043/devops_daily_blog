import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
  const navItems = [
    { name: "Dashboard", path: "/" },
    { name: "Entries", path: "/entries" },
    { name: "Analytics", path: "/analytics" },
    { name: "Export", path: "/export" },
    { name: "Settings", path: "/settings" },
  ];

  const userName = "Passenger";

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-10 border-b border-gray-200">
      <div className="max-w-screen mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left: Logo */}
          <div className="flex items-center space-x-2">
            <Link
              to="/"
              className="flex items-center space-x-2 text-2xl font-bold text-indigo-600"
            >
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6.253v13m0-13C10.832 5.415 9.497 5 8 5c-4 0-4 4-4 4s-.5 2 4 2c4 0 4-4 4-4zM12 6.253c1.168.832 2.503 1.25 4 1.25 4 0 4-4 4-4s.5-2-4-2c-4 0-4 4-4 4z"
                />
              </svg>
              <span className="font-serif">Life Journal</span>
            </Link>
          </div>

          {/* Center: Nav Links */}
          <div className="hidden sm:flex sm:space-x-8">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition duration-150 ease-in-out ${
                    isActive
                      ? "border-indigo-500 text-gray-900"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          {/* Right: User Info + Logout */}
          <div className="flex items-center">
            <span className="text-sm text-gray-600 mr-4 hidden sm:block">
              Welcome,&nbsp;
              <span className="font-medium text-gray-800">{userName}</span>
            </span>
            <Link
              to="/login"
              className="flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800"
            >
              <svg
                className="w-5 h-5 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H7a3 3 0 01-3-3v-4a3 3 0 013-3h4"
                />
              </svg>
              Logout
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
