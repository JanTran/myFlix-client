import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

import "./movie-card.scss";

export const MovieCard = ({ movie, onClick }) => {
  return (
    <div className="movieCard mt-3 mb-3">
      <div onClick={() => onClick(movie)}>{movie.Title}</div>
    </div>
  );
};

//here is where we define all the props constraints for the MovieCard
MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string,
    ImagePath: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func,
};
