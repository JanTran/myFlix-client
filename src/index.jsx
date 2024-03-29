import "bootstrap/dist/css/bootstrap.min.css";
import { createRoot } from "react-dom/client";
import { Container } from "react-bootstrap";
import { MainView } from "./components/MainView/main-view";

import "./index.scss";

const App = () => {
  return (
    <Container>
      <MainView />
    </Container>
  );
};

const container = document.querySelector("#root");
const root = createRoot(container);
root.render(<App />);
