import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css'; 


const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/add-book">Add Book</Link>
        </li>
        <li>
          <Link to="/create-section">Create Section</Link>
        </li>
        <li>
          <Link to="/get-sections">Get Sections</Link>
        </li>
        <li>
          <Link to="/pending-book-request">Pending Requests</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
