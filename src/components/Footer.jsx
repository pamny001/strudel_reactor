import React from "react";

export default function Footer({ logo, onHowTo }) {
  const defaultHowTo = () => {
    alert(
      "HOW TO USE:\n\n" +
      "1. Press Play to start the music.\n" +
      "2. Adjust controls on the right (bass, arp, drums, filters, volume).\n" +
      "3. The graph above shows the gain values in real-time.\n" +
      "4. Use Save/Load to persist your setup.\n" +
      "5. Press Stop to stop playback.\n\n" +
      "Enjoy creating music with Strudel!"
    );
  };

  const handleClick = () => {
    if (typeof onHowTo === "function") {
      onHowTo();
    } else {
      defaultHowTo();
    }
  };

  return (
    <div className="text-center">
      <img
        src={logo}
        alt="Strudel Demo Logo"
        style={{ width: "200px", display: "block", margin: "0 auto" }}
      />

      <button className="btn btn-primary mb-3" onClick={handleClick}>
        How to use
      </button>
    </div>
  );
}
