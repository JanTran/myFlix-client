import React, { useEffect, useState } from "react";
import { MovieCard } from "../MovieCard/movie-card";
import { MovieView } from "../MovieView/movie-view";
// Here you import the PropTypes library
import PropTypes from "prop-types";

// The BookCard function component 

export const MainView = () => {
  useEffect(() => {
    fetch("https://myflix-brendon.herokuapp.com/movies")
      .then((response) => response.json())
      .then((data) => {
        const booksFromApi = data.docs.map((doc) => {
          return {
            id: doc.key,
            title: doc.title,
            image:
`https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`,
            author: doc.author_name?.[0]
          };
        });

        setBooks(booksFromApi);
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
