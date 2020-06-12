import React from "react";
import ReactDOM from "react-dom";
import "./index.sass";
import { BrowserRouter, Route } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import App from "./MainPage/App";
import Menu from './Menu/Menu.js'
import MadridParking from "./MadridParking/MadridParking.js";
import MetStation from "./MetStation/MetStation";

ReactDOM.render(
  <BrowserRouter>
    <Menu />
    <Route exact path="/" component={App} />
    <Route exact path="/map-api" component={MetStation} />
    <Route exact path="/parking-madrid" component={MadridParking} />
    <Route exact path="/youtube-api" component={App} />
    {/* <App /> */}
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
