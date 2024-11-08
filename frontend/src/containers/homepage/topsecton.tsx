// Top.tsx
import React from "react";
import img from "../../images/bg-img.jpg"
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
        backgroundImage: `url(${img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "multiply",
        backgroundColor: "rgba(1, 1, 1, 0.8)",
      }}
    >
      {/* Render other content here */}
      {chatHandler}
      {card}
    </div>
  );
};

export default Top;
