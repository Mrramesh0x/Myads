import React from 'react';

const Nav = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">MyAdPost</div>
      <input type="checkbox" id="menu-toggle" className="menu-toggle" />
      <label htmlFor="menu-toggle" className="menu-icon">&#9776;</label>
      <ul className="navbar-menu">
        <li className="navbar-item" ><a href='/'>Home</a></li>
         <li className="navbar-item" ><a href='/postedad'>See ads</a></li>
        <li className="navbar-item">Contact</li>
      </ul>
    </nav>
  );
};

export default Nav;
