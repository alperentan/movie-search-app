import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import React, { useState, useEffect } from "react";

function Popup(props) {
  const DETAIL_API = "https://www.omdbapi.com/?apikey=18e339d6&t="; //detayları çekmek için API adresi
  const [details, setDetails] = useState([]); // API'den gelen filmin detaylarını tutan array
  const [ratings, setRatings] = useState([]); // API'den gelen filmin ratinglerini tutan array
  const [loading, setLoading] = useState(true); // API'den data çekilirken bekleme işlemini göstermek için loading state'i

  //filmin detaylarını API'den çekme
  useEffect(() => {
    setLoading(true);
    setDetails([]);
    setRatings([]);
    const fecthDetails = async () => {
      const res = await axios.get(DETAIL_API + props.data);
      setDetails(res.data);
      setRatings(res.data.Ratings);
      setLoading(false);
    };
    fecthDetails();
  }, [props.data]);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.data}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <div>
              <b>Released: </b>
              {details.Released}
            </div>
            <div>
              <b>Runtime: </b>
              {details.Runtime}
            </div>
            <div>
              <b>Genre: </b>
              {details.Genre}
            </div>
            <div>
              <b>Director: </b>
              {details.Director}
            </div>
            <div>
              <b>Actors: </b>
              {details.Actors}
            </div>
            <div>
              <b>Plot: </b>
              {details.Plot}
            </div>
            <div>
              <br></br>
              <h6>Ratings: </h6>
              {ratings &&
                ratings.map((item) => {
                  return (
                    <div>
                      <b>{item.Source}</b>: {item.Value}
                    </div>
                  );
                })}
            </div>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Popup;
