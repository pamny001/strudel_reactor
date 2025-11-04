//import { ProcAndPlay } from "../App";
import {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { set } from "@strudel/core";

function ControlButtons({ controls, onChangeMode, onChangeBpm }) {
  const [tempBpm, setTempBpm] = useState(controls.bpm);

  //Temp states for sliders
  const [tempBassLpf, setTempBassLpf] = useState(controls.bassLpf ?? 700);
  const [tempMainArpLpf, setTempMainArpLpf] = useState(controls.mainArpLpf ?? 300);
  const [tempMainArpRoom, setTempMainArpRoom] = useState(controls.mainArpRoom ?? 0.6);
  const [tempMainArpLpenv, setTempMainArpLpenv] = useState(controls.mainArpLpenv ?? 3.3);
  //Update temp states when controls change
  useEffect(() => {
    setTempBpm(controls.bpm);
    setTempBassLpf(controls.bassLpf ?? 700);
    setTempMainArpLpf(controls.mainArpLpf ?? 300);
    setTempMainArpRoom(controls.mainArpRoom ?? 0.6);
    setTempMainArpLpenv(controls.mainArpLpenv ?? 3.3);
  }, [controls]);
  //Commit changes on click release
  const commitOnRelease = (key, value) => {
    onChangeMode?.(key, value);
  };

  return (
    <>
      <p className="d-inline-flex gap-1 collapse-buttons">
        <button className="btn btn-outline-primary collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#speedCollapse" aria-expanded="false" aria-controls="speedCollapse">Speed</button>
        <button className="btn btn-outline-primary collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#bassLineCollapse" aria-expanded="false" aria-controls="bassLineCollapse">Bass Line</button>
        <button className="btn btn-outline-primary collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#mainArpCollapse" aria-expanded="false" aria-controls="mainArpCollapse">Main Arp</button>
        <button className="btn btn-outline-primary collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#drums1Collapse" aria-expanded="false" aria-controls="drums1Collapse">Drums 1</button>
        <button className="btn btn-outline-primary collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#drums2Collapse" aria-expanded="false" aria-controls="drums2Collapse">Drums 2</button>
      </p>

      <div className="row">
        {/* Speed Section */}
        <div className="col-12 mb-3">
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
        </div>

        { /* Bass Line */ }
        <div className="col-12 mb-3">
          <div className="collapse" id="bassLineCollapse">
            <div className="card card-body">

                <h5 className="text-center">Bass Line Controls</h5>
                <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" id="flexSwitchCheckMode" checked={controls.bassLine === "on"} 
                    onChange={(e) => onChangeMode?.("bassLine", e.target.checked ? "on" : "off")} />
                    <label className="form-check-label" htmlFor="flexSwitchCheckMode">Bass Line Switch</label>
                </div>
                <div>
                <label htmlFor="bassLpfControl" className="form-label">Bass Line LPF (200-1400)</label>
                <input type="range" className="form-range" id="bassLpfControl" min="200" max="1400" step="200"
                  value={tempBassLpf}
                  onChange={(e) => setTempBassLpf(parseInt(e.target.value, 10))}
                  onMouseUp={() => commitOnRelease("bassLpf", tempBassLpf)}
                />
                <div className="small text-muted">Current: {controls.bassLpf} Hz</div>
              </div>

            </div>
          </div>
        </div>

                {/* Main Arp */}
        <div className="col-12 mb-3">
          <div className="collapse" id="mainArpCollapse">
            <div className="card card-body">

                <h5 className="text-center">Main Arp Controls</h5>
                <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" id="flexSwitchCheckMode" checked={controls.mainArp === "on"} 
                    onChange={(e) => onChangeMode?.("mainArp", e.target.checked ? "on" : "off")} />
                    <label className="form-check-label" htmlFor="flexSwitchCheckMode">Main Arp Switch</label>
                </div>

                {/* Main Arp LPF slider */}
                <div>
                  <label htmlFor="mainArpLpfControl" className="form-label">Main Arp LPF (100-1300)</label>
                  <input type="range" className="form-range" id="mainArpLpfControl" min="100" max="1300" step="200"
                    value={tempMainArpLpf}
                    onChange={(e) => setTempMainArpLpf(parseInt(e.target.value, 10))}
                    onMouseUp={(e) => commitOnRelease("mainArpLpf", tempMainArpLpf)}
                  />
                  <div className="small text-muted">Current: {controls.mainArpLpf ?? 300} Hz</div>
                </div>

                {/*Main Arp Room slider (0.00–1.00) */}
                <div>
                  <label htmlFor="mainArpRoomControl" className="form-label">Main Arp Room (0–1)</label>
                  <input type="range" className="form-range" id="mainArpRoomControl" min="0" max="1" step="0.01"
                    value={tempMainArpRoom}
                    onChange={(e) => setTempMainArpRoom(parseFloat(e.target.value))}
                    onMouseUp={(e) => commitOnRelease("mainArpRoom", tempMainArpRoom)}
                  />
                  <div className="small text-muted">Current: {(controls.mainArpRoom ?? 0.6).toFixed(2)}</div>
                </div>

                {/* Main Arp LPEnv slider (0.0–10.0) */}
                <div>
                  <label htmlFor="mainArpLpenvControl" className="form-label">Main Arp LPEnv (0–10)</label>
                  <input type="range" className="form-range" id="mainArpLpenvControl" min="0" max="10" step="0.1"
                    value={tempMainArpLpenv}
                    onChange={(e) => setTempMainArpLpenv(parseFloat(e.target.value))}
                    onMouseUp={(e) => commitOnRelease("mainArpLpenv", tempMainArpLpenv)}
                  />
                  <div className="small text-muted">Current: {(controls.mainArpLpenv ?? 3.3).toFixed(1)}</div>
                </div>


            </div>
          </div>
        </div>

        { /* Drums1 */}
        <div className="col-12 mb-3">
          <div className="collapse" id="drums1Collapse">
            <div className="card card-body">

                <h5 className="text-center">Drums 1 Controls</h5>
                <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" id="flexSwitchCheckMode" checked={controls.drums1 === "on"} 
                    onChange={(e) => onChangeMode?.("drums1", e.target.checked ? "on" : "off")} />
                    <label className="form-check-label" htmlFor="flexSwitchCheckMode">Drums 1 Switch</label>
                </div>

            </div>
          </div>
        </div>

        { /* Drums2 */}
        <div className="col-12 mb-3">
          <div className="collapse" id="drums2Collapse">
            <div className="card card-body">

                <h5 className="text-center">Drums 2 Controls</h5>
                <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" id="flexSwitchCheckMode" checked={controls.drums2 === "on"} 
                    onChange={(e) => onChangeMode?.("drums2", e.target.checked ? "on" : "off")} />
                    <label className="form-check-label" htmlFor="flexSwitchCheckMode">Drums 2 Switch</label>
                </div>

            </div>
          </div>
        </div>


      </div>
    </>
  );
}

export default ControlButtons;
