import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import SearchIcon from "@mui/icons-material/Search";
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import avatar from "../images/avatar-1.jpeg"
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";

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
      <div
        className={`flex justify-between w-full h-20 p-4 fixed top-0 z-[1] ease-in transition-all duration-500 ${
          show && "bg-slate-800 text-sky-300"
        }`}
      >
        <div>
          <Link to="/">
            <div className="flex text-[1.35rem] mt-2">
              <LocalMoviesIcon sx={{ fontSize: 30 }} />
              <h1 className="logo ml-1">REVERB MOVIES</h1>
            </div>
          </Link>
        </div>
        <div className="flex gap-x-4 items-center justify-center cursor-pointer">
          <SearchIcon />
          <NotificationsOutlinedIcon />
          <Avatar
            alt="Cindy Baker"
            src={avatar}
            sx={{ width: 36, height: 36 }}
          />
        </div>
      </div>
    );
}

export default Header
