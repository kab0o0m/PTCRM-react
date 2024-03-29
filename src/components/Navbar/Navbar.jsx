import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-semibold text-xl">Premium Tutors</div>
        <div>
          <ul className="flex space-x-4">
            <li>
              <a href="/tutors" className="text-white hover:text-gray-300">
                Tutors
              </a>
            </li>
            <li>
              <a href="/leads" className="text-white hover:text-gray-300">
                Assignments
              </a>
            </li>
            <li>
              <a href="/" className="text-white hover:text-gray-300">
                Create Coordinator
              </a>
            </li>
            <li>
              <a href="/" className="text-white hover:text-gray-300">
                Coordinators List
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
