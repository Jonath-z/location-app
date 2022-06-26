import { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1Ijoiam9uYXRoYW56IiwiYSI6ImNsMG1lNmVqbzE0YmgzanVvZXpydTlkaTcifQ.CHNESKbLui8ujw8R7ujTBg";

console.log("map box token", process.env.REACT_APP_MAPBOX_TOKEN);

const Mapbox = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(29.2356);
  const [lat, setLat] = useState(-1.6835);
  const [zoom, setZoom] = useState(13);

  useEffect(() => {
    if (map.current) return;

    //////////////// STORE THE MAP IN THE REF ////////////
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });

    ///// MAP EVENT ON MOVE //////////////////

    map.current.on("move", (e) => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });

    ///////////// CREATE GEOLOCATION CONTROL TO GET THE CURRENT LOCATION ///////
    const userLocation = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
      showUserHeading: true,
    });

    /////////////////////// GET CURRENT LOCATION COORDINATES //////////////////////////////////
    userLocation.on("geolocate", (e) => {
      const lng = e.coords.longitude;
      const lat = e.coords.latitude;
      setLat(lat);
      setLng(lng);
    });

    const navigationControl = new mapboxgl.NavigationControl();

    ///////////////////////// ADD THE USER LOCATION COMPONENT ON THE MAP ///////////////////
    map.current.addControl(navigationControl, "top-right");
    map.current.addControl(userLocation);
  }, [lat, lng, zoom]);

  return (
    <div
      ref={mapContainer}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        height: "100%",
        width: "100%",
      }}
    />
  );
};

export default Mapbox;
