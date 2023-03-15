import React, { useEffect, useState } from "react";
import { MovieCard } from "../MovieCard/movie-card";
import { MovieView } from "../MovieView/movie-view";

export const MainView = () => {
  const [selectedMovie, setSelectedMovie] = useState(undefined);
  const [movies, setMovies] = useState([
    {
      Genre: {
        Name: "Thriller",
        Description:
          "Thriller film, also known as suspense film or suspense thriller, is a broad film genre that creates excitement and suspense in the audience. Tension is created by delaying what the audience sees as inevitable and is built through situations that are menacing or where escape seems impossible.",
      },
      Director: {
        Name: "M. Night Shyamalan",
        Bio: "M. Night Shyamalan is an Indian-American filmmaker best known for thrilling movies with plot-twist endings. He was born in India and raised in Pennsylvania.",
        Birth: "1970",
      },
      Actors: [],
      _id: "63d00d6b34bdd4c84873eb62",
      Title: "Split",
      Description:
        "Split follows a man with dissociative identity disorder that kidnaps and imprisons three girls underground.",
      ImagePath:
        "https://ntvb.tmsimg.com/assets/p12858314_v_h10_bd.jpg?w=1280&h=720",
      Featured: true,
    },
    {
      Genre: {
        Name: "Fantasy",
        Description:
          "Fantasy films are often created based on the imagination, dreams, or hallucinations of a character or the storyteller. They often include themes related to magic, supernatural events, mythology, and/or folklore.",
      },
      Director: {
        Name: "Tim Burton",
        Bio: "Tim Burton is an American filmmaker and animator best known for gothic fantasy and horror films.",
        Birth: "1958",
      },
      Actors: [],
      _id: "63d02d8834bdd4c84873eb68",
      Title: "Edward Scissorhands",
      Description:
        "Johnny Depps stars in this fantasy film centered around Edward, a man with scissors as hands who has a difficult time acclimating to every day life in the suburbs.",
      ImagePath:
        "https://m.media-amazon.com/images/I/61SxZckfGgL._AC_SY580_.jpg",
      Featured: true,
      Bio: "Tim Burton is an American filmmaker and animator. He is well known for gothic fantasy and horror films.",
    },
    {
      Genre: {
        Name: "Comedy",
        Description:
          "Comedy is a genre of film in which the main emphasis is on humor. These films are designed to make the audience laugh through amusement and most often work by exaggerating characteristics for humorous effect.",
      },
      Director: {
        Name: "Mel Brooks",
        Bio: "Mel Brooks is an American actor, comedian, and filmmaker born in Brooklyn, New York. Though still working in the entertainment industry, he was considered one of the most successful film directors of the 1970s. Many films made by Brooks during this decade are still popular today.",
        Birth: "1926",
      },
      Actors: [],
      _id: "63d0128034bdd4c84873eb63",
      Title: "The Producers",
      Description:
        "The Producers follows a theater producer and his accountant who decide to create the worst musical ever as part of a scam.",
      ImagePath: "https://flxt.tmsimg.com/assets/p1282_p_v8_ae.jpg",
      Featured: true,
    },
  ]);

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
