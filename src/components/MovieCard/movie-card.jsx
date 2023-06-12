import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { Card, Col } from "react-bootstrap";

import "./movie-card.scss";

export const MovieCard = ({ movie }) => {
  return (
    <Col md={3}>
      <Card className="text-bg-dark border-secondary rounded mt-3">
        <Card.Img className="px-3 pt-3" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title className="fw-bold cardTitle border-top pt-2">
            {movie.Title}
          </Card.Title>
          <Card.Text className="fw-semibold border-top border-secondary">
            Genre: <br className="mobile" />
            {movie.Genre.Name}
          </Card.Text>
          <Card.Text className="fw-semibold border-top border-secondary">
            Director: <br className="mobile" />
            {movie.Director.name}
          </Card.Text>
          <Card.Text className="border-top border-bottom border-secondary">
            {movie.Description}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Release_date: PropTypes.string.isRequired,
    Genre: PropTypes.object.isRequired,
    Director: PropTypes.object.isRequired,
    Actors: PropTypes.array,
    ImagePath: PropTypes.string.isRequired,
  }),
};
