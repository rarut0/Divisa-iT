import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const containerStyle = {
    width: "100vw",
    height: "90vh",
  };

function Map(props) {
  return (
    <div className="App-header">
      <LoadScript googleMapsApiKey="AIzaSyCidjPoNFCDIKn-8nk_D_pHk4scuqeQx3E">
        <GoogleMap
          mapContainerStyle={containerStyle}
          onLoad={props.onLoad}
          onUnmount={props.onUnmount}
        ></GoogleMap>
      </LoadScript>
    </div>
  );
}
export default React.memo(Map);
