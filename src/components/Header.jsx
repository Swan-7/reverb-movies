import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { searchMovies } from "../redux/searchSlice";
import Avatar from "@mui/material/Avatar";
import SearchIcon from "@mui/icons-material/Search";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import avatar from "../images/avatar-1.jpeg";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";

const Header = () => {
  const dispatch = useDispatch();
  const [show, handleShow] = useState(false);
  const [term, setTerm] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(term);
    if (term.trim() !== "") {
      dispatch(searchMovies(term));
    }
    setTerm("");
  };

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
        <Link to="/" className="flex lg:text-[1.35rem] mt-2">
          <LocalMoviesIcon sx={{ fontSize: 30 }} />
          <h1 className="logo ml-1">REVERB MOVIES</h1>
        </Link>
      </div>

      <div className="w-1/2 flex justify-center">
        <form
          onSubmit={submitHandler}
          className="flex px-4 w-1/2 gap-x-4 border border-slate-300 rounded-full"
        >
          <button
            type="submit"
            className="py-2 px-0 text-xl cursor-pointer h-9 bg-transparent text-slate-300"
          >
            <SearchIcon sx={{ fontSize: 20 }} />
          </button>
          <input
            type="text"
            value={term}
            placeholder="Search for a Movie"
            onChange={(e) => setTerm(e.target.value)}
            className="bg-transparent outline-none w-full"
          />
        </form>
      </div>

      <div className="flex gap-x-4 items-center justify-center cursor-pointer">
        <BookmarkBorderIcon sx={{ fontSize: 23 }}/>
        <NotificationsOutlinedIcon />
        <Avatar alt="Cindy Baker" src={avatar} sx={{ width: 36, height: 36 }} />
      </div>
    </div>
  );
};

export default Header;
