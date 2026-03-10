import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  const navItems = [
    { name: "Dashboard", path: "/home" },
    { name: "Entries", path: "/entries" },
    { name: "Analytics", path: "/analytics" },
    { name: "Export", path: "/export" },
    { name: "Settings", path: "/settings" },
  ];

  // Get user full name from localStorage
  useEffect(() => {
    const storedUserName = localStorage.getItem("userName"); // store full name on login
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName"); // remove name too
    navigate("/");
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-10 border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link
            to="/home"
            className="flex items-center space-x-2 text-2xl font-bold text-indigo-600"
          >
            <span className="text-2xl">📓</span>
            <span className="font-serif">Life Journal</span>
          </Link>

          {/* Navigation */}
          <div className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `px-3 py-1 rounded-md text-sm font-medium transition ${
                    isActive
                      ? "bg-indigo-100 text-indigo-700"
                      : "text-gray-600 hover:text-indigo-600 hover:bg-gray-100"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {userName && (
              <span className="text-sm text-gray-600 hidden md:block">
                Welcome,{" "}
                <span className="font-semibold text-gray-800">{userName}</span>
              </span>
            )}

            <button
              onClick={handleLogout}
              className="flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800 transition cursor-pointer"
            >
              🚪 Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;