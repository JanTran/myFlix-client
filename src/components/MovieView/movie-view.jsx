import React from "react";
import { Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./movie-view.scss";

export const MovieView = ({ movie, onBack }) => {
  return (
    <div className="movie-view">
      <img
        className="movie-img"
        crossOrigin="anonymous"
        src={movie.ImagePath}
      />
      <div className="movie-title">
        <h2>Title: {movie.Title}</h2>
      </div>
      <div className="movie-description">
        <h5>Description: {movie.Description} </h5>
      </div>
      <div className="movie-description">
        <h5>Director: {movie.Director.Name} </h5>
      </div>
      <div className="movie-description">
        <h5>Genre: {movie.Genre.Name} </h5>
      </div>
      <Button
        className="back-button button-primary"
        onClick={() => onBack(undefined)}
      >
        Back
      </Button>
    </div>
  );
};
