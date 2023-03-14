import React, { useEffect, useState } from "react";
import { MovieView } from "../movie-view/movie-view";
import { MovieCard } from "../movie-card/movie-card";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (!token && !user) {
      console.log("No token")
      return;
    }
    
    getMovies(token);
  }, [token]);


  const getMovies = (token) => {
    fetch("https://myflix-api-3dxz.onrender.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => response.json())
    .then((data) => {
      const moviesFromApi = data.map(movie => {
        const obj = { id: movie._id, title: movie.Title, description: movie.Description, image: movie.ImageURL, genre: movie.Genre, director: movie.Director}
        return obj;
      });
      setMovies(moviesFromApi);
    });
  }

  return (
    <BrowserRouter>
          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={8}>
                    <MovieView movies={movies} user={user} updateUserState={updateUserState} />
                  </Col>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
