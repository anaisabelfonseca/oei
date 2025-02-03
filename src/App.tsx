import React from "react";
import "./App.css";

export default function App() {
  const handleRetrieveImages = () => {
    fetch("/api/images")
      .then((response) => response.json())
      .then((data) => console.log("All Images:", data))
      .catch((error) => console.error("Error retrieving images:", error));
  };

  const handleGetImageDetails = () => {
    const catalogId = prompt("Enter Catalog ID:");
    if (!catalogId) return;
    
    fetch(`/api/images/${catalogId}`)
      .then((response) => response.json())
      .then((data) => console.log("Image Details:", data))
      .catch((error) => console.error("Error retrieving image details:", error));
  };

  const handlePlaceOrder = () => {
    const catalogId = prompt("Enter Catalog ID to order:");
    if (!catalogId) return;

    const userName = prompt("Enter your name to place order:");
    if (!userName) return;

    fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
          catalogId: catalogId,
          customerName: userName
      }),
  })
  .then(response => response.json())
  .then(data => console.log("Order Created:", data))
  .catch(error => console.error("Error creating order:", error));

  }

  const handleRetrieveOrders = () => {
    fetch("/api/orders", {
    method: "GET",
    })
      .then((response) => response.json())
      .then((data) => console.log("All Orders:", data))
      .catch((error) => console.error("Error retrieving orders:", error));
  };

  const handleFilterImagesByGeometry = () => {
    const geoJSON = prompt("Enter geoJSON to filter images:");
    if (!geoJSON) return;

    // Encode the GeoJSON as a query parameter
    const encodedGeoJSON = encodeURIComponent(geoJSON);

    fetch(`/api/images/filter?geoJSON=${encodedGeoJSON}`, {
      method: "GET", 
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((response) => response.json())
      .then((data) => console.log("Filtered Images:", data))
      .catch((error) => console.error("Error fetching images:", error));
  }

  return (
    <div className="container">
      <h1>Satellite Image Dashboard</h1>
      <button onClick={handleRetrieveImages}>Retrieve All Images</button>
      <button onClick={handleGetImageDetails}>Get Image Details</button>
      <button onClick={handleFilterImagesByGeometry}>Filter Images by GeoJSON</button>
      <button onClick={handlePlaceOrder}>Place Order</button>
      <button onClick={handleRetrieveOrders}>Retrieve All Orders</button>
    </div>
  );
}
