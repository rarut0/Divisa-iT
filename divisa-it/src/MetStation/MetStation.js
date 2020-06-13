import React from "react";
import Map from "../Map/Map";
import dataFetcher from "../dataFetcher.service";

const center = {
  lat: 40.4165,
  lng: -3.70256,
};

function MetStation() {
  const targetUrl =
    "https://opendata.aemet.es/opendata/api/valores/climatologicos/inventarioestaciones/todasestaciones/?api_key=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJyb2JlcmJhaGlsbG9AZ21haWwuY29tIiwianRpIjoiYjZhYThjNmEtYjA0NS00Mzg1LWFiYTctZDZkZjM1NDIyMzgzIiwiaXNzIjoiQUVNRVQiLCJpYXQiOjE1OTE4ODkxMzcsInVzZXJJZCI6ImI2YWE4YzZhLWIwNDUtNDM4NS1hYmE3LWQ2ZGYzNTQyMjM4MyIsInJvbGUiOiIifQ.tgY-hWfjzMjasD1l_ln-kO5GNEjwhn8_AZbK0lNroe8";

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    dataFetcher(targetUrl).then(
      (result) => {
        fetch(result.datos)
          .then((res) => res.json())
          .then(
            (result) => {
              result.forEach((estacion) => {
                let lat = extractorCoordenadas(estacion.latitud);
                let lng = extractorCoordenadas(estacion.longitud);

                new window.google.maps.Marker({
                  position: { lat, lng },
                  map,
                  title:
                    "latitud: " +
                    estacion.latitud +
                    " | longitud: " +
                    estacion.longitud +
                    " | altitud: " +
                    estacion.altitud +
                    " | provincia: " +
                    estacion.provincia +
                    " | nombre: " +
                    estacion.nombre,
                });
              });
            },
            (error) => {
              console.error("error", error);
            }
          );
      },
      (error) => {
        console.error("error", error);
      }
    );
    map.setZoom(7); //parece que el zoom no funciona de manera consistente. Por alguna razon se setea a 22
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return (
    <div className="App-header">
      <Map
        onLoad={onLoad}
        onUnmount={onUnmount}
      />
    </div>
  );

  /**
   *
   * @param {*} coordenada
   *
   * Esta función del formato en el que viene de AEMTE (Por ejemplo 420616N) y lo transforma en una coordenada interpretable por los marcadores de google maps (Por ejemplo 42.0616)
   * Para valores localizados al Sur(S) y al Oeste(W) las coordenadas devueltas son negativas
   */
  function extractorCoordenadas(coordenada) {
    const coorLength = coordenada.length;
    let coor = coordenada.slice(0, coorLength - 1);
    coor = coor.slice(0, 2) + "." + coor.slice(2, coor.length);
    if (coordenada.endsWith("S") || coordenada.endsWith("W")) {
      coor = coor * -1;
    } else {
      coor = coor * 1;
    }
    return coor;
  }
}
export default React.memo(MetStation);
