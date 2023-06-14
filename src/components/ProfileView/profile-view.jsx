//import
import { Link } from "react-router-dom";

//Import react-bootstrap
import {Row, Col} from "react-bootstrap";

//import components
import { MovieCard } from "../../MovieCard/movie-card";

export const ProfileView = ({user, favoriteMovieList, token, favoriteMovies}) => {
    return (
        <>
            <Row className="mt-2">
                <Col xs={{offset: 7}}sm={{offset: 10}}>
                    <Link to={`/users/settings`}>
                        Settings
                    </Link>
                </Col>
            </Row>
            <Row>
                <Col sm={{offset: 2}} md={{offset: 4}}>
                    User:
                </Col>
                <Col sm={8} md={7}>
                    {user.Username}
                </Col>
            </Row><br className="xs"/>
            <Row>
                <Col sm={{offset: 2}} md={{offset: 4}}>
                    Email:
                </Col>
                <Col sm={8} md={7}>
                    {user.Email}
                </Col>
            </Row><br className="xs"/>
            <Row>
                <Col sm={{offset: 2}} md={{offset: 4}}>
                    Birthday:
                </Col>
                <Col sm={7} md={6} lg={7}>
                    {user.Birthday}
                </Col>
            </Row><br className="xs"/>
            <Row>
                <Col className="fs-3">
                    Favorite Movies:
                </Col>
            </Row>
            <Row>
                {favoriteMovieList.map((movie) => (
                    <Col xs={12} md={6} lg={4} xl={3} xxl={2} key={movie._id}>
                        <MovieCard movieData={movie} user={user} token={token} favoriteMovies={favoriteMovies}/>
                    </Col>
                ))}
            </Row>
        </>
    )
}
