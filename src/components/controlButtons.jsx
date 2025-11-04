//import { ProcAndPlay } from "../App";
import {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { set } from "@strudel/core";

//Component imports
import CollapseButtons from "./controls/CollapseButtons.jsx";
import SpeedSection from "./controls/SpeedSection.jsx";
import BassLineSection from "./controls/BassLineSection.jsx";

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
      <CollapseButtons />

      <div className="row">
        {/* Speed Section */}
        <div className="col-12 mb-3">
          <SpeedSection
            tempBpm={tempBpm}
            setTempBpm={setTempBpm}
            onChangeMode={onChangeMode}
          />
        </div>

        { /* Bass Line */ }
        <div className="col-12 mb-3">
          <BassLineSection
            controls={controls}
            tempBassLpf={tempBassLpf}
            setTempBassLpf={setTempBassLpf}
            commitOnRelease={commitOnRelease}
            onChangeMode={onChangeMode}
          />
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
