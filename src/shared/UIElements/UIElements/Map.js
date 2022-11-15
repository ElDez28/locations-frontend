import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const styles = {
  width: "100%",
  height: "100%",
};

const Map = (props) => {
  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);
  const { center, zoom } = props;

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiZWxkaW4zMCIsImEiOiJjbGE2cHpyYmowMnd5M3ZwMmY0cjN4cHE2In0.fJ4K4AI1VQ4AFhJ9M4UpOg";
    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: center,
        zoom: zoom,
      });
      new mapboxgl.Marker().setLngLat(center).addTo(map);
      map.on("load", () => {
        setMap(map);
        map.resize();
      });
    };

    if (!map) initializeMap({ setMap, mapContainer });
    // return () => map.remove();
  }, [map, center, zoom]);

  return <div ref={(el) => (mapContainer.current = el)} style={styles} />;
};

export default Map;
