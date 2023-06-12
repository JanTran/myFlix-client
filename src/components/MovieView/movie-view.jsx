import { useParams } from "react-router";
import { Link } from "react-router-dom";

import { Row, Col, Button } from "react-bootstrap";

import { MovieCard } from "../MovieCard/movie-card";

export const MovieView = ({ user, token, movieData, favoriteMovies }) => {
  const { movieId } = useParams();

  const Movie = movieData.find((movie) => movie._id === movieId);
  const similarMovies = movieData.filter(
    (m) => Movie.Genre.Name === m.Genre.Name
  );

  return (
    <>
      <Row className="mt-3">
        <Col></Col>
        <Col sm={{ offset: 10 }}>
          <Link to={`/`}>
            <Button>Back</Button>
          </Link>
        </Col>
      </Row>
      <Row className="fw-bold fs-1 mb-3">
        <Col>{Movie.Title}</Col>
      </Row>
      <Row className="border-top border-bottom border-secondary">
        <Col xs={5} sm={2}>
          Genre:{" "}
        </Col>
        <Col xs={10}>{Movie.Genre.Name}</Col>
      </Row>
      <Row className="border-top border-bottom border-secondary">
        <Col xs={5} sm={2}>
          Description:{" "}
        </Col>
        <Col xs={10}>{Movie.Description}</Col>
      </Row>
      <Row className="border-top border-bottom border-secondary">
        <Col xs={5} sm={2}>
          Director:{" "}
        </Col>
        <Col xs={10} className="fs-6">
          {Movie.Director.Name}
        </Col>
      </Row>
      <Row className="border-top border-bottom border-secondary">
        <Col xs={5} sm={2}>
          Release date:{" "}
        </Col>
        <Col xs={10}>{Movie.Release_date}</Col>
      </Row>
      <Row className="border-top border-bottom border-secondary">
        <Col xs={5} sm={2}>
          Actors:{" "}
        </Col>
        <Col xs={10}>{Movie.Actors}</Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-center mt-4">
          <img src={Movie.ImageURL} className="movie_image" />
        </Col>
      </Row>
      <Row>
        <Col className="fs-2">Similar Movies:</Col>
      </Row>
      <Row>
        {similarMovies.map((similarMovie) =>
          similarMovie._id === Movie._id ? (
            <Col className="d-none" key="none"></Col>
          ) : (
            <Col xs={12} md={6} lg={4} xl={3} xxl={2} key={similarMovie._id}>
              <MovieCard
                movieData={similarMovie}
                user={user}
                token={token}
                favoriteMovies={favoriteMovies}
              />
            </Col>
          )
        )}
      </Row>
    </>
  );
};
