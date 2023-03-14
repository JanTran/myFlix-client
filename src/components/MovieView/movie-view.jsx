import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Button, Card, Row, Container, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./movie-view.scss";

export const MovieView = ({ user, movies, updateUserState}) => { // Martin: pass user object as well to read favmovies
  const { movieId } = useParams();
  const movie = movies.find((b) => b.id === movieId);
  const storedToken = localStorage.getItem("token");



    return (
      <Row className="movie-view">
        <Col md={6} className="movie-poster"  >
          <img className="movie-img" crossOrigin="anonymous" src={movie.image} />
        </Col>
        <Col md={6}>
          <div className="movie-title">
            <span className="value"><h2>{movie.title}</h2></span>
          </div>
          <div className="movie-description">
            <span className="label"><h5>Description: </h5></span>
            <span className="value">{movie.description}<br></br><br></br></span>
          </div>
          <Link to={`/`}>
            <Button className="back-button button-primary">Back</Button>
          </Link>
          <br></br>
          <br></br>
          {/* Martin: We toggle fav button here */}
            
        </Col>
      </Row>
    );
  };
