import React from "react";

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
    fetch("/api/orders")
      .then((response) => response.json())
      .then((data) => console.log("All Orders:", data))
      .catch((error) => console.error("Error retrieving orders:", error));
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
    {/* <div>
      <h1>Satellite Image Selection</h1>
      <SatelliteImageList />
    </div> */}
      <h1>Satellite Image Dashboard</h1>
      <button onClick={handleRetrieveImages}>Retrieve All Images</button>
      <button onClick={handleGetImageDetails}>Get Image Details</button>
      <button onClick={handlePlaceOrder}>Place Order</button>
      <button onClick={handleRetrieveOrders}>Retrieve All Orders</button>
    </div>
  );
}
