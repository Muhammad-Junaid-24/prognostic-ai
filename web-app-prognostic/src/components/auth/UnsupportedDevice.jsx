import React from "react";

const UnsupportedDevice = () => (
  <div
    style={{
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      padding: "1rem",
      fontFamily: "Arial, sans-serif",
    }}
  >
    <h1>Unsupported Device</h1>
    <p>
      This application is currently supported only on desktop browsers. Please
      try accessing it from a desktop device.
    </p>
  </div>
);

export default UnsupportedDevice;
