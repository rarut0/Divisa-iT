import React from "react";
import "./Menu.sass";
import { Link } from "react-router-dom";

class Menu extends React.Component {
  render() {
    return (
      <div class="menu">
        <Link class="button" to="/">
          Página Principal
        </Link>
        <Link class="button" to="/map-api">
          Map API
        </Link>
        <Link class="button" to="/parking-madrid">
          lista aparcamientos
        </Link>
        <Link class="button" to="/youtube-api">
          youtube API
        </Link>
      </div>
    );
  }
}

export default Menu;
