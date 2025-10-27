//import { ProcAndPlay } from "../App";
import {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function ControlButtons({ controls, onChangeMode, onChangeBpm }) {
  const [tempBpm, setTempBpm] = useState(controls.bpm);
  return (
    <>
      <p className="d-inline-flex gap-1 collapse-buttons">
        <button className="btn btn-primary collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#speedCollapse" aria-expanded="false" aria-controls="speedCollapse">Speed</button>
        <button className="btn btn-primary collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#bassLineCollapse" aria-expanded="false" aria-controls="bassLineCollapse">Bass Line</button>
        <button className="btn btn-primary collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#mainArpCollapse" aria-expanded="false" aria-controls="mainArpCollapse">Main Arp</button>
        <button className="btn btn-primary collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#drums1Collapse" aria-expanded="false" aria-controls="drums1Collapse">Drums 1</button>
        <button className="btn btn-primary collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#drums2Collapse" aria-expanded="false" aria-controls="drums2Collapse">Drums 2</button>
      </p>

      <div className="row">
        {/* Speed Section */}
        <div className="col-12">
          <div className="collapse" id="speedCollapse">
            <div className="card card-body">

            <h5 className="mb-3 text-center">Speed</h5>
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

        { /* Bass Line */ }
        <div className="col-12 mt-3">
          <div className="collapse" id="bassLineCollapse">
            <div className="card card-body">

                <h5 className="mb-3 text-center">Bass Line Controls</h5>
                <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" id="flexSwitchCheckMode" checked={controls.bassLine === "on"} 
                    onChange={(e) => onChangeMode?.("bassLine", e.target.checked ? "on" : "off")} />
                    <label className="form-check-label" htmlFor="flexSwitchCheckMode">Bass Line</label>
                </div>
                <div className="mt-3">
                <label htmlFor="bassLpfControl" className="form-label">Bass Line LPF (200-1400)</label>
                <input type="range" className="form-range" id="bassLpfControl" min="200" max="1400" step="200"
                  value={controls.bassLpf ?? 700}
                  onChange={(e) => onChangeMode?.("bassLpf", parseInt(e.target.value, 10))}
                />
                <div className="small text-muted">Current: {controls.bassLpf} Hz</div>
              </div>

            </div>
          </div>
        </div>

                {/* Main Arp */}
        <div className="col-12 mt-3">
          <div className="collapse" id="mainArpCollapse">
            <div className="card card-body">

                <h5 className="mb-3 text-center">Main Arp Controls</h5>
                <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" id="flexSwitchCheckMode" checked={controls.mainArp === "on"} 
                    onChange={(e) => onChangeMode?.("mainArp", e.target.checked ? "on" : "off")} />
                    <label className="form-check-label" htmlFor="flexSwitchCheckMode">Main Arp</label>
                </div>

                {/* Main Arp LPF slider */}
                <div className="mt-3">
                  <label htmlFor="mainArpLpfControl" className="form-label">Main Arp LPF (100-1300)</label>
                  <input type="range" className="form-range" id="mainArpLpfControl" min="100" max="1300" step="200"
                    value={controls.mainArpLpf ?? 300}
                    onChange={(e) => onChangeMode?.("mainArpLpf", parseInt(e.target.value, 10))}
                  />
                  <div className="small text-muted">Current: {controls.mainArpLpf ?? 300} Hz</div>
                </div>

                {/*Main Arp Room slider (0.00–1.00) */}
                <div className="mt-3">
                  <label htmlFor="mainArpRoomControl" className="form-label">Main Arp Room (0–1)</label>
                  <input type="range" className="form-range" id="mainArpRoomControl" min="0" max="1" step="0.01"
                    value={controls.mainArpRoom ?? 0.6}
                    onChange={(e) => onChangeMode?.("mainArpRoom", parseFloat(e.target.value))}
                  />
                  <div className="small text-muted">Current: {(controls.mainArpRoom ?? 0.6).toFixed(2)}</div>
                </div>

                {/* Main Arp LPEnv slider (0.0–10.0) */}
                <div className="mt-3">
                  <label htmlFor="mainArpLpenvControl" className="form-label">Main Arp LPEnv (0–10)</label>
                  <input type="range" className="form-range" id="mainArpLpenvControl" min="0" max="10" step="0.1"
                    value={controls.mainArpLpenv ?? 3.3}
                    onChange={(e) => onChangeMode?.("mainArpLpenv", parseFloat(e.target.value))}
                  />
                  <div className="small text-muted">Current: {(controls.mainArpLpenv ?? 3.3).toFixed(1)}</div>
                </div>


            </div>
          </div>
        </div>

        { /* Drums1 */}
        <div className="col-12 mt-3">
          <div className="collapse" id="drums1Collapse">
            <div className="card card-body">

                <h5 className="mb-3 text-center">Drums 1 Controls</h5>
                <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" id="flexSwitchCheckMode" checked={controls.drums1 === "on"} 
                    onChange={(e) => onChangeMode?.("drums1", e.target.checked ? "on" : "off")} />
                    <label className="form-check-label" htmlFor="flexSwitchCheckMode">Drums 1</label>
                </div>

            </div>
          </div>
        </div>

        { /* Drums2 */}
        <div className="col-12 mt-3">
          <div className="collapse" id="drums2Collapse">
            <div className="card card-body">

                <h5 className="mb-3 text-center">Drums 2 Controls</h5>
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
