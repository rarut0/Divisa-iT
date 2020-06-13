import React from "react";
import "./MadridParking.sass";
import dataFetcher from "../dataFetcher.service";
import Popup from "react-popup";

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
    const targetUrl =
      "https://datos.madrid.es/egob/catalogo/202625-0-aparcamientos-publicos.json";

    dataFetcher(targetUrl).then(
      (result) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              result["@graph"].forEach((parking) => {
                const distLatitud =
                  position.coords.latitude - parking.location.latitude;
                const distLongitud =
                  position.coords.longitude - parking.location.longitude;
                parking.distance = Math.sqrt(
                  distLatitud * distLatitud + distLongitud * distLongitud
                );
              });
              result["@graph"].sort((a, b) => {
                return a.distance - b.distance;
              });
              this.setState({
                isLoaded: true,
                parkings: result["@graph"],
              });
            },
            (error) => {
              let geolocationError;
              switch (error.code) {
                case error.PERMISSION_DENIED:
                  geolocationError =
                    "El usuario a denegado la petición de Geolocalización.";
                  break;
                case error.POSITION_UNAVAILABLE:
                  geolocationError =
                    "Informacion de localización no disponible.";
                  break;
                case error.TIMEOUT:
                  geolocationError =
                    "Se ha acabado el tiempo de espera por la respuesta del usuario por la Geolocalización.";
                  break;
                case error.UNKNOWN_ERROR:
                default:
                  geolocationError = "Ha ocurrido un error desconocido.";
                  break;
              }
              Popup.alert(geolocationError);
              this.setState({
                isLoaded: true,
                parkings: result["@graph"],
              });
            }
          );
        } else {
          Popup.alert("La geolocalizacion no esta soportarda por el navegador");
          this.setState({
            isLoaded: true,
            parkings: result["@graph"],
          });
        }
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
