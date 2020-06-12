import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "100vw",
  height: "90vh",
};

const center = {
  lat: 40.4165,
  lng: -3.70256,
};

function MetStation() {
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const targetUrl =
    "https://opendata.aemet.es/opendata/api/valores/climatologicos/inventarioestaciones/todasestaciones/?api_key=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJyb2JlcmJhaGlsbG9AZ21haWwuY29tIiwianRpIjoiYjZhYThjNmEtYjA0NS00Mzg1LWFiYTctZDZkZjM1NDIyMzgzIiwiaXNzIjoiQUVNRVQiLCJpYXQiOjE1OTE4ODkxMzcsInVzZXJJZCI6ImI2YWE4YzZhLWIwNDUtNDM4NS1hYmE3LWQ2ZGYzNTQyMjM4MyIsInJvbGUiOiIifQ.tgY-hWfjzMjasD1l_ln-kO5GNEjwhn8_AZbK0lNroe8";

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    fetch(proxyUrl + targetUrl)
      .then((res) => res.json())
      .then(
        (result) => {
          fetch(result.datos)
            .then((res) => res.json())
            .then(
              (result) => {
                // console.log(result);
                  result.forEach(estacion => {
                    let lat = extractorCoordenadas(estacion.latitud);
                    let lng = extractorCoordenadas(estacion.longitud);
    
                    new window.google.maps.Marker({
                      position: {lat,lng},
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
    map.setZoom(0); //parece que el zoom no funciona de manera consistente. Por alguna razon se setea a 22
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return (
    <div className="App-header">
      <LoadScript googleMapsApiKey="AIzaSyCidjPoNFCDIKn-8nk_D_pHk4scuqeQx3E">
        <GoogleMap
          mapContainerStyle={containerStyle}
          onLoad={onLoad}
          onUnmount={onUnmount}
        ></GoogleMap>
      </LoadScript>
    </div>
  );

    function extractorCoordenadas(coordenada) {
        const coorLength = coordenada.length;
        let coor = coordenada.slice(0, coorLength - 1)
        coor = coor.slice(0, 2) + "." + coor.slice(2, coor.length);
        if (coordenada.endsWith("S") || coordenada.endsWith("W")) {
            coor = coor * -1;
        }
        else {
            coor = coor * 1;
        }
        return coor;
    }
}
export default React.memo(MetStation);
