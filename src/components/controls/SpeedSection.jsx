export default function SpeedSection({
  tempBpm,
  setTempBpm,
  onChangeMode
}) {
  return (
    <div className="collapse" id="speedCollapse">
      <div className="card card-body">

      <h5 className="text-center">Speed</h5>
        <div className="input-group">
          <div className="input-group-text" id="btnGroupAddon">BPM</div>
          <input type="number" className="form-control" placeholder="Enter BPM" aria-label="BPM Input" aria-describedby="btnGroupAddon" 
          value={tempBpm} 
          onChange={(e) => { setTempBpm(e.target.value); }} />
          <button type="button" className="btn btn-primary" onClick={() => { onChangeMode?.("bpm", tempBpm)}}>Set BPM</button>
        </div>

      </div>
    </div>
  );
}
