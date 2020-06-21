import React, {useState} from "react";
import "./Nav.css";
import { NavLink } from "react-router-dom";

const Nav = () => {
const [burgerOpen, setBurgerOpen] = useState(false)
  
  return (
    <div className="navbar py-1">
<div className="navbar-brand">
<a className="navbar-item" href="/">
      <img src="https://cdn4.iconfinder.com/data/icons/healthy-life-line-live-long-and-prosper/512/Eat_healthy-512.png" alt="salad icon" className="image"/>
  
  <h1 className="is-size-4">VEGE APP</h1>
    </a>
    <a role="button" 
    className={`navbar-burger burger ${burgerOpen ? 'is-active' : ''}`}
    aria-label="menu" aria-expanded="false" data-target="navbarBasicExample"
    onClick={() =>
      setBurgerOpen(!burgerOpen) }>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
</div>
      <div className={`navbar-menu navbar-start ${burgerOpen ? 'is-active' : ''}`}>

        <NavLink exact activeClassName='active' to="/" className="navbar-item">Home</NavLink>

        <NavLink activeClassName='active' to="/recipes" className="navbar-item">My Favourites</NavLink>

        {/* <NavLink activeClassName='active' to="/gallery" className="navbar-item">Gallery</NavLink> */}

      {/* <li>
        <NavLink activeClassName='active' to="/contact">Contact</NavLink>
      </li> */}

    </div>
    </div>
  );
};

export default Nav;
