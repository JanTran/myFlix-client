import React, { useEffect, useState } from "react";
import { MovieCard } from "../MovieCard/movie-card";
import { MovieView } from "../MovieView/movie-view";

// The BookCard function component 

export const MainView = () => {
  const [selectedMovie, setSelectedMovie] = useState(undefined);
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    fetch("https://myflix-brendon.herokuapp.com/movies")
      .then((response) => response.json())
      .then((data) => {
        setMovies(data);
      });
  }, []);
 

  if (selectedMovie) {
    return <MovieView movie={selectedMovie} onBack={() => setSelectedMovie(undefined)} />;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard movie={movie} key={movie._id} onClick={setSelectedMovie} />
      ))}
    </div>
  );
};
