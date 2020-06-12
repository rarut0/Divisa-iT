import React from "react";
import "./MadridParking.sass";

class MadridParking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      parkings: [],
    };
  }

  componentDidMount() {
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    const targetUrl =
      "https://datos.madrid.es/egob/catalogo/202625-0-aparcamientos-publicos.json";

    fetch(proxyUrl + targetUrl)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            parkings: result["@graph"],
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }
  render() {
    const { error, isLoaded, parkings } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="list">
          <header>
            <ul>
              {parkings.map((parking) => (
                <li key={parking.title}>
                  {parking.title} - {parking.address.locality},{" "}
                  {parking.address["postal-code"]},{" "}
                  {parking.address["street-address"]} {"-->"}
                  <a
                    href={
                      "http://maps.google.com/?q=" +
                      parking.location.latitude +
                      "," +
                      parking.location.longitude
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Mirar en el Mapa
                  </a>
                </li>
              ))}
            </ul>
          </header>
        </div>
      );
    }
  }
}

export default MadridParking;
