import { MovieView } from "../movie-view/movie-view";
import { MovieCard } from "../movie-card/movie-card";

export const MainView = () => {
  const [user, setUser] = useState(null);
  const [movies, setMovies] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (!token && !user) {
      console.log("No token")
      return;
    }

    getUser();
    getMovies(token);
  }, [token]);

  const getUser = () => {
    const userName = localStorage.getItem("username");
    console.log("Username we gonna pass", userName, token);
    fetch(`https://myflix-api-3dxz.onrender.com/users/${userName}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => response.json())
    .then((user) => {
      console.log("Setting User State", user);
      setUser(user);
    });
  }

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

  const updateUserState = (user) => {
    setUser(user);
  }

  const onLoggedIn = (user, token) => {
    // Martin: Moved localstorage settings to here, to keep it in single place
    localStorage.setItem("token", token);
    localStorage.setItem("username", user.Username);
    setUser(user);
    getMovies(token);
  }

  const onLogOut = () => {
    // Martin clean up things on log out here
    setUser(null);
    setToken(null);
    localStorage.clear();
  }

  return (
    <BrowserRouter>
      <NavigationBar
      user={user}
      onLoggedOut={onLogOut}
      />
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView onLoggedIn={(user, token) => onLoggedIn(user, token)} />
                  </Col>
                )}
              </>
            }
          />
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
          <Route
            path="/"
            element={
              <>
                {!(user || token) ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    {movies.map((movie) => (
                      <Col className="mb-4" key={movie.id} md={3}>
                        <MovieCard movie={movie} />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
          <Route
          path="/profile"
          element={
            <>
              {!user ? (
                <Navigate to="/login" replace />
              ) : user.length === 0 ? (
                <Col>No such user found!</Col>
              ) : (
                <Col>
                  <ProfileView user={user} movies={movies} updateUserState={updateUserState} />
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
