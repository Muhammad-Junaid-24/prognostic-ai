import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1 style={{ fontSize: "3rem", marginBottom: "20px" }}>404</h1>
      <p style={{ fontSize: "1.5rem", marginBottom: "30px" }}>
        Oops! The page you are looking for doesn't exist.
      </p>
      <Button type="primary" onClick={goHome}>
        Go Back to Home
      </Button>
    </div>
  );
};

export default NotFoundPage;
