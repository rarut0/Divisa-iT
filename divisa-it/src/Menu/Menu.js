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
        <Link className="button" to="/met-station">
          Estacuiones Meteorológicas
        </Link>
        <Link className="button" to="/parking-madrid">
          Lista Aparcamientos
        </Link>
        <Link className="button" to="/traffic-incidents">
          Incidencias Tráfico
        </Link>
      </div>
    );
  }
}

export default Menu;
