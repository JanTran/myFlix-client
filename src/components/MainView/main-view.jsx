import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {MovieCard} from "../movie/movie-card/movie-card";
import {MovieView} from "../movie/movie-view/movie-view";
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';

// The BookCard function component 

export const MainView = () => {

  const [movies, setMovies] = useState([]);
  const storedToken = localStorage.getItem('token');
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(storedUser);
  const [token, setToken] = useState(storedToken);
  
  useEffect(() => {
    fetch("https://myflix-brendon.herokuapp.com/movies")
      .then((response) => response.json())
      .then((data) => {
        setMovies(data);
      });
  }, []);
    if (!token) return;

    // Fetch movies from the API when the token changes
    fetch('https://myflix-brendon.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((data) => {
        // Process the API response and update the movies state
        const moviesFromApi = data.map((movie) => {
          return {
            _id: movie._id,
            Title: movie.Title,
            Director: {
              firstName: movie.Director.firstName,
              lastName: movie.Director.lastName
            },
            Description: movie.Description,
            Year: movie.Year,
            Genres: movie.Genres.map((genre) => genre.Name),
            Featured: movie.Featured
          };
        });

        setMovies(moviesFromApi);
      })
      .catch((error) => {
        console.log('Error fetching movies:', error);
      });
  }, [token]);

  const handleLogin = (loggedInUser, loggedInToken) => {
    // Update the user and token states when the user logs in
    setUser(loggedInUser);
    setToken(loggedInToken);
    localStorage.setItem('user', JSON.stringify(loggedInUser));
    localStorage.setItem('token', loggedInToken);
  };

  const handleLogout = () => {
    // Clear the user and token states when the user logs out
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };
