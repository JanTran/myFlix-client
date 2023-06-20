import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MovieCard } from "../MovieCard/movie-card";
import { MovieView } from "../MovieView/movie-view";
import { LoginView } from "../LoginView/login-view";
import { ProfileView } from "../ProfileView/profile-view";
import { SignupView } from "../SignUpView/signup-view";
import { Row, Col } from "react-bootstrap";

export const MainView = () => {
  const storedUser= JSON.parse(localStorage.getItem("user"));
  const storedToken= localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const [favoriteMovie, setFavoriteMovie] = useState([])
  const [user, setUser]= useState(storedUser);
  const [token, setToken]= useState(storedToken);

  useEffect(() => {
    if (!token) {
      return;
    }
    fetch("https://myflix-brendon.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}`}
    })
      .then((res) => res.json())
      .then((data) => {
          console.log(data[0])
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

  console.log(movies)
 return (
    <BrowserRouter>
      <Row>
        <Routes>
            <Route
              path="/movies/:movieId"
              element={
                <>
                  {user ? (
                    <Col xs={12}>
                      <MovieView
                        movieData={movies}
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
                path="/"
                element={
                    <>
                        {!user ? <Navigate to="/login" replace/> : movies.length === 0 ? (
                            <Col>The list is empty!</Col>
                        ) : (
                            movies.map(movie => <MovieCard movie={movie} key={movie._id} /> )
                        )}
                    </>
                }
            />
        </Routes>
      </Row>
    </BrowserRouter>
  )
}
