import React, { useState, useEffect } from "react";
import SearchBody from "./SearchBody";
import axios from "axios";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  const [movies, setMovies] = useState([]); // API'den gelen filmleri tutan array
  const SEARCH_API = "https://www.omdbapi.com/?apikey=18e339d6&s="; //API adresi
  const [clicked, setClicked] = useState("home");

  //input kısmındaki her değişiklikte API'ye istek atıp sonuçları getirir
  const handleChange = async (value) => {
    const res = await axios.get(SEARCH_API + value);
    setMovies(res.data.Search);
    console.log(res.data.Search);
  };

  useEffect(() => {
    if (clicked === "fav") {
      document.getElementById("input").style.visibility = "hidden";
    } else {
      document.getElementById("input").style.visibility = "visible";
    }
  }, [clicked]);

  return (
    <>
      {/* Nav-bar*/}
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            Movie Search
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <NavLink
                  to="/"
                  className="nav-link"
                  onClick={() => {
                    setClicked("home");
                  }}
                >
                  Home
                </NavLink>
              </li>
              <li class="nav-item">
                <NavLink
                  to="/favorites"
                  className="nav-link"
                  onClick={() => {
                    setClicked("fav");
                  }}
                >
                  Favorites
                </NavLink>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                id="input"
                onChange={(e) => handleChange(e.target.value)}
                type="search"
                placeholder="Search movies"
                aria-label="Search"
              />
            </form>
          </div>
        </div>
      </nav>
      {/* Filmlerin gösterildiği body kısmı, bulunan sayfa ana sayfaysa sonuçları component'a aktar ve component üzerinden arama sonuçlarını göster*/}
      {clicked === "fav" ? <></> : <SearchBody data={movies} />}
    </>
  );
};

export default NavBar;
