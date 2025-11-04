import React, { useState } from 'react';
import {globalEditor} from '../App.js';

export default function SaveLoadButtons({ appState, setAppStateLoad, setAppStateReset }) {

  const [status, setStatus] = useState(""); //Mesage status

  // Show message to user
  const showMessage = (msg) => {
    setStatus(msg);
    setTimeout(() => setStatus(""), 2000);//Last for 2 seconds
  };

  // Save song and controls to local storage
  const handleSave = () => {
    try {
      localStorage.setItem("app_state", JSON.stringify(appState));
      console.log("state saved");
      showMessage("Song saved!");
    } catch (e) {
      console.error("Save failed :", e);
    }
  };

  // Load song and controls from local storage
  const handleLoad = () => {
    try {
      const raw = localStorage.getItem("app_state");
      if (!raw) return;
      const loaded = JSON.parse(raw);
      setAppStateLoad(prev => ({ ...prev, ...loaded })); // merges

      console.log("state loaded");
      showMessage("Song loaded!");
    } catch (e) {
      console.error("Load failed :", e);
    }
  };

  // Reset to defaults
  const handleReset = () => {
    const resetData = {
      songText: appState?.defaultSongText,
      controls: appState?.defaultControls,
    };

    setAppStateReset(resetData);

    console.log("State reset to defaults");
    showMessage("Song reset to default!");
  };

  return (
    <>
      <button className="btn btn-outline-success me-2" onClick={handleSave}>Save</button>
      <button className="btn btn-outline-success me-2" onClick={handleLoad}>Load</button>
      <button className="btn btn-danger me-2" onClick={handleReset}>Reset</button>
      {status && (
        <div className="mt-2 text-success fw-semibold">
          {status}
        </div>
      )}
    </>
  );
}
