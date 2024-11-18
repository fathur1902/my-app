import { useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";

export default function Navbar({ onSearchChange }) {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const { isLoggedIn, login, logout, user } = useUser();

  const handleSearchInput = (e) => {
    onSearchChange(e.target.value);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    login(credentials.username, credentials.password);
    setShowLoginForm(false);
  };

  return (
    <nav className="grid grid-cols-3 justify-between px-24 py-4 bg-[#32146b] items-center">
      <ul>
        <li className="flex items-center justify-center">
          <Link
            to="/"
            className="text-[#F2F4FF] hover:text-[#565f93] active:text-[#1d2342]"
          >
            Home
          </Link>
        </li>
      </ul>
      <ul className="flex justify-center items-center">
        <li className="w-full">
          <input
            type="text"
            className="rounded-full text-black active:text-black focus:text-black px-4 py-2 w-full"
            name="search"
            placeholder="Search product..."
            onChange={handleSearchInput}
          />
        </li>
      </ul>
      {!isLoggedIn ? (
        <ul className="flex gap-2 justify-end">
          <li>
            <button
              className="text-[#F2F4FF] hover:text-[#565f93] active:text-[#1d2342]"
              onClick={() => setShowLoginForm(true)}
            >
              Sign in
            </button>
          </li>
          <li>
            <Link
              className="text-[#F2F4FF] hover:text-[#565f93] active:text-[#1d2342]"
              to="/signup"
            >
              Sign up
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="flex justify-end gap-2">
          <li className="text-[#F2F4FF] hover:text-[#565f93] active:text-[#1d2342]">
            {`Hello, ${user?.username || "User"}`}
          </li>
          <li>
            <Link
              className="text-[#F2F4FF] hover:text-[#565f93] active:text-[#1d2342]"
              to="/cart"
            >
              Cart
            </Link>
          </li>
          <li>
            <Link
              to="/orders"
              className="text-[#F2F4FF] hover:text-[#565f93] active:text-[#1d2342]"
            >
              My Orders
            </Link>
          </li>
          <li>
            <button
              onClick={logout}
              className="text-[#F2F4FF] hover:text-[#565f93] active:text-[#1d2342]"
            >
              Sign out
            </button>
          </li>
        </ul>
      )}
      {showLoginForm && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <form
            onSubmit={handleLoginSubmit}
            className="bg-white p-6 rounded-lg shadow-md flex flex-col gap-4"
          >
            <h2 className="text-xl font-bold">Login</h2>
            <input
              type="text"
              placeholder="Username"
              value={credentials.username}
              onChange={(e) =>
                setCredentials({ ...credentials, username: e.target.value })
              }
              className="border p-2 rounded"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              className="border p-2 rounded"
              required
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Login
            </button>
            <button
              type="button"
              className="text-red-500 underline"
              onClick={() => setShowLoginForm(false)}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </nav>
  );
}
