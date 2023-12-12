import React, { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const userString = JSON.parse(localStorage.getItem('user'));

  let { email, role, username } = userString;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickProfile = () => {
    navigate("/profile");
    setIsOpen(false);
  };

  const handleSignOut = () => {
    setIsOpen(false);
    navigate("/login");
    localStorage.clear()
  };

  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <a
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              IOT Device Management
            </span>
          </a>
          <div className="relative inline-block text-left" ref={dropdownRef}>
            <div className="flex px-2  text-white">
              <button
                type="button"
                onClick={toggleDropdown}
                className="inline-flex w-full mx-3 items-center justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                id="menu-button"
                aria-expanded={isOpen ? "true" : "false"}
                aria-haspopup="true"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </button>
              <div className="text-gray-700">
                <div>{username}</div>
                <div>{email}</div>
              </div>
            </div>

            {isOpen && (
              <div
                className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabIndex="-1"
              >
                <div className="py-1" role="none">
                  <button
                    onClick={handleClickProfile}
                    className="text-gray-700 block px-4 py-2 text-sm"
                    role="menuitem"
                    tabIndex="-1"
                    id="menu-item-2"
                  >
                    Profile
                  </button>
                  <button
                    onClick={handleSignOut}
                    type="submit"
                    className="text-gray-700 block w-full px-4 py-2 text-left text-sm"
                    role="menuitem"
                    tabIndex="-1"
                    id="menu-item-3"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
      <nav className="bg-gray-50 dark:bg-gray-700">
        <div className="max-w-screen-xl px-4 py-3 mx-auto">
          <div className="flex items-center">
            <ul className="flex flex-row font-bold mt-0 space-x-8 rtl:space-x-reverse text-sm">
              <li className="mx-2 px-3">
                <Link
                  to="/"
                  className="text-gray-900 dark:text-white hover:underline"
                >
                  Devices
                </Link>
              </li>
              {(role === "manager" || role === "owner") && <li className="mx-2 px-3">
                <Link
                  to="/users"
                  className="text-gray-900 dark:text-white hover:underline"
                >
                  Users
                </Link>
              </li>}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
