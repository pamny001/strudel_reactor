export default function MainArpSection({
  controls,
  tempMainArpLpf,
  setTempMainArpLpf,
  tempMainArpRoom,
  setTempMainArpRoom,
  tempMainArpLpenv,
  setTempMainArpLpenv,
  commitOnRelease,
  onChangeMode
}) {
  return (
    <div className="collapse" id="mainArpCollapse">
      <div className="card card-body">

        <h5 className="text-center">Main Arp Controls</h5>
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            id="flexSwitchCheckMode"
            checked={controls.mainArp === "on"}
            onChange={(e) => onChangeMode?.("mainArp", e.target.checked ? "on" : "off")}
          />
          <label className="form-check-label" htmlFor="flexSwitchCheckMode">Main Arp Switch</label>
        </div>

        {/* Main Arp LPF slider */}
        <div>
          <label htmlFor="mainArpLpfControl" className="form-label">Main Arp LPF (100-1300)</label>
          <input
            type="range"
            className="form-range"
            id="mainArpLpfControl"
            min="100"
            max="1300"
            step="200"
            value={tempMainArpLpf}
            onChange={(e) => setTempMainArpLpf(parseInt(e.target.value, 10))}
            onMouseUp={() => commitOnRelease("mainArpLpf", tempMainArpLpf)}
          />
          <div className="small text-muted">Current: {controls.mainArpLpf ?? 300} Hz</div>
        </div>

        {/* Main Arp Room slider (0–1) */}
        <div>
          <label htmlFor="mainArpRoomControl" className="form-label">Main Arp Room (0–1)</label>
          <input
            type="range"
            className="form-range"
            id="mainArpRoomControl"
            min="0"
            max="1"
            step="0.01"
            value={tempMainArpRoom}
            onChange={(e) => setTempMainArpRoom(parseFloat(e.target.value))}
            onMouseUp={() => commitOnRelease("mainArpRoom", tempMainArpRoom)}
          />
          <div className="small text-muted">Current: {(controls.mainArpRoom ?? 0.6).toFixed(2)}</div>
        </div>

        {/* Main Arp LPEnv slider (0–10) */}
        <div>
          <label htmlFor="mainArpLpenvControl" className="form-label">Main Arp LPEnv (0–10)</label>
          <input
            type="range"
            className="form-range"
            id="mainArpLpenvControl"
            min="0"
            max="10"
            step="0.1"
            value={tempMainArpLpenv}
            onChange={(e) => setTempMainArpLpenv(parseFloat(e.target.value))}
            onMouseUp={() => commitOnRelease("mainArpLpenv", tempMainArpLpenv)}
          />
          <div className="small text-muted">Current: {(controls.mainArpLpenv ?? 3.3).toFixed(1)}</div>
        </div>

      </div>
    </div>
  );
}
