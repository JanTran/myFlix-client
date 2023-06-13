import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MovieCard } from "../MovieCard/movie-card";
import { MovieView } from "../MovieView/movie-view";
import { LoginView } from "../LoginView/login-view";
import { SignupView } from "../SignUpView/signup-view";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.director}</Card.Text>
        <Button onClick={() => onMovieClick(movie)} variant="https://myflix-brendon.herokuapp.com/movie">
          Open
        </Button>
      </Card.Body>
    </Card>
  );
};

export const MainView = () => {
  const [selectedMovie, setSelectedMovie] = useState(undefined);
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(localStorage.getItem("user"));
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    console.log(token);
    if (!token) {
      return;
    }
    fetch("https://myflix-brendon.herokuapp.com/movies")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMovies(data);
      });
  }, [token]);

  function onLoggedIn(user, token) {
    setUser(user);
    setToken(token);
  }
  function onLogout() {
    setUser(undefined);
    setToken(undefined);
    localStorage.clear();
  }

  if (!user) {
    return (
      <Row>
        <Col>
          <LoginView onLoggedIn={onLoggedIn} />
        </Col>
        <Col>
          <SignupView />
        </Col>
      </Row>
    );
  }

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBack={() => setSelectedMovie(undefined)}
      />
    );
  }

  return (
    <div>
      <Row>
        {movies.map((movie) => (
          <MovieCard movie={movie} key={movie._id} onClick={setSelectedMovie} />
        ))}
      </Row>
      <button onClick={() => { setUser(null); }}>Logout</button>
    </div>
  );
};
