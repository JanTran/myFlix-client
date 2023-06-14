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
      <Row>
        <Col>
          <NavigationBar
            user={user}
            onLoggedOut={() =>{
              setUser(null)
              setToken(null);
              localStorage.clear();
              window.location.reload();
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col className="mt-5"></Col>
      </Row>
      <Row>
        <Routes>
            <Route
              path="/"
              element={
                <>
                  { user && movie.length === 0 ? (
                    <Col>The list is empty!</Col>
                  ) : user ? (
                    <SearchView
                      user={user}
                      token={token}
                      favoriteMovies={favoriteMovie}
                      movie={movie}
                    />
                  ) : (
                    <Navigate to="/login" replace/>
                  )}
                </>
              }
            />
            <Route 
              path="/movies/:movieId"
              element={
                <>
                  {user && movie.length === 0 ? (
                    <Col sm={{offset: 2}} md={{offset: 4}} className="fw-bold fs-5 align-self-center mb-2 mt-4">
                      The list is empty!
                    </Col>
                  ) : user ? (
                    <Col xs={12}>
                      <MovieView
                        movieData={movie} 
                        user={user}
                        token={token}
                        favoriteMovies={favoriteMovie}
                      />
                    </Col>
                  ) : (
                    <Navigate to="/login" replace/>
                  )}
                </>
              }
            />
            <Route 
              path="/login"
              element={
                <>
                  { user ? (
                    <Navigate to="/" replace/>
                  ) : (
                      <Col xs={12}>
                        <LoginView onLoggedIn={(user, token) => {
                          setUser(user);
                          setToken(token);
                          setFavoriteMovie(user.FavoriteMovies)
                          }} />
                      </Col>
                  )}
                </>
              }
            />
            <Route 
              path="/signup"
              element={
                <>
                  { user ? (
                    <Navigate to="/" replace/>
                  ) : (
                    <Col>
                      <SignupView />
                    </Col>
                  )}
                </>
              }
            />
            <Route 
              path="/users"
              element={
                <>
                  { user ? (
                      <Col>
                        <ProfileView
                          user={user} 
                          favoriteMovieList={favoriteMovieList} 
                          token={token}
                          favoriteMovies={favoriteMovie}
                        />
                      </Col>
                  ) : (
                    <Navigate to="/login" replace/>
                  )
                  }
                </>
              }
            />
            <Route 
              path="/users/settings"
              element={
                <>
                  { user ? (
                    <Col>
                      <ProfileSettingsView />
                    </Col>
                  ) : (
                    <Navigate to="/login" replace />
                  )}
                </>
              }
            />
            <Route 
              path="/users/settings/password"
              element={
                <>
                  { user ? (
                    <Col>
                      <ProfilePasswordSettings 
                        user={user} 
                        token={token}
                        onChanging={() => {
                          setUser(null),
                          setToken(null),
                          localStorage.clear();
                          window.location.reload();
                        }}
                      />
                    </Col>
                  ) : (
                    <Navigate to="/login" replace/>
                  )}
                </>
              }
            />
            <Route 
              path="/users/settings/username"
              element={
                <>
                  { user ? (
                    <Col>
                      <ProfileUsernameSettings 
                        user={user} 
                        token={token}
                        onChanging={() => {
                          setUser(null),
                          setToken(null),
                          localStorage.clear();
                          window.location.reload();
                        }}
                      />
                    </Col>
                  ) : (
                    <Navigate to="/login" replace/>
                  )}
                </>
              }
            />
            <Route 
              path="/users/settings/email"
              element={
                <>
                  { user ? (
                    <Col>
                      <ProfileEmailSettings 
                        user={user} 
                        token={token}
                        onChanging={() => {
                          setUser(null),
                          setToken(null),
                          localStorage.clear();
                          window.location.reload();
                        }}
                      />
                    </Col>
                  ) : (
                    <Navigate to="/login" replace/>
                  )}
                </>
              }
            />
            <Route 
              path="/users/settings/birthday"
              element={
                <>
                  { user ? (
                    <Col>
                      <ProfileBirthdaySettings 
                        user={user} 
                        token={token}
                        onChanging={() => {
                          setUser(null),
                          setToken(null),
                          localStorage.clear();
                          window.location.reload();
                        }}
                      />
                    </Col>
                  ) : (
                    <Navigate to="/login" replace/>
                  )}
                </>
              }
            />
            <Route 
              path="/users/settings/delete"
              element={
                <>
                  { user ? (
                    <Col>
                      <ProfileDeleteView 
                        user={user} 
                        token={token}
                        onDelete={() => {
                          setUser(null),
                          setToken(null),
                          localStorage.clear();
                          window.location.reload();
                        }}
                      />
                    </Col>
                  ) : (
                    <Navigate to="/login" replace/>
                  )}
                </>
              }
            />
        </Routes>
      </Row>
    </BrowserRouter>
  )
}
