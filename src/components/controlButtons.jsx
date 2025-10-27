//import { ProcAndPlay } from "../App";
import {useState} from "react";

function ControlButtons({ controls, onChangeMode, onChangeBpm }) {
  const [tempBpm, setTempBpm] = useState(controls.bpm);
  return (
    <>
      <p className="d-inline-flex gap-1">
        <button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#speedCollapse" aria-expanded="false" aria-controls="speedCollapse">Speed</button>
        <button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#instrumentsCollapse" aria-expanded="false" aria-controls="instrumentsCollapse">Instruments</button>
      </p>

      <div className="row mt-3">
        {/* Speed Section */}
        <div className="col-12">
          <div className="collapse" id="speedCollapse">
            <div className="card card-body">

              <div className="input-group">
                <div className="input-group-text" id="btnGroupAddon">BPM</div>
                <input type="number" className="form-control" placeholder="Enter BPM" aria-label="BPM Input" aria-describedby="btnGroupAddon" 
                value={tempBpm} 
                onChange={(e) => { setTempBpm(e.target.value); }} />
                <button type="button" className="btn btn-primary" onClick={() => { onChangeMode?.("bpm", tempBpm)}}>Set BPM</button>
              </div>

            </div>
          </div>
        </div>

        {/* Instruments Section */}
        <div className="col-12 mt-3">
          <div className="collapse" id="instrumentsCollapse">
            <div className="card card-body">

              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" id="flexSwitchCheckMode" checked={controls.mainArp === "on"} 
                onChange={(e) => onChangeMode?.("mainArp", e.target.checked ? "on" : "off")} />
                <label className="form-check-label" htmlFor="flexSwitchCheckMode">Main Arp</label>
              </div>

              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" id="flexSwitchCheckMode" checked={controls.bassLine === "on"} 
                onChange={(e) => onChangeMode?.("bassLine", e.target.checked ? "on" : "off")} />
                <label className="form-check-label" htmlFor="flexSwitchCheckMode">Bass Line</label>
              </div>

              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" id="flexSwitchCheckMode" checked={controls.drums1 === "on"} 
                onChange={(e) => onChangeMode?.("drums1", e.target.checked ? "on" : "off")} />
                <label className="form-check-label" htmlFor="flexSwitchCheckMode">Drums 1</label>
              </div>

              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" id="flexSwitchCheckMode" checked={controls.drums2 === "on"} 
                onChange={(e) => onChangeMode?.("drums2", e.target.checked ? "on" : "off")} />
                <label className="form-check-label" htmlFor="flexSwitchCheckMode">Drums 2</label>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ControlButtons;
