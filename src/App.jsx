import "./styles/css/index.css";
import Menu from "./components/Menu.jsx";
import Game from "./components/Game.jsx";
import Rules from "./components/Rules.jsx";
import { useSelector } from "react-redux";
import { selectPages } from "./features/pagesSlice";

function App() {
  const pages = useSelector((state) => selectPages(state));

  return (
    <>
      {pages.menu && <Menu />}
      {pages.game && <Game />}
      {pages.rules && <Rules />}
    </>
  );
}

export default App;
