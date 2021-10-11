import "../styles/navigatorStyle.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import HomePage from "./HomePage";
import CountryPage from "./countryPage";
import SlotMachinePage from "./slotMachinePage";
import DataBasePage from "./dataBasePage";

function Navigator() {
  return (
    <Router>
      <div className="area"></div>
      <nav className="main-menu">
        <ul>
          <li>
            <Link to="/">
              <i className="fa fa-home fa-2x"></i>
              <span className="nav-text">Home</span>
            </Link>
          </li>
          <li className="has-subnav">
            <Link to="/countryPage">
              <i className="fa fa-flag fa-2x"></i>
              <span className="nav-text">Countrys</span>
            </Link>
          </li>
          <li className="has-subnav">
            <Link to="/slotMachine">
              <i className="fa fa-gamepad fa-2x"></i>
              <span className="nav-text">Slot Machine</span>
            </Link>
          </li>
          <li className="has-subnav">
            <Link to="/dataBase">
              <i className="fa fa-database fa-2x"></i>
              <span className="nav-text">Sql</span>
            </Link>
          </li>
        </ul>

        <ul className="logout">
          <li>
            <a href="https://www.linkedin.com/in/hassine-iheb/">
              <i className="fa fa-linkedin fa-2x"></i>
              <span className="nav-text">Linkedin</span>
            </a>
          </li>
          <li>
            <a href="https://github.com/warkahuna/kanonGaming">
              <i className="fa fa-github fa-2x"></i>
              <span className="nav-text">Github</span>
            </a>
          </li>
        </ul>
      </nav>
      <div>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/countryPage">
            <CountryPage />
          </Route>
          <Route path="/slotMachine">
            <SlotMachinePage />
          </Route>
          <Route path="/dataBase">
            <DataBasePage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default Navigator;
