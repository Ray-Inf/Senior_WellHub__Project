import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './mednav.css';

const Navbar = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <nav className="navbar">
      <div className='heading'><b> Medication Management</b>  </div>
      <ul className='abc'>
       
        <li>
          <NavLink to="/medicine" >
          Medication List
          </NavLink>
        </li>
        <li>
          <NavLink to="/add-medication" >
            Add Medication
          </NavLink>
        </li>
        <li>
          <NavLink to="/medication-reminder" >
            Medication Reminder
          </NavLink>
        </li>
      </ul>
      <div className='homemar'>
      <Link to="/home" className="home-link">
            <button className="home-btn">Home</button>
      </Link>
      </div>
      <div className="clock">{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
    </nav>
  );
};

export default Navbar;
