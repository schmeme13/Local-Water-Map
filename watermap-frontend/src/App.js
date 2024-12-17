import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";

// Fix Leaflet default icon issues
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

function App() {
  const [waterData, setWaterData] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(false); // Add error state

  // Fetch water quality data from Spring Boot
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/water-locations")
      .then((response) => {
        console.log("Fetched data:", response.data); // Check the data here
        setWaterData(response.data);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(true); // Set error state to true if the fetch fails
        setLoading(false); // Also set loading to false on error
      });
  }, []);

  // Loading screen while data is being fetched
  if (loading) return <div>Loading map...</div>;

  // Error screen if data fetch fails
  if (error) return <div>Failed to load water quality data.</div>;

  return (
    <div style={{ height: "100vh" }}>
      <h1 style={{ textAlign: "center" }}>Water Quality Map</h1>
      <MapContainer center={[40.9025, -89.1387]} zoom={5} style={{ height: "90%" }}>
        {/* Map tiles */}
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Map pins */}
        {waterData.map((location) => (
          <Marker key={location.id} position={[location.latitude, location.longitude]}>
            {/* Tooltip for hover */}
            <Tooltip direction="top" offset={[0, -15]} opacity={1} permanent>
              <b>{location.name}</b>
            </Tooltip>

            {/* Popup for detailed water info */}
            <Popup>
              <div>
                <h3>{location.name}</h3>
                <p>{location.waterInfo}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default App;
