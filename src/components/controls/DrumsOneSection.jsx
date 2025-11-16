export default function DrumsOneSection({ 
    controls, 
    onChangeMode,
    tempDrums1Kick,
    setTempDrums1Kick,
    commitOnRelease

}) {
  return (
    <div className="collapse" id="drums1Collapse">
        <div className="card card-body">
            <h5 className="text-center">Drums 1 Controls</h5>
            <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" id="flexSwitchCheckMode" checked={controls.drums1 === "on"} 
                onChange={(e) => onChangeMode?.("drums1", e.target.checked ? "on" : "off")} />
                <label className="form-check-label" htmlFor="flexSwitchCheckMode">Drums 1 Switch</label>
            </div>

            <div className="mt-2">
              <label htmlFor="drums1KickControl" className="form-label">
                Drums 1 Kick Level (0–1)
              </label>
              <input
                type="range"
                className="form-range"
                id="drums1KickControl"
                min="0"
                max="1"
                step="0.01"
                value={tempDrums1Kick}
                onChange={(e) => setTempDrums1Kick(parseFloat(e.target.value))}
                onMouseUp={() => commitOnRelease("drums1Kick", tempDrums1Kick)}
              />
              <div className="small text-muted">
                Current: {(controls.drums1Kick ?? 0.25).toFixed(2)}
              </div>
          </div>

        </div>
    </div>
  );
}
