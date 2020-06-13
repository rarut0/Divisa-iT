import React from "react";
import "./Footer.sass";
import linkedin from "./linkedin.jpg";
import github from "./github.jpg";

class Footer extends React.Component {
  render() {
    return (
      <div className="footer">
        <a
          className="button"
          href="https://github.com/rarut0/Divisa-iT"
          target="_blank"
          rel="noopener noreferrer"
        >
        <div className="image">
          <img src={github} alt=""></img>
        </div>
        </a>
        <a
          className="button"
          href="https://www.linkedin.com/in/roberto-bahillo-ortego-6b7565168/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="image">
            <img src={linkedin} alt=""></img>
          </div>
        </a>
      </div>
    );
  }
}

export default Footer;
