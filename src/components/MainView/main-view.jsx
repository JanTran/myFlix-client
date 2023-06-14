import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MovieCard } from "../MovieCard/movie-card";
import { MovieView } from "../MovieView/movie-view";
import { LoginView } from "../LoginView/login-view";
import { NavigationBar } from '../NavigationBar/navigation-bar';
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
        <Button onClick={() => onMovieClick(movie)} variant="https://myflix-brendon.herokuapp.com/movies">
          Open
        </Button>
      </Card.Body>
    </Card>
  );
};

export const MainView = () => {
  const storedUser= JSON.parse(localStorage.getItem("user"));
  const storedToken= localStorage.getItem("token");
  const [movie, setMovie] = useState([]);
  const [favoriteMovie, setFavoriteMovie] = useState([])
  const [user, setUser]= useState(null);
  const [token, setToken]= useState(null);


  if(!user && storedUser) {
    setFavoriteMovie(storedUser.FavoriteMovies)
  }

  if (!user && storedUser) {
    setUser(storedUser);
    setToken(storedToken);
  }

  useEffect(() => {
    console.log(token);
    if (!token) {
      return;
    }
    fetch("https://myflix-brendon.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}`}
    })
      .then((res) => res.json())
      .then((data) => {
        const moviesFromApi= data.map((movie) => {
          return {
            _id: movie._id,
            Title: movie.Title,
            Description: movie.Description,
            Release_date: movie.Release_date,
            Genre: movie.Genre,
            Director: movie.Director,
          }
        }) 
        
        setMovie(moviesFromApi);
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

 return (
    <BrowserRouter>
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
                </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView onLoggedIn={(user) => setUser(user)} />
                  </Col>
                )}
              </>

            }
          /><Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : books.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={8}>
                    <MovieView movie={movies} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/"element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    {movies.map((movie) => (
                      <Col className="mb-4" key={movie.id} md={3}>
                        <MovieCard movie={movie} />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
