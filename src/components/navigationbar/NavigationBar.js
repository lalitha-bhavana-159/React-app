import React from 'react'
import './NavigationBar.css'
import { Link, NavLink } from "react-router-dom";
import {  FaUsers,FaUsersSlash } from "react-icons/fa";
// import { NavLink } from 'react-bootstrap';

function NavigationBar() {

  const activeLink={
    color:"#EEF0F1",
    fontsize: "1.2rem",
    fontWeight:"bold"
  };
  const inactiveLink={
    //color:"#EEF0F1",
    fontsize: "1.2rem"
  };

  return (
    <nav className="navbar navbar-expand-sm bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" >
          <img src="https://upload.wikimedia.org/wikipedia/commons/1/14/WLM_logo-2.svg" width="50px" alt="" />
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" 
                style={({ isActive }) =>{ 
                  return isActive ? activeLink : inactiveLink;
                 }}
                to="/users"> <FaUsers className='users-icon'/> Users
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" 
                style={({ isActive }) =>{ 
                  return isActive ? activeLink : inactiveLink ;
                }}
                to="/removed-users"><FaUsersSlash className='removed-users-icon'/> Removed Users
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default NavigationBar