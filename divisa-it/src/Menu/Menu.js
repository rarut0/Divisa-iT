import React from "react";
import "./Menu.sass";
import { Link } from "react-router-dom";

class Menu extends React.Component {
  render() {
    return (
      <div className="menu">
        <Link className="button" to="/">
          Página Principal
        </Link>
        <Link className="button" to="/map-api">
          Map API
        </Link>
        <Link className="button" to="/parking-madrid">
          lista aparcamientos
        </Link>
        <Link className="button" to="/youtube-api">
          youtube API
        </Link>
      </div>
    );
  }
}

export default Menu;
