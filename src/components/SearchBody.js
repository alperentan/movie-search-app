import React, { useState, useEffect } from "react";
import Popup from "./Popup";
import "../index.css";
import Button from "react-bootstrap/Button";
const SearchBody = (props) => {
  const [modalShow, setModalShow] = React.useState(false);
  const [movieTitle, setMovieTitle] = useState("");
  const [movies, setMovies] = useState(props.data);
  const [favorites, setFavorites] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  //filmleri yıla göre artan şekilde sıralar
  const sortMoviesAsc = () => {
    props.data.sort(function (a, b) {
      return parseInt(a.Year) - parseInt(b.Year);
    });
    setMovies(...props.data);
  };

  //filmleri yıla göre azalan şekilde sıralar
  const sortMoviesDesc = () => {
    props.data.sort(function (a, b) {
      return parseInt(b.Year) - parseInt(a.Year);
    });
    setMovies(...props.data);
  };

  //favorilere ekleme işlemi
  const addFavoriteMovie = (movie) => {
    const newFavoriteList = [...favorites, movie];
    setFavorites(newFavoriteList);
    savetoLocalStorage(newFavoriteList);
    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
    }, 3000); // 3 saniye sonra alerti kapat
  };

  //local storage'a kaydetme işlemi
  const savetoLocalStorage = (items) => {
    localStorage.setItem("react-movie-app-favorites", JSON.stringify(items));
  };

  useEffect(() => {}, [movies]);

  //local storage'dan favorileri çekme işlemi
  useEffect(() => {
    const movieFavorites = JSON.parse(
      localStorage.getItem("react-movie-app-favorites")
    );
    if (movieFavorites) {
      setFavorites(movieFavorites);
    }
  }, []);

  return (
    <>
      {props.data && props.data.length > 0 ? (
        <>
          <h1 className="text-center">Movies</h1>
          <div className="btnContainer">
            <Button
              onClick={() => sortMoviesAsc()}
              className="btn-sm btn-secondary btn-space"
            >
              Sort by Ascending
            </Button>
            <Button
              onClick={() => sortMoviesDesc()}
              className="btn-sm btn-secondary btn-space"
            >
              Sort by Descending
            </Button>
          </div>
        </>
      ) : (
        <></>
      )}
      <div className="container">
        <div className="col-md-12">
          <div className="row">
            {props.data && props.data.length > 0 ? (
              props.data.map((item) => {
                return (
                  <>
                    <div
                      className="MovieContainer"
                      style={{ width: "18rem" }}
                      onClick={() => {
                        setModalShow(true);
                        setMovieTitle(item.Title);
                      }}
                    >
                      <img className="CoverImage" src={item.Poster} alt="..." />
                      <div className="MovieName">{item.Title}</div>
                      <div className="InfoColumn">
                        <div className="MovieInfo">
                          Release Year: {item.Year}
                        </div>
                      </div>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          addFavoriteMovie(item);
                        }}
                      >
                        Add to Favorites
                      </Button>
                    </div>
                  </>
                );
              })
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      {/*Filme tıklayınca detayları gösteren pop-up*/}
      <Popup
        show={modalShow}
        data={movieTitle}
        onHide={() => setModalShow(false)}
      />
      {/*Favorilere ekleme işlemi başarılı olursa gösterilen alert*/}
      {showAlert && (
        <div className="alert alert-success alert-fixed" role="alert">
          Added to Favorites!
        </div>
      )}
    </>
  );
};

export default SearchBody;
