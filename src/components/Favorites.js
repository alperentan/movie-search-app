import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import NavBar from "./NavBar";
import Popup from "./Popup";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [modalShow, setModalShow] = React.useState(false);
  const [movieTitle, setMovieTitle] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  //favori filmleri local storage kısmından alma
  useEffect(() => {
    const movieFavorites = JSON.parse(
      localStorage.getItem("react-movie-app-favorites")
    );
    if (movieFavorites) {
      setFavorites(movieFavorites);
    }
  }, []);

  //local storage'a favori filmleri kaydetme
  const savetoLocalStorage = (items) => {
    localStorage.setItem("react-movie-app-favorites", JSON.stringify(items));
  };

  //favori filmleri silme
  const removeFavoriteMovie = (movie) => {
    const newFavoriteList = favorites.filter(
      (favorite) => favorite.imdbID !== movie.imdbID
    );

    setFavorites(newFavoriteList);
    savetoLocalStorage(newFavoriteList);
    setShowAlert(true); // alerti göster

    setTimeout(() => {
      setShowAlert(false);
    }, 3000); // 3 saniye sonra alerti kapat
  };
  return (
    <>
      <NavBar />
      <h1 className="text-center">Favorite Movies</h1>
      <div className="container">
        <div className="col-md-12">
          <div className="row">
            {favorites && favorites.length > 0 ? (
              favorites.map((item) => {
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
                          removeFavoriteMovie(item);
                        }}
                      >
                        Remove from Favorites
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
      {/* Filme tıklandığında detayları gösteren pop-up*/}
      <Popup
        show={modalShow}
        data={movieTitle}
        onHide={() => setModalShow(false)}
      />
      {/* Favori filmlerden silindiğinde gösterilen alert*/}
      {showAlert && (
        <div className="alert alert-danger alert-fixed" role="alert">
          Removed from Favorites!
        </div>
      )}
    </>
  );
};
export default Favorites;
