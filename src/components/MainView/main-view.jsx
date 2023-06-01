import React, { useEffect, useState } from "react";
import { MovieCard } from "../MovieCard/movie-card";
import { MovieView } from "../MovieView/movie-view";

// The BookCard function component 

export const MainView = () => {
  useEffect(() => {
    fetch("https://myflix-brendon.herokuapp.com/movies")
      .then((response) => response.json())
      .then((data) => {
        setBooks(data);
      });
  }, []);
  const [selectedMovie, setSelectedMovie] = useState(undefined);
  const [movies, setMovies] = useState([]);

  if (selectedMovie) {
    return <MovieView movie={selectedMovie} onBack={setSelectedMovie} />;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard movie={movie} key={movie._id} onClick={setSelectedMovie} />
      ))}
    </div>
  );
};
