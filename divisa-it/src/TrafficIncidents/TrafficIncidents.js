import React from "react";
import Map from "../Map/Map";
import dataFetcher from "../dataFetcher.service";
import amarillo from './yellow-dot.png'
import negro from './black-dot.png'
import verde from './green-dot.png'
import rojo from './red-dot.png'

const center = {
  lat: 40.4165,
  lng: -3.70256,
};

function TrafficIncidents() {
  const targetUrl =
    "https://opendata.arcgis.com/datasets/a64659151f0a42c69a38563e9d006c6b_0.geojson";

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    dataFetcher(targetUrl).then(
      (result) => {
        result.features.forEach((incidencia) => {
          let lat = incidencia.geometry.coordinates[1];
          let lng = incidencia.geometry.coordinates[0];

          let icon;
          switch (incidencia.properties.nivel) {
            case "AMARILLO":
              icon = amarillo;
              break;
            case "NEGRO":
              icon = negro;
              break;
            case "VERDE":
              icon = verde;
              break;
            default:
              icon = rojo;
          }

          new window.google.maps.Marker({
            position: { lat, lng },
            map,
            title:
              "carretera: " +
              incidencia.properties.carretera +
              " | causa: " +
              incidencia.properties.causa +
              " | sentido: " +
              incidencia.properties.sentido +
              " | población: " +
              incidencia.properties.poblacion +
              " | provincia: " +
              incidencia.properties.provincia +
              " | tipo: " +
              incidencia.properties.tipo,
            icon: icon,
          });
        });
      },
      (error) => {
        console.error("error", error);
      }
    );
    map.setZoom(8); //parece que el zoom no funciona de manera consistente. Por alguna razon se setea a 22
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return (
    <div className="App-header">
      <Map onLoad={onLoad} onUnmount={onUnmount} />
    </div>
  );
}
export default React.memo(TrafficIncidents);
