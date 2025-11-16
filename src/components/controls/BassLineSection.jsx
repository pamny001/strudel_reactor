export default function BassLineSection({
  controls,
  tempBassLpf,
  setTempBassLpf,
  commitOnRelease,
  onChangeMode
}) {
  const switchId = "bassLineSwitchId";

  return (
    <div className="collapse" id="bassLineCollapse">
        <div className="card card-body">

            <h5 className="text-center">Bass Line Controls</h5>
            <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" id="flexSwitchCheckMode" checked={controls.bassLine === "on"} 
                onChange={(e) => onChangeMode?.("bassLine", e.target.checked ? "on" : "off")} />
                <label className="form-check-label" htmlFor="flexSwitchCheckMode">Bass Line Switch</label>
            </div>
            <div>
            <label htmlFor="bassLpfControl" className="form-label mt-2">Bass Line LPF (200-1400)</label>
            <input type="range" className="form-range" id="bassLpfControl" min="200" max="1400" step="200"
                value={tempBassLpf}
                onChange={(e) => setTempBassLpf(parseInt(e.target.value, 10))}
                onMouseUp={() => commitOnRelease("bassLpf", tempBassLpf)}
            />
            <div className="small text-muted">Current: {controls.bassLpf} Hz</div>
            </div>

        </div>
    </div>
  );
}
