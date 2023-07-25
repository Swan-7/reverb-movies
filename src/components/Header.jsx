import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';

const Header = () => {
    const [show, handleShow] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
          if (window.scrollY > 100) {
            handleShow(true);
          } else {
            handleShow(false);
          }
        };
      
        window.addEventListener("scroll", handleScroll);
      
        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
      }, []);      

    return (
        <div className={`flex justify-between w-full h-16 p-4 fixed top-0 z-[1] ease-in transition-all duration-500 ${show && 'bg-slate-800 text-black'}`}>
            <div>
                <Link to="/">
                    <h1 className="logo">REVERB</h1>
                </Link>
            </div>
            <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
        </div>
    )
}

export default Header
