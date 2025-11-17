//Volume slider
export default function VolumeControl({ tempVolume, setTempVolume, controls, setControl }) {
    return (
        <div className="card-body">
            <label htmlFor="volumeControl" className="form-label">
                Volume
            </label>

            <input
                type="range"
                className="form-range"
                id="volumeControl"
                min="0"
                max="2"
                step="0.01"
                value={tempVolume}
                onChange={(e) => setTempVolume(parseFloat(e.target.value))}
                onMouseUp={() => setControl("volume", tempVolume)}
            />

            <div className="small text-muted">
                Current: {(controls.volume ?? 1).toFixed(2)}
            </div>
        </div>
    );
}
