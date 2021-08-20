import "./App.css";
import mapContext from "./context/mapContext";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { useCallback, useState } from "react";
import MapHooks from "./hooks/MapHooks";
function App() {
  const [ toAdd, setToAdd] = useState(false)

  const containerStyle = {
    width: "100%",
    height: "400px",
    cursor: toAdd? 'pointer': 'move',
  };

  const center = {
    lat: -3.745,
    lng: -38.523,
  };
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBTVGyAutOvMtsIu1ICFFNwNBGSCbFkdRM",
  });
  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);


  // const onUnmount = useCallback(function callback(map) {
  //   setMap(null);
  // }, []);

  return (
    <mapContext.Provider value={MapHooks()}>
      <mapContext.Consumer>
        {(value) => {
          function onClick(e) {
            if(!toAdd) return
            var marker = {
              name: "",
              title: "",
              position: {
                lat: e.latLng.lat(),
                lng: e.latLng.lng(),
              }
            }
            value.addMarker(marker)
          }
          return isLoaded ? (
            <>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={10}
              onLoad={onLoad}
              // onUnmount={onUnmount}
              onClick={onClick}
            >
              {value.markers.map((marker, i) => {
                return (
                  <Marker
                    key={i}
                    title={marker.title}
                    name={marker.name}
                    position={marker.position}
                  ></Marker>
                );
              })}
              <></>
            </GoogleMap>
            <button onClick={()=>setToAdd(!toAdd)}>Can add marker? </button>
            <div>{toAdd?'Posso':'Não'}</div>
            </>
          ) : (
            <></>
          );
        }}
      </mapContext.Consumer>
    </mapContext.Provider>
  );
}

export default App;
