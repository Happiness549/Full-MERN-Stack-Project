
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");   // No reload!
  };

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">
        <Link to="/">Lost & Found</Link>
      </h1>

      <nav className="flex gap-4">
        {!token ? (
          <>
            <Link to="/login" className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-600">
              Login
            </Link>
            <Link to="/register" className="bg-green-500 px-3 py-1 rounded hover:bg-green-600">
              Register
            </Link>
          </>
        ) : (
          <>
            <Link to="/my-items" className="bg-yellow-500 px-3 py-1 rounded hover:bg-yellow-600">
              My Items
            </Link>
            <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">
              Logout
            </button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
