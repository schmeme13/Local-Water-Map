import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";

// Fix default icon issue with Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

function App() {
  const [waterData, setWaterData] = useState([]);

  useEffect(() => {
    // Fetch data from Spring Boot backend
    axios
      .get("http://localhost:8080/api/water-locations")
      .then((response) => setWaterData(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div style={{ height: "100vh" }}>
      <h1 style={{ textAlign: "center" }}>Water Information Map</h1>
      <MapContainer center={[39.8283, -98.5795]} zoom={4} style={{ height: "90%" }}>
        {/* Add OpenStreetMap tiles */}
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {/* Add pins dynamically */}
        {waterData.map((location) => (
          <Marker key={location.id} position={[location.latitude, location.longitude]}>
            <Popup>
              <b>{location.name}</b>
              <br />
              {location.waterInfo}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default App;
