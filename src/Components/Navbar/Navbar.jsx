import React, { useState } from 'react';
// import Button from './Button';
import { LuPawPrint } from "react-icons/lu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = ['Home', 'Dashboard', 'Services', 'Shop', 'Emergency' , 'Community'];

  return (
    <nav className="bg-white shadow-md fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <h1 className="flex items-center gap-2 text-4xl font-bold">
            <LuPawPrint className="text-blue-400" />
            <span className="bg-linear-to-r from-blue-400 via-fuchsia-400 to-purple-300 bg-clip-text text-transparent">
              Pet Care Hub
            </span>
          </h1>
          <div className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-gray-900 hover:text-blue-600 transition-colors duration-300"
              >
                {item}
              </a>
            ))}
          </div>
          {/* <Button className="hidden md:block">Book Now</Button> */}
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
        {isOpen && (
          <div className="md:hidden bg-white border-t">
            {menuItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="block px-4 py-2 text-gray-900 hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </a>
            ))}
            {/* <Button className="m-4">Book Now</Button> */}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;