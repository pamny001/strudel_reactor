import React from 'react';
import {globalEditor} from '../App.js';

export default function SaveLoadButtons({ appState, setAppStateLoad, setAppStateReset }) {
  // Save song and controls to local storage
  const handleSave = () => {
    try {
      localStorage.setItem("app_state", JSON.stringify(appState));
      console.log("state saved");
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
      globalEditor.setCode(loaded.songText);
      globalEditor.evaluate();

      console.log("state loaded");
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

    globalEditor.setCode(resetData.songText);
    globalEditor.evaluate();

    console.log("State reset to defaults");
  };

  return (
    <div>
      <button onClick={handleSave}>Save</button>
      <button onClick={handleLoad}>Load</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}
