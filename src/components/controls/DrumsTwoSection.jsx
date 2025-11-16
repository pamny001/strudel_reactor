export default function DrumsTwoSection({ 
    controls, 
    onChangeMode,
    tempDrums2Hpf,
    setTempDrums2Hpf,
    commitOnRelease

}) {
  return (
    <div className="collapse" id="drums2Collapse">
        <div className="card card-body">
            <h5 className="text-center">Drums 2 Controls</h5>
            <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" id="flexSwitchCheckMode" checked={controls.drums2 === "on"} 
                onChange={(e) => onChangeMode?.("drums2", e.target.checked ? "on" : "off")} />
                <label className="form-check-label" htmlFor="flexSwitchCheckMode">Drums 2 Switch</label>
            </div>

            <div className="mt-2">
              <label htmlFor="drums2HpfControl" className="form-label">
                Drums 2 HPF (100–4000)
              </label>
              <input
                type="range"
                className="form-range"
                id="drums2HpfControl"
                min="100"
                max="4000"
                step="100"
                value={tempDrums2Hpf}
                onChange={(e) => setTempDrums2Hpf(parseInt(e.target.value, 10))}
                onMouseUp={() => commitOnRelease("drums2Hpf", tempDrums2Hpf)}
              />
              <div className="small text-muted">
                Current: {controls.drums2Hpf ?? 1000} Hz
              </div>
          </div>

        </div>
    </div>
  );
}
