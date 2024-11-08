import React from "react";
import img from "../../images/bg-img.jpg";

interface TopProps {
  chatHandler: React.ReactNode;
  card: React.ReactNode;
}

const Top: React.FC<TopProps> = ({ chatHandler, card }) => {
  return (
    <div
      className="top-container"
      style={{
        position: "fixed",
        top: "5em",
        width: "100%",
        height: "90vh",
        zIndex: 1000,
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundImage: `url(${img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "multiply",
        backgroundColor: "rgba(1, 1, 1, 0.8)",
        color: "white",
        padding: "1rem",
      }}
    >
      {/* Chat Handler Component */}
      <div style={{ width: "100%", marginBottom: "1rem" }}>{chatHandler}</div>

      {/* Cards Section - Contains dynamically rendered CollegeCards */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "1rem",
          width: "100%",
        }}
      >
        {card}
      </div>
    </div>
  );
};

export default Top;
